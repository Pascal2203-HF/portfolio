from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float
from sqlalchemy.sql import func
from .database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)


class Profile(Base):
    __tablename__ = "profile"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(200), default="")
    title = Column(String(200), default="")
    short_bio = Column(Text, default="")
    about_text = Column(Text, default="")
    photo_url = Column(String(500), default="")
    email = Column(String(200), default="")
    phone = Column(String(50), default="")
    location = Column(String(200), default="")
    github = Column(String(300), default="")
    linkedin = Column(String(300), default="")
    facebook = Column(String(300), default="")


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    category = Column(String(120), default="Autre")
    level = Column(Integer, default=70)  # 0-100 for progress bar


class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, default="")
    icon = Column(String(100), default="bi-code-slash")


class Education(Base):
    __tablename__ = "education"
    id = Column(Integer, primary_key=True, index=True)
    school = Column(String(250), nullable=False)
    degree = Column(String(250), default="")
    start_year = Column(String(20), default="")
    end_year = Column(String(20), default="")
    description = Column(Text, default="")


class Experience(Base):
    __tablename__ = "experience"
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(250), nullable=False)
    role = Column(String(250), default="")
    start_date = Column(String(40), default="")
    end_date = Column(String(40), default="")
    description = Column(Text, default="")


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250), nullable=False)
    short_description = Column(Text, default="")
    full_description = Column(Text, default="")
    technologies = Column(String(500), default="")  # comma separated
    cover_image = Column(String(500), default="")
    gallery_images = Column(Text, default="")  # comma separated urls
    video_url = Column(String(500), default="")
    role = Column(String(250), default="")
    realization_date = Column(String(40), default="")
    demo_url = Column(String(500), default="")
    github_url = Column(String(500), default="")
    download_url = Column(String(500), default="")
    download_count = Column(Integer, default=0)
    published = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())


class Certification(Base):
    __tablename__ = "certifications"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250), nullable=False)
    organization = Column(String(250), default="")
    date_obtained = Column(String(40), default="")
    certificate_url = Column(String(500), default="")
    image_url = Column(String(500), default="")


class GalleryItem(Base):
    __tablename__ = "gallery"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250), default="")
    media_type = Column(String(20), default="image")  # image | video
    url = Column(String(500), nullable=False)


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    subject = Column(String(300), default="")
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())


class VisitorStat(Base):
    __tablename__ = "visitor_stats"
    id = Column(Integer, primary_key=True, index=True)
    visited_at = Column(DateTime, server_default=func.now())
    page = Column(String(200), default="/")
