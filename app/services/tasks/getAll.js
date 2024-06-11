import { api } from "../../lib/api";

export async function getAll() {
  const { data } = await api.get();

  return data;
}
