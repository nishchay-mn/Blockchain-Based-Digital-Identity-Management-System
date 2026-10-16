# TrustID — System Architecture & Diagram Sources

This document contains architectural diagrams and specification sources for the **Blockchain-Based Digital Identity Management System**.

---

## 1. High-Level System Architecture Diagram

```mermaid
graph TD
    subgraph Users ["Stakeholders"]
        Holder["Identity Holder (Student / Citizen)"]
        Issuer["Credential Issuer (University / Authority)"]
        Verifier["Verifier Node (Employer / Recruiter)"]
        Admin["Governance Admin (Consortium Root)"]
    end

    subgraph FrontendApp ["TrustID React 18 Application Layer"]
        HolderUI["Holder Dashboard & DID Wallet"]
        IssuerUI["Issuer Console & Minting Studio"]
        VerifierUI["Verifier Portal & QR Scanner"]
        AdminUI["Governance & Accreditation Console"]
        
        StateEngine["Central Cryptographic State Engine (DataContext)"]
    end

    subgraph CryptoModule ["Client-Side Cryptographic Engine"]
        KeyManager["DID Keypair Generator (secp256k1)"]
        HashCalc["Canonical SHA-256 Digest Engine"]
        QRGen["Dynamic QR Token Encoder (qrcode.react)"]
        ConsentEngine["Selective Disclosure Consent Manager"]
    end

    subgraph LedgerStorage ["Decentralized Registry (Simulated EVM)"]
        SmartContract["IdentityRegistry.sol Contract State"]
        IssuerMapping["Authorized Issuers Registry"]
        HashLedger["Credential Hash Commitments Ledger"]
        RevocationRegistry["On-Chain Revocation Flags & Expiry"]
    end

    Holder --> HolderUI
    Issuer --> IssuerUI
    Verifier --> VerifierUI
    Admin --> AdminUI

    HolderUI --> StateEngine
    IssuerUI --> StateEngine
    VerifierUI --> StateEngine
    AdminUI --> StateEngine

    StateEngine --> CryptoModule
    StateEngine --> LedgerStorage
```

---

## 2. End-to-End Credential Issuance & Verification Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Holder as Identity Holder
    actor Issuer as Accredited University (Issuer)
    participant TrustID as TrustID Cryptographic Engine
    participant Blockchain as Decentralized Registry
    actor Verifier as Employer / Verifier Node

    %% Registration & DID Creation
    Holder->>TrustID: 1. Generate Asymmetric Keypair (ECDSA)
    TrustID-->>Holder: 2. Return Unique DID (did:trustid:0x71C...)

    %% Issuance Flow
    Issuer->>TrustID: 3. Enter Student Achievement Details & Claims
    TrustID->>TrustID: 4. Canonicalize JSON & Sign with Issuer Private Key
    TrustID->>TrustID: 5. Calculate 32-byte SHA-256 Hash Commitment
    TrustID->>Blockchain: 6. registerCredential(id, hash, validUntil)
    Blockchain-->>TrustID: 7. Confirm Block #124102 & Emit CredentialRegistered
    TrustID-->>Issuer: 8. Issuance Complete Notification
    TrustID-->>Holder: 9. Credential Available in Sovereign Wallet

    %% Presentation & Verification Flow
    Holder->>TrustID: 10. Select Permitted Claims (Selective Disclosure)
    Holder->>TrustID: 11. Authorize Sharing Consent
    TrustID-->>Verifier: 12. Present Scannable QR / Verification Token
    Verifier->>TrustID: 13. Query Credential ID
    TrustID->>TrustID: 14. Recalculate Payload SHA-256 Digest
    TrustID->>Blockchain: 15. getCredential(credentialId)
    Blockchain-->>TrustID: 16. Return (storedHash, issuer, isRevoked, validUntil)
    TrustID->>TrustID: 17. Compare Hashes & Check Revocation/Expiry Flags
    TrustID-->>Verifier: 18. Output Final Report (VERIFIED / INVALID / EXPIRED / REVOKED)
