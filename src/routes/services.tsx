import { createFileRoute } from "@tanstack/react-router";
import { Github, Boxes } from "lucide-react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { services, type EvidenceSourceType } from "@/lib/mock-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | EACP Pilot" },
      {
        name: "description",
        content: "Monitored services and their connected GitHub Actions and Kubernetes evidence sources.",
      },
      { property: "og:title", content: "Services | EACP Pilot" },
      {
        property: "og:description",
        content: "Monitored services and their connected evidence sources.",
      },
    ],
  }),
  component: ServicesPage,
});

const sourceConfig: Record<EvidenceSourceType, { label: string; icon: typeof Github }> = {
  github_actions: { label: "GitHub Actions", icon: Github },
  kubernetes: { label: "Kubernetes", icon: Boxes },
};

function ServicesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Services"
        description="Systems under observation. Each service links to its GitHub Actions and Kubernetes evidence sources."
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monitored services</CardTitle>
          <CardDescription>Services registered for evidence correlation and incident reconstruction.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Evidence sources</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-mono text-sm font-medium">{service.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{service.description}</TableCell>
                  <TableCell>
                    <Badge variant={service.environment === "prod" ? "default" : "secondary"}>
                      {service.environment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {service.evidenceSources.map((source) => {
                        const config = sourceConfig[source];
                        const Icon = config.icon;
                        return (
                          <Badge key={source} variant="outline" className="flex items-center gap-1.5">
                            <Icon className="size-3" aria-hidden />
                            {config.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
