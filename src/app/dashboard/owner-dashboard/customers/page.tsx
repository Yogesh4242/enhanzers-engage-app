// src/app/dashboard/owner-dashboard/customers/page.tsx
"use client";

import { useState, useEffect } from "react";
import SidePanel from "../components/sidepanel";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Search, Filter, Download, Mail, Phone, 
  Calendar, DollarSign, ShoppingBag, Star, MoreVertical, Edit, 
  Trash2, X, Users, ChevronDown, ChevronUp, UserPlus 
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive" | "vip";
  joinDate: string;
}

// StatCard Component
function StatCard({ title, value, icon: Icon, trend }: { title: string; value: string; icon: any; trend: string }) {
  return (
    <div >
             
        
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F2F2]">
        <Icon size={18} className="text-[#0A0A0A]" />
      </div>
      <p className="text-sm font-medium text-[#737373]">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-[#0A0A0A]">{value}</p>
      <p className="mt-1 text-xs text-green-600">{trend}</p>
    </div>
  );
}

// Customer Row Component
function CustomerRow({ customer, onSelect, isSelected, onDelete }: { 
  customer: Customer; 
  onSelect: (id: string) => void; 
  isSelected: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b border-[#E5E5E5] transition-colors hover:bg-[#F9F9F9]">
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-[#0A0A0A]">{customer.name}</p>
          <p className="text-xs text-[#A3A3A3]">ID: {customer.id}</p>
        </div>
       </td>
      <td className="px-4 py-3">
        <div className="space-y-1">
          <p className="flex items-center gap-1 text-sm text-[#525252]">
            <Mail size={12} className="text-[#A3A3A3]" />
            {customer.email}
          </p>
          <p className="flex items-center gap-1 text-sm text-[#525252]">
            <Phone size={12} className="text-[#A3A3A3]" />
            {customer.phone}
          </p>
        </div>
       </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <ShoppingBag size={14} className="text-[#A3A3A3]" />
          <span className="text-sm font-medium text-[#0A0A0A]">{customer.orders}</span>
        </div>
       </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <DollarSign size={14} className="text-[#A3A3A3]" />
          <span className="text-sm font-medium text-[#0A0A0A]">₹{customer.totalSpent.toLocaleString()}</span>
        </div>
       </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-[#A3A3A3]" />
          <span className="text-sm text-[#525252]">{customer.lastOrder}</span>
        </div>
       </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          customer.status === "vip"
            ? "bg-amber-50 text-amber-700"
            : customer.status === "active"
            ? "bg-green-50 text-green-700"
            : "bg-gray-50 text-gray-600"
        }`}>
          {customer.status === "vip" ? "VIP" : customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
        </span>
       </td>
      <td className="px-4 py-3 text-center">
        <div className="relative">
          <button
            onClick={() => onSelect(customer.id)}
            className="p-1 hover:bg-[#F2F2F2] rounded"
          >
            <MoreVertical size={16} className="text-[#A3A3A3]" />
          </button>
          {isSelected && (
            <div className="absolute right-0 top-full mt-1 z-10 bg-white border border-[#E5E5E5] rounded-lg shadow-lg min-w-[120px]">
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#525252] hover:bg-[#F9F9F9]">
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={() => onDelete(customer.id)}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
       </td>
    </tr>
  );
}

// Add Customer Form Component
function AddCustomerForm({ onAdd }: { onAdd: (customer: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orders: 0,
    totalSpent: 0,
    lastOrder: new Date().toISOString().split("T")[0],
    status: "active",
    joinDate: new Date().toISOString().split("T")[0],
  });

  const handleNumberChange = (field: 'orders' | 'totalSpent', value: string) => {
    const numValue = value === '' ? 0 : parseInt(value);
    setFormData({ ...formData, [field]: isNaN(numValue) ? 0 : numValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      orders: 0,
      totalSpent: 0,
      lastOrder: new Date().toISOString().split("T")[0],
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0A0A0A]">Full Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm focus:border-black focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#0A0A0A]">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm focus:border-black focus:outline-none"
            placeholder="customer@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#0A0A0A]">Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm focus:border-black focus:outline-none"
            placeholder="+91 1234567890"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#0A0A0A]">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm focus:border-black focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="vip">VIP</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#0A0A0A]">Total Orders</label>
          <input
            type="number"
            value={formData.orders}
            onChange={(e) => handleNumberChange('orders', e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm focus:border-black focus:outline-none"
            placeholder="0"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#0A0A0A]">Total Spent (₹)</label>
          <input
            type="number"
            value={formData.totalSpent}
            onChange={(e) => handleNumberChange('totalSpent', e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm focus:border-black focus:outline-none"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
        >
          <UserPlus size={16} />
          Add Customer
        </button>
      </div>
    </form>
  );
}

// Main Customers Page Component
export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Load customers from API
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      const data = await response.json();
      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (newCustomer: Omit<Customer, "id">) => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      const data = await response.json();
      if (data.success) {
        setCustomers([...customers, data.customer]);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      const response = await fetch(`/api/customers?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setCustomers(customers.filter(c => c.id !== id));
        setShowDeleteConfirm(null);
        setSelectedCustomer(null);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(customers, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Show only first 8 customers if showAll is false
  const displayedCustomers = showAll ? filteredCustomers : filteredCustomers.slice(0, 8);

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    vip: customers.filter(c => c.status === "vip").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center lg:ml-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-[#737373]">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <main  >
        {/* Header */}
        

        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Customers" value={stats.total.toString()} icon={Users} trend="+12%" />
            <StatCard title="Active Customers" value={stats.active.toString()} icon={Users} trend="+5%" />
            <StatCard title="VIP Members" value={stats.vip.toString()} icon={Star} trend="+8%" />
            <StatCard title="Total Revenue" value={`₹${(stats.totalRevenue / 1000).toFixed(1)}K`} icon={DollarSign} trend="+15%" />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A3A3]" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#E5E5E5] bg-white pl-9 pr-4 text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:border-black focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 rounded-lg border border-[#E5E5E5] bg-white px-3 text-sm text-[#0A0A0A] focus:border-black focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="vip">VIP</option>
              </select>
              <button className="flex h-10 items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 text-sm text-[#525252] transition-colors hover:bg-[#F2F2F2]">
                <Filter size={16} />
                Filter
              </button>
              <button 
                onClick={handleExport}
                className="flex h-10 items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 text-sm text-[#525252] transition-colors hover:bg-[#F2F2F2]"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Customers Table Section */}
          <div className="overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E5E5] bg-[#F9F9F9]">
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#737373]">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#737373]">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#737373]">Orders</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#737373]">Total Spent</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#737373]">Last Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#737373]">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-[#737373]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedCustomers.map((customer) => (
                    <CustomerRow
                      key={customer.id}
                      customer={customer}
                      isSelected={selectedCustomer === customer.id}
                      onSelect={(id) => setSelectedCustomer(selectedCustomer === id ? null : id)}
                      onDelete={(id) => setShowDeleteConfirm(id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Show All / Show Less Button */}
            {filteredCustomers.length > 8 && (
              <div className="border-t border-[#E5E5E5] px-4 py-3 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#525252] hover:text-black transition-colors"
                >
                  {showAll ? (
                    <>
                      <ChevronUp size={16} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show All ({filteredCustomers.length - 8} more)
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Add New Customer Section */}
          <div className="rounded-xl border border-[#E5E5E5] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[#E5E5E5] bg-[#F9F9F9] px-5 py-4">
              <div className="flex items-center gap-2">
                <UserPlus size={18} className="text-[#0A0A0A]" />
                <h3 className="text-base font-semibold text-[#0A0A0A]">Add New Customer</h3>
              </div>
              <p className="text-sm text-[#737373] mt-0.5">Fill in the details below to add a new customer to your database.</p>
            </div>
            <div className="p-5">
              <AddCustomerForm onAdd={handleAddCustomer} />
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-96 rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#0A0A0A]">Delete Customer</h3>
                  <button onClick={() => setShowDeleteConfirm(null)} className="text-[#A3A3A3] hover:text-black">
                    <X size={20} />
                  </button>
                </div>
                <p className="mb-6 text-sm text-[#525252]">
                  Are you sure you want to delete this customer? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#525252] hover:bg-[#F2F2F2]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(showDeleteConfirm)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}