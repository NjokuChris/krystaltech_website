// 'use client';

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function DashboardPage() {
//   const router = useRouter();
//   const [message, setMessage] = useState("");

//   const handleLogout = async () => {
//     const res = await fetch("/api/logout", { method: "POST" });
//     const result = await res.json();
//     setMessage(result.message);
//     router.push("/login");
//   };

//   useEffect(() => {
//     setMessage("");
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-semibold">Welcome to your Dashboard 🎉</h1>
//       <p className="mt-2">You are now logged in!</p>
//       <button
//         onClick={handleLogout}
//         className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// }


'use client';
import Card from "../admin/components/dashboard/Card";
import Chart from "../admin/components/dashboard/Chart";

export default function DashboardPage() {
  const cards = [
    { title: "Users", value: 1245 },
    { title: "Revenue", value: "$12,450" },
    { title: "Orders", value: 452 },
    { title: "Products", value: 98 },
  ];

  const chartData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [
      { label: "Sales", data: [300,500,400,600,700,800], borderColor: "#1D4ED8", backgroundColor:"rgba(29,78,216,0.2)" },
      { label: "Users", data: [200,350,300,400,500,600], borderColor:"#DC2626", backgroundColor:"rgba(220,38,38,0.2)" },
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-900">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.title} title={card.title} value={card.value.toString()} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart title="Overview" chartData={chartData} />
      </div>
    </div>
  );
}
