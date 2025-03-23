# 🤖 ChronoSyncBot

ChronoSyncBot is a nerdy, memory-aware AI assistant designed for both Discord and Telegram. It uses local AI models (via [Ollama](https://ollama.com)) to respond to users naturally while remembering context and learning over time.

---

## 🌟 Version

**v1.0.0** — _Released on March 23, 2025_  
This is the first official release of ChronoSyncBot with full support for memory, NLP, and Ollama-powered AI generation.

---

## 🧠 Models Used (Tested)

This version of ChronoSyncBot has been tested and optimized for:

| Model              | Purpose     | Notes                                      |
|-------------------|-------------|--------------------------------------------|
| `gemma:2b`         | Chat/Response | Default personality model (chat-focused)   |
| `smolLM2:1.7b`     | Chat/Response | Lightweight alternative model              |
| `nomic-embed-text` | Embeddings  | Used for vector search memory embeddings   |
| `tinyllama`        | Experimental| May work for basic queries                 |

---

## 🔄 Swapping Models

You can change the default model used by editing your `.env` file:

```env
OLLAMA_MODEL=gemma:2b
```

For embedding model override:

```env
EMBED_MODEL=nomic-embed-text
```

To use another chat model, ensure it supports `/api/generate` in Ollama, then:

1. Pull the model:  

   ```bash
   ollama pull <model-name>
   ```

2. Add it in `.env`:  

   ```env
   OLLAMA_MODEL=<model-name>
   ```

---

## 🛠️ Local Setup Guide

### 🔧 Minimum System Requirements

| Component | Recommended Minimum |
|----------|---------------------|
| RAM      | 8 GB                |
| CPU      | Modern 4-core       |
| Disk     | 10 GB Free          |

**Note:** For best performance, run heavier models like `gemma:2b` on a machine with 16GB RAM or higher. Use `smolLM2` or `tinyllama` for lighter setups.

---

## 🧪 How to Run (Dev Mode)

```bash
git clone https://github.com/yourname/chronosyncbot.git
cd chronosyncbot

# Install dependencies
npm install

# Build
npm run build

# Start development mode (requires ts-node-dev)
npm run dev
```

To run in Docker:

```bash
docker build -t chronosync-bot .
docker run --env-file .env chronosync-bot
```

---

## 🧠 AI Personality Configuration

ChronoSyncBot uses prompt injection to create a personality. You can customize this in the `askWithMemory()` function inside:

```ts
core/ai/index.ts
```

```ts
const personality = \`
You are Chrono — a clever, nerdy assistant who speaks naturally like a real person.
Avoid roleplaying conversations...
\`
```

Change this string to reflect a different tone (e.g., professional, playful, assistant-like).

---

## 📂 Optional Data

The bot learns and stores memory context. You can optionally push your `data/` or `memories/` directory (if exists) as `.json` for others to bootstrap training — though we recommend keeping it local for privacy.

---

## 📦 Features in This Release

- ✅ AI-backed conversations via local LLMs
- ✅ Memory search & context chaining
- ✅ Entity-aware NLP (detect names, dates)
- ✅ Telegram & Discord support
- ✅ Docker-compatible deployment
- ✅ Swappable personality via prompt tuning

---

## 👀 Roadmap

See [`ROADMAP.md`](./ROADMAP.md) for upcoming features (agent mode, cloud sync, training pipeline, and more).

---

Made with ❤️ by builders who believe AI should be personal, local, and powerful.
