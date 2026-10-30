Copy-Item .env.example .env -ErrorAction SilentlyContinue
npm install
Write-Host 'Edit .env with your Telegram bot token and group chat ID, then run: npm run dev'
