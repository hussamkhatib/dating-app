import { atom } from "jotai";
import { PolygonProperties } from "./types";

export type FilterType = {
  age: string;
  gender: string;
};

export enum mapType {
  proUsers = "proUsers",
  users = "users",
}

export const isFilterPanelOpenAtom = atom(false);

export const filterAtom = atom({
  age: "All",
  gender: "All",
});

export const activeMapType = atom(mapType.proUsers);

export const selectedAreaAtom = atom<PolygonProperties | null>(null);
