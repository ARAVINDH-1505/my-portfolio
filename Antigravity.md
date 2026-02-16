# Machine Learning Engineer – Personal Portfolio

## Purpose

This project is a single-page professional portfolio website for a Machine Learning
Engineer with applied research experience. The portfolio is intended for recruiters,
research collaborators, and technical peers to quickly evaluate my background, skills,
projects, and achievements.

The site emphasizes clarity, technical depth, and real-world impact rather than
flashy visuals or blog-style presentation.


---

## Design Philosophy

- Clean, modern, and professional
- Research and ML-focused tone
- Clear information hierarchy
- Subtle animations only (scroll, hover, transitions)
- Fully responsive and accessible

### Constraints

- Do not copy any text, colors, or layout from reference sites
- Avoid flashy animations or decorative UI
- No unnecessary dependencies
- Single-page layout with smooth scrolling
- Content-driven design


---

## Reference Inspiration (Structure Only)

Inspired by the information architecture and professional density of:
https://raafiriyaz.com/

This inspiration is limited to:
- Section ordering
- Content hierarchy
- Professional tone

No visual or textual duplication is permitted.


---

## Core Sections & Content Schema

### 1. Hero Section

Purpose: Immediate clarity for recruiters and collaborators.

Content:
- Full Name
- Role: “Machine Learning Engineer — Applied AI & Research”
- 2–3 line professional summary
- Call-to-action buttons:
  - View CV
  - GitHub
  - LinkedIn
  - Email


---

### 2. About / Profile

Short professional bio highlighting:
- ML engineering background
- Research experience
- Interests in medical imaging, cybersecurity ML, reinforcement learning, and applied AI

Structured profile panel:
- Current role
- Years of experience
- Domains worked in
- Primary tech stack
- Research and engineering interests
- Languages


---

### 3. Skills (Derived from Projects)

Skills must reflect **hands-on usage**, not theoretical exposure.

#### Core Programming
- Python, C
- SQL (PostgreSQL)(MySQL)
- Java(basic)

#### Machine Learning & AI
- Supervised & Unsupervised Learning
- Feature Engineering & Scaling
- Model Evaluation (Precision, Recall, F1, ROC-AUC)
- Bayesian Hyperparameter Optimisation
- Ensemble Methods
- core mathematics of the machine learning algorithms 

### Reinforcement Learning
- Deep Q-Networks (DQN)
- Tabular Q-learning

#### Deep Learning
- PyTorch
- TensorFlow / Keras
- scikitlearn
- CNN Architectures
- Transfer Learning
- Custom Activation Functions
- Federated Learning


#### Computer Vision
- Medical Image Classification
- Image Segmentation
- OpenCV
- Sliding Window Inference
- Data Augmentation

#### Explainable AI
- SHAP
- LIME
- Grad-Cam and saliency mapping
- Model Interpretability & Failure Analysis

#### NLP & LLMs
- BERT-based Text Classification
- Feature Fusion (VADER + embeddings)
- Prompt Engineering
- LLM Fine-tuning (basics)

#### Deployment & MLOps
- FastAPI / REST APIs
- Docker (baseline model deployment)
- MLflow (basic)
- Git & GitHub

and having skills in Data structures and algorithms
---

### 4. Experience

**Machine Learning Research Analyst**  
Data Conquest Research Hub, Coimbatore, India  
Mar 2024 – Present

- Designed end-to-end ML pipelines for healthcare imaging and cybersecurity datasets
- Applied SHAP and LIME for interpretability and model diagnostics
- Performed feature engineering, ablation studies, and Bayesian optimization
- Handled class imbalance and threshold tuning
- Maintained reproducible, publication-ready research workflows


---

### 5. Projects & Timeline (Chronological)

#### Oct 2024 – Dec 2024  
**Skin Cancer Prediction using Explainable AI**  
(National Conference Publication)

- Built multi-class CNN models for dermoscopic image classification
- Integrated SHAP and LIME for pixel-level and feature-level explanations
- Improved malignant-class recall
- Achieved ~91% classification accuracy


#### Jan 2025 – Apr 2025  
**Malware Detection via Dynamic Algorithmic Configuration**  
IEEE IDCIoT 2025  
DOI: 10.1109/IDCIOT64235.2025.10914737

- Designed a federated learning-based malware detection framework
- Implemented adaptive algorithm configuration
- Reduced false positives using ensemble classifiers
- Achieved ~98% detection accuracy


#### May 2025  
**MNIST Classification – Dockerized Deployment**

- Built a baseline CNN model for MNIST classification
- Dockerized the trained model
- Deployed as a containerized inference service
- Focused on reproducible ML deployment workflow


#### Jun 2025  
**IPL Match Outcome & Player Performance Prediction**

- Built a hybrid ML system using PyTorch MLP and XGBoost
- Predicted individual player runs and wickets
- Simulated full match outcomes and win probabilities
- Implemented ensemble averaging for robust predictions
- Developed an interactive Plotly dashboard for visualization


#### Jul 2025  
**Reinforcement Learning: Tic Tac Toe Agent (DQN)**

- Implemented Q-learning and Deep Q-Network approaches
- Enabled self-learning through gameplay
- Applied reward shaping and policy improvement


#### Aug 2025  
**House Price Prediction with REST API Deployment**

- Built regression models for price prediction
- Exposed inference via REST API
- Focused on clean API design and deployment


#### Sep 2025  
**CAPTCHA Recognition System**

- Implemented CAPTCHA recognition using OpenCV and deep learning
- Focused on image preprocessing and character extraction


#### Oct 2025  
**Spotify Analytics Dashboard**

- Integrated Spotify API
- Built analytics dashboards using MySQL-backed data
- Visualized user and track-level insights


---

### 6. Achievements & Engagements

- IEEE Conference Paper – IDCIoT 2025
- National Conference Paper on Explainable AI
- Speaker: Google DevFest 2023, Madurai
- Participant: E-Summit 2023, IIT Madras
- Co-organiser: ARTIFEST 2023, AI Symposium
- Solved 90+ LeetCode problems
- Completed 700+ Skillrack programming challenges


---

### 7. Certifications & Education

**B.Tech – Artificial Intelligence and Machine Learning**  
M. Kumarasamy College of Engineering (2021–2025)  
CGPA: 8.21

Certifications:
- Google Cloud Associate Cloud Engineer
- AWS Cloud Fundamentals
- Oracle OCI AI Foundations Associate
- NPTEL: Data Analytics with Python
- ICT Learnathon: Machine Learning


---

### 8. Contact & Backend Integration

This portfolio includes a backend service to store contact messages.

Collected fields:
- Name
- Email
- Optional phone number
- Message
- Timestamp

Data is stored securely in a PostgreSQL database via a backend API.


---

## Backend Technology (Planned)

- Backend: FastAPI (Python)
- Database: PostgreSQL
- ORM: SQLAlchemy
- Validation: Pydantic


---

## AI Assistance Rules

AI tools may:
- Generate UI components and layouts
- Refactor code
- Populate sections using the defined schema

AI tools must NOT:
- Alter project timelines
- Invent skills or experience
- Change design philosophy
- Add unnecessary features
