# Academic Major Project Report
## Blockchain-Based Digital Identity Management System

**Degree:** Bachelor of Computer Applications (BCA)  
**Project Title:** Blockchain-Based Digital Identity Management System (TrustID)  
**Academic Year:** 2025–2026  
**Discipline:** Computer Science & Information Technology  

---

### Certificate of Originality
This is to certify that the project entitled **“Blockchain-Based Digital Identity Management System”** is a bona fide record of independent work carried out towards the fulfillment of the requirements for the award of the Degree of **Bachelor of Computer Applications (BCA)**.

---

## 1. Executive Summary & Abstract

In recent years, the rapid digitization of higher education, employment recruitment, and government services has exposed fundamental vulnerabilities in centralized identity management systems. Centralized registries are susceptible to single-point-of-failure vulnerabilities, unauthorized data harvesting, identity theft, and rampant certificate forgery. Traditional verification methods—such as manual paper verification, telephone confirmations, and static digital PDFs—are slow, costly, and easily manipulated using basic graphic editing tools.

This project introduces **TrustID**, a decentralized digital identity management system based on **W3C Decentralized Identifiers (DID)** and **Verifiable Credentials (VC)** architecture. The core innovation lies in separating identity verification from data storage:
1. **Zero Personally Identifiable Information (PII) on-chain**: Private user data (names, contact details, grades, transcripts) is preserved off-chain in sovereign storage.
2. **Cryptographic Commitment Hashes**: Only canonical SHA-256 digests and issuer digital signatures (ECDSA `secp256k1`) are committed to the blockchain registry.
3. **Mathematical Tamper-Proofing**: Any modification of the off-chain credential results in an immediate hash mismatch when compared with the immutable on-chain record, instantly flagging forgery.
4. **Instant Multi-Party Verification**: Verifiers can authenticate credentials in milliseconds via QR codes or unique identifiers without contacting the issuing university.

---

## 2. Problem Statement & Existing System Limitations

### 2.1 The Problem
- **Degree & Certificate Forgery**: According to global education audit surveys, fraudulent academic credentials cost organizations billions annually in unqualified hires and compliance penalties.
- **Centralized Vulnerabilities**: Centralized databases containing citizen data become primary targets for ransomware, insider leaks, and unauthorized surveillance.
- **Privacy Over-Disclosure**: Traditional identity cards (e.g. physical driver's licenses) force users to disclose all information (address, full date of birth) even when only age verification is required.
- **Inefficient Verification Cycles**: Background screening agencies often take 2 to 4 weeks to verify graduation records from universities through manual administrative channels.

### 2.2 Comparison Matrix

| Feature | Centralized Identity (Traditional) | Federated Identity (OAuth/Google) | Decentralized Identity (TrustID) |
| :--- | :--- | :--- | :--- |
| **Control of Identity** | System Administrator | Service Provider | Self-Sovereign (Holder) |
| **Single Point of Failure** | High (Central DB) | High (Provider Servers) | None (Distributed Ledger) |
| **PII Exposure Risk** | High | Medium | Zero On-Chain |
| **Tamper Resistance** | Low (Internal DB access can modify) | Medium | Immutable Cryptographic Math |
| **Selective Disclosure** | Not Supported | Coarse Scopes | Granular Per-Claim Consent |

---

## 3. System Architecture & Methodology

TrustID consists of four primary stakeholder roles interacting across three architectural layers:

```
+-------------------------------------------------------------------------+
|                         APPLICATION PRESENTATION LAYER                  |
|  +-------------------+  +-------------------+  +---------------------+  |
|  |  Identity Holder  |  | Credential Issuer |  |   Verifier Node     |  |
|  |     Dashboard     |  |     Dashboard     |  |  Portal & QR Scanner|  |
|  +-------------------+  +-------------------+  +---------------------+  |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|                         CRYPTOGRAPHIC CLIENT ENGINE                     |
|  - DID Keypair Manager (ECDSA secp256k1)                                |
|  - Canonical JSON Serialization (RFC 8785 standard)                     |
|  - SHA-256 Digest Recalculation Engine                                  |
|  - Dynamic QR Token Encoder & Scannable URL Generator                   |
|  - Selective Disclosure Consent Manager                                 |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|                  DECENTRALIZED REGISTRY LAYER (SIMULATED)               |
|  - IdentityRegistry Smart Contract State                                |
|  - Authorized Issuing Authorities Mapping                               |
|  - Credential Hash Commitment Records                                   |
|  - Real-Time On-Chain Revocation Flags & Expiration Timestamps          |
+-------------------------------------------------------------------------+
```

### 3.1 Mathematical Principles of Tamper Detection

Let $C$ represent the canonical serialized string of a credential:
$$C = \text{Canonicalize}(\{\text{id}, \text{subject}, \text{issuer}, \text{title}, \text{grade}, \text{claims}\})$$

The cryptographic commitment $H$ published to the blockchain is:
$$H = \text{SHA-256}(C)$$

When a holder presents a credential $C'$ for verification:
$$H' = \text{SHA-256}(C')$$

