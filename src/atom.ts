import { atom } from "jotai";
import { PolygonProperties } from "./types";

export type Age = "All" | "18-30" | "30+";
export type Gender = "All" | "M" | "F";
export type FilterType = {
  age: Age;
  gender: Gender;
};

export enum mapType {
  proUsers = "proUsers",
  users = "users",
}

export const isFilterPanelOpenAtom = atom(false);

export const filterAtom = atom<FilterType>({
  age: "All",
  gender: "All",
});

export const activeMapType = atom(mapType.proUsers);

export const selectedAreaAtom = atom<PolygonProperties | null>(null);
