import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 4000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: '12kb' }));

// Lightweight in-memory rate limit. Use a persistent store for high-traffic production sites.
const recent = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const previous = recent.get(ip) || 0;
  if (now - previous < 20_000) return res.status(429).json({ error: 'Please wait a moment before sending another note.' });
  recent.set(ip, now);
  next();
}

app.get('/api/health', (_req, res) => res.json({ ok: true, telegramConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) }));

app.post('/api/notes', rateLimit, async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!name || name.length > 40) return res.status(400).json({ error: 'Please enter a name (maximum 40 characters).' });
  if (message.length < 3 || message.length > 300) return res.status(400).json({ error: 'Comment must be between 3 and 300 characters.' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(503).json({ error: 'The Telegram group connection has not been configured yet. Please contact the site owner.' });

  const submittedAt = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh', dateStyle: 'medium', timeStyle: 'short' });
  const text = `📘 Singapore Research — Visitor Notebook\n\n👤 Name: ${name}\n💬 Message: ${message}\n🕒 Submitted: ${submittedAt}`;
  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, protect_content: true })
    });
    const result = await telegramResponse.json();
    if (!telegramResponse.ok || !result.ok) {
      console.error('Telegram sendMessage failed:', result?.description || telegramResponse.status);
      return res.status(502).json({ error: 'Telegram could not deliver the note. Please try again later.' });
    }
    return res.status(201).json({ ok: true, submittedAt });
  } catch (error) {
    console.error('Telegram request error:', error.message);
    return res.status(502).json({ error: 'Unable to reach Telegram right now. Please try again later.' });
  }
});

// Serve the production React build when deployed as one Node application.
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html'), (err) => { if (err) res.status(404).send('Build the React app first: npm run build'); }));
app.listen(PORT, () => console.log(`Singapore site API running at http://localhost:${PORT}`));