The verification outcome $\mathcal{V}$ is evaluated as:
$$\mathcal{V} = (H' == H) \land (\text{isValidSignature}) \land (\neg \text{isRevoked}) \land (\text{currentTime} \le \text{validUntil})$$

If a fraudster modifies even 1 bit in $C'$, the avalanche effect of the SHA-256 cryptographic hash function produces a drastically different digest ($H' \ne H$), mathematically rejecting the credential.

---

## 4. User Role Specifications

### 4.1 Identity Holder (Subject)
- Create self-sovereign digital profile and generate unique W3C DID (`did:trustid:...`).
- Store issued academic credentials (degrees, diplomas, campus cards).
- Inspect immutable on-chain proof (block number, transaction hash, hash commitment).
- Perform selective disclosure: choose exactly which attributes to share.
- Generate dynamic scannable QR codes with consent confirmation.
- Review transparent history of all third-party verifications.

### 4.2 Credential Issuer (University / Authority)
- Accredited institutional dashboard with authority key.
- Issue new verifiable credentials with custom verifiable claims.
- Cryptographically sign credentials and register canonical hash commitments on-chain.
- Revoke credentials with an official audit reason (e.g. academic misconduct or revision).
- Inspect complete issuance history.

### 4.3 Verifier Node (Employer / Recruiter)
- Instant credential ID lookup and camera QR code scanner.
- Automated 6-stage cryptographic integrity check:
  1. Registry existence check.
  2. Recalculated hash match.
  3. Digital signature check.
  4. Issuer accreditation check.
  5. Revocation status check.
  6. Expiration validity check.
- Forensic report explaining reasons for validity, expiration, or revocation.

### 4.4 Administrator (Consortium Governance)
- Authorize accredited educational institutions and employers.
- Monitor global credential minting and verification statistics.
- Supervise user identity directory.
- Audit security event trail.

---

## 5. Security and Privacy Analysis

1. **Protection Against Data Breaches**: Even if an external attacker intercepts or observes the blockchain ledger, no personal information (names, grades, transcripts) can be extracted, as only one-way cryptographic hashes are stored.
2. **Protection Against Forgery**: Forging a credential requires either generating a SHA-256 collision (computationally infeasible) or stealing the issuer's private signing key.
3. **Protection Against Repudiation**: Once an issuer registers a credential commitment to a confirmed block, they cannot deny having issued it, because their public key is bound to the transaction.
4. **Revocation Integrity**: Once revoked on the smart contract, the revocation status is globally visible to all verifiers immediately.

---

## 6. Testing & Results

The system underwent functional testing covering all target operations:

| Test Case ID | Test Description | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Verify valid student degree (CRED-AIT-2025-089) | Status `VERIFIED`, all 6 checks pass | Status `VERIFIED`, block #124102 confirmed | **PASS** |
| **TC-02** | Verify expired campus pass (CRED-CAMPUS-2024-41) | Status `EXPIRED`, expiration reason displayed | Status `EXPIRED`, validity expired 2024-06-30 | **PASS** |
| **TC-03** | Verify revoked fellowship (CRED-INTERN-2024-082) | Status `REVOKED`, revocation reason shown | Status `REVOKED`, on-chain reason displayed | **PASS** |
| **TC-04** | Tamper with title or grade in sandbox | Hash mismatch, status `INVALID` | Hash mismatch detected, verification rejected | **PASS** |
| **TC-05** | Issue new credential and verify | New ID committed to ledger, verifiable | Confirmed in simulated block, instant verification | **PASS** |
| **TC-06** | Revoke credential from issuer console | Status updates to REVOKED in state | Verifier immediately detects revoked status | **PASS** |
| **TC-07** | Selective disclosure QR code generation | QR contains only non-sensitive token URL | Verified token URL generated, zero PII leaked | **PASS** |

---

## 7. Conclusion & Future Scope

### 7.1 Conclusion
The **Blockchain-Based Digital Identity Management System (TrustID)** successfully proves that decentralized self-sovereign identity principles can eliminate credential fraud, safeguard student privacy, and streamline background verification. By anchoring cryptographic commitments to a decentralized registry rather than storing raw personal data, TrustID achieves both regulatory privacy compliance and mathematical tamper resistance.

### 7.2 Future Enhancements
1. **Zero-Knowledge Proofs (zk-SNARKs)**: Enabling proofs such as "Student CGPA $\ge 8.0$" or "Age $\ge 18$" without revealing the exact numerical value to the verifier.
2. **Mainnet Smart Contract Deployment**: Deploying the Solidity smart contract on public Ethereum Layer-2 networks (such as Polygon or Arbitrum) for production multi-institutional governance.
3. **Hardware Keystore Integration**: Supporting WebAuthn and hardware security tokens (YubiKey) for sovereign key custody on identity holder devices.
