# Contributing to ChronoSyncBot

Thanks for your interest in contributing to ChronoSyncBot! 🚀

ChronoSyncBot is an AI-powered, memory-aware, dual-platform bot for Discord and Telegram using local models via Ollama. Here's how you can contribute:

---

## 🛠️ Project Setup

1. **Clone the repo**:

   ```bash
   git clone https://github.com/your-username/chronoSyncBot.git
   cd chronoSyncBot
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment**:
   Copy `.env.example` to `.env` and fill in your tokens and configuration.

4. **Run the dev server**:

   ```bash
   npm run dev
   ```

---

## 🧠 Project Structure

- `bots/discord` – Discord bot logic
- `bots/telegram` – Telegram bot logic
- `core/ai` – AI memory, prompts, and Ollama integration
- `core/nlp` – NLP system for intent and entity recognition
- `core/services` – Prisma DB and service logic

---

## 🔧 Branching Strategy

- `main` – Stable releases
- `dev` – Latest development
- Feature branches: `feature/<feature-name>`
- Bugfix branches: `fix/<bug-description>`

---

## 🧪 Testing Before PR

- Ensure no ESLint/TypeScript errors
- Test your feature locally (`npm run dev`)
- Include logs if testing AI behavior

---

## ✅ Pull Request Checklist

- [ ] Descriptive title and body
- [ ] Related issue linked (if any)
- [ ] Code is linted (`npm run lint`)
- [ ] Tests are passing
- [ ] Docs updated (if needed)

---

## 💡 Suggesting Features

Open an issue with:

- Problem you’re trying to solve
- Why it matters
- What you propose

We're excited to grow ChronoSyncBot with the community! 🤝
