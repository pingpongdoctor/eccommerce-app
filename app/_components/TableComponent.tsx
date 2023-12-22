import React from "react";

const columnInforArr: ColunmInfor[] = [
  {
    id: "1",
    colunm: "username",
  },
  { id: "2", colunm: "email" },
  { id: "3", colunm: "message" },
];

export default function TableComponent() {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="table-auto w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead>
          <tr>
            {columnInforArr.map((colunmInfor) => {
              return (
                <th key={colunmInfor.id} className=" px-4 py-2 text-gray-900">
                  {colunmInfor.colunm}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className=" text-center px-4 py-2 text-gray-900">John Doe</td>
            <td className=" text-center px-4 py-2 text-gray-900">John Doe</td>
            <td className=" text-center px-4 py-2 text-gray-900">John Doe</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
