import axios from "axios";

export const api = axios.create({
  baseURL: "https://veiopads.netlify.app/api/filipe-as/tasks",
});
