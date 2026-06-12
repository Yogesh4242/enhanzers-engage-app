// src/app/api/tables/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface Table {
  id: string;
  tableNumber: number;
  qrCode: string;
  status: "available" | "occupied" | "reserved" | "cleaning";
  currentOrder: {
    id: string;
    items: OrderItem[];
    total: number;
    customerName: string;
    orderTime: string;
  } | null;
  lastOrderDate: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Path to our JSON file
const dataFilePath = path.join(process.cwd(), "src", "data", "tables.json");

// Generate QR code (simulated - in production use actual QR library)
const generateQRCode = (tableNumber: number): string => {
  return `https://enhanzers-engage.com/order/table/${tableNumber}/${Date.now()}`;
};

// Generate dummy tables
const generateDummyTables = (): Table[] => {
  const tables: Table[] = [];
  const itemNames = [
    "Margherita Pizza", "Butter Chicken", "Biryani", "Garlic Bread", 
    "Caesar Salad", "French Fries", "Chocolate Brownie", "Cold Coffee",
    "Paneer Tikka", "Chicken Wings", "Pasta Alfredo", "Nachos"
  ];
  
  for (let i = 1; i <= 6; i++) {
    const hasActiveOrder = Math.random() > 0.6;
    const statusOptions: ("available" | "occupied" | "reserved" | "cleaning")[] = 
      ["available", "occupied", "reserved", "cleaning"];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    
    const totalOrders = Math.floor(Math.random() * 50) + 5;
    const totalRevenue = totalOrders * (Math.floor(Math.random() * 800) + 300);
    
    let currentOrder = null;
    if (hasActiveOrder && (status === "occupied" || status === "reserved")) {
      const itemCount = Math.floor(Math.random() * 4) + 1;
      const items: OrderItem[] = [];
      let orderTotal = 0;
      
      for (let j = 0; j < itemCount; j++) {
        const price = Math.floor(Math.random() * 300) + 100;
        const quantity = Math.floor(Math.random() * 3) + 1;
        orderTotal += price * quantity;
        items.push({
          id: `ITEM${j + 1}`,
          name: itemNames[Math.floor(Math.random() * itemNames.length)],
          quantity,
          price,
        });
      }
      
      currentOrder = {
        id: `ORD${Date.now()}${i}`,
        items,
        total: orderTotal,
        customerName: `Customer ${String.fromCharCode(64 + i)}`,
        orderTime: new Date().toLocaleTimeString(),
      };
    }
    
    tables.push({
      id: `TBL${String(i).padStart(3, "0")}`,
      tableNumber: i,
      qrCode: generateQRCode(i),
      status,
      currentOrder,
      lastOrderDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      totalOrders,
      totalRevenue,
    });
  }
  
  return tables;
};

// Helper function to read tables from file
function readTablesFromFile(): Table[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      const dir = path.dirname(dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify({ tables: [] }, null, 2));
      return [];
    }
    
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);
    return data.tables || [];
  } catch (error) {
    console.error("Error reading tables file:", error);
    return [];
  }
}

// Helper function to write tables to file
function writeTablesToFile(tables: Table[]): void {
  try {
    const data = { tables };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing tables file:", error);
  }
}

// GET - Fetch all tables
export async function GET() {
  let tables = readTablesFromFile();
  
  if (tables.length === 0) {
    tables = generateDummyTables();
    writeTablesToFile(tables);
  }
  
  return NextResponse.json({ success: true, tables });
}

// POST - Add a new table
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tables = readTablesFromFile();
    
    const newTable: Table = {
      id: `TBL${String(tables.length + 1).padStart(3, "0")}`,
      tableNumber: body.tableNumber,
      qrCode: generateQRCode(body.tableNumber),
      status: "available",
      currentOrder: null,
      lastOrderDate: new Date().toISOString().split("T")[0],
      totalOrders: 0,
      totalRevenue: 0,
    };
    
    tables.push(newTable);
    writeTablesToFile(tables);
    
    return NextResponse.json({ success: true, table: newTable });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add table" }, { status: 500 });
  }
}

// PUT - Update table status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, order } = body;
    
    let tables = readTablesFromFile();
    const index = tables.findIndex(t => t.id === id);
    
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Table not found" }, { status: 404 });
    }
    
    if (status) tables[index].status = status;
    if (order !== undefined) tables[index].currentOrder = order;
    
    writeTablesToFile(tables);
    
    return NextResponse.json({ success: true, table: tables[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update table" }, { status: 500 });
  }
}

// DELETE - Delete a table
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Table ID required" }, { status: 400 });
    }
    
    let tables = readTablesFromFile();
    tables = tables.filter(t => t.id !== id);
    writeTablesToFile(tables);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete table" }, { status: 500 });
  }
}