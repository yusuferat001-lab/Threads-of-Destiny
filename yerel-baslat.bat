@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Kader Carki - Yerel Baslat

where node >nul 2>nul
if errorlevel 1 (
  echo HATA: Node.js kurulu degil. https://nodejs.org adresinden LTS surumunu kurup tekrar dene.
  pause
  exit /b 1
)
for /f %%v in ('node -p "process.versions.node.split('.')[0]"') do set SURUM=%%v
if %SURUM% LSS 20 (
  echo HATA: Node.js %SURUM% cok eski, en az 20 gerekli. https://nodejs.org adresinden guncelle.
  pause
  exit /b 1
)

if not exist server\node_modules (
  echo Ilk kurulum: sunucu paketleri indiriliyor...
  pushd server
  call npm install
  popd
)
if not exist client\node_modules (
  echo Ilk kurulum: istemci paketleri indiriliyor...
  pushd client
  call npm install
  popd
)

start "Kader Carki - Sunucu" cmd /k "cd /d %~dp0server && npm run dev:bellek"
start "Kader Carki - Istemci" cmd /k "cd /d %~dp0client && npm run dev"

echo Oyun birkac saniye icinde tarayicida acilacak: http://localhost:5180
timeout /t 8 >nul
start http://localhost:5180
echo Durdurmak icin acilan iki siyah pencereyi kapat.
pause
