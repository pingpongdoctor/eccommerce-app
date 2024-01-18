import React from 'react';

const columnInforArr: ColunmInfor[] = [
  {
    id: '1',
    colunm: 'username',
  },
  { id: '2', colunm: 'email' },
  { id: '3', colunm: 'message' },
];

interface Props {
  users: User[] | undefined;
}

export default function TableComponent({ users }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full table-auto divide-y-2 divide-gray-200 bg-white text-sm">
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
          {users &&
            users.length > 0 &&
            users.map((user: User) => {
              return (
                <tr key={user._id}>
                  <td className=" px-4 py-2 text-center text-gray-900">
                    {user.name}
                  </td>
                  <td className=" px-4 py-2 text-center text-gray-900">
                    {user.email}
                  </td>
                  <td className=" px-4 py-2 text-center text-gray-900">
                    {user.message}
                  </td>
                </tr>
              );
            })}
          {users && users.length === 0 && (
            <tr>
              <td className=" px-4 py-2 text-center text-gray-900"></td>
              <td className=" px-4 py-2 text-center text-gray-900">No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
