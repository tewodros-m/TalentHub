import type { ReactNode } from 'react';

export const Table = ({ children }: { children: ReactNode }) => (
  <div className='overflow-x-auto'>
    <table className='min-w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden'>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ headers }: { headers: string[] }) => (
  <thead className='bg-gray-100 text-gray-700 uppercase text-sm'>
    <tr>
      {headers.map((header) => (
        <th key={header} className='px-4 py-3'>
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export const TableRow = ({
  children,
  isStriped,
}: {
  children: ReactNode;
  isStriped?: boolean;
}) => (
  <tr
    className={`border-t ${
      isStriped ? 'bg-gray-50' : 'bg-bg'
    } hover:bg-gray-200`}
  >
    {children}
  </tr>
);

export const TableCell = ({
  children,
  align = 'left',
}: {
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
}) => (
  <td
    className={`px-4 py-3 ${
      align === 'right'
        ? 'text-right'
        : align === 'center'
        ? 'text-center'
        : 'text-left'
    }`}
  >
    {children}
  </td>
);
