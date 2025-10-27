'use client';
import Table from "../../components/dashboard/Table";

export default function TablesPage() {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Users Table</h2>
      <Table data={data} />
    </div>
  );
}
