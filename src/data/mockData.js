/**
 * TrustID Mock Data
 * Realistic, fictional sample data for demonstrative digital identity verification.
 * Zero real personal data or production blockchain private keys.
 */

// Simulated cryptographic hash helper
export const generateSimulatedHash = (input) => {
  let hash = 0;
  const str = typeof input === 'string' ? input : JSON.stringify(input);
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hex}e8a49c2b3d1f05781a94b72e4cf90a12e847c5d312948bdf09124a9856`;
};

export const INITIAL_USERS = [
  {
    id: "usr_holder_01",
    name: "Rohan Sharma",
    email: "rohan.sharma@example.edu",
    role: "holder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    did: "did:trustid:0x71C8A9b2345091E45F129a83B61cD513A17B49A0",
    status: "active",
    joinedDate: "2024-08-15",
    phone: "+91 98765 43210",
    institution: "Apex Institute of Technology",
    studentId: "AIT-2021-BCA-104",
    bio: "Final year BCA Student & aspiring decentralized systems engineer.",
  },
  {
    id: "usr_issuer_01",
    name: "Dr. Anita Roy",
    email: "registrar@apex.edu",
    role: "issuer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    organization: "Apex Institute of Technology",
    did: "did:trustid:0x89B45C02a45B789C12E354F1023a94B68c3F12C1",
    walletAddress: "0x89B45C02a45B789C12E354F1023a94B68c3F12C1",
    status: "approved",
    accreditationId: "NAAC-A-GRADE-2023-891",
    joinedDate: "2023-01-10",
  },
  {
    id: "usr_verifier_01",
    name: "Sarah Jenkins",
    email: "verify@globaltalent.com",
    role: "verifier",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
    organization: "Global Talent Recruiting Corp",
    did: "did:trustid:0x34A89C152e89B450A192B45F34E891C023B47891",
    status: "active",
    joinedDate: "2024-03-20",
  },
  {
    id: "usr_admin_01",
    name: "Governance Administrator",
    email: "admin@trustid.network",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    organization: "TrustID Decentralized Identity Consortium",
    did: "did:trustid:0x0000000000000000000000000000000000000001",
    status: "active",
    joinedDate: "2022-01-01",
  },
];

export const INITIAL_CREDENTIALS = [
  {
    id: "CRED-AIT-2025-089",
    title: "Bachelor of Computer Applications (BCA)",
    type: "Degree Certificate",
    issuerName: "Apex Institute of Technology",
    issuerDid: "did:trustid:0x89B45C02a45B789C12E354F1023a94B68c3F12C1",
    recipientName: "Rohan Sharma",
    recipientDid: "did:trustid:0x71C8A9b2345091E45F129a83B61cD513A17B49A0",
    issueDate: "2025-06-20",
    expirationDate: "2035-06-20",
    status: "VERIFIED",
    grade: "First Class with Distinction (CGPA: 9.24)",
    major: "Computer Applications & Decentralized Systems",
    credentialHash: "0xa4f89d123e89bc5612f04e789a12c345d678e901f23456789abcdef012345678",
    signature: "0x98124bdf89e1a23c4d5e6f7890123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef1b",
    blockNumber: 124102,
    transactionHash: "0x789abc123def4567890123456789012345678901234567890123456789012345",
    description: "Conferred upon successful completion of the full three-year undergraduate program in Computer Applications with highest honors.",
    claims: [
      { key: "Degree", value: "Bachelor of Computer Applications" },
      { key: "Department", value: "Faculty of Information Technology" },
      { key: "CGPA", value: "9.24 / 10.0" },
      { key: "Graduation Year", value: "2025" },
      { key: "Accreditation", value: "UGC / AICTE Approved" }
    ],
  },
  {
    id: "CRED-CER-2025-992",
    title: "Certified Blockchain Architect & Smart Contract Developer",
    type: "Professional Certification",
    issuerName: "National Blockchain Skill Council",
    issuerDid: "did:trustid:0x71F32A15b92C849E0124B56C7891A23D45E89012",
    recipientName: "Rohan Sharma",
    recipientDid: "did:trustid:0x71C8A9b2345091E45F129a83B61cD513A17B49A0",
    issueDate: "2025-09-10",
    expirationDate: "2028-09-10",
    status: "VERIFIED",
    grade: "Score: 98% (Honors Distinction)",
    major: "Solidity, Zero-Knowledge Proofs & DID Architecture",
    credentialHash: "0x89bc4512e0912f784e12345d678e901f23456789abcdef012345678a4f89d123",
    signature: "0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef1c",
    blockNumber: 124185,
    transactionHash: "0x123def45678901234567890123456789012345678901234567890123456789ab",
    description: "Advanced certification covering EVM mechanics, security auditing, verifiable credentials, and decentralized identity governance.",
    claims: [
      { key: "Certificate No", value: "NBSC-2025-BCA-992" },
      { key: "Competency", value: "Smart Contract Engineering & DID Protocols" },
      { key: "Practical Labs", value: "120 Hours Hands-on Completed" },
      { key: "Verification Node", value: "NBSC Mainnet Validator #4" }
    ],
  },
  {
    id: "CRED-CAMPUS-2024-41",
    title: "Campus Access & Digital Identity Card (2023-2024)",
    type: "Student ID Card",
    issuerName: "Apex Institute of Technology",
    issuerDid: "did:trustid:0x89B45C02a45B789C12E354F1023a94B68c3F12C1",
    recipientName: "Rohan Sharma",
    recipientDid: "did:trustid:0x71C8A9b2345091E45F129a83B61cD513A17B49A0",
    issueDate: "2023-07-01",
    expirationDate: "2024-06-30", // Past date to test EXPIRED simulation
    status: "EXPIRED",
    grade: "Undergraduate Batch 2021-2024",
    major: "Campus Access & Library Clearance",
    credentialHash: "0x5678e901f23456789abcdef012345678a4f89d123e89bc4512e0912f784e1234",
    signature: "0x23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123451b",
    blockNumber: 118400,
    transactionHash: "0x456789012345678901234567890123456789012345678901234567890123def1",
    description: "Annual university physical premises and digital portal access credential.",
    claims: [
      { key: "Campus Access Level", value: "Student General Tier 1" },
      { key: "Hostel Facility", value: "Block B Resident" },
      { key: "Library Privileges", value: "Full Scholar Access" }
    ],
  },
  {
    id: "CRED-INTERN-2024-082",
    title: "Cyber Defense Systems Research Fellowship",
    type: "Internship Certificate",
    issuerName: "Apex Institute of Technology",
    issuerDid: "did:trustid:0x89B45C02a45B789C12E354F1023a94B68c3F12C1",
    recipientName: "Rohan Sharma",
    recipientDid: "did:trustid:0x71C8A9b2345091E45F129a83B61cD513A17B49A0",
    issueDate: "2024-01-10",
    expirationDate: "2026-01-10",
    status: "REVOKED",
    grade: "Revoked by Institution Authority",
    major: "Network Penetration & Cryptographic Proofs",
    credentialHash: "0x345d678e901f23456789abcdef0123456789a4f89d123e89bc5612f04e789a12",
    signature: "0x6789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567891c",
    blockNumber: 120512,
    transactionHash: "0x9012345678901234567890123456789012345678901234567890123456789abc",
    description: "Issued during the Winter 2024 research cohort.",
    revocationReason: "Administrative revocation: Replaced by accredited University Center of Excellence certification. Superceded on 2025-01-15.",
    revokedAt: "2025-01-15",
    claims: [
      { key: "Cohort", value: "Winter 2024 Research Fellowship" },
      { key: "Status Note", value: "Revocation hash published to on-chain registry" }
    ],
  },
];

export const INITIAL_ISSUERS = [
  {
    id: "iss_01",
    name: "Apex Institute of Technology",
    category: "Higher Education / University",
    status: "APPROVED",
    registeredDate: "2023-01-10",
    address: "0x89B45C02a45B789C12E354F1023a94B68c3F12C1",
    adminContact: "registrar@apex.edu",
    credentialsIssuedCount: 142,
    activeCredentialsCount: 138,
    accreditationProof: "Government Education Board ID: EDU-REG-2020-0491",
  },
  {
    id: "iss_02",
    name: "National Blockchain Skill Council",
    category: "Professional Certification Authority",
    status: "APPROVED",
    registeredDate: "2023-04-18",
    address: "0x71F32A15b92C849E0124B56C7891A23D45E89012",
    adminContact: "accreditation@nbsc.gov.in",
    credentialsIssuedCount: 512,
    activeCredentialsCount: 508,
    accreditationProof: "National Skill Development Corporation #NSDC-BC-89",
  },
  {
    id: "iss_03",
    name: "TechCorp Global Enterprise",
    category: "Corporate Employer",
    status: "PENDING",
    registeredDate: "2026-09-12",
    address: "0x44B12C098eA128B45910A34E781290C34B89210F",
    adminContact: "hr-verify@techcorp.global",
    credentialsIssuedCount: 0,
    activeCredentialsCount: 0,
    accreditationProof: "Corporate CIN: U72200KA2018PTC110092",
  },
  {
    id: "iss_04",
    name: "Metropolis Institute of Medical Sciences",
    category: "Medical & Health Sciences Board",
    status: "PENDING",
    registeredDate: "2026-10-01",
    address: "0x99D812A45C6718E2901B348912C09A7654D21B89",
    adminContact: "dean@metrohealth.ac.in",
    credentialsIssuedCount: 0,
    activeCredentialsCount: 0,
    accreditationProof: "Medical Accreditation Registry #MED-88190",
  },
];

export const INITIAL_VERIFICATIONS = [
  {
    id: "ver_log_01",
    credentialId: "CRED-AIT-2025-089",
    credentialTitle: "Bachelor of Computer Applications (BCA)",
    verifierName: "Sarah Jenkins (Global Talent Recruiting Corp)",
    timestamp: "2026-10-12 14:32:10",
    status: "VERIFIED",
    resultDetails: "All cryptographic signatures valid. Hash matched smart contract record. Issuer authorized. Expiration: 2035-06-20.",
    ipAddress: "192.168.1.45 (Simulated)",
  },
  {
    id: "ver_log_02",
    credentialId: "CRED-CER-2025-992",
    credentialTitle: "Certified Blockchain Architect",
    verifierName: "Sarah Jenkins (Global Talent Recruiting Corp)",
    timestamp: "2026-10-14 09:15:44",
    status: "VERIFIED",
    resultDetails: "Valid certification from National Blockchain Skill Council. Proof verified in block #124185.",
    ipAddress: "192.168.1.45 (Simulated)",
  },
  {
    id: "ver_log_03",
    credentialId: "CRED-CAMPUS-2024-41",
    credentialTitle: "Campus Access & Digital Identity Card",
    verifierName: "Campus Security Checkpoint #2",
    timestamp: "2026-10-15 11:20:05",
    status: "EXPIRED",
    resultDetails: "Credential expired on 2024-06-30. Signature valid but validity window lapsed.",
    ipAddress: "10.0.0.12 (Simulated)",
  },
  {
    id: "ver_log_04",
    credentialId: "CRED-INTERN-2024-082",
    credentialTitle: "Cyber Defense Systems Research Fellowship",
    verifierName: "Accreditation Audit Committee",
    timestamp: "2026-10-15 16:45:00",
    status: "REVOKED",
    resultDetails: "Credential revoked on-chain on 2025-01-15: Superceded by updated curriculum.",
    ipAddress: "172.16.0.4 (Simulated)",
  },
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "aud_01",
    action: "ISSUER_REGISTRATION_SUBMITTED",
    actor: "TechCorp Global Enterprise",
    target: "Issuer Application #iss_03",
    timestamp: "2026-09-12 10:30:00",
    details: "New institution submitted verification accreditation documents.",
    severity: "info",
  },
  {
    id: "aud_02",
    action: "CREDENTIAL_ISSUED_ONCHAIN",
    actor: "Dr. Anita Roy (Apex Institute of Technology)",
    target: "CRED-AIT-2025-089 (Rohan Sharma)",
    timestamp: "2025-06-20 11:45:22",
    details: "Registered credential hash commitment to IdentityRegistry contract block #124102.",
    severity: "success",
  },
  {
    id: "aud_03",
    action: "CREDENTIAL_REVOKED_ONCHAIN",
    actor: "Dr. Anita Roy (Apex Institute of Technology)",
    target: "CRED-INTERN-2024-082",
    timestamp: "2025-01-15 15:10:00",
    details: "Issuer invoked revokeCredential() on smart contract with official reason statement.",
    severity: "warning",
  },
  {
    id: "aud_04",
    action: "SECURITY_INTEGRITY_CHECK",
    actor: "TrustID Automated Daemon",
    target: "IdentityRegistry Merkle Root",
    timestamp: "2026-10-15 00:00:00",
    details: "Zero tampering anomalies detected across 4 registered credentials.",
    severity: "info",
  },
  {
    id: "aud_05",
    action: "TAMPER_ATTEMPT_BLOCKED",
    actor: "Verification Sandbox Engine",
    target: "Sample Hash Integrity Test",
    timestamp: "2026-10-15 18:22:19",
    details: "Simulated tamper detection: payload byte altered, hash mismatch detected.",
    severity: "danger",
  },
];

export const VERIFICATION_ACTIVITY_CHART_DATA = [
  { month: "May", verifications: 42, passed: 39, failedOrRevoked: 3 },
  { month: "Jun", verifications: 68, passed: 64, failedOrRevoked: 4 },
  { month: "Jul", verifications: 95, passed: 88, failedOrRevoked: 7 },
  { month: "Aug", verifications: 130, passed: 122, failedOrRevoked: 8 },
  { month: "Sep", verifications: 185, passed: 174, failedOrRevoked: 11 },
  { month: "Oct", verifications: 240, passed: 228, failedOrRevoked: 12 },
];
