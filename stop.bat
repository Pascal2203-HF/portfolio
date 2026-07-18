@echo off
title Portfolio - Arret
echo Arret des serveurs Portfolio (backend et frontend)...

taskkill /FI "WINDOWTITLE eq Portfolio - Backend*" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Portfolio - Frontend*" /T /F >nul 2>&1

echo Serveurs arretes.
pause
