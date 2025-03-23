# 🛣️ ChronoSyncBot Roadmap

Welcome to the development roadmap of ChronoSyncBot — an intelligent, memory-aware, multi-platform AI assistant built for Discord, Telegram, and more.

---

## ✅ Core Features Completed (v1.0)

- [x] **AI Core with Ollama Integration**
  - Supports multiple models (e.g., `gemma:2b`, `smolLM2`)
  - Smart model selection with fallbacks
- [x] **Embedded Memory System**
  - Contextual memory with namespace handling (shared vs private)
  - AI learns from conversations via `learnFrom()`
- [x] **Basic NLP Module**
  - Detects user **intent** and key **entities** (e.g. name, date)
- [x] **Vector-based Memory Search**
  - Local embeddings via compatible Ollama models
  - Fallback embeddings when models are unavailable
- [x] **Personality Injection**
  - Chrono speaks with a consistent, witty sci-fi geek tone
  - Prompt shaping included per request
- [x] **Multi-platform Bots**
  - Discord & Telegram interfaces
  - Unified backend

---

## 🧪 Near-Term Improvements (v1.1–v1.3)

### 🔠 NLP Enhancements

- [ ] Expand `intent` categories (`reminder`, `question`, `affirmation`, `joke`, etc.)
- [ ] Add dynamic `entity` detection: time, emotion, location
- [ ] Integrate lightweight transformer NLP (e.g. `bert`, `distilbert`)

### 🧠 AI Memory Upgrades

- [ ] Memory weighting (recency, frequency)
- [ ] Memory decay system for outdated knowledge
- [ ] Prioritize context relevance in `askWithMemory()`

### 🔒 Private AI Mode

- [ ] `!sandbox` command for user-isolated memory
- [ ] Per-user namespace memory with opt-in

### 🌤️ Cloud Sync (Optional)

- [ ] Store vector memory or logs in cloud storage (e.g., Supabase, Firebase, or Notion)
- [ ] Enable AI evolution over time across devices

---

## 🔮 Long-Term Vision (v2.0+)

### 🧬 Self-Improving AI

- [ ] Store structured memory logs for future training
- [ ] Aggregate user feedback to fine-tune a custom Chrono model
- [ ] Build a training pipeline using collected interaction data

### 🧞‍♂️ Embedded Personality Model

- [ ] Fine-tune or distill a local LLM where Chrono’s tone is ingrained (no prompt needed)
- [ ] Host on Hugging Face or a dedicated microservice

### 🤖 Smart Autonomy (Agent Mode)

- [ ] Allow Chrono to suggest actions or run background tasks
- [ ] Integrate browsing, file creation, or automation support

---

## 📂 Structure To Revisit

- `core/ai/` – Memory, trainer, and Ollama logic
- `core/nlp/` – Intent & entity system (WIP)
- `bots/` – Discord & Telegram interfaces
- `.env` – Local vs remote Ollama model config
- `scripts/` – Future CLI utilities for memory cleanups, training, etc.

---

## 🚀 Next Steps

- [ ] Push `ROADMAP.md` to repo
- [ ] Add NLP improvements to milestone
- [ ] Document memory and AI modules

---

Chrono is evolving. One convo at a time.
