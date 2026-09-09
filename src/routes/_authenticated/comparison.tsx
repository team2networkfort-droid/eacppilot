import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/comparison")({
  head: () => ({
    meta: [
      { title: "Comparison Dashboard | EACP Pilot" },
      {
        name: "description",
        content: "EACP versus manual investigation metrics: reconstruction time, evidence found, unresolved links.",
      },
      { property: "og:title", content: "Comparison Dashboard | EACP Pilot" },
      {
        property: "og:description",
        content: "EACP versus manual investigation metrics for the pilot evaluation.",
      },
    ],
  }),
  component: ComparisonPage,
});

function ComparisonPage() {
  return (
    <>
      <PageHeader
        title="Comparison Dashboard"
        description="EACP-assisted versus manual investigation runs: time to reconstruct, evidence found, unresolved connections, and effort."
      />
      <Card>
        <CardContent className="py-14 text-center text-sm text-muted-foreground">
          Comparison metrics land here once investigation runs are recorded.
        </CardContent>
      </Card>
    </>
  );
}
