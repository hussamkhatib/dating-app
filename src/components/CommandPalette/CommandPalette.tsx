import { Dialog, Combobox, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import { selectedAreaAtom } from "../../atom";
import areasNames, { Area } from "./areaNames";
import { OnSelectCity } from "../../types";

type Props = {
  onSelectCity: OnSelectCity;
};
const CommandPalette: FC<Props> = ({ onSelectCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const setSelectedAtom = useSetAtom(selectedAreaAtom);

  const filteredAreas = query
    ? areasNames.filter((areaName) =>
        areaName.name.toLowerCase().includes(query.toLowerCase())
      )
    : areasNames;

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === "KeyK") {
        event.preventDefault();
        setIsOpen((state) => !state);
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <>
      <button
        className="border-2 inline-flex sm:w-40 items-center gap-x-2 text-sm py-1 px-4 rounded-xl"
        onClick={() => setIsOpen(true)}
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" aria-hidden />
        Ctrl + K
      </button>
      <Transition.Root
        show={isOpen}
        as={Fragment}
        afterLeave={() => setQuery("")}
      >
        <Dialog
          onClose={setIsOpen}
          className="fixed inset-0 z-20 p-4 pt-[25vh] overflow-y-auto"
        >
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
          </Transition.Child>
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Combobox
              onChange={(area: Area) => {
                setIsOpen(false);
                onSelectCity({
                  longitude: area.coordinates[0],
                  latitude: area.coordinates[1],
                });
                setSelectedAtom(area);
              }}
              as="div"
              className="bg-white rounded-xl shadow-2xl max-w-xl relative mx-auto ring-1 ring-black/5 divide-y overflow-hidden"
            >
              <div className="flex items-center px-4">
                <MagnifyingGlassIcon
                  className="h-6 w-6 text-gray-500"
                  aria-hidden
                />
                <Combobox.Input
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  className="w-full border-0 bg-transparent focus:ring-0 text-sm px-2 text-gray-800 placeholder:gray-400 h-12"
                  placeholder="search"
                />
              </div>
              {filteredAreas.length > 0 ? (
                <Combobox.Options
                  static
                  className="py-4 text-sm max-h-96 overflow-y-auto"
                >
                  {filteredAreas.map((area) => (
                    <Combobox.Option value={area} key={area.name}>
                      {({ active }) => (
                        <div
                          className={`px-4 py-2 w-full text-left ${
                            active
                              ? "bg-indigo-600 text-indigo-200"
                              : "bg-white"
                          }`}
                        >
                          {area.name}
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              ) : (
                <p className="text-sm p-4 text-gray-500">No search Results</p>
              )}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CommandPalette;
