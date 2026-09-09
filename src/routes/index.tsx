import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, GitBranch, Boxes, GitCompare } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EACP Pilot — Evidence Correlation for Incidents" },
      {
        name: "description",
        content:
          "EACP Pilot correlates GitHub Actions and Kubernetes evidence to reconstruct operational incidents faster than manual investigation.",
      },
      { property: "og:title", content: "EACP Pilot — Evidence Correlation for Incidents" },
      {
        property: "og:description",
        content:
          "Correlate GitHub Actions and Kubernetes evidence to reconstruct operational incidents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const PILLARS = [
  {
    icon: GitBranch,
    title: "GitHub Actions evidence",
    body: "Workflow runs, deploys, and pipeline changes captured as ordered, timestamped evidence.",
  },
  {
    icon: Boxes,
    title: "Kubernetes evidence",
    body: "Rollouts, restarts, and config drift observed alongside the change that caused them.",
  },
  {
    icon: GitCompare,
    title: "Measured against manual",
    body: "Every reconstruction is scored on time, evidence found, and unresolved connections.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" aria-hidden />
            <span className="text-sm font-semibold tracking-tight">EACP Pilot</span>
          </div>
          <Button asChild size="sm" variant="secondary">
            <Link to="/auth">Investigator sign in</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Evidence correlation · Incident reconstruction
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          See exactly which operational change caused the incident.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">
          EACP Pilot ingests change evidence from GitHub Actions and Kubernetes, correlates it into a
          single incident timeline, and measures the result against manual investigation.
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild>
            <Link to="/auth">Open the console</Link>
          </Button>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="rounded-lg border border-border bg-card p-6">
              <pillar.icon className="size-5 text-primary" aria-hidden />
              <h2 className="mt-4 text-sm font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
