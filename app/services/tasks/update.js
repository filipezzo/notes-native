import { api } from "../../lib/api";

export async function update(id, newTask) {
  const { data } = await api.put(`/${id}`, newTask);
  return data;
}
