# Professional Research Portfolio

A high-performance, single-page portfolio website designed for a Machine Learning Engineer. This project showcases academic research, applied ML projects, and technical skills through a clean, interactive interface.

## 📂 Project Structure

```text
PORTFOLIO/
├── assets/                 # Static media (Project GIFs, profile images)
├── backend/                # FastAPI Backend Application
│   └── main.py             # API entry point, database models, and email logic
├── css/                    # Stylesheets
│   └── styles.css          # Main responsive styling & animations
├── js/                     # Frontend Logic
│   └── script.js           # Particle animations, modals, and form handling
├── .env                    # Environment variables (Database URL, API Keys)
├── AR-Resume_2026.pdf      # Downloadable Resume
└── index.html              # Main application entry point
```

## 🏗️ System Architecture

The application follows a **Decoupled Architecture**:
- **Frontend**: Pure HTML/CSS/JS (Vanilla) for maximum performance and control.
- **Backend**: Python (FastAPI) for handling data persistence and external API integrations.

```mermaid
graph TD
    subgraph Client [Client Side]
        Browser[Web Browser]
        HTML[index.html]
        CSS[styles.css]
        JS[script.js]
        
        Browser --> HTML
        HTML --> CSS
        HTML --> JS
    end

    subgraph Server [Backend API]
        FastAPI[FastAPI App]
        Static[Static File Mounts]
        Limit[Rate Limiter]
        DB_Model[SQLAlchemy Models]
        
        FastAPI --> Static
        FastAPI --> Limit
        Limit --> DB_Model
    end

    subgraph External [External Services]
        DB[(PostgreSQL DB)]
        Resend[Resend Email API]
    end

    %% Interactions
    Browser -- "1. Load Page" --> FastAPI
    FastAPI -- "2. Serve Assets" --> Browser
    
    JS -- "3. Submit Contact Form (POST)" --> FastAPI
    FastAPI -- "4. Validate & Rate Limit" --> Limit
    Limit -- "5. Store Message" --> DB_Model
    DB_Model -- "6. Persist" --> DB
    Limit -- "7. Trigger Notification" --> Resend
    Resend -- "8. Send Email" --> Browser
```

## 🚀 Technical Features & Workflow

### 1. Interactive Frontend (`js/script.js`)
*   **Dynamic Backgrounds**: Implemented using the HTML5 `canvas` API. The `DynamicBackground` class creates a network of connected particles that react to mouse movement. Each section (Hero, About, Skills) has a specific configuration for particle count, color, and speed.
*   **Project Modals**: A custom modal system displays detailed project information. Data is stored in a structured JSON object (`projectData`) and populated dynamically into the DOM when a user interacts with a project card.
*   **Intersection Observer**: Used for scroll-triggered animations. Elements fade in or slide up as they enter the viewport, improving engagement without heavy libraries.

### 2. Robust Backend (`backend/main.py`)
*   **FastAPI Framework**: Chosen for its high performance and automatic validation.
*   **Rate Limiting**: A custom token-bucket style rate limiter prevents abuse of the contact form (e.g., limiting users to 3 messages per minute).
*   **Data Persistence**: Uses **SQLAlchemy** ORM to define the `ContactMessage` model and store inquiries safely in a PostgreSQL database.
*   **Email Integration**: Utilizes the **Resend API** to trigger real-time email notifications to the site owner upon form submission.

### 3. Response & Styling (`css/styles.css`)
*   **Modern CSS Variables**: Used for consistent theming (colors, spacing, fonts).
*   **Flexbox & Grid**: Layouts are built to be fully responsive, adapting seamlessly from mobile screens to 4K desktops.
*   **Glassmorphism**: Subtle transparency and blur effects (`backdrop-filter`) are used in modals and cards.

## 🛠️ Setup & Installation

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Environment Setup**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL=postgresql://user:password@localhost/dbname
    RESEND_API_KEY=re_123456789
    ```
3.  **Run the Backend**:
    ```bash
    uvicorn backend.main:app --reload
    ```
4.  **Access**:
    Open `http://localhost:8000` to view the portfolio.
