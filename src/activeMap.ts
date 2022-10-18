import { atom } from "jotai";

export enum mapType {
  proUsers = "proUsers",
  users = "users",
}

export const activeMapType = atom(mapType.proUsers);
