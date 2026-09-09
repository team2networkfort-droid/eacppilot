import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/incidents")({
  head: () => ({
    meta: [
      { title: "Incidents | EACP Pilot" },
      {
        name: "description",
        content: "Reconstructed incident timelines correlated from operational change evidence.",
      },
      { property: "og:title", content: "Incidents | EACP Pilot" },
      {
        property: "og:description",
        content: "Reconstructed incident timelines correlated from change evidence.",
      },
    ],
  }),
  component: IncidentsPage,
});

function IncidentsPage() {
  return (
    <>
      <PageHeader
        title="Incidents"
        description="Open, investigating, and resolved incidents with their reconstructed evidence timelines."
      />
      <Card>
        <CardContent className="py-14 text-center text-sm text-muted-foreground">
          Incident reconstruction views land here next.
        </CardContent>
      </Card>
    </>
  );
}
