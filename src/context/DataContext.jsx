import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_CREDENTIALS,
  INITIAL_ISSUERS,
  INITIAL_VERIFICATIONS,
  INITIAL_AUDIT_LOGS,
  generateSimulatedHash,
} from '../data/mockData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Credentials State
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem('trustid_credentials');
    return saved ? JSON.parse(saved) : INITIAL_CREDENTIALS;
  });

  // Issuers State
  const [issuers, setIssuers] = useState(() => {
    const saved = localStorage.getItem('trustid_issuers');
    return saved ? JSON.parse(saved) : INITIAL_ISSUERS;
  });

  // Verifications State
  const [verifications, setVerifications] = useState(() => {
    const saved = localStorage.getItem('trustid_verifications');
    return saved ? JSON.parse(saved) : INITIAL_VERIFICATIONS;
  });

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('trustid_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('trustid_credentials', JSON.stringify(credentials));
  }, [credentials]);

  useEffect(() => {
    localStorage.setItem('trustid_issuers', JSON.stringify(issuers));
  }, [issuers]);

  useEffect(() => {
    localStorage.setItem('trustid_verifications', JSON.stringify(verifications));
  }, [verifications]);

  useEffect(() => {
    localStorage.setItem('trustid_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Issue New Credential (Simulated Blockchain Mint & Hash Registration)
  const issueCredential = useCallback((payload, issuerDetails) => {
    const newId = `CRED-${payload.type?.substring(0, 3).toUpperCase() || 'DOC'}-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const issueDate = new Date().toISOString().split('T')[0];
    const canonicalPayload = {
      id: newId,
      recipientName: payload.recipientName,
      recipientDid: payload.recipientDid,
      type: payload.type,
      title: payload.title,
      grade: payload.grade || 'Satisfactory Completion',
      issuer: issuerDetails?.organization || 'Apex Institute of Technology',
      issueDate,
      expirationDate: payload.expirationDate || '2030-12-31',
      claims: payload.claims || [],
    };

    const simulatedHash = generateSimulatedHash(canonicalPayload);
    const blockNum = 124200 + Math.floor(Math.random() * 150);
    const txHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}bdf912`;

    const newCredential = {
      id: newId,
      title: payload.title,
      type: payload.type,
      issuerName: issuerDetails?.organization || 'Apex Institute of Technology',
      issuerDid: issuerDetails?.did || 'did:trustid:0x89B45C02a45B789C12E354F1023a94B68c3F12C1',
      recipientName: payload.recipientName,
      recipientDid: payload.recipientDid || 'did:trustid:0x71C8A9b2345091E45F129a83B61cD513A17B49A0',
      issueDate,
      expirationDate: payload.expirationDate || '2030-12-31',
      status: 'VERIFIED',
      grade: payload.grade || 'First Class',
      major: payload.major || 'Specialized Program',
      description: payload.description || 'Digitally signed and verifiable academic/professional credential.',
      credentialHash: simulatedHash,
      signature: `0xsig${Math.random().toString(16).substring(2, 12)}1b`,
      blockNumber: blockNum,
      transactionHash: txHash,
      claims: payload.claims?.length ? payload.claims : [
        { key: "Credential Level", value: payload.type },
        { key: "Issuing Node", value: "TrustID Consortium Genesis Node" },
        { key: "Digital Fingerprint", value: simulatedHash.substring(0, 18) + '...' }
      ],
    };

    setCredentials((prev) => [newCredential, ...prev]);

    // Append to Audit Logs
    const auditEntry = {
      id: `aud_${Date.now()}`,
      action: "CREDENTIAL_ISSUED_ONCHAIN",
      actor: issuerDetails?.name || "Credential Issuer",
      target: `${newId} (${payload.recipientName})`,
      timestamp: new Date().toLocaleString(),
      details: `Registered credential hash commitment to IdentityRegistry smart contract (Block #${blockNum}).`,
      severity: "success",
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);

    return newCredential;
  }, []);

  // Revoke Credential
  const revokeCredential = useCallback((credentialId, reason, actorName = "Authorized Issuer") => {
    setCredentials((prev) =>
      prev.map((c) => {
        if (c.id === credentialId) {
          return {
            ...c,
            status: 'REVOKED',
            revocationReason: reason || 'Administrative revocation on-chain.',
            revokedAt: new Date().toISOString().split('T')[0],
          };
        }
        return c;
      })
    );

    const auditEntry = {
      id: `aud_${Date.now()}`,
      action: "CREDENTIAL_REVOKED_ONCHAIN",
      actor: actorName,
      target: credentialId,
      timestamp: new Date().toLocaleString(),
      details: `Revocation state published to smart contract. Reason: ${reason}`,
      severity: "warning",
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  }, []);

  // Verification Pipeline (Simulates cryptographic checks against on-chain hash & issuer registry)
  const verifyCredential = useCallback((credentialId, tamperedData = null, verifierName = "Verifier Portal") => {
    const cred = credentials.find(
      (c) => c.id.trim().toLowerCase() === credentialId.trim().toLowerCase()
    );

    const timestamp = new Date().toLocaleString();

    // 1. Not Found Check
    if (!cred) {
      const result = {
        isValid: false,
        status: 'INVALID',
        credentialId,
        title: 'Unknown Credential',
        issuerName: 'Unknown',
        recipientName: 'Unknown',
        reason: 'Credential identifier was not found in the decentralized registry or local registry cache.',
        checks: {
          idExists: false,
          signatureValid: false,
          hashMatched: false,
          issuerAuthorized: false,
          notRevoked: false,
          notExpired: false,
        },
        timestamp,
      };

      setVerifications((prev) => [
        {
          id: `ver_log_${Date.now()}`,
          credentialId,
          credentialTitle: 'Unregistered Identifier',
          verifierName,
          timestamp,
          status: 'INVALID',
          resultDetails: 'Credential ID does not exist in registry.',
          ipAddress: '192.168.1.1 (Simulated)',
        },
        ...prev,
      ]);

      return result;
    }

    // 2. Tampering Check: If tamperedData is passed and differs from original
    const isTampered = tamperedData !== null && tamperedData !== cred.title && tamperedData !== cred.grade;
    if (isTampered) {
      const calculatedHash = generateSimulatedHash(tamperedData);
      const result = {
        isValid: false,
        status: 'INVALID',
        credentialId: cred.id,
        credential: cred,
        title: cred.title,
        issuerName: cred.issuerName,
        recipientName: cred.recipientName,
        reason: `Cryptographic hash mismatch! Recalculated payload hash (${calculatedHash.substring(0, 16)}...) differs from immutable on-chain record (${cred.credentialHash.substring(0, 16)}...). Tampering detected!`,
        checks: {
          idExists: true,
          signatureValid: false,
          hashMatched: false, // FAILED
          issuerAuthorized: true,
          notRevoked: cred.status !== 'REVOKED',
          notExpired: new Date(cred.expirationDate) >= new Date(),
        },
        timestamp,
      };

      setVerifications((prev) => [
        {
          id: `ver_log_${Date.now()}`,
          credentialId: cred.id,
          credentialTitle: cred.title,
          verifierName,
          timestamp,
          status: 'INVALID',
          resultDetails: 'Tampered payload: Cryptographic hash failed blockchain comparison.',
          ipAddress: '192.168.1.1 (Simulated)',
        },
        ...prev,
      ]);

      return result;
    }

    // 3. Revocation Check
    if (cred.status === 'REVOKED') {
      const result = {
        isValid: false,
        status: 'REVOKED',
        credentialId: cred.id,
        credential: cred,
        title: cred.title,
        issuerName: cred.issuerName,
        recipientName: cred.recipientName,
        reason: `Credential was revoked on-chain by ${cred.issuerName}. Revocation Note: "${cred.revocationReason || 'Administrative revocation on-chain'}" (Effective: ${cred.revokedAt || 'Recorded on-chain'}).`,
        checks: {
          idExists: true,
          signatureValid: true,
          hashMatched: true,
          issuerAuthorized: true,
          notRevoked: false, // FAILED
          notExpired: new Date(cred.expirationDate) >= new Date(),
        },
        timestamp,
      };

      setVerifications((prev) => [
        {
          id: `ver_log_${Date.now()}`,
          credentialId: cred.id,
          credentialTitle: cred.title,
          verifierName,
          timestamp,
          status: 'REVOKED',
          resultDetails: `Revoked: ${cred.revocationReason || 'Invalidated on-chain'}`,
          ipAddress: '192.168.1.1 (Simulated)',
        },
        ...prev,
      ]);

      return result;
    }

    // 4. Expiration Check
    const isExpired = cred.status === 'EXPIRED' || new Date(cred.expirationDate) < new Date();
    if (isExpired) {
      const result = {
        isValid: false,
        status: 'EXPIRED',
        credentialId: cred.id,
        credential: cred,
        title: cred.title,
        issuerName: cred.issuerName,
        recipientName: cred.recipientName,
        reason: `Credential expired on ${cred.expirationDate}. The cryptographic integrity is valid, but the authorization period has ended.`,
        checks: {
          idExists: true,
          signatureValid: true,
          hashMatched: true,
          issuerAuthorized: true,
          notRevoked: true,
          notExpired: false, // FAILED
        },
        timestamp,
      };

      setVerifications((prev) => [
        {
          id: `ver_log_${Date.now()}`,
          credentialId: cred.id,
          credentialTitle: cred.title,
          verifierName,
          timestamp,
          status: 'EXPIRED',
          resultDetails: `Expired on ${cred.expirationDate}. Cryptographic signature was valid.`,
          ipAddress: '192.168.1.1 (Simulated)',
        },
        ...prev,
      ]);

      return result;
    }

    // 5. Success Check (VERIFIED)
    const result = {
      isValid: true,
      status: 'VERIFIED',
      credentialId: cred.id,
      credential: cred,
      title: cred.title,
      issuerName: cred.issuerName,
      recipientName: cred.recipientName,
      reason: 'All checks passed successfully! ECDSA digital signature verified, hash matches on-chain commitment in block #' + (cred.blockNumber || 124102) + ', issuer accreditation verified, and credential is active.',
      checks: {
        idExists: true,
        signatureValid: true,
        hashMatched: true,
        issuerAuthorized: true,
        notRevoked: true,
        notExpired: true,
      },
      timestamp,
    };

    setVerifications((prev) => [
      {
        id: `ver_log_${Date.now()}`,
        credentialId: cred.id,
        credentialTitle: cred.title,
        verifierName,
        timestamp,
        status: 'VERIFIED',
        resultDetails: `Valid credential confirmed via on-chain hash commitment (Block #${cred.blockNumber || 124102}).`,
        ipAddress: '192.168.1.1 (Simulated)',
      },
      ...prev,
    ]);

    return result;
  }, [credentials]);

  // Issuer Approval Actions (Admin)
  const approveIssuer = useCallback((issuerId) => {
    setIssuers((prev) =>
      prev.map((iss) => (iss.id === issuerId ? { ...iss, status: 'APPROVED' } : iss))
    );
    const auditEntry = {
      id: `aud_${Date.now()}`,
      action: "ISSUER_APPLICATION_APPROVED",
      actor: "TrustID Governance Administrator",
      target: `Issuer #${issuerId}`,
      timestamp: new Date().toLocaleString(),
      details: "Institution authorized to issue verifiable credentials to decentralized registry.",
      severity: "success",
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  }, []);

  const rejectIssuer = useCallback((issuerId) => {
    setIssuers((prev) =>
      prev.map((iss) => (iss.id === issuerId ? { ...iss, status: 'REJECTED' } : iss))
    );
    const auditEntry = {
      id: `aud_${Date.now()}`,
      action: "ISSUER_APPLICATION_REJECTED",
      actor: "TrustID Governance Administrator",
      target: `Issuer #${issuerId}`,
      timestamp: new Date().toLocaleString(),
      details: "Accreditation verification rejected due to insufficient compliance documentation.",
      severity: "danger",
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  }, []);

  // Reset to demo defaults
  const resetToDemoDefaults = useCallback(() => {
    localStorage.removeItem('trustid_credentials');
    localStorage.removeItem('trustid_issuers');
    localStorage.removeItem('trustid_verifications');
    localStorage.removeItem('trustid_audit_logs');
    setCredentials(INITIAL_CREDENTIALS);
    setIssuers(INITIAL_ISSUERS);
    setVerifications(INITIAL_VERIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
  }, []);

  return (
    <DataContext.Provider
      value={{
        credentials,
        issuers,
        verifications,
        auditLogs,
        issueCredential,
        revokeCredential,
        verifyCredential,
        approveIssuer,
        rejectIssuer,
        resetToDemoDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
