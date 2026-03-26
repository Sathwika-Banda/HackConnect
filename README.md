# HackConnect 🚀

HackConnect is a platform designed to connect developers, match teammates, and collaborate effectively during hackathons.

---

## 📁 Project Structure

```
HackConnect/
│── backend/      # Python backend (APIs, AI matching, Firebase)
│── frontend/     # React + Vite frontend
│── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the repository

```bash
git clone https://github.com/Sathwika-Banda/HackConnect.git
cd HackConnect
```

---

### 🔹 2. Backend Setup (Python)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate environment
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

### 🔹 3. Frontend Setup (React)

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🔐 Environment Variables

⚠️ Important: Sensitive files like Firebase keys are NOT included.

Create a `.env` file in backend and add:

```
FIREBASE_API_KEY=your_key_here
```

(Use your own credentials)

---

## ✨ Features

* 🔍 AI-based teammate matching
* 📄 Resume parsing
* 🔗 GitHub profile analysis
* 💬 Messaging system
* 📊 Dashboard for participants and organizers

---

## 🚫 Ignored Files

The following are excluded for security and size reasons:

* `venv/`
* `node_modules/`
* `.env`
* Firebase JSON keys

---

## 👩‍💻 Author

Sathwika Banda

---

## ⭐ Contributing

Feel free to fork the repo and submit pull requests!

---

## 📜 License

This project is for educational purposes.
