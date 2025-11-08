#  **SENTRA**

##  **Challenge Statement(s) Addressed**

* How might we use AI to protect small public water systems without requiring IT staff or cloud access?
* How might we bring AI-powered anomaly detection to rural infrastructure where connectivity is limited and stakes are high?
* How might we make AI cybersecurity accessible to small communities?

---

##  **Project Description**

**Sentra** is an AI-powered anomaly detection platform designed to protect small public water systems from cyber threats.
It runs **locally on edge devices**, fusing **OT (Operational Technology)** and **IT (Information Technology)** telemetry to detect suspicious behavior even in **low-connectivity** environments.

With **grant-aligned pricing**, **plug-and-play setup**, and **out-of-band alerting**, Sentra empowers rural operators to respond to cyber-physical risks **without needing cloud access or cybersecurity expertise.**

---

##  **Project Value**

Sentra targets **small public water systems**, particularly those in **rural and underserved communities** with limited IT staff and aging infrastructure.
Traditional cybersecurity systems are often unaffordable and require connectivity or skilled personnel — Sentra bridges this gap by offering:

* AI-powered **anomaly detection**
* **Real-time alerts** and risk indices
* **Public dashboards** that run locally
* **Zero cloud dependency**
* **Grant-aligned affordability**

This approach reduces downtime, improves response readiness, and strengthens the resilience of public utilities.

---

##  **Tech Overview**

 Layer | Stack |
|:--|:--|
| **Frontend** | React + TypeScript + Vite + Firebase Auth |
| **Backend** | Node.js + Express + SQLite + FastAPI |
| **Machine Learning** | Random Forest Ensemble (AUC = 0.991) |
| **APIs** | OpenAI GPT-4, Firebase, Custom REST |
| **Design** | Dark mode, gradients, glassmorphism, responsive |
| **Security** | Firebase Auth + SMS MFA + reCAPTCHA |

---

##  **Machine Learning Overview**

### **Model**

* **Algorithm:** Random Forest Classifier (Scikit-learn)
* **Model File:** `random_forest_model.pkl` (177 KB)
* **Performance:**

  * **AUC:** 0.991
  * **F1 Score:** 0.883
* **Architecture:**

  * Ensemble with *Autoencoder (25%)* and *LSTM (40%)*
  * Balanced hybrid for both IT and OT signals

### **Features (145 total)**

Monitored features span both **cyber** and **physical** parameters:

* Tank levels *(L_T1–T7)*
* Pump flows *(F_PU1–PU11)* and status *(S_PU1–PU11)*
* Valve data *(F_V2, S_V2)*
* Pressure sensors (~40 junction points)
* IT metrics *(login attempts, network anomalies)*
* Chemical and quality readings *(pH, chlorine, turbidity, etc.)*

### **Pipeline Components**

* **feature_scaler.pkl** → Normalizes all 145 features
* **feature_names.pkl** → Ensures feature order consistency
* **model_metadata.json** → Metadata for training and versioning

### **Inference Service**

* **Framework:** Python FastAPI
* **Script:** `ml-inference-service.py` (104 lines)
* Provides Real-time anomaly detection
* Model serving endpoint

---

##  **System Architecture**

```
┌─────────────────────┐
│ React Frontend      │  →  User Dashboards
│ (TypeScript + Vite) │
└────────┬────────────┘
         │ REST API
         ▼
┌─────────────────────┐
│ Node.js Backend     │  →  Business Logic
│ (Express + TS)      │
└─────┬───────────────┘
      │
      ├─→ SQLite (Issues, Notifications)
      ├─→ Python ML Service (FastAPI)
      │     └─→ Random Forest Model (.pkl)
      └─→ Firebase + OpenAI APIs
```

---

##  **Data Flow**

```
Sensors / Simulated Data
        ↓
water-data.service.ts
        ↓
operator-data-mapper.ts (145 features)
        ↓
Random Forest Model → Anomaly Score
        ↓
Risk Assessment → Incident Classification
        ↓
Frontend Dashboards (Admin & Community)
        ↓
Notifications (Email / Push / In-App)
```

---

##  **Backend Summary**

* **Node.js + Express + TypeScript**
* **SQLite Database** for issues, preferences, and notifications
* **Service Architecture:**

  * `operator-data.service.ts` – Handles OT/IT telemetry (493 lines)
  * `operator-ml.service.ts` – ML model integration
  * `notification-monitor.service.ts` – Alerts and status updates
  * `community-issues.service.ts` – Public issue tracking
  * `email.service.ts` – Email alert dispatch

---

##  **Frontend Summary**

* **Frameworks:** React 18 + TypeScript + Vite
* **Auth:** Firebase Auth (Google OAuth + SMS MFA)
* **Design:** Responsive dark theme with glassmorphism and gradients
* **Hooks:** Custom hooks for data visualization and anomaly tracking
* **Dashboards:**

  * **Admin:** Anomalies, alerts, logs, AI analyst chat
  * **Community:** Water quality, risk index, advisories

---

##  **Security**

* **Firebase Authentication**
* **SMS-Based Multi-Factor Authentication**
* **reCAPTCHA** for bot protection
* **Out-of-band alerting** for critical events

---

##  **Key Features**

1. Real-time anomaly detection (99.1% AUC ML model)
2. Local edge processing – no cloud dependency
3. Predictive analytics for water safety
4. MFA-secured operator access
5. GPT-4-powered AI analyst chatbot
6. Responsive dashboards with live updates
7. Public issue tracking for community transparency

---

##  **Demo Presentation**

 [AAMU Jetsetters Presentation](https://www.canva.com/design/DAG4CyeQGW4/4sSfCAHA_S1LJHvV-ceS0Q/view?utm_content=DAG4CyeQGW4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0a938676b0)

---

##  **School**

**Alabama A&M University**

##  **Team**

**AAMU Jetsetters**

##  **Contributors**

* Thabo Ibrahim Traore – Junior CS Major
* Solomon Agyire – Junior CS Major
* Zizwe MtonGa – Junior CS Major
* OsamwengumwenrO Oni-Ojo – Junior CS Major
* Asia Harris – Junior CS Major

---


##  **Summary**

Sentra unifies **cyber-physical monitoring**, **AI-driven anomaly detection**, and **community transparency** in one edge-deployable system.
It demonstrates how **machine learning (99.1% AUC, 145 features)** can protect **critical infrastructure** in **low-connectivity environments**, advancing resilience for **small public utilities** across the nation.

**Total Lines of Code:** ~15,000+
**Performance:** AUC 0.991 • F1 0.883 • Ensemble RF + AE + LSTM
