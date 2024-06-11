import { create } from "./tasks/create";
import { getAll } from "./tasks/getAll";
import { patching } from "./tasks/patch";
import { remove } from "./tasks/remove";
import { update } from "./tasks/update";
export const tasksService = {
  getAll,
  create,
  update,
  patching,
  remove,
};
