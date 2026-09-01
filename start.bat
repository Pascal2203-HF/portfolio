@echo off
title Portfolio - Demarrage
chcp 65001 >nul
cd /d "%~dp0frontend"

echo ============================================
echo   Portfolio professionnel - version statique
echo ============================================
echo.
echo Demarrage du site sur http://localhost:4200 ...
echo Aucun backend ni base de donnees n'est necessaire.
echo.
call npm start
