import React from 'react';

interface Props {
  DropdownIcon: React.FC<any>;
  dropdownName: string;
  dropdownDescription: string;
}

export default function DropdownItem({
  DropdownIcon,
  dropdownName,
  dropdownDescription,
}: Props) {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        <DropdownIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
      </div>
      <div className="flex-auto">
        <p className="font-semibold text-gray-900">
          {dropdownName}
          <span className="absolute inset-0" />
        </p>
        <p className="mt-1 text-gray-600">{dropdownDescription}</p>
      </div>
    </div>
  );
}