import CommandPalette from "./CommandPallete";
import SelectMapType from "./SelectMapType";

const Navbar = ({ onSelectCity }) => {
  return (
    <nav className="fixed w-full top-0 z-10 bg-white flex justify-between items-center px-2 md:px-4">
      <h1 className="text-xl font-semibold">Kyupid</h1>
      <CommandPalette onSelectCity={onSelectCity} />
      <SelectMapType />
    </nav>
  );
};

export default Navbar;
