# Verifica se o Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "🔍 Node.js não encontrado. Instalando..."
    # Baixa e instala o Node.js
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi" -OutFile "$env:TEMP\nodejs.msi"
    Start-Process msiexec.exe -ArgumentList "/i $env:TEMP\nodejs.msi /quiet" -Wait
    Write-Host "✅ Node.js instalado."
}

# Verifica se o Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "🔍 Git não encontrado. Instalando..."
    # Baixa e instala o Git
    Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/download/v2.40.0.windows.1/Git-2.40.0-64-bit.exe" -OutFile "$env:TEMP\git-install.exe"
    Start-Process "$env:TEMP\git-install.exe" -ArgumentList "/VERYSILENT /NORESTART" -Wait
    Write-Host "✅ Git instalado."
}

# Instala as dependências do projeto
Write-Host "📦 Instalando dependências..."
npm install

# Inicia o bot
Write-Host "🚀 Iniciando o bot..."
node bot.js
