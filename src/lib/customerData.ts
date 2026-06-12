// src/lib/customerData.ts
export interface Customer {
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

// Generate dummy customers
export const generateDummyCustomers = (): Customer[] => {
  const firstNames = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Pranav", "Dhruv", "Krishna", "Shaurya",
    "Ananya", "Diya", "Ishita", "Aaradhya", "Sanya", "Navya", "Myra", "Aadhya", "Anika", "Sara",
    "Rohan", "Neha", "Priya", "Amit", "Rahul", "Pooja", "Karan", "Simran", "Raj", "Meera"
  ];
  
  const lastNames = [
    "Sharma", "Verma", "Gupta", "Kumar", "Singh", "Patel", "Reddy", "Rao", "Nair", "Menon",
    "Joshi", "Khan", "Das", "Malhotra", "Mehta", "Choudhary", "Thakur", "Yadav", "Sinha", "Kapoor"
  ];
  
  const customers: Customer[] = [];
  
  for (let i = 0; i < 70; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const orders = Math.floor(Math.random() * 50) + 1;
    const totalSpent = orders * (Math.floor(Math.random() * 800) + 200);
    const statusNum = Math.random();
    const status = statusNum > 0.85 ? "vip" : statusNum > 0.5 ? "active" : "inactive";
    
    customers.push({
      id: `CUST${String(i + 1).padStart(4, "0")}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      orders,
      totalSpent,
      lastOrder: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    });
  }
  
  return customers;
};