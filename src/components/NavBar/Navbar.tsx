import SelectMapType from "./SelectMapType";

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-10 bg-white flex justify-between items-center px-2 md:px-4">
      <h1 className="text-xl font-semibold">Kyupid</h1>
      <div />
      <SelectMapType />
    </nav>
  );
};

export default Navbar;
