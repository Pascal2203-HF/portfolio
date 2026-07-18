from typing import Type, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..database import get_db
from ..auth import get_current_admin


def make_crud_router(
    prefix: str,
    tag: str,
    model,
    schema_out: Type[BaseModel],
    schema_in: Type[BaseModel],
    public_filter=None,
):
    """Crée un routeur CRUD générique : lecture publique, écriture protégée (admin)."""
    router = APIRouter(prefix=prefix, tags=[tag])

    @router.get("/", response_model=List[schema_out])
    def list_items(db: Session = Depends(get_db)):
        query = db.query(model)
        if public_filter is not None:
            query = public_filter(query)
        return query.all()

    @router.get("/{item_id}", response_model=schema_out)
    def get_item(item_id: int, db: Session = Depends(get_db)):
        item = db.query(model).filter(model.id == item_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Élément introuvable")
        return item

    @router.post("/", response_model=schema_out, dependencies=[Depends(get_current_admin)])
    def create_item(payload: schema_in, db: Session = Depends(get_db)):
        item = model(**payload.dict())
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

    @router.put("/{item_id}", response_model=schema_out, dependencies=[Depends(get_current_admin)])
    def update_item(item_id: int, payload: schema_in, db: Session = Depends(get_db)):
        item = db.query(model).filter(model.id == item_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Élément introuvable")
        for key, value in payload.dict().items():
            setattr(item, key, value)
        db.commit()
        db.refresh(item)
        return item

    @router.delete("/{item_id}", dependencies=[Depends(get_current_admin)])
    def delete_item(item_id: int, db: Session = Depends(get_db)):
        item = db.query(model).filter(model.id == item_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Élément introuvable")
        db.delete(item)
        db.commit()
        return {"ok": True}

    return router
