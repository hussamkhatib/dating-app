import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { activeMapType, mapType } from "../../activeMap";
import { useAtom } from "jotai";

const list = Object.values(mapType);

const SelectMapType = () => {
  const [activeMap, setActiveMap] = useAtom(activeMapType);
  const [selected, setSelected] = useState(activeMap); // this useState is not needed, but removing it makes the active item not show up as selected

  const handleOnChange = (value: mapType) => {
    setSelected(value);
    setActiveMap(value);
  };

  return (
    <Listbox value={selected} onChange={handleOnChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative min-w-[10rem] w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default h-9 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {Array.isArray(selected)
              ? selected.map((value) => value).join(", ")
              : selected}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list?.map((item) => (
              <Listbox.Option
                key={item}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-gray-100 text-[#153757]" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`${selected ? "font-medium" : "font-normal"}`}
                    >
                      {item}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#153757]">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SelectMapType;
