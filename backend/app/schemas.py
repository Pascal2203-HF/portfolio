from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    username: str
    password: str


# ---------- Profile ----------
class ProfileBase(BaseModel):
    full_name: str = ""
    title: str = ""
    short_bio: str = ""
    about_text: str = ""
    photo_url: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    github: str = ""
    linkedin: str = ""
    facebook: str = ""


class ProfileOut(ProfileBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Skill ----------
class SkillBase(BaseModel):
    name: str
    category: str = "Autre"
    level: int = 70


class SkillOut(SkillBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Service ----------
class ServiceBase(BaseModel):
    title: str
    description: str = ""
    icon: str = "bi-code-slash"


class ServiceOut(ServiceBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Education ----------
class EducationBase(BaseModel):
    school: str
    degree: str = ""
    start_year: str = ""
    end_year: str = ""
    description: str = ""


class EducationOut(EducationBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Experience ----------
class ExperienceBase(BaseModel):
    company: str
    role: str = ""
    start_date: str = ""
    end_date: str = ""
    description: str = ""


class ExperienceOut(ExperienceBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Project ----------
class ProjectBase(BaseModel):
    title: str
    short_description: str = ""
    full_description: str = ""
    technologies: str = ""
    cover_image: str = ""
    gallery_images: str = ""
    video_url: str = ""
    role: str = ""
    realization_date: str = ""
    demo_url: str = ""
    github_url: str = ""
    download_url: str = ""
    published: bool = True


class ProjectOut(ProjectBase):
    id: int
    download_count: int = 0
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ---------- Certification ----------
class CertificationBase(BaseModel):
    title: str
    organization: str = ""
    date_obtained: str = ""
    certificate_url: str = ""
    image_url: str = ""


class CertificationOut(CertificationBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Gallery ----------
class GalleryBase(BaseModel):
    title: str = ""
    media_type: str = "image"
    url: str


class GalleryOut(GalleryBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Contact ----------
class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


class ContactOut(ContactCreate):
    id: int
    is_read: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class StatsOut(BaseModel):
    total_visits: int
    total_projects: int
    total_downloads: int
    unread_messages: int
