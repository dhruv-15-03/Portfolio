/**
 * Certifications data — single source of truth.
 *
 * Only issuer-linked credentials are listed: Microsoft Learn
 * (learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials) and
 * Oracle University (catalog-education.oracle.com certview). Every entry has a
 * `verifyUrl` on the issuer's own domain so a recruiter can check it in one
 * click. Courses, micro-credentials and claims without an issuer trace are
 * intentionally not published.
 *
 * Sorted by relevance: Expert → Professional → Associate.
 */
export const certifications = [
  // ───────── Tier 0: Expert ─────────
  {
    id: "ms-devops-engineer-expert",
    title: "DevOps Engineer Expert",
    fullTitle: "Microsoft Certified: DevOps Engineer Expert",
    issuer: "Microsoft",
    category: "DevOps",
    tier: "Expert",
    issued: "Jun 2026",
    expires: "Jun 2027",
    credentialId: "15232FDF5A2674BF",
    skills: ["CI/CD pipelines", "Infrastructure as Code", "Source control", "Release management", "Security & compliance", "Monitoring & feedback"],
    verifyUrl: "https://learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials/15232FDF5A2674BF",
    accent: "blue",
  },

  // ───────── Tier 1: Professional ─────────
  {
    id: "ms-fabric-data-engineer",
    title: "Fabric Data Engineer Associate",
    fullTitle: "Microsoft Certified: Fabric Data Engineer Associate",
    issuer: "Microsoft",
    category: "Data & Analytics",
    tier: "Professional",
    issued: "May 2026",
    expires: "Jun 2027",
    credentialId: "B7BB3B3C21009662",
    skills: ["Implement analytics solutions", "Ingest & transform data", "Monitor & optimize"],
    verifyUrl: "https://learn.microsoft.com/en-us/users/DhruvRastogi-8812/credentials/B7BB3B3C21009662",
    accent: "blue",
  },
  {
    id: "ms-azure-developer-associate",
    title: "Azure Developer Associate",
    fullTitle: "Microsoft Certified: Azure Developer Associate (AZ-204)",
    issuer: "Microsoft",
    category: "Cloud",
    tier: "Professional",
    issued: "Jun 2026",
    expires: "Jun 2027",
    credentialId: "9BB8186609EA699E",
    skills: ["Azure compute (Functions, App Service, AKS)", "Azure storage & Cosmos DB", "Identity & authentication", "Monitoring & APM", "Integrate Azure services"],
    verifyUrl: "https://learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials/9BB8186609EA699E",
    accent: "blue",
  },
  {
    id: "ms-sql-ai-developer-associate",
    title: "SQL AI Developer Associate",
    fullTitle: "Microsoft Certified: SQL AI Developer Associate",
    issuer: "Microsoft",
    category: "AI / ML",
    tier: "Professional",
    issued: "Jun 2026",
    expires: "Jun 2027",
    credentialId: "975C892A28FBCBF8",
    skills: ["SQL + AI integration", "Vector embeddings in SQL", "RAG with SQL Server", "AI-powered queries", "Semantic search"],
    verifyUrl: "https://learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials/975C892A28FBCBF8",
    accent: "blue",
  },
  {
    id: "ms-azure-ai-apps-agents-developer",
    title: "Azure AI Apps and Agents Developer Associate",
    fullTitle: "Microsoft Certified: Azure AI Apps and Agents Developer Associate",
    issuer: "Microsoft",
    category: "AI / ML",
    tier: "Professional",
    credentialId: "DBD73F57A96F2B97",
    verifyUrl: "https://learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials/DBD73F57A96F2B97",
    accent: "blue",
  },
  {
    id: "ms-agentic-ai-business-solutions-architect",
    title: "Agentic AI Business Solutions Architect",
    fullTitle: "Microsoft Certified: Agentic AI Business Solutions Architect",
    issuer: "Microsoft",
    category: "AI / ML",
    tier: "Professional",
    credentialId: "12ABC462784A3CFD",
    verifyUrl: "https://learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials/12ABC462784A3CFD",
    accent: "blue",
  },
  {
    id: "oci-genai-pro",
    title: "OCI 2025 Generative AI Professional",
    fullTitle: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    category: "AI / ML",
    tier: "Professional",
    issued: "Sep 2025",
    expires: "Sep 2027",
    skills: ["LLMs", "OCI Generative AI Service", "RAG", "LangChain", "Vector search"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=6E9005551A48E4EE758BDF45BC79BEFB6DB82811CEBD94D2A6C94C14221146A9",
    accent: "red",
  },
  {
    id: "oci-developer-pro",
    title: "OCI 2025 Developer Professional",
    fullTitle: "Oracle Cloud Infrastructure 2025 Certified Developer Professional",
    issuer: "Oracle",
    category: "Cloud Native",
    tier: "Professional",
    issued: "Aug 2025",
    expires: "Aug 2027",
    skills: ["Cloud-native apps", "Microservices", "Serverless", "Containerization"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=0D0134329E44B9575236F6708129858A4A578E7C8C9927F244F2ACE3884FFE63",
    accent: "red",
  },
  {
    id: "oci-devops-pro",
    title: "OCI 2025 DevOps Professional",
    fullTitle: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle",
    category: "DevOps",
    tier: "Professional",
    issued: "Aug 2025",
    expires: "Aug 2027",
    skills: ["IaC", "CI/CD", "Container orchestration", "DevSecOps", "Observability"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=954D0F7F7232FCD5668AF9448120322E8CFC8F1CC8D2FEA815BB20C8C162AEE1",
    accent: "red",
  },
  {
    id: "oci-observability-pro",
    title: "OCI 2025 Observability Professional",
    fullTitle: "Oracle Cloud Infrastructure 2025 Certified Observability Professional",
    issuer: "Oracle",
    category: "DevOps",
    tier: "Professional",
    issued: "Sep 2025",
    expires: "Sep 2027",
    skills: ["Monitoring & alarms", "Log analytics", "APM", "Root-cause analysis"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=DB408B153BFCBD8D01E328E598D3F7A45AA0F65C8B3F579100BA99BB8E40E4DD",
    accent: "red",
  },
  {
    id: "ms-github-copilot",
    title: "GitHub Copilot",
    fullTitle: "GitHub Copilot Certification",
    issuer: "Microsoft / GitHub",
    category: "AI / ML",
    tier: "Professional",
    issued: "Oct 2025",
    expires: "Oct 2027",
    credentialId: "92F6F6C829D27E19",
    skills: ["Prompt engineering", "Responsible AI", "Developer productivity"],
    verifyUrl: "https://learn.microsoft.com/en-us/users/dhruvrastogi-8812/credentials/92f6f6c829d27e19",
    accent: "purple",
  },

  // ───────── Tier 2: Associate ─────────
  {
    id: "oci-ai-foundations",
    title: "OCI 2025 AI Foundations Associate",
    fullTitle: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    category: "AI / ML",
    tier: "Associate",
    issued: "Sep 2025",
    expires: "Sep 2027",
    skills: ["AI/ML fundamentals", "Generative AI", "OCI AI services"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=15037D91501182CC9311C287BA2AE21B9E27FA9D1BCB0F425438189116E450E3",
    accent: "red",
  },
  {
    id: "oci-foundations",
    title: "OCI 2025 Foundations Associate",
    fullTitle: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    category: "Cloud",
    tier: "Associate",
    issued: "Sep 2025",
    expires: "Sep 2027",
    skills: ["Cloud concepts", "Core OCI services", "Security & identity", "Cost management"],
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=67E1B8227654ADBF8D20463CF086EC759BD7DB1F6C0DB403AC1CC50EF8AC4827",
    accent: "red",
  },
];

/** Issuer → display config (logo letter, hex). Used by the card avatar. */
export const issuerStyle = {
  "Microsoft":               { mark: "MS", color: "#00a4ef" },
  "Microsoft / GitHub":      { mark: "GH", color: "#9b8cff" },
  "Oracle":                  { mark: "OR", color: "#f80000" },
};

/** Group certifications by tier for the page layout. */
export function groupByTier() {
  const groups = { Expert: [], Professional: [], Associate: [], Course: [], Micro: [] };
  certifications.forEach((c) => groups[c.tier].push(c));
  return groups;
}

const PROFESSIONAL_CLAIM_TIERS = new Set(["Expert", "Professional", "Associate"]);

export function certVerificationStatus(cert) {
  if (cert.verificationStatus) return cert.verificationStatus;
  return PROFESSIONAL_CLAIM_TIERS.has(cert.tier) ? "verified" : "supplemental";
}

/** Aggregate stats for the hero panel. */
export function certStats() {
  const claims = certifications.filter((c) => PROFESSIONAL_CLAIM_TIERS.has(c.tier));
  const verified = claims.filter((c) => certVerificationStatus(c) === "verified");
  const pros  = certifications.filter((c) => c.tier === "Professional" || c.tier === "Expert").length;
  const issuers = new Set(verified.map((c) => c.issuer)).size;
  return {
    total: claims.length,
    verified: verified.length,
    pros,
    issuers,
  };
}
