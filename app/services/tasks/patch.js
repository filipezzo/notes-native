import { api } from "../../lib/api";

export async function patching({ id, newStep }) {
  const { data } = await api.patch(`/${id}/update-step`, { step: newStep });
  return data;
}
