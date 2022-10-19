import { atom } from "jotai";

const selectedAreaAtom = atom(null);
export default selectedAreaAtom;

export type SelectedArea = {
  area_id: number;
  name: string;
  [key: string]: any;
};
