import {
  certifications,
  certStats,
  certVerificationStatus,
} from "./certifications";

const ISSUER_VERIFIED_IDS = [
  // Microsoft Learn — learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials
  "ms-devops-engineer-expert", // AZ-400
  "ms-azure-developer-associate", // AZ-204
  "ms-fabric-data-engineer", // DP-700
  "ms-sql-ai-developer-associate",
  "ms-azure-ai-apps-agents-developer",
  "ms-agentic-ai-business-solutions-architect",
  "ms-github-copilot",
  // Oracle University — catalog-education.oracle.com certview
  "oci-developer-pro",
  "oci-devops-pro",
  "oci-observability-pro",
  "oci-genai-pro",
  "oci-ai-foundations",
  "oci-foundations",
];

describe("certification truth states", () => {
  test("publishes exactly the 13 issuer-verified credentials", () => {
    const ids = certifications.map((cert) => cert.id).sort();

    expect(ids).toEqual([...ISSUER_VERIFIED_IDS].sort());
    expect(certStats()).toEqual(
      expect.objectContaining({
        total: 13,
        verified: 13,
        issuers: 3,
      })
    );
  });

  test("every published credential is verified on the issuer's own domain", () => {
    certifications.forEach((cert) => {
      expect(certVerificationStatus(cert)).toBe("verified");
      expect(cert.verificationStatus).toBeUndefined();
      expect(cert.verifyUrl).toMatch(
        /^https:\/\/(learn\.microsoft\.com\/en-us\/users\/dhruvrastogi-8812\/credentials\/|catalog-education\.oracle\.com\/pls\/certview\/sharebadge\?id=)/i
      );
    });
  });

  test("keeps DP-700 attached to the verified Fabric Data Engineer credential", () => {
    const credential = certifications.find(
      (cert) => cert.credentialId === "B7BB3B3C21009662"
    );

    expect(credential.title).toBe("Fabric Data Engineer Associate");
    expect(certVerificationStatus(credential)).toBe("verified");
  });

  test("includes the two audited Microsoft credentials as verified claims", () => {
    const expected = [
      {
        credentialId: "DBD73F57A96F2B97",
        fullTitle:
          "Microsoft Certified: Azure AI Apps and Agents Developer Associate",
        verifyUrl:
          "https://learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials/DBD73F57A96F2B97",
      },
      {
        credentialId: "12ABC462784A3CFD",
        fullTitle:
          "Microsoft Certified: Agentic AI Business Solutions Architect",
        verifyUrl:
          "https://learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials/12ABC462784A3CFD",
      },
    ];

    expected.forEach((claim) => {
      const credential = certifications.find(
        (cert) => cert.credentialId === claim.credentialId
      );

      expect(credential).toEqual(expect.objectContaining(claim));
      expect(certVerificationStatus(credential)).toBe("verified");
    });
  });

  test("does not publish courses or micro-credentials", () => {
    const supplemental = certifications.filter((cert) =>
      ["Course", "Micro"].includes(cert.tier)
    );

    expect(supplemental).toHaveLength(0);
  });
});