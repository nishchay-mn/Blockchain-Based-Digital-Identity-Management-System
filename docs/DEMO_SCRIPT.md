# TrustID — Live Viva & Project Presentation Script

Use this step-by-step presentation script during your university project viva or external evaluation.

---

## 1. Opening Statement (1 Minute)

> *"Good morning respected examiners. My BCA major project is titled **'Blockchain-Based Digital Identity Management System (TrustID)'**.  
> The core problem we are solving is paper and static PDF degree forgery, as well as the vulnerability of centralized student databases to data leaks.  
> Our solution leverages self-sovereign identity (SSI) and verifiable credentials. We do not store sensitive personal data on the blockchain; instead, we anchor only canonical cryptographic SHA-256 hash commitments and digital signatures to the smart contract. This provides mathematical tamper detection, instant verification, and complete user privacy."*

---

## 2. Live Demo Walkthrough (5–7 Minutes)

### Step 1: The Landing Page & Architecture Overview
1. Show the landing page at `http://localhost:5173/`.
2. Highlight:
   - TrustID brand and cybersecurity dark theme.
   - Live credential preview with the on-chain commitment hash.
   - The 4-step lifecycle: DID Creation → Issuance & Signing → Blockchain Commitment → Instant Verification.

### Step 2: Identity Holder Console (Rohan Sharma)
1. Click **Identity Holder** on the top role bar (or sign in as `rohan.sharma@example.edu`).
2. Show the **Overview** dashboard with metric cards and verification volume graph.
3. Open **My Digital Identity**:
   - Point out the W3C DID string: `did:trustid:0x71C8A9b...`.
   - Explain that this DID is cryptographically derived from an asymmetric keypair (`secp256k1`).
4. Open **My Credentials**:
   - Show the Bachelor of Computer Applications (BCA) card.
   - Click **Details** to show the canonical SHA-256 hash and block confirmation `#124102`.

### Step 3: Selective Disclosure & Dynamic QR Code
1. Click **Share Credential** in the sidebar.
2. Select the BCA degree.
3. Demonstrate **Selective Disclosure**:
   - Check or uncheck claims (e.g. disclose degree name, but hide exact marks if applying for a general role).
   - Check the **Consent Confirmation** box.
4. Show the generated dynamic QR code:
   - Explain to the examiner: *"Notice that this QR code contains only a random verification token URL. Zero raw student records are encoded in the QR, preventing unauthorized data harvesting."*

### Step 4: The Interactive Tamper-Proof Sandbox (Crucial Viva Moment!)
1. Click **Test Tampering** (accessible from the Holder Overview or Credential Details).
2. Edit the title: change *"Bachelor of Computer Applications"* to *"Doctorate of Philosophy"*, or change the CGPA from `9.24` to `9.99`.
3. Show the live comparison matrix:
   - On-chain immutable hash: `0xa4f89d...`
   - Recalculated tampered hash: drastically different!
   - Verdict: **FAILED — TAMPERING DETECTED**.
   - Explain to the examiner: *"Even a 1-bit alteration causes an avalanche effect in SHA-256. The forged document is instantly rejected by the smart contract comparison."*

### Step 5: Credential Issuer Workflow (Apex Institute of Technology)
1. Switch role to **Credential Issuer** using the top bar.
2. Go to **Issue New Credential**:
   - Enter a student name (e.g. *"Pooja Patel"*).
   - Select *"Degree Certificate"*, enter CGPA: *"9.50"*.
   - Point out the live canonical hash calculation on the right panel.
   - Click **Sign & Issue Credential**.
3. Watch the simulated transaction confirm with block number and gas usage!

### Step 6: Verifier Portal (Recruiter Perspective)
1. Switch role to **Verifier Portal**.
2. Click **Test Valid Degree (`CRED-AIT-2025-089`)**:
   - Show the 6/6 green checkmarks in the cryptographic integrity pipeline:
     1. Registry existence: Found.
     2. Recalculated hash: 100% match.
     3. Digital signature: Valid.
     4. Authorized issuer: Apex Institute of Technology confirmed.
     5. Revocation status: Active.
     6. Expiration check: Valid until 2035.
3. Now test the preset **Test Revoked Credential (`CRED-INTERN-2024-082`)**:
   - Show that it immediately displays **REVOKED on-chain** with the official reason statement.

### Step 7: Governance Administrator
1. Switch to **Governance Admin**.
2. Go to **Issuer Approvals**:
   - Show how pending universities or corporate employers can be authorized or rejected with live state changes and audit events.
3. Open **Security Audit Logs** to show the complete immutable event trail.

---

## 3. Likely Viva Questions & Model Answers

### Q1: "Why not store the entire student certificate or PDF directly on the blockchain?"
> **Answer:** *"Storing files or PII on a public blockchain violates privacy regulations such as GDPR (the right to be forgotten) and creates an unencrypted data honeypot. Furthermore, storing kilobytes of data on-chain requires massive gas fees. By storing only a 32-byte SHA-256 hash, we achieve 100% tamper resistance and mathematical verification while keeping all private data safe in off-chain sovereign storage."*

### Q2: "What prevents someone from registering a fake degree on your smart contract?"
> **Answer:** *"The smart contract enforces role-based access control (`onlyAuthorizedIssuer` modifier). Only addresses authorized by the administrator can invoke `registerCredential()`. Additionally, verifiers validate the issuer's ECDSA digital signature against the authorized institution's registered public key."*

### Q3: "What happens if a university mistakenly issues a degree or revokes it?"
> **Answer:** *"The issuing authority invokes the `revokeCredential()` method on the smart contract. This updates the boolean flag `isRevoked = true` and records the official revocation reason. Any verifier checking that credential will immediately receive a REVOKED status in real-time."*

### Q4: "What is selective disclosure and how does it benefit privacy?"
> **Answer:** *"Selective disclosure allows the identity holder to generate a verifiable presentation containing only the subset of claims required for a specific transaction—such as proving they hold an accredited degree without disclosing their birth date, physical address, or unrelated marks."*
