import UserTable from "../../Components/Admin/Users/UserTable";
import AddUserModal from "../../Components/Admin/Users/AddUserModal";

const Users = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>

          <p className="text-gray-500 mt-1">إضافة وتعديل صلاحيات المستخدمين</p>
        </div>

        <AddUserModal />
      </div>

      <UserTable />
    </div>
  );
};

export default Users;
