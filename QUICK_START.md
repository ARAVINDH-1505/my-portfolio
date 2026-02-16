# Portfolio API - Quick Start Guide

## 🚀 Start the Server

```bash
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## 🌐 Access the Portfolio

Open your browser to: **http://localhost:8000**

## 📝 Test the Contact Form

1. Scroll to the **Contact** section
2. Fill out the form:
   - Name (required)
   - Email (required)
   - Phone (optional) ← **NEW FIELD**
   - Message (required)
3. Click "Send Message"
4. Check for success message

## 🗄️ Verify Database

```bash
# Connect to PostgreSQL
psql -U postgres -d portfolio_db

# View contact messages
SELECT * FROM contact_messages;
```

## 📊 API Endpoints

- `GET /` → Portfolio homepage
- `POST /api/contact` → Submit contact form
- `GET /AR-Resume_2026.pdf` → Download resume

## ✅ Status

- ✅ Server running on port 8000
- ✅ PostgreSQL running
- ✅ Static files configured
- ✅ Contact form with phone field
- ✅ Database integration ready

**Your portfolio is ready for testing!** 🎉
