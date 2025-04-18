# Diex

> **Di**ary **Ex**­-index — a Cordova‑powered, offline diary index and management app.

## Description

Diex is a cross‑platform mobile (and browser) application built with [Apache Cordova](https://cordova.apache.org/). It lets you create, search, view and organize diary entries via:

- **Full‑text search** of entries  
- **Calendar view** of your entries and holidays  
- **Custom indexes** (tags/categories) for quick filtering  
- **WebSQL storage** for offline persistence  
- **Responsive UI** based on Framework7, jQuery, Mustache.js and Slick Slider  

> Diex stands for “Diary Index”—it helps you index, browse and manage your diary contents.

## Features

- Add, edit and delete diary entries  
- Assign entries to one or more indexes (categories)  
- Browse entries by date via an interactive calendar  
- Search entries by keyword  
- Manage your own set of indexes (create, rename, delete)  
- Works offline using WebSQL  
- Runs in both browser and native Android (and iOS stubbed)  

## Screenshots

![Search Entries](https://placehold.it/400x800?text=Search+Entries)  
![Calendar View](https://placehold.it/400x800?text=Calendar+View)  
![Manage Indexes](https://placehold.it/400x800?text=Manage+Indexes)

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Installation & Setup](#installation--setup)  
3. [Running the App](#running-the-app)  
4. [Project Structure](#project-structure)  
6. [Technologies & Plugins](#technologies--plugins)  
7. [Todo / Improvements](#todo--improvements)  
8. [License](#license)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (≥ 12.x) & npm  
- [Cordova CLI](https://cordova.apache.org/docs/en/latest/guide/cli/index.html):  
  ```bash
  npm install ‑g cordova
  ```  
- **For Android**: Android SDK & platform tools  
- **Optional (Browser build)**:  
  - A static HTTP server (e.g. included Nginx in `conf/`)  

---

## Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your‑username/Diex.git
   cd Diex
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Add Cordova platforms**  
   ```bash
   cordova platform add browser android
   ```

4. **Prepare the project**  
   ```bash
   cordova prepare
   ```

---

## Running the App

### In the Browser

- **Quick**  
  ```bash
  cordova run browser
  ```
- **Or using the bundled Nginx** (Windows):  
  1. Run `nginx_start.bat`  
  2. Open [http://localhost:8080](http://localhost:8080)  
  3. To stop, run `nginx_quit.bat`

### On Android

1. Connect your device or start an emulator  
2.  
   ```bash
   cordova run android --verbose
   ```

---

## Project Structure

```
├── config.xml           # Cordova project config
├── package.json         # npm & Cordova settings
├── platforms/           # cordova‑platform builds
├── plugins/             # cordova plugins (whitelist, sqlite)
├── www/                 # web assets (HTML/CSS/JS)
│   ├── index.html       # splash + main loader
│   ├── *.html           # views: search, calendar, edit, manage
│   ├── js/
│   │   ├── database.js  # WebSQL setup & schema
│   │   ├── init.js      # app initialization & event bindings
│   │   ├── comman.js    # common utilities
│   │   └── path.js      # client‑side routing
│   ├── css/             # styling (framework, slick, select2, custom)
│   └── img/             # images & icons
└── conf/                # nginx server config (for browser workflow)
```

---

## Technologies & Plugins

- Core: **Apache Cordova**, **HTML5**, **CSS3**, **JavaScript**  
- UI: **Framework7**‑style CSS, **jQuery**, **Slick Slider**, **Select2**, **Mustache.js**  
- Storage: plugin for WebSQL 
- Security: **cordova-plugin-whitelist**  
- Platforms: **Browser**, **Android** (iOS stub)

---

## Todo / Improvements

- **Migrate off WebSQL**: the current browser build uses `window.openDatabase` (WebSQL), which is deprecated and no longer supported by many browsers.  
- **Unify storage layer**: consolidate on `cordova-sqlite-storage` (or IndexedDB for web) to ensure consistent data persistence across platforms.  
- **iOS support**: add the iOS platform (`cordova platform add ios`) and test full feature parity.  
- **Export/Import**: allow users to export entries/indexes (e.g. JSON/CSV) and import backups.  
- **Automated tests**: implement unit and integration tests (e.g. with Jasmine or Mocha).  
- **UI polish**: refine calendar theming, responsive breakpoints, and accessibility.  
- **CI/CD pipeline**: add automated builds and deployments (e.g. GitHub Actions).

---

## License

This project is licensed under the **Apache 2.0 License**. See [LICENSE](LICENSE) for details.
