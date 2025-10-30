# Setup & Run Guide

This guide walks you **step by step** from _no setup_ to running the app locally. It’s written for beginners and includes Windows/macOS/Linux instructions.

> If you ever get an error, scroll to the **Troubleshooting** section at the bottom.

> There is a Quick Start that you can copy and paste at the end of this README

## 1) Prerequisites

You need **Node.js** (which includes **npm**) and a package manager (**pnpm** recommended, or npm).

### Windows (PowerShell)

**Install Node.js (LTS) with `winget` (recommended):**
```powershell
winget install OpenJS.NodeJS.LTS
```
If you don’t have winget, install Node from the website: https://nodejs.org (download the Windows **LTS .msi** installer). Make sure **“Add to PATH”** is checked during install.

**Verify Node & npm:**
```powershell
node -v
npm -v
```
You should see version numbers printed (e.g., `v20.x.x` and `10.x.x`).

### macOS (Terminal)

**Install Node.js (LTS) with Homebrew:**
```bash
brew install node@20
brew link --overwrite node@20
```
(or install from https://nodejs.org)

**Verify Node & npm:**
```bash
node -v
npm -v
```

**Install pnpm:**
```bash
npm install -g pnpm
pnpm -v
```

---

## If PowerShell won’t run scripts

If you see an error like:

File ... cannot be loaded because running scripts is disabled on this system.

Run PowerShell by right clicking and opening as Administrator, and Run this:
```bash

# Safe fix for your user only:
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# (Optional) Temporary fix for this session only:
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
```

## 2) Get the project code

If you already have the project folder, skip to **Step 3**.

**Clone with Git (recommended):**
```bash
git clone https://github.com/b00nk3r/job-tracker.git
```

## 3) Install dependencies

Next.js projects have a `package.json` file listing dependencies. Install them with **pnpm** (fast) or **npm**.

**Using pnpm (recommended):**
```bash
pnpm install
```

**Using npm:**
```bash
npm install
```

## 4) Start the development server

Run the Next.js dev server (with hot reloading):

**pnpm:**
```bash
pnpm run dev
```

**http://localhost:3000** Open this URL in your browser.

## Quick Start (copy‑paste)

```bash
# 1) Install Node (Windows example)
winget install OpenJS.NodeJS.LTS

# 2) Verify
node -v && npm -v

# 3) Optional: install pnpm
npm install -g pnpm

# 4) Get the code
git clone https://github.com/b00nk3r/job-tracker.git

# 5) Install dependencies
pnpm install     # or: npm install

# 6) Run the dev server
pnpm run dev     # or: npm run dev

# Open http://localhost:3000
```


## Troubleshooting

### “`pnpm` is not recognized”
- Install it: `npm install -g pnpm`
- Close and reopen your terminal (so PATH refreshes)
- Or use `npm install` instead of pnpm

### “`node`/`npm` is not recognized”
- Install Node LTS:
  - Windows: `winget install OpenJS.NodeJS.LTS` (or use the MSI installer from nodejs.org)
  - macOS: `brew install node@20`
  - Linux: use NodeSource setup (see above)
- Close and reopen your terminal

### "If PowerShell won’t run scripts"

Run this code:
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### “Please tell me who you are”

Configure Git username and email:

git config --global user.name "Your Name"
git config --global user.email "you@example.com"

### Port 3000 already in use
- Find and stop the process using port 3000, or run on another port:
  ```bash
  pnpm run dev -- -p 3001
  # or
  npm run dev -- -p 3001
  ```

### “next: command not found”
- Make sure dependencies were installed:
  ```bash
  pnpm install   # or npm install
  ```
- Run with the script: `pnpm run dev` (not `next dev` directly unless installed globally)

### Slow install or corporate network issues
- Try npm instead of pnpm: `npm install`
- Clear cache:
  ```bash
  pnpm store prune
  pnpm store status
  ```
  or
  ```bash
  npm cache clean --force
  ```

---