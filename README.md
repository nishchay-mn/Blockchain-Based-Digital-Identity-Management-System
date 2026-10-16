# TrustID — Blockchain-Based Digital Identity Management System

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-GitHub_Pages-22c55e.svg?logo=github&logoColor=white)](https://nishchay-mn.github.io/Blockchain-Based-Digital-Identity-Management-System/)
[![BCA Major Project](https://img.shields.io/badge/Project-BCA%20Major%20Project-blue.svg)](https://github.com/nishchay-mn/Blockchain-Based-Digital-Identity-Management-System)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 🌐 **Live Website:** [https://nishchay-mn.github.io/Blockchain-Based-Digital-Identity-Management-System/](https://nishchay-mn.github.io/Blockchain-Based-Digital-Identity-Management-System/)  
> **Decentralized, Self-Sovereign Digital Identity & Verifiable Credential Platform**  
> *Developed as a Final Year BCA Major Project.*

---

## 📌 1. Project Abstract

Traditional digital identity management systems rely on centralized databases (such as university portals or government registries), which represent single points of failure vulnerable to massive data breaches, unauthorized surveillance, and credential forgery. Paper degrees and static PDF certificates are trivial to tamper with using basic digital editing software.

**TrustID** is a decentralized digital identity management system implementing **W3C Decentralized Identifiers (DID)** and **Verifiable Credentials (VC)** principles. In TrustID:
1. **Zero Personally Identifiable Information (PII) is stored on-chain**: Private student/citizen records remain in secure off-chain storage.
2. **Cryptographic Hash Commitments**: Only 32-byte cryptographic commitments (SHA-256) and issuer digital signatures (ECDSA `secp256k1`) are anchored to the blockchain registry.
3. **Instant Mathematical Verification**: Modifying even a single character (e.g. altering a CGPA from 8.2 to 9.9) completely flips the calculated cryptographic hash, instantly failing blockchain verification.
4. **Selective Disclosure & Consent**: Identity holders can choose which claims to disclose when generating sharing QR codes without exposing unneeded private details.

---

## 🚀 2. Key Features

- **4 Role-Based Personas**:
  - **Identity Holder**: Manage DID wallet, view issued degrees/certificates, generate selective sharing QR codes, review verification audit trails.
  - **Credential Issuer**: University/accredited authority console to sign and register academic degrees, certificates, and revoke credentials on-chain.
  - **Verifier Node**: Public verifier portal with QR code scanner, credential ID lookup, and full 6-stage cryptographic verification breakdown.
  - **Governance Admin**: Authorize issuing institutions, monitor credential minting volume, manage identity directory, and inspect security audit logs.
- **Interactive Tamper-Proof Sandbox**:
  - An interactive educational tool allowing examiners to edit credential titles or grades in real time and watch the cryptographic hash mismatch instantly trigger verification rejection.
- **Dynamic Scannable QR Codes**:
  - Encodes only non-sensitive verification tokens (`/verifier/verify?id=...`). Zero raw personal data is leaked in QR codes.
- **1-Click Demo Profile Switcher**:
  - Seamlessly switch between Holder, Issuer, Verifier, and Admin personas with one click during university presentations.
- **Rich Web3 & Cybersecurity Theme**:
  - Sleek dark navy interface (`#070C18`, `#0B1120`, `#1E2E4E`), crisp typography, glassmorphism, Recharts visualization, and responsive mobile layout.

---

## 🛠️ 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18 (Vite Bundler) |
| **Styling & Design** | Tailwind CSS v3, Custom Web3 Glassmorphism |
| **Icons & Visuals** | Lucide React |
| **Data Visualizations** | Recharts (Monthly Verification Volumes) |
| **QR Code Engine** | `qrcode.react` (High-Error Correction SVG) |
| **State & Persistence** | React Context API, LocalStorage (Demo-Only Persistence) |
| **Cryptographic Standards**| SHA-256 Hash Commitments, ECDSA Digital Signatures, W3C DID v1.0 |

---

## 🔑 4. Demo Login Accounts

For local evaluation and demonstration, the application comes pre-loaded with sample accounts and 1-click quick-fill buttons:

| Role | Name | Email | Password | Pre-loaded Records |
| :--- | :--- | :--- | :--- | :--- |
| **Identity Holder** | Rohan Sharma | `rohan.sharma@example.edu` | `password123` | Bachelor of Computer Applications, Blockchain Cert, Campus Pass |
| **Credential Issuer**| Dr. Anita Roy | `registrar@apex.edu` | `password123` | Apex Institute of Technology Authority Key |
| **Verifier** | Sarah Jenkins | `verify@globaltalent.com` | `password123` | Global Talent Recruiting Verification Portal |
| **Admin** | Governance Root | `admin@trustid.network` | `password123` | Root Governance Multisig Node |

> **Development Notice**: This application runs in a simulated demonstration mode with mock credentials and local browser persistence. Do not use real production passwords or private keys.

---

## ⚡ 5. Quick Start & Installation

### Prerequisites
- Node.js (version 18.0.0 or higher)
- npm (version 9.0.0 or higher)

### Installation Steps

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/your-username/trustid-blockchain-digital-identity.git
   cd "Blockchain-Based Digital Identity Management System"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in `dist/`.

---

## 🧪 6. Step-by-Step Demonstration Workflow

Follow these steps to demonstrate the full system during viva/evaluation:

1. **View Digital Identity**:
   - Log in as **Identity Holder** (Rohan Sharma).
   - Go to **My Digital Identity** to inspect the sovereign DID (`did:trustid:...`) and cryptographic keypair specifications.
2. **Review Verifiable Credentials**:
   - Go to **My Credentials** to view the Bachelor of Computer Applications (BCA) degree.
   - Click **Details** to see the canonical SHA-256 hash committed to block `#124102`.
3. **Generate Selective Disclosure QR**:
   - Click **Share Credential**.
   - Check/uncheck claims to demonstrate minimal disclosure privacy.
   - Confirm consent and view the generated scannable QR code.
4. **Issue a New Credential (Issuer Persona)**:
   - Click **Credential Issuer** on the top role bar.
   - Open **Issue New Credential**, enter student name, title, and grade.
   - Click **Sign & Issue Credential** to watch the simulated on-chain block confirmation!
5. **Verify Authenticity (Verifier Persona)**:
   - Click **Verifier Portal** on the top role bar.
   - Click **Test Valid Degree** to run the 6-stage cryptographic verification pipeline.
6. **Demonstrate Tampering Detection**:
   - On the verification result or credential details page, click **Test Tampering**.
   - Alter the title or grade (e.g. change "Bachelor" to "Doctorate" or change CGPA).
   - Watch the recalculation mismatch the immutable on-chain hash, immediately triggering **INVALID / TAMPERING DETECTED**!
7. **Demonstrate Credential Revocation**:
   - Switch to **Credential Issuer** -> **Issued Credentials**.
   - Click **Revoke** on any credential and enter an official revocation reason.
   - Return to **Verifier Portal** and verify that ID — it now reports **REVOKED on-chain** with the exact reason statement!

---

## 📁 7. Project Directory Structure

```
├── dist/                      # Production build output
├── docs/                      # Academic Documentation
│   ├── PROJECT_REPORT.md      # Comprehensive BCA Major Project Academic Report
│   ├── ARCHITECTURE.md        # System Architecture & Mermaid Diagrams
│   └── DEMO_SCRIPT.md         # Viva Presentation Walkthrough Script
├── src/
│   ├── assets/                # Static brand graphics
│   ├── components/            # Reusable UI Components
│   │   ├── CredentialCard.jsx # Credential visual representation
│   │   ├── DataTable.jsx      # Searchable, filterable, paginated data table
│   │   ├── DemoRoleBar.jsx    # 1-click persona switcher bar
│   │   ├── Modal.jsx          # Accessible dialog modal
│   │   ├── Navbar.jsx         # Header navigation
│   │   ├── QRModal.jsx        # Dynamic QR code viewer
│   │   ├── Sidebar.jsx        # Collapsible role-based sidebar
│   │   ├── StatCard.jsx       # Metric card with visual glow
│   │   ├── StatusBadge.jsx    # Status indicators (Verified, Revoked, Expired)
│   │   └── TamperDemoModal.jsx# Interactive tampering sandbox
│   ├── context/               # Global Application State
│   │   ├── AuthContext.jsx    # Authentication & active role management
│   │   ├── DataContext.jsx    # Verification pipeline & credential ledger
│   │   └── ToastContext.jsx   # Floating notifications
│   ├── data/
│   │   └── mockData.js        # Seed credentials, issuers, verifications
│   ├── layouts/
│   │   └── DashboardLayout.jsx# Sidebar + Navbar + Content wrapper
│   ├── pages/                 # Application Screens
│   │   ├── auth/              # Login, Register, Forgot Password
│   │   ├── holder/            # Identity Holder Dashboard (Overview, Identity, Credentials, Share, History, Settings)
│   │   ├── issuer/            # Credential Issuer Dashboard (Overview, Issue, List, Profile)
│   │   ├── verifier/          # Verifier Dashboard (Overview, Verify, QR Scanner, History)
│   │   ├── admin/             # Admin Dashboard (Overview, Issuers, Users, Ledger, Audit Logs)
│   │   ├── AboutPage.jsx      # Project overview and comparative analysis
│   │   ├── HowItWorksPage.jsx # 4-step cryptographic lifecycle guide
│   │   └── LandingPage.jsx    # Public showcase landing page
│   ├── App.jsx                # React Router setup
│   ├── index.css              # Tailwind CSS directives & custom styling
│   └── main.jsx               # React DOM entry point
├── index.html                 # HTML shell with Google Fonts
├── package.json               # NPM scripts and dependencies
├── tailwind.config.js         # Tailwind theme & color extensions
└── vite.config.js             # Vite configuration
```

---

## 🌐 8. Deployment Guide (Vercel / GitHub Pages)

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Framework preset: **Vite** (Build command: `npm run build`, Output directory: `dist`).
5. Click **Deploy**. Your site will be live on a secure HTTPS URL in under a minute!

---

## 🔒 9. Security & Privacy Model

- **Privacy By Design**: No personal names, phone numbers, email addresses, or degree transcripts are ever recorded on-chain.
- **Canonical Serialization**: JSON payloads are canonicalized prior to hashing to ensure deterministic digest generation across different devices.
- **Asymmetric ECDSA Signatures**: Even if a hash is known, only the accredited issuer holding the private signing key can produce a valid signature.

---

## 📜 10. Academic Disclaimer & Future Enhancements

- **Disclaimer**: This is a frontend academic simulation developed for a Bachelor of Computer Applications (BCA) final year project. Blockchain transactions, smart contracts, and cryptographic signing are demonstrated via client-side simulation.
- **Future Enhancements**:
  - Full EVM mainnet / testnet smart contract deployment (Ethereum Sepolia / Polygon).
  - Integration with MetaMask and Web3 wallet extensions.
  - Native zero-knowledge proofs using zk-SNARKs (Circom / SnarkJS) for anonymous age/qualification proofs without revealing values.

---

## 👨‍💻 Author & Project Credits

- **Degree**: Bachelor of Computer Applications (BCA)
- **Project Title**: Blockchain-Based Digital Identity Management System
- **Supervised By**: Department of Computer Science & Information Technology
