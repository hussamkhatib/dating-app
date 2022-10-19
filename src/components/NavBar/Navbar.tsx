import { FC } from "react";
import CommandPalette from "./CommandPallete";
import SelectMapType from "./SelectMapType";

type Props = {
  onSelectCity: ({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) => void;
};

const Navbar: FC<Props> = ({ onSelectCity }) => {
  return (
    <nav className="fixed w-full top-0 z-30 bg-white flex h-10 justify-between items-center px-2 md:px-4">
      <h1 className="text-xl font-semibold">Kyupid</h1>
      <CommandPalette onSelectCity={onSelectCity} />
      <SelectMapType />
    </nav>
  );
};

export default Navbar;
