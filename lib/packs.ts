import packs from "@/data/packs.json";

export type Pack = {
  id: string;
  name: string;
  price: number;
  summary: string;
  file: string;
  preview: string;
  paid: boolean;
};

export function listPacks(): Pack[] {
  return packs as Pack[];
}

export function getPack(id: string) {
  return listPacks().find((p) => p.id === id);
}

export function publicPacks() {
  return listPacks().filter((p) => !p.paid || p.id === "priority");
}
