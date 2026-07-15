import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { type Ticket, TicketPriority } from "../../types/ticket";

interface PriorityDonutChartProps {
  tickets: Ticket[];
}

const COLORS: Record<TicketPriority, string> = {
  [TicketPriority.LOW]: "#9ca3af",
  [TicketPriority.MEDIUM]: "#f59e0b",
  [TicketPriority.HIGH]: "#ef4444",
};

export function PriorityDonutChart({ tickets }: PriorityDonutChartProps) {
  const data = Object.values(TicketPriority)
    .map((priority) => ({
      name: priority,
      value: tickets.filter((t) => t.priority === priority).length,
    }))
    .filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-4 flex items-center justify-center h-[220px]">
        <p className="text-sm text-gray-400">No priority data yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Priority split</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            cornerRadius={6}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name as TicketPriority]} stroke="none" />
            ))}
          </Pie>
          <Tooltip />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}