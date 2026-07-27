import {
  certifications,
  certStats,
  certVerificationStatus,
} from "./certifications";

describe("certification truth states", () => {
  test("quarantines exactly the three unsupported professional claims", () => {
    const quarantined = certifications
      .filter((cert) => certVerificationStatus(cert) === "quarantined")
      .map((cert) => cert.id)
      .sort();

    expect(quarantined).toEqual([
      "columbia-ml1",
      "infosys-ai-foundations",
      "ms-fabric-analytics-engineer",
    ]);
    expect(certStats()).toEqual(
      expect.objectContaining({
        total: 20,
        verified: 17,
        quarantined: 3,
      })
    );
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

  test("does not count courses or micro-credentials as verified claims", () => {
    const supplemental = certifications.filter((cert) =>
      ["Course", "Micro"].includes(cert.tier)
    );

    expect(supplemental.length).toBeGreaterThan(0);
    expect(
      supplemental.every(
        (cert) => certVerificationStatus(cert) === "supplemental"
      )
    ).toBe(true);
  });

  test("uses public Credly badge URLs", () => {
    const credlyUrls = certifications
      .map((cert) => cert.verifyUrl)
      .filter((url) => url?.includes("credly.com"));

    expect(credlyUrls.length).toBeGreaterThan(0);
    expect(credlyUrls.every((url) => /credly\.com\/badges\/[^/]+$/.test(url))).toBe(
      true
    );
  });
});
