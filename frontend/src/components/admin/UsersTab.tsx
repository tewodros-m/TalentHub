import { timeAgo } from '../../utils/timeAgo';
import { Table, TableHeader, TableRow, TableCell } from '../ui/table';
import { useGetAllUsersQuery } from '../../features/user/userApi';

const UsersTab = () => {
  const { data: usersData = { results: 0, users: [] }, isLoading } =
    useGetAllUsersQuery();

  const { results: usersCount, users } = usersData;

  console.log('users', users);

  return (
    <div className='p-3 bg-bg min-h-screen rounded-2xl shadow-md'>
      <h3 className='text-xl text-primary-800 font-semibold mb-4'>All Users</h3>
      <Table>
        <TableHeader headers={['Name', 'Email', 'Role', 'Created']} />
        {isLoading ? (
          <p className='text-gray-600 mt-5 pl-4'>Loading users...</p>
        ) : usersCount > 0 ? (
          <tbody>
            {users.map((user, index) => (
              <TableRow key={user._id} isStriped={index % 2 === 0}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{timeAgo(new Date(user?.createdAt))}</TableCell>
              </TableRow>
            ))}
          </tbody>
        ) : (
          <p className='text-gray-600 mt-5 pl-4'>No users available</p>
        )}
      </Table>
    </div>
  );
};

export default UsersTab;
