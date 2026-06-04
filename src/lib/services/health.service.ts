import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export type HealthStatus = {
  status: string;
  service?: string;
};

export async function getApiHealth(): Promise<HealthStatus | null> {
  if (!hasApiClient()) return null;

  try {
    return await apiClient.get<HealthStatus>(apiEndpoints.health, { cache: "no-store" });
  } catch {
    return null;
  }
}
