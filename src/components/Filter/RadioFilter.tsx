import { FC, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

type Props = {
  value: string;
  label: string;
  onChange: (value: string) => void;
  options: string[];
};

const RadioFilter: FC<Props> = ({ value, label, onChange, options }) => {
  return (
    <RadioGroup className="py-2" value={value} onChange={onChange}>
      <RadioGroup.Label className="text-lg">{label}</RadioGroup.Label>
      <div className="space-y-2">
        {options.map((option) => (
          <RadioGroup.Option value={option} key={option}>
            {({ checked }) => (
              <div
                className={`flex justify-between p-2 rounded cursor-pointer ${
                  checked ? "bg-indigo-600 text-indigo-200" : "bg-white"
                }`}
              >
                <span className={checked ? "" : ""}>{option}</span>
                {checked && <CheckIcon className="h-5 w-5" aria-hidden />}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default RadioFilter;
