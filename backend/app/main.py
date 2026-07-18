import os
import re

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware as StarletteCORS  # noqa
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from . import models
from .auth import get_password_hash
from .routers.misc import auth_router, profile_router, contact_router, stats_router, upload_router, UPLOAD_DIR
from .routers.resources import (
    skills_router,
    services_router,
    education_router,
    experience_router,
    certifications_router,
    gallery_router,
    projects_router,
    admin_projects_router,
)

app = FastAPI(title="Portfolio API", description="API REST du portfolio professionnel", version="1.0.0")

# ---------- CORS dynamique (autorise localhost sur n'importe quel port, pratique en dev) ----------
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:4200")
static_origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=static_origins,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Tables ----------
Base.metadata.create_all(bind=engine)

# ---------- Static files (uploads) ----------
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ---------- Routers ----------
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(skills_router)
app.include_router(services_router)
app.include_router(education_router)
app.include_router(experience_router)
app.include_router(certifications_router)
app.include_router(gallery_router)
app.include_router(projects_router)
app.include_router(admin_projects_router)
app.include_router(contact_router)
app.include_router(stats_router)
app.include_router(upload_router)


@app.get("/")
def root():
    return {"message": "Portfolio API en ligne", "docs": "/docs"}


@app.on_event("startup")
def seed_data():
    """Crée le compte admin par défaut et quelques données d'exemple si la base est vide."""
    db: Session = SessionLocal()
    try:
        admin_username = os.getenv("ADMIN_USERNAME", "admin")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin123")

        if not db.query(models.AdminUser).filter(models.AdminUser.username == admin_username).first():
            db.add(models.AdminUser(username=admin_username, hashed_password=get_password_hash(admin_password)))
            db.commit()

        if not db.query(models.Profile).first():
            db.add(models.Profile(
                full_name="RATSIFERANIAINA Pascal Jean de Dieu",
                title="Étudiant en Informatique & Développeur Full-Stack",
                short_bio="Étudiant en Licence 2 Informatique à l'École Nationale d'Informatique (ENI) "
                          "Fianarantsoa, passionné par le développement web et les réseaux.",
                about_text="Actuellement en Licence 2 Informatique à l'École Nationale d'Informatique (ENI) "
                            "de Fianarantsoa, je développe des compétences solides en développement web "
                            "(PHP/Laravel, Python, Angular, C#, Java, C++, JavaScript) ainsi qu'en "
                            "administration réseau (configuration de routeurs, protocoles RIP et OSPF). "
                            "Je suis à la recherche d'opportunités pour mettre en pratique et approfondir "
                            "mes connaissances.",
                photo_url="/uploads/profile-pascal.png",
                email="ptsiferaniaina@gmail.com",
                phone="0383269145",
                location="Fianarantsoa, Madagascar",
                github="",
                linkedin="",
                facebook="",
            ))
            db.commit()

        if db.query(models.Skill).count() == 0:
            sample_skills = [
                ("PHP", "Langages", 80),
                ("Laravel", "Frameworks", 75),
                ("Python", "Langages", 80),
                ("Angular", "Frameworks", 75),
                ("C#", "Langages", 65),
                ("Java", "Langages", 65),
                ("C++", "Langages", 60),
                ("JavaScript", "Langages", 75),
                ("Configuration routeur (RIP, OSPF)", "Réseaux", 70),
            ]
            for name, cat, level in sample_skills:
                db.add(models.Skill(name=name, category=cat, level=level))
            db.commit()

        if db.query(models.Education).count() == 0:
            db.add(models.Education(
                school="École Nationale d'Informatique (ENI) Fianarantsoa",
                degree="Licence 2 Informatique Générale (IG)",
                start_year="",
                end_year="En cours",
                description="Formation en informatique générale : développement logiciel, "
                             "bases de données et administration réseau.",
            ))
            db.commit()

        if db.query(models.Service).count() == 0:
            sample_services = [
                ("Développement Web", "Sites et applications web modernes, responsives et performantes.", "bi-globe"),
                ("Création d'API REST", "Conception et développement d'API sécurisées avec FastAPI/Django.", "bi-hdd-network"),
                ("Conception de bases de données", "Modélisation et optimisation PostgreSQL/MySQL.", "bi-database"),
                ("Maintenance & Support", "Suivi, correctifs et évolutions d'applications existantes.", "bi-tools"),
            ]
            for title, desc, icon in sample_services:
                db.add(models.Service(title=title, description=desc, icon=icon))
            db.commit()

        if db.query(models.Project).count() == 0:
            db.add(models.Project(
                title="GestionMatériels",
                short_description="Application de gestion de matériels avec suivi des sorties et de l'état.",
                full_description="Système complet de gestion de matériels (Angular + PHP + PostgreSQL) "
                                  "avec suivi de l'état des matériels, sorties multi-articles, tableau de bord "
                                  "et génération de PDF.",
                technologies="Angular, PHP, PostgreSQL",
                role="Développeur Full-Stack",
                realization_date="2026",
                published=True,
            ))
            db.commit()
    finally:
        db.close()
