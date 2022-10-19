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