```

---

## 3. Use Case Diagram

```mermaid
graph LR
    subgraph IdentityHolderCases ["Identity Holder Actions"]
        H1["Create DID Profile"]
        H2["View Sovereign Credentials"]
        H3["Perform Selective Disclosure"]
        H4["Generate Sharing QR Code"]
        H5["View Verification History"]
        H6["Test Tampering in Sandbox"]
    end

    subgraph IssuerCases ["Issuer Actions"]
        I1["Apply for Authority Accreditation"]
        I2["Issue Verifiable Credential"]
        I3["Digitally Sign Credential"]
        I4["Commit Hash to Blockchain"]
        I5["Revoke Credential with Reason"]
    end

    subgraph VerifierCases ["Verifier Actions"]
        V1["Scan Credential QR Code"]
        V2["Verify by Credential ID"]
        V3["Inspect 6-Stage Security Checks"]
        V4["Audit Verification History"]
    end

    subgraph AdminCases ["Admin Actions"]
        A1["Review & Authorize Issuers"]
        A2["Monitor Consortium Ledger"]
        A3["Manage Identity Directory"]
        A4["Inspect Security Audit Logs"]
    end

    HolderUser(("Identity Holder")) --> H1
    HolderUser --> H2
    HolderUser --> H3
    HolderUser --> H4
    HolderUser --> H5
    HolderUser --> H6

    IssuerUser(("Issuer")) --> I1
    IssuerUser --> I2
    IssuerUser --> I3
    IssuerUser --> I4
    IssuerUser --> I5

    VerifierUser(("Verifier")) --> V1
    VerifierUser --> V2
    VerifierUser --> V3
    VerifierUser --> V4

    AdminUser(("Governance Admin")) --> A1
    AdminUser --> A2
    AdminUser --> A3
    AdminUser --> A4
```

---

## 4. Data Flow Diagram (DFD Level 1)

```mermaid
graph TD
    P1["1.0 DID Generation"]
    P2["2.0 Credential Canonicalization & Signing"]
    P3["3.0 Blockchain Commitment Registration"]
    P4["4.0 Selective Presentation & QR Encoding"]
    P5["5.0 Multi-Stage Verification Pipeline"]

    D1[("Off-Chain Sovereign Store")]
    D2[("Smart Contract Registry")]
    D3[("Verification Audit Log")]

    U1["Identity Holder"] -->|Registration Info| P1
    P1 -->|Store DID Profile| D1

    U2["Issuer Authority"] -->|Student Claims Data| P2
    P2 -->|Signed Canonical JSON| D1
    P2 -->|32-byte Digest & Validity| P3
    P3 -->|registerCredential()| D2

    U1 -->|Consent & Claim Selection| P4
    D1 -->|Read Selected Claims| P4
    P4 -->|Verification Token URL / QR| U3["Verifier Node"]

    U3 -->|Scan QR / Enter ID| P5
    P5 -->|Read Stored Hash & Revocation State| D2
    P5 -->|Write Verification Log Entry| D3
    P5 -->|Display Result Report| U3
```

---

## 5. Entity Relationship (ER) Data Model

```mermaid
erDiagram
    USER ||--o{ CREDENTIAL : "holds"
    ISSUER ||--o{ CREDENTIAL : "issues"
    CREDENTIAL ||--o{ VERIFICATION_LOG : "is verified in"
    USER ||--o{ AUDIT_LOG : "triggers"

    USER {
        string id PK
        string name
        string email
        string role "holder | issuer | verifier | admin"
        string did "did:trustid:0x..."
        string status "active | suspended"
        string institution
        string studentId
    }

    ISSUER {
        string id PK
        string name
        string category
        string status "APPROVED | PENDING | REJECTED"
        string address "Ethereum Public Address"
        string accreditationProof
        int credentialsIssuedCount
    }

    CREDENTIAL {
        string id PK "CRED-AIT-2025-089"
        string title
        string type
        string recipientDid FK
        string issuerDid FK
        string issueDate
        string expirationDate
        string status "VERIFIED | EXPIRED | REVOKED"
        string credentialHash "SHA-256 Digest"
        string signature "ECDSA Signature"
        int blockNumber
        string revocationReason
    }

    VERIFICATION_LOG {
        string id PK
        string credentialId FK
        string verifierName
        string timestamp
        string status "VERIFIED | EXPIRED | REVOKED | INVALID"
        string resultDetails
    }

    AUDIT_LOG {
        string id PK
        string action
        string actor
        string target
        string timestamp
        string severity "success | warning | danger | info"
        string details
    }
```
