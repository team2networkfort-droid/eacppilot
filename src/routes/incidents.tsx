import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServiceById, incidents, type IncidentStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/incidents")({
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

const statusConfig: Record<IncidentStatus, { label: string; icon: typeof AlertCircle; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  open: { label: "Open", icon: AlertCircle, variant: "destructive" },
  investigating: { label: "Investigating", icon: Clock, variant: "secondary" },
  resolved: { label: "Resolved", icon: CheckCircle2, variant: "default" },
};

function IncidentsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Incidents"
        description="Open, investigating, and resolved incidents with their reconstructed evidence timelines."
      />
      <div className="grid gap-4">
        {incidents.map((incident) => {
          const service = getServiceById(incident.serviceId);
          const config = statusConfig[incident.status];
          const StatusIcon = config.icon;
          return (
            <Card key={incident.id}>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">{incident.title}</CardTitle>
                    <CardDescription className="mt-1.5 max-w-2xl">
                      {incident.description}
                    </CardDescription>
                  </div>
                  <Badge variant={config.variant} className="flex items-center gap-1.5">
                    <StatusIcon className="size-3" aria-hidden />
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Service</dt>
                      <dd className="font-mono">{service?.name ?? "Unknown"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Started</dt>
                      <dd>{new Date(incident.startedAt).toLocaleString()}</dd>
                    </div>
                    {incident.resolvedAt && (
                      <div>
                        <dt className="text-muted-foreground">Resolved</dt>
                        <dd>{new Date(incident.resolvedAt).toLocaleString()}</dd>
                      </div>
                    )}
                  </dl>
                  <Button asChild variant="secondary" size="sm">
                    <Link to="/incidents/$id" params={{ id: incident.id }}>
                      View Timeline
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
