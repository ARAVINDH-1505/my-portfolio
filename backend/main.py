from fastapi import FastAPI, HTTPException, Depends, Request

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from pydantic import BaseModel, EmailStr
from typing import Optional
from sqlalchemy import create_engine, Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus
import resend
import time
from collections import defaultdict, deque


# Load environment variables
load_dotenv()

# Configure Resend
resend.api_key = os.getenv("RESEND_API_KEY")

# Rate Limiting Configuration
# Simple in-memory rate limiter: ID -> list of timestamps
# Limit: 3 requests per 60 seconds
RATE_LIMIT_DURATION = 60
RATE_LIMIT_MAX_REQUESTS = 3
request_history = defaultdict(lambda: deque(maxlen=RATE_LIMIT_MAX_REQUESTS))

def is_rate_limited(client_ip: str) -> bool:
    current_time = time.time()
    timestamps = request_history[client_ip]
    
    # Remove timestamps older than the duration
    while timestamps and timestamps[0] < current_time - RATE_LIMIT_DURATION:
        timestamps.popleft()
    
    if len(timestamps) >= RATE_LIMIT_MAX_REQUESTS:
        return True
    
    timestamps.append(current_time)
    return False

# ==========================================
# Database Configuration
# ==========================================

DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "portfolio_db")

# Construct DATABASE_URL
# We use quote_plus to handle special characters (like '@') in passwords safely
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    user_encoded = quote_plus(DB_USER)
    pass_encoded = quote_plus(DB_PASSWORD)
    DATABASE_URL = f"postgresql://{user_encoded}:{pass_encoded}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create Database Engine
try:
    engine = create_engine(DATABASE_URL)
    # Test connection
    with engine.connect() as connection:
        print(f"✅ Successfully connected to database: {DB_NAME}")
except Exception as e:
    print(f"❌ Database connection failed. Please check your .env credentials.")
    print(f"Error: {e}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==========================================
# Database Model
# ==========================================

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create Tables (if they don't exist)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"⚠️ Error creating tables: {e}")

# ==========================================
# Pydantic Schema (Validation)
# ==========================================

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

# ==========================================
# FastAPI App Setup
# ==========================================

app = FastAPI()

# CORS Configuration
# Allow requests from your frontend (localhost or deployed domain)
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500",  # Common Live Server port
    "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development convenience
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# API Routes
# ==========================================

@app.post("/api/contact", status_code=201)
def create_contact(contact: ContactCreate, request: Request):
    # 1. Rate Limiting Check
    client_ip = request.client.host
    if is_rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")

    # 2. Prepare Email Content
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }}
            .header {{ background-color: #f8f9fa; padding: 15px; border-bottom: 2px solid #3b82f6; border-radius: 8px 8px 0 0; text-align: center; }}
            .header h2 {{ margin: 0; color: #2c3e50; font-size: 24px; }}
            .content {{ padding: 25px; background-color: #ffffff; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: 600; color: #7f8c8d; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.5px; }}
            .value {{ margin-top: 5px; font-size: 1.1em; color: #2c3e50; }}
            .message-box {{ background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6; margin-top: 5px; }}
            .footer {{ margin-top: 25px; font-size: 0.8em; text-align: center; color: #95a5a6; border-top: 1px solid #eee; padding-top: 15px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Portfolio Contact</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">Name</div>
                    <div class="value">{contact.name}</div>
                </div>
                <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:{contact.email}">{contact.email}</a></div>
                </div>
                <div class="field">
                    <div class="label">Phone</div>
                    <div class="value">{contact.phone if contact.phone else "Not provided"}</div>
                </div>
                <div class="field">
                    <div class="label">Message</div>
                    <div class="value message-box">{contact.message}</div>
                </div>
            </div>
            <div class="footer">
                Sent from Portfolio Contact Form • {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
            </div>
        </div>
    </body>
    </html>
    """

    # 3. Send Email via Resend
    try:
        # NOTE: Replace 'delivered@resend.dev' with your verified domain email if you have one,
        # or verify 'onboarding@resend.dev' works for testing if you don't have a domain setup yet.
        # Ideally, this should be an environment variable like SENDER_EMAIL.
        # For now, using the Resend testing domain or a placeholder.
        # User receives the email at their own email address (using a verified sender).
        
        # We'll use a generic sender from Resend or the user's config if available.
        # If user hasn't set up a domain, they can only send to their own email using 'onboarding@resend.dev'
        sender_email = os.getenv("SENDER_EMAIL", "onboarding@resend.dev")
        recipient_email = os.getenv("RECIPIENT_EMAIL", "srinivasaaravindh15@gmail.com") # Default to user's email from contact section
        
        r = resend.Emails.send({
            "from": f"Portfolio Contact <{sender_email}>",
            "to": recipient_email,
            "subject": f"New Contact: {contact.name}",
            "html": html_content,
            "reply_to": contact.email
        })
        
        return {"message": "Message sent successfully", "id": r.get("id")}

    except Exception as e:
        print(f"❌ Error sending email: {e}")
        # Log the error but maybe don't expose full details to client
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again later.")

# Mount static file directories
# Get the parent directory of the backend folder
import pathlib
BASE_DIR = pathlib.Path(__file__).parent.parent

# Mount static directories
app.mount("/css", StaticFiles(directory=str(BASE_DIR / "css")), name="css")
app.mount("/js", StaticFiles(directory=str(BASE_DIR / "js")), name="js")
app.mount("/assets", StaticFiles(directory=str(BASE_DIR / "assets")), name="assets")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    """Serve the main index.html file"""
    index_path = BASE_DIR / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    return HTMLResponse(content="<h1>Portfolio Backend Running</h1><p>index.html not found</p>", status_code=404)

@app.get("/AR-Resume_2026.pdf")
async def get_resume():
    """Serve the resume PDF"""
    resume_path = BASE_DIR / "AR-Resume_2026.pdf"
    if resume_path.exists():
        return FileResponse(resume_path)
    return {"error": "Resume not found"}
