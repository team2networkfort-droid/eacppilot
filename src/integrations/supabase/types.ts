export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          event_type: string
          evidence_source_id: string | null
          id: string
          ingested_at: string
          occurred_at: string
          raw_payload: Json
          service_id: string
          source_type: Database["public"]["Enums"]["source_type"]
        }
        Insert: {
          event_type: string
          evidence_source_id?: string | null
          id?: string
          ingested_at?: string
          occurred_at?: string
          raw_payload?: Json
          service_id: string
          source_type: Database["public"]["Enums"]["source_type"]
        }
        Update: {
          event_type?: string
          evidence_source_id?: string | null
          id?: string
          ingested_at?: string
          occurred_at?: string
          raw_payload?: Json
          service_id?: string
          source_type?: Database["public"]["Enums"]["source_type"]
        }
        Relationships: [
          {
            foreignKeyName: "events_evidence_source_id_fkey"
            columns: ["evidence_source_id"]
            isOneToOne: false
            referencedRelation: "evidence_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_sources: {
        Row: {
          config: Json
          created_at: string
          id: string
          service_id: string
          source_type: Database["public"]["Enums"]["source_type"]
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          service_id: string
          source_type: Database["public"]["Enums"]["source_type"]
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          service_id?: string
          source_type?: Database["public"]["Enums"]["source_type"]
        }
        Relationships: [
          {
            foreignKeyName: "evidence_sources_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      incident_timelines: {
        Row: {
          correlation_confidence: number | null
          created_at: string
          event_id: string | null
          id: string
          incident_id: string
          notes: string | null
          sequence_order: number
        }
        Insert: {
          correlation_confidence?: number | null
          created_at?: string
          event_id?: string | null
          id?: string
          incident_id: string
          notes?: string | null
          sequence_order?: number
        }
        Update: {
          correlation_confidence?: number | null
          created_at?: string
          event_id?: string | null
          id?: string
          incident_id?: string
          notes?: string | null
          sequence_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "incident_timelines_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incident_timelines_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          created_at: string
          description: string | null
          id: string
          resolved_at: string | null
          service_id: string
          started_at: string
          status: Database["public"]["Enums"]["incident_status"]
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          resolved_at?: string | null
          service_id: string
          started_at?: string
          status?: Database["public"]["Enums"]["incident_status"]
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          resolved_at?: string | null
          service_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["incident_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "incidents_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      investigation_runs: {
        Row: {
          completed_at: string | null
          created_at: string
          evidence_items_found: number
          id: string
          incident_id: string
          maintenance_effort_notes: string | null
          method: Database["public"]["Enums"]["investigation_method"]
          setup_effort_notes: string | null
          started_at: string
          time_to_reconstruct_minutes: number | null
          unresolved_connections: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          evidence_items_found?: number
          id?: string
          incident_id: string
          maintenance_effort_notes?: string | null
          method: Database["public"]["Enums"]["investigation_method"]
          setup_effort_notes?: string | null
          started_at?: string
          time_to_reconstruct_minutes?: number | null
          unresolved_connections?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          evidence_items_found?: number
          id?: string
          incident_id?: string
          maintenance_effort_notes?: string | null
          method?: Database["public"]["Enums"]["investigation_method"]
          setup_effort_notes?: string | null
          started_at?: string
          time_to_reconstruct_minutes?: number | null
          unresolved_connections?: number
        }
        Relationships: [
          {
            foreignKeyName: "investigation_runs_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          environment: Database["public"]["Enums"]["environment_type"]
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          environment?: Database["public"]["Enums"]["environment_type"]
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          environment?: Database["public"]["Enums"]["environment_type"]
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "investigator"
      environment_type: "staging" | "prod"
      incident_status: "open" | "investigating" | "resolved"
      investigation_method: "eacp" | "manual"
      source_type: "github_actions" | "kubernetes"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["investigator"],
      environment_type: ["staging", "prod"],
      incident_status: ["open", "investigating", "resolved"],
      investigation_method: ["eacp", "manual"],
      source_type: ["github_actions", "kubernetes"],
    },
  },
} as const
