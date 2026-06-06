// src/app/dashboard/owner-dashboard/overview/_charts.tsx
"use client";

import {
  Bar, BarChart, CartesianGrid, Cell, Legend,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const customerChartData = [
  { month: "Jan", newCustomers: 34, returningCustomers: 52, lostCustomers: 20 },
  { month: "Feb", newCustomers: 40, returningCustomers: 48, lostCustomers: 25 },
  { month: "Mar", newCustomers: 44, returningCustomers: 61, lostCustomers: 18 },
  { month: "Apr", newCustomers: 38, returningCustomers: 70, lostCustomers: 22 },
  { month: "May", newCustomers: 55, returningCustomers: 78, lostCustomers: 16 },
  { month: "Jun", newCustomers: 49, returningCustomers: 72, lostCustomers: 19 },
];

const customerSegmentData = [
  { name: "Loyal",           value: 81, color: "#10B981" },
  { name: "New",             value: 70, color: "#0EA5E9" },
  { name: "Needs Attention", value: 33, color: "#8B5CF6" },
  { name: "Lost",            value: 23, color: "#F43F5E" },
  { name: "VIP",             value: 6,  color: "#F59E0B" },
  { name: "At Risk",         value: 7,  color: "#F97316" },
];

const salesChartData = [
  { week: "Week 1", sales: 76000,  orders: 280 },
  { week: "Week 2", sales: 94000,  orders: 320 },
  { week: "Week 3", sales: 132000, orders: 390 },
  { week: "Week 4", sales: 178000, orders: 510 },
];

export function CustomerRetentionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={customerChartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#746C60" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#746C60" }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="newCustomers"       name="New Customers"       fill="#10B981" radius={[8, 8, 0, 0]} />
        <Bar dataKey="returningCustomers" name="Returning Customers" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
        <Bar dataKey="lostCustomers"      name="Lost Customers"      fill="#F43F5E" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CustomerSegmentChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={customerSegmentData}
          dataKey="value"
          nameKey="name"
          innerRadius={65}
          outerRadius={105}
          paddingAngle={3}
        >
          {customerSegmentData.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function WeeklySalesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={salesChartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#746C60" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#746C60" }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales"  name="Sales"  fill="#10B981" radius={[8, 8, 0, 0]} />
        <Bar dataKey="orders" name="Orders" fill="#F59E0B" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}