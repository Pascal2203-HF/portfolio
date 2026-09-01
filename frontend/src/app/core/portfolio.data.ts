import { Certification, Education, Experience, GalleryItem, Profile, Project, Service, Skill } from './models/models';

const asset = (name: string) => `assets/portfolio/${name}`;

export const profile: Profile = {
  full_name: 'RATSIFERANIAINA Pascal Jean de Dieu',
  title: 'Étudiant en Informatique & Développeur Full-Stack',
  short_bio: "Étudiant en Licence Informatique à l’ENI Fianarantsoa, passionné par le développement web et les réseaux.",
  about_text: "Je suis étudiant en informatique à l’École Nationale d’Informatique (ENI) de Fianarantsoa. Je développe des applications web et desktop avec Java, PHP, Python, Angular et JavaScript. J’aime transformer une idée en une application claire, utile et agréable à utiliser.",
  photo_url: asset('WhatsApp Image 2026-09-01 at 06.46.11.jpeg'), email: 'ptsiferaniaina@gmail.com', phone: '0383269145', location: 'Fianarantsoa, Madagascar', github: '', linkedin: '', facebook: '',
};

export const skills: Skill[] = [
  { id: 1, name: 'Java', category: 'Langages', level: 80 }, { id: 2, name: 'PHP', category: 'Langages', level: 80 }, { id: 3, name: 'Python', category: 'Langages', level: 75 }, { id: 4, name: 'JavaScript', category: 'Langages', level: 75 },
  { id: 5, name: 'Angular', category: 'Frameworks', level: 75 }, { id: 6, name: 'Laravel', category: 'Frameworks', level: 70 }, { id: 7, name: 'MySQL / PostgreSQL', category: 'Bases de données', level: 70 }, { id: 8, name: 'Réseaux (RIP, OSPF)', category: 'Réseaux', level: 70 },
];
export const services: Service[] = [
  { id: 1, title: 'Développement web', description: 'Sites et applications web modernes, responsives et adaptés à vos besoins.', icon: 'bi-globe' }, { id: 2, title: 'Applications desktop', description: 'Conception d’applications de gestion avec Java et interfaces simples.', icon: 'bi-window-desktop' }, { id: 3, title: 'API & bases de données', description: 'Création d’API et modélisation de données fiables pour vos projets.', icon: 'bi-hdd-network' }, { id: 4, title: 'Support informatique', description: 'Maintenance, corrections et évolution d’applications existantes.', icon: 'bi-tools' },
];
export const education: Education[] = [{ id: 1, school: 'École Nationale d’Informatique (ENI), Fianarantsoa', degree: 'Licence Informatique Générale', start_year: '2024', end_year: 'En cours', description: 'Développement logiciel, bases de données et administration réseau.' }];
export const experience: Experience[] = [];
export const projects: Project[] = [
  { id: 1, title: 'Gestion de matériels', short_description: 'Suivi des matériels, sorties et états dans une interface de gestion.', full_description: 'Application de gestion de matériels avec tableau de bord, suivi des sorties et génération de documents.', technologies: 'Angular, PHP, PostgreSQL', cover_image: asset('materiel.png'), gallery_images: '', video_url: '', role: 'Développeur Full-Stack', realization_date: '2026', demo_url: '', github_url: '', download_url: '', published: true },
  { id: 2, title: 'Gestion de pharmacie', short_description: 'Application pour gérer les produits, ventes et stocks d’une pharmacie.', full_description: 'Projet de gestion de pharmacie : gestion des médicaments, du stock et des opérations courantes.', technologies: 'Java, MySQL', cover_image: asset('pharmachie java.png'), gallery_images: '', video_url: '', role: 'Développeur', realization_date: '2026', demo_url: '', github_url: '', download_url: '', published: true },
  { id: 3, title: 'Gestion de réservation', short_description: 'Solution de réservation avec gestion des chambres et disponibilités.', full_description: 'Application de gestion des réservations et des chambres, pensée pour simplifier le suivi des clients.', technologies: 'Java, MySQL', cover_image: asset('gestions regervation.png'), gallery_images: '', video_url: '', role: 'Développeur', realization_date: '2026', demo_url: '', github_url: '', download_url: '', published: true },
  { id: 4, title: 'Gestion d’école', short_description: 'Outil de suivi des informations et activités scolaires.', full_description: 'Application de gestion scolaire conçue pour organiser les données importantes de l’établissement.', technologies: 'Java, MySQL', cover_image: asset('gestions ecole.png'), gallery_images: '', video_url: '', role: 'Développeur', realization_date: '2026', demo_url: '', github_url: '', download_url: '', published: true },
  { id: 5, title: 'Application météo', short_description: 'Interface de consultation des informations météorologiques.', full_description: 'Projet d’application météo proposant une interface claire pour afficher les prévisions.', technologies: 'JavaScript, API', cover_image: asset('meteo.png'), gallery_images: '', video_url: '', role: 'Développeur', realization_date: '2026', demo_url: '', github_url: '', download_url: '', published: true },
  { id: 6, title: 'Gestion d’hôtel', short_description: 'Gestion des chambres, réservations et clients d’un hôtel.', full_description: 'Application de gestion hôtelière permettant le suivi des chambres et réservations.', technologies: 'Java, MySQL', cover_image: asset('hotel java.png'), gallery_images: '', video_url: '', role: 'Développeur', realization_date: '2026', demo_url: '', github_url: '', download_url: '', published: true },
];
export const certifications: Certification[] = [];
export const gallery: GalleryItem[] = [...projects.map((project) => ({ id: project.id, title: project.title, media_type: 'image', url: project.cover_image })), { id: 20, title: 'Soutenance BCE', media_type: 'image', url: asset('SOUTENEBCE.png') }, { id: 21, title: 'Projet grossiste', media_type: 'image', url: asset('grossite.png') }];
export const cvUrl = asset('CV_Pascal_Ratsiferaniaina_PREMIUM.pdf');
