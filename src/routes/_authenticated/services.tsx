import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/services")({
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

function ServicesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, description, environment, created_at")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <PageHeader
        title="Services"
        description="Systems under observation. Each service links to its GitHub Actions and Kubernetes evidence sources."
      />
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading services…</p>
      ) : !data?.length ? (
        <p className="text-sm text-muted-foreground">No services yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="font-mono text-base">{service.name}</CardTitle>
                  <Badge variant={service.environment === "prod" ? "default" : "secondary"}>
                    {service.environment}
                  </Badge>
                </div>
                <CardDescription>{service.description ?? "No description."}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Registered {new Date(service.created_at).toLocaleDateString()}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
