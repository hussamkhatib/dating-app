import { atom } from "jotai";

export const isFilterPanelOpenAtom = atom(false);

export const filterAtom = atom({
  age: "All",
  gender: "All",
});

export type FilterType = {
  age: string;
  gender: string;
};

export const selectedAreaAtom = atom(null);

export type SelectedArea = {
  area_id: number;
  name: string;
  [key: string]: any;
};

export enum mapType {
  proUsers = "proUsers",
  users = "users",
}

export const activeMapType = atom(mapType.proUsers);
