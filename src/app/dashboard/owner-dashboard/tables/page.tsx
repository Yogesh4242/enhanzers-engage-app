// src/app/dashboard/owner-dashboard/tables/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Table, QrCode, Download, MoreVertical, Edit, 
  Trash2, X, Users, DollarSign, ShoppingBag, Calendar,
  CheckCircle, Clock, AlertCircle, Coffee, Copy, Check
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CurrentOrder {
  id: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  orderTime: string;
}

interface TableData {
  id: string;
  tableNumber: number;
  qrCode: string;
  status: "available" | "occupied" | "reserved" | "cleaning";
  currentOrder: CurrentOrder | null;
  lastOrderDate: string;
  totalOrders: number;
  totalRevenue: number;
}

// QR Code Modal Component
function QRCodeModal({ table, onClose }: { table: TableData | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopyQR = () => {
    if (table) {
      navigator.clipboard.writeText(table.qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!table) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] p-5">
          <h3 className="text-lg font-semibold text-[#0A0A0A]">QR Code - Table {table.tableNumber}</h3>
          <button onClick={onClose} className="text-[#A3A3A3] hover:text-black">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="bg-[#F9F9F9] p-6 rounded-xl mb-4">
            {/* Simulated QR Code - In production, use actual QR code library */}
            <div className="w-48 h-48 mx-auto bg-black rounded-xl flex items-center justify-center">
              <QrCode size={80} className="text-white" />
            </div>
            <p className="mt-3 text-sm font-medium text-[#0A0A0A]">Table {table.tableNumber} QR Code</p>
            <p className="text-xs text-[#737373] mt-1">Scan to place order</p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              readOnly
              value={table.qrCode}
              className="flex-1 rounded-lg border border-[#E5E5E5] px-3 py-2 text-xs bg-[#F9F9F9] text-[#525252]"
            />
            <button
              onClick={handleCopyQR}
              className="p-2 rounded-lg border border-[#E5E5E5] hover:bg-[#F2F2F2] transition"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
          </div>
          <button
            onClick={() => window.open(`/api/tables/qr/${table.id}`, '_blank')}
            className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-[#333333] transition flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

// Order Details Modal
function OrderDetailsModal({ order, tableNumber, onClose }: { order: CurrentOrder | null; tableNumber: number; onClose: () => void }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] p-5">
          <h3 className="text-lg font-semibold text-[#0A0A0A]">Order Details - Table {tableNumber}</h3>
          <button onClick={onClose} className="text-[#A3A3A3] hover:text-black">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          <div className="mb-4 p-3 bg-[#F9F9F9] rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-[#737373]">Order ID:</span>
              <span className="font-medium text-[#0A0A0A]">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-[#737373]">Customer:</span>
              <span className="font-medium text-[#0A0A0A]">{order.customerName}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-[#737373]">Order Time:</span>
              <span className="font-medium text-[#0A0A0A]">{order.orderTime}</span>
            </div>
          </div>
          
          <h4 className="font-medium text-[#0A0A0A] mb-2">Order Items</h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 border-b border-[#E5E5E5]">
                <div>
                  <p className="font-medium text-[#0A0A0A]">{item.name}</p>
                  <p className="text-xs text-[#737373]">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium text-[#0A0A0A]">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E5E5] p-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-[#333333] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmModal({ table, onConfirm, onClose }: { table: TableData | null; onConfirm: () => void; onClose: () => void }) {
  if (!table) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-96 rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0A0A0A]">Delete Table</h3>
          <button onClick={onClose} className="text-[#A3A3A3] hover:text-black">
            <X size={20} />
          </button>
        </div>
        <p className="mb-6 text-sm text-[#525252]">
          Are you sure you want to delete Table {table.tableNumber}? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#525252] hover:bg-[#F2F2F2]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, icon: Icon, trend }: { title: string; value: string; icon: any; trend: string }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-sm hover:shadow-md transition-all">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F2F2]">
        <Icon size={18} className="text-[#0A0A0A]" />
      </div>
      <p className="text-sm font-medium text-[#737373]">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-[#0A0A0A]">{value}</p>
      <p className="mt-1 text-xs text-green-600">{trend}</p>
    </div>
  );
}

// Table Card Component
function TableCard({ table, onViewQR, onViewOrder, onEdit, onDelete }: { 
  table: TableData; 
  onViewQR: (table: TableData) => void;
  onViewOrder: (table: TableData) => void;
  onEdit: (table: TableData) => void;
  onDelete: (table: TableData) => void;
}) {
  const getStatusBadge = () => {
    switch (table.status) {
      case "available":
        return { icon: CheckCircle, text: "Available", color: "text-green-600", bg: "bg-green-50" };
      case "occupied":
        return { icon: Coffee, text: "Occupied", color: "text-orange-600", bg: "bg-orange-50" };
      case "reserved":
        return { icon: Clock, text: "Reserved", color: "text-blue-600", bg: "bg-blue-50" };
      case "cleaning":
        return { icon: AlertCircle, text: "Cleaning", color: "text-yellow-600", bg: "bg-yellow-50" };
      default:
        return { icon: CheckCircle, text: "Available", color: "text-green-600", bg: "bg-green-50" };
    }
  };

  const StatusIcon = getStatusBadge().icon;

  return (
    <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-md transition-all">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#333333] px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table size={18} />
            <h3 className="font-semibold">Table {table.tableNumber}</h3>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge().bg} ${getStatusBadge().color}`}>
            <StatusIcon size={10} />
            {getStatusBadge().text}
          </span>
        </div>
      </div>

      {/* Table Body */}
      <div className="p-4 space-y-3">
        {/* QR Code Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F2F2F2] rounded-lg flex items-center justify-center">
              <QrCode size={14} className="text-[#525252]" />
            </div>
            <span className="text-xs text-[#737373]">QR Code</span>
          </div>
          <button
            onClick={() => onViewQR(table)}
            className="text-xs text-[#00A79D] hover:underline"
          >
            View QR
          </button>
        </div>

        {/* Current Order Section */}
        <div className="border-t border-[#E5E5E5] pt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingBag size={14} className="text-[#525252]" />
              <span className="text-xs font-medium text-[#0A0A0A]">Current Order</span>
            </div>
            {table.currentOrder && (
              <button
                onClick={() => onViewOrder(table)}
                className="text-xs text-[#00A79D] hover:underline"
              >
                View Details
              </button>
            )}
          </div>
          {table.currentOrder ? (
            <div className="bg-[#F9F9F9] rounded-lg p-2">
              <p className="text-xs text-[#525252]">Customer: {table.currentOrder.customerName}</p>
              <p className="text-xs text-[#525252]">Items: {table.currentOrder.items.length}</p>
              <p className="text-xs font-medium text-[#0A0A0A] mt-1">Total: ₹{table.currentOrder.total}</p>
            </div>
          ) : (
            <p className="text-xs text-[#A3A3A3]">No active order</p>
          )}
        </div>

        {/* Statistics Section */}
        <div className="border-t border-[#E5E5E5] pt-3">
          <div className="flex justify-between text-xs">
            <span className="text-[#737373]">Total Orders</span>
            <span className="font-medium text-[#0A0A0A]">{table.totalOrders}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-[#737373]">Total Revenue</span>
            <span className="font-medium text-[#0A0A0A]">₹{table.totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-[#737373]">Last Order</span>
            <span className="font-medium text-[#0A0A0A]">{table.lastOrderDate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-[#E5E5E5] pt-3 flex gap-2">
          <button
            onClick={() => onEdit(table)}
            className="flex-1 py-1.5 rounded-lg border border-[#E5E5E5] text-xs font-medium text-[#525252] hover:bg-[#F2F2F2] transition flex items-center justify-center gap-1"
          >
            <Edit size={12} />
            Edit
          </button>
          <button
            onClick={() => onDelete(table)}
            className="flex-1 py-1.5 rounded-lg border border-red-200 text-xs font-medium text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-1"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Table Modal
function AddTableModal({ onClose, onAdd }: { onClose: () => void; onAdd: (tableNumber: number) => void }) {
  const [tableNumber, setTableNumber] = useState<number>(7);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableNumber <= 0) {
      setError("Table number must be positive");
      return;
    }
    onAdd(tableNumber);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] p-5">
          <h3 className="text-lg font-semibold text-[#0A0A0A]">Add New Table</h3>
          <button onClick={onClose} className="text-[#A3A3A3] hover:text-black">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#0A0A0A]">Table Number</label>
            <input
              type="number"
              required
              value={tableNumber}
              onChange={(e) => {
                setTableNumber(parseInt(e.target.value));
                setError("");
              }}
              className="w-full rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm focus:border-black focus:outline-none"
              placeholder="Enter table number"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#525252] hover:bg-[#F2F2F2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-[#333333]"
            >
              Add Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Tables Page Component
export default function TablesPage() {
  const [tables, setTables] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tableToDelete, setTableToDelete] = useState<TableData | null>(null);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const response = await fetch("/api/tables");
      const data = await response.json();
      if (data.success) {
        setTables(data.tables);
      }
    } catch (error) {
      console.error("Error loading tables:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTable = async (tableNumber: number) => {
    try {
      const response = await fetch("/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableNumber }),
      });
      const data = await response.json();
      if (data.success) {
        setTables([...tables, data.table]);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error("Error adding table:", error);
    }
  };

  const handleDeleteTable = async () => {
    if (!tableToDelete) return;
    try {
      const response = await fetch(`/api/tables?id=${tableToDelete.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setTables(tables.filter(t => t.id !== tableToDelete.id));
        setShowDeleteModal(false);
        setTableToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const stats = {
    total: tables.length,
    occupied: tables.filter(t => t.status === "occupied").length,
    available: tables.filter(t => t.status === "available").length,
    totalRevenue: tables.reduce((sum, t) => sum + t.totalRevenue, 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center lg:ml-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-[#737373]">Loading tables...</p>
        </div>
      </div>
    );
  }

  return (
    <div >

      <main >
        

        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Tables" value={stats.total.toString()} icon={Table} trend="+2 this month" />
            <StatCard title="Occupied" value={stats.occupied.toString()} icon={Coffee} trend="Currently seated" />
            <StatCard title="Available" value={stats.available.toString()} icon={CheckCircle} trend="Ready for guests" />
            <StatCard title="Total Revenue" value={`₹${(stats.totalRevenue / 1000).toFixed(1)}K`} icon={DollarSign} trend="From all tables" />
          </div>

          {/* Tables Grid */}
          {tables.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-[#E5E5E5]">
              <Table size={48} className="mx-auto text-[#A3A3A3] mb-3" />
              <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">No Tables Added</h3>
              <p className="text-sm text-[#737373] mb-4">Click the "Add Table" button to create your first table</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-[#333333]"
              >
                <Table size={16} />
                Add First Table
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tables.map((table) => (
                <TableCard
                  key={table.id}
                  table={table}
                  onViewQR={(t) => {
                    setSelectedTable(t);
                    setShowQRModal(true);
                  }}
                  onViewOrder={(t) => {
                    setSelectedTable(t);
                    setShowOrderModal(true);
                  }}
                  onEdit={(t) => {
                    // Edit functionality - can be implemented
                    alert(`Edit Table ${t.tableNumber} - Feature coming soon`);
                  }}
                  onDelete={(t) => {
                    setTableToDelete(t);
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showQRModal && (
        <QRCodeModal table={selectedTable} onClose={() => {
          setShowQRModal(false);
          setSelectedTable(null);
        }} />
      )}
      
      {showOrderModal && selectedTable && (
        <OrderDetailsModal 
          order={selectedTable.currentOrder} 
          tableNumber={selectedTable.tableNumber}
          onClose={() => {
            setShowOrderModal(false);
            setSelectedTable(null);
          }} 
        />
      )}
      
      {showDeleteModal && tableToDelete && (
        <DeleteConfirmModal 
          table={tableToDelete}
          onConfirm={handleDeleteTable}
          onClose={() => {
            setShowDeleteModal(false);
            setTableToDelete(null);
          }} 
        />
      )}
      
      {showAddModal && (
        <AddTableModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTable}
        />
      )}
    </div>
  );
}