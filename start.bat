@echo off
title Portfolio - Demarrage
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================
echo   Portfolio Professionnel - Demarrage
echo ============================================
echo.

REM ----- Backend (FastAPI) -----
echo [1/2] Preparation du backend Python...
cd backend

if not exist "venv" (
    echo Creation de l'environnement virtuel Python...
    python -m venv venv
)

call venv\Scripts\activate.bat

echo Installation des dependances backend (peut prendre quelques minutes la 1ere fois)...
pip install -r requirements.txt --quiet --disable-pip-version-check --upgrade

if not exist ".env" (
    copy .env.example .env >nul
)

echo Demarrage du serveur backend sur http://localhost:8000 ...
start "Portfolio - Backend (FastAPI)" cmd /k "call venv\Scripts\activate.bat && uvicorn app.main:app --reload --port 8000"

cd ..

REM ----- Frontend (Angular) -----
echo.
echo [2/2] Preparation du frontend Angular...
cd frontend

echo Demarrage du serveur frontend sur http://localhost:4200 ...
start "Portfolio - Frontend (Angular)" cmd /k "npm install && npm start || pause"

cd ..

echo.
echo ============================================
echo   Tout est lance !
echo   Backend  : http://localhost:8000/docs
echo   Frontend : http://localhost:4200
echo   Admin    : http://localhost:4200/admin/login
echo            (identifiant: admin / mot de passe: admin123)
echo ============================================
echo.
echo Patientez quelques secondes que le frontend compile,
echo puis ouvrez votre navigateur sur http://localhost:4200
echo.
pause
