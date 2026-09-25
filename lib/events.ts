export type AgentEvent = {
  id: string;
  type: string;
  at: string;
  actor: string;
  detail: string;
};

const ring: AgentEvent[] = [];
const MAX = 200;

export function publish(type: string, actor: string, detail: string) {
  ring.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    at: new Date().toISOString(),
    actor,
    detail,
  });
  if (ring.length > MAX) ring.pop();
  return ring[0];
}

export function recent(limit = 50) {
  return ring.slice(0, limit);
}
