'use client';
export default function NotificationsPage() {
  const notifications = [
    { id: 1, text: "New user registered", type: "success" },
    { id: 2, text: "Server error reported", type: "error" },
    { id: 3, text: "New order received", type: "info" },
  ];

  const getColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100 text-green-800";
      case "error": return "bg-red-100 text-red-800";
      case "info": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 rounded shadow ${getColor(n.type)}`}>
            {n.text}
          </div>
        ))}
      </div>
    </div>
  );
}
