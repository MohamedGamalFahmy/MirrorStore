const UserTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow">
      <div className="w-full overflow-x-auto rounded-2xl">
        <table className="min-w-[750px] w-full">
          <thead className="bg-zinc-900 text-white">
            <tr>
              <th className="p-4">الاسم</th>

              <th className="p-4">الإيميل</th>

              <th className="p-4">النوع</th>

              <th className="p-4">الحالة</th>

              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 text-center">Mohamed Gamal</td>

              <td className="p-4 text-center">admin@gfforglass.com</td>

              <td className="p-4 text-center">Admin</td>

              <td className="p-4 text-center">🟢 نشط</td>

              <td className="p-4 text-center">✏️ 🗑</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
