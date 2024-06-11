import { api } from "../../lib/api";

export async function create(newTask) {
  const { data } = await api.post("/", newTask);
  return data;
}
