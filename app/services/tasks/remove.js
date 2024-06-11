import { api } from "../../lib/api";

export async function remove(id) {
  await api.delete(`/${id}`);
}
