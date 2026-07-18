from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth import get_current_admin
from .. import models, schemas
from .crud_factory import make_crud_router

skills_router = make_crud_router("/api/skills", "Compétences", models.Skill, schemas.SkillOut, schemas.SkillBase)
services_router = make_crud_router("/api/services", "Services", models.Service, schemas.ServiceOut, schemas.ServiceBase)
education_router = make_crud_router("/api/education", "Formation", models.Education, schemas.EducationOut, schemas.EducationBase)
experience_router = make_crud_router("/api/experience", "Expérience", models.Experience, schemas.ExperienceOut, schemas.ExperienceBase)
certifications_router = make_crud_router("/api/certifications", "Certifications", models.Certification, schemas.CertificationOut, schemas.CertificationBase)
gallery_router = make_crud_router("/api/gallery", "Galerie", models.GalleryItem, schemas.GalleryOut, schemas.GalleryBase)

# Projects: public list only shows published=True
projects_router = make_crud_router(
    "/api/projects",
    "Projets",
    models.Project,
    schemas.ProjectOut,
    schemas.ProjectBase,
    public_filter=lambda q: q.filter(models.Project.published == True),  # noqa: E712
)

# Add an admin-only "all projects" endpoint (including unpublished) and download counter
admin_projects_router = APIRouter(prefix="/api/projects", tags=["Projets"])


@admin_projects_router.get("/admin/all", response_model=list[schemas.ProjectOut], dependencies=[Depends(get_current_admin)])
def list_all_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).order_by(models.Project.id.desc()).all()


@admin_projects_router.post("/{project_id}/download")
def increment_download(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Projet introuvable")
    project.download_count = (project.download_count or 0) + 1
    db.commit()
    return {"download_count": project.download_count}
