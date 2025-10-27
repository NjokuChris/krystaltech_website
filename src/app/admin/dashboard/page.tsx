'use client';
import Card from "../components/dashboard/Card";
import Chart from "../components/dashboard/Chart";

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
