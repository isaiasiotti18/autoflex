type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiError = Error & {
  status?: number;
  data?: unknown;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function request<T>(path: string, method: HttpMethod, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  let data: unknown = null;

  try {
    data = isJson ? await res.json() : await res.text();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const error: ApiError = new Error(`HTTP ${res.status} - ${res.statusText}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, "GET"),
  post: <T>(path: string, body: unknown) => request<T>(path, "POST", body),
  put: <T>(path: string, body: unknown) => request<T>(path, "PUT", body),
  patch: <T>(path: string, body: unknown) => request<T>(path, "PATCH", body),
  delete: (path: string) => request<void>(path, "DELETE"),
};
