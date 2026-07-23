# TuneWave – Web-Based Music Search and Preview Player

TuneWave is a full-stack web application built using **React**, **Express**, and the **Deezer API**. It allows users to search for songs, artists, and albums in real time, view album artwork, and play 30-second audio previews directly in the browser.

---

## Features

- 🎵 **Real-Time Music Discovery**: Query millions of tracks, artists, and albums via the integrated Deezer Search API.
- 🔊 **Audio Preview Player**: Play 30-second audio track snippets using HTML5 audio controls.
- 🖼️ **Album Artwork Display**: View high-quality album cover images returned directly from backend API responses.
- 🔒 **Safe URL Encoding**: Encodes query parameters on the server side with `encodeURIComponent` to support complex search strings safely.
- ⚡ **Proxy API Architecture**: Utilizes an Express backend as a proxy service to securely communicate with external music APIs and eliminate client CORS issues.

---

## Tech Stack

### Frontend
- **React.js** (Functional Components & React Hooks)
- **Axios** (HTTP Client for API requests)
- **CSS3** (Responsive Layouts, Track Cards, Custom Inputs)

### Backend
- **Node.js** & **Express.js** (API Proxy Server & Modular Routing)
- **Axios** (Server-side external API requests)
- **CORS** (Cross-Origin Resource Sharing handling)

### External API
- **Deezer API** (Track search metadata and audio preview URLs)

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/tunewave.git](https://github.com/your-username/tunewave.git)
cd tunewave