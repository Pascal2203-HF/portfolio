import os
import shutil
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth import verify_password, create_access_token, get_current_admin
from .. import models, schemas

# ---------------- AUTH ----------------
auth_router = APIRouter(prefix="/api/auth", tags=["Authentification"])


@auth_router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.AdminUser).filter(models.AdminUser.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Nom d'utilisateur ou mot de passe incorrect")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


@auth_router.get("/me")
def me(current=Depends(get_current_admin)):
    return {"username": current.username}


# ---------------- PROFILE ----------------
profile_router = APIRouter(prefix="/api/profile", tags=["Profil"])


@profile_router.get("/", response_model=schemas.ProfileOut)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(models.Profile).first()
    if not profile:
        profile = models.Profile()
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile


@profile_router.put("/", response_model=schemas.ProfileOut, dependencies=[Depends(get_current_admin)])
def update_profile(payload: schemas.ProfileBase, db: Session = Depends(get_db)):
    profile = db.query(models.Profile).first()
    if not profile:
        profile = models.Profile()
        db.add(profile)
    for key, value in payload.dict().items():
        setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return profile


# ---------------- CONTACT ----------------
contact_router = APIRouter(prefix="/api/contact", tags=["Contact"])


@contact_router.post("/", response_model=schemas.ContactOut)
def send_message(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    msg = models.ContactMessage(**payload.dict())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


@contact_router.get("/", response_model=list[schemas.ContactOut], dependencies=[Depends(get_current_admin)])
def list_messages(db: Session = Depends(get_db)):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.id.desc()).all()


@contact_router.put("/{msg_id}/read", dependencies=[Depends(get_current_admin)])
def mark_read(msg_id: int, db: Session = Depends(get_db)):
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message introuvable")
    msg.is_read = True
    db.commit()
    return {"ok": True}


@contact_router.delete("/{msg_id}", dependencies=[Depends(get_current_admin)])
def delete_message(msg_id: int, db: Session = Depends(get_db)):
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message introuvable")
    db.delete(msg)
    db.commit()
    return {"ok": True}


# ---------------- STATS ----------------
stats_router = APIRouter(prefix="/api/stats", tags=["Statistiques"])


@stats_router.post("/visit")
def record_visit(page: str = "/", db: Session = Depends(get_db)):
    db.add(models.VisitorStat(page=page))
    db.commit()
    return {"ok": True}


@stats_router.get("/", response_model=schemas.StatsOut, dependencies=[Depends(get_current_admin)])
def get_stats(db: Session = Depends(get_db)):
    total_visits = db.query(models.VisitorStat).count()
    total_projects = db.query(models.Project).count()
    total_downloads = sum(p.download_count or 0 for p in db.query(models.Project).all())
    unread_messages = db.query(models.ContactMessage).filter(models.ContactMessage.is_read == False).count()  # noqa: E712
    return schemas.StatsOut(
        total_visits=total_visits,
        total_projects=total_projects,
        total_downloads=total_downloads,
        unread_messages=unread_messages,
    )


# ---------------- UPLOAD (images / vidéos) ----------------
upload_router = APIRouter(prefix="/api/upload", tags=["Upload"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@upload_router.post("/", dependencies=[Depends(get_current_admin)])
def upload_file(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1]
    new_name = f"{uuid.uuid4().hex}{ext}"
    dest_path = os.path.join(UPLOAD_DIR, new_name)
    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"url": f"/uploads/{new_name}"}
