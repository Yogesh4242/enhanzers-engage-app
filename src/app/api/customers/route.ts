// src/app/api/customers/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Customer, generateDummyCustomers } from "@/lib/customerData";

// Path to our JSON file
const dataFilePath = path.join(process.cwd(), "src", "data", "customers.json");

// Helper function to read customers from file
function readCustomersFromFile(): Customer[] {
  try {
    // Check if file exists
    if (!fs.existsSync(dataFilePath)) {
      // Create directory if it doesn't exist
      const dir = path.dirname(dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // Create initial file with empty array
      fs.writeFileSync(dataFilePath, JSON.stringify({ customers: [] }, null, 2));
      return [];
    }
    
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);
    return data.customers || [];
  } catch (error) {
    console.error("Error reading customers file:", error);
    return [];
  }
}

// Helper function to write customers to file
function writeCustomersToFile(customers: Customer[]): void {
  try {
    const data = { customers };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing customers file:", error);
  }
}

// GET - Fetch all customers
export async function GET() {
  let customers = readCustomersFromFile();
  
  // If no customers exist, generate dummy data
  if (customers.length === 0) {
    customers = generateDummyCustomers();
    writeCustomersToFile(customers);
  }
  
  return NextResponse.json({ success: true, customers });
}

// POST - Add a new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const customers = readCustomersFromFile();
    
    const newCustomer: Customer = {
      id: `CUST${String(customers.length + 1).padStart(4, "0")}`,
      name: body.name,
      email: body.email,
      phone: body.phone,
      orders: body.orders || 0,
      totalSpent: body.totalSpent || 0,
      lastOrder: body.lastOrder || new Date().toISOString().split("T")[0],
      status: body.status || "active",
      joinDate: body.joinDate || new Date().toISOString().split("T")[0],
    };
    
    customers.push(newCustomer);
    writeCustomersToFile(customers);
    
    return NextResponse.json({ success: true, customer: newCustomer });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add customer" }, { status: 500 });
  }
}

// DELETE - Delete a customer
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Customer ID required" }, { status: 400 });
    }
    
    let customers = readCustomersFromFile();
    customers = customers.filter(c => c.id !== id);
    writeCustomersToFile(customers);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete customer" }, { status: 500 });
  }
}

// PUT - Update a customer
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    let customers = readCustomersFromFile();
    const index = customers.findIndex(c => c.id === id);
    
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Customer not found" }, { status: 404 });
    }
    
    customers[index] = { ...customers[index], ...updates };
    writeCustomersToFile(customers);
    
    return NextResponse.json({ success: true, customer: customers[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update customer" }, { status: 500 });
  }
}