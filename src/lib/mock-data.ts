export type Environment = "staging" | "prod";

export type EvidenceSourceType = "github_actions" | "kubernetes";

export type IncidentStatus = "open" | "investigating" | "resolved";

export interface Service {
  id: string;
  name: string;
  description: string;
  environment: Environment;
  evidenceSources: EvidenceSourceType[];
  createdAt: string;
}

export interface Incident {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  status: IncidentStatus;
  startedAt: string;
  resolvedAt?: string;
}

export const services: Service[] = [
  {
    id: "svc-01",
    name: "payments-api",
    description: "Payment processing API that handles card tokens, charges, and refunds.",
    environment: "staging",
    evidenceSources: ["github_actions", "kubernetes"],
    createdAt: "2026-09-01T08:00:00Z",
  },
  {
    id: "svc-02",
    name: "order-service",
    description: "Orchestrates order lifecycle from cart creation through fulfillment.",
    environment: "prod",
    evidenceSources: ["github_actions"],
    createdAt: "2026-08-15T10:30:00Z",
  },
];

export const incidents: Incident[] = [
  {
    id: "inc-101",
    serviceId: "svc-01",
    title: "Latency spike after deploy",
    description: "p99 latency on /charge jumped immediately following a GitHub Actions deploy to staging.",
    status: "investigating",
    startedAt: "2026-09-08T14:23:00Z",
  },
  {
    id: "inc-102",
    serviceId: "svc-02",
    title: "Checkout flow timeout",
    description: "Order service pods restarted during a Kubernetes rollout, causing checkout timeouts.",
    status: "resolved",
    startedAt: "2026-09-05T09:10:00Z",
    resolvedAt: "2026-09-05T11:45:00Z",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getIncidentById(id: string): Incident | undefined {
  return incidents.find((i) => i.id === id);
}
