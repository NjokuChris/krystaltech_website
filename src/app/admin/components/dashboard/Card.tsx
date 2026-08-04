// Stat card for the admin dashboard - sand/ink/amber design system.

interface CardProps {
  title: string;
  value: string;
  accent?: boolean; // amber top accent for the headline stat
}

export default function Card({ title, value, accent = false }: CardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#11142B]/10 bg-white p-6 shadow-sm shadow-[#11142B]/5 transition hover:shadow-md hover:shadow-[#11142B]/10">
      {accent && <span className="absolute inset-x-0 top-0 h-1 bg-[#FFB627]" />}
      <h3 className="text-sm font-medium text-[#11142B]/55">{title}</h3>
      <p className="mt-2 text-3xl font-light tracking-tight text-[#11142B]">{value}</p>
    </div>
  );
}
