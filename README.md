# EACP Insights

Build a web app called "EACP Pilot" — an evidence-correlation and incident-reconstruction tool for observing operational changes across GitHub Actions and Kubernetes. Set up the foundation: 1. Use React + TypeScript + Tailwind + shadcn/ui. Use Supabase for the database and auth. 2. Data model (Supabase tables): - "services" — id, name, description, environment (staging/prod), created_at - "evidence_sources" — id, service_id (FK), source_type (enum: github_actions, kubernetes), config (jsonb), created_at - "events" — id, service_id (FK), evidence_source_id (FK), source_type, event_type (text), raw_payload (jsonb), occurred_at (timestamptz), ingested_at (timestamptz) - "incidents" — id, service_id (FK), title, description, status (open/investigating/resolved), started_at, resolved_at, created_at - "incident_timelines" — id, incident_id (FK), event_id (FK), sequence_order (int), correlation_confidence (float, nullable), notes (text) - "investigation_runs" — id, incident_id (FK), method (enum: eacp, manual), started_at, completed_at, time_to_reconstruct_minutes (float), evidence_items_found (int), unresolved_connections (int), setup_effort_notes (text), maintenance_effort_notes (text) 3. Set up basic auth (email/password) with a single "investigator" role for now — no multi-tenant complexity needed for the pilot. 4. Build a simple top-nav shell with three sections (empty pages for now, just routing + placeholder headers): "Services", "Incidents", "Comparison Dashboard". 5. Seed one example service ("payments-api", staging) so there's data to look at once we build the UI. Keep the UI clean, dark-mode-friendly, professional — this will be shown to a client evaluating a security tool, not a consumer app.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://eacppilot.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a0040bad-608f-46c9-94a0-467489ab5d7c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
