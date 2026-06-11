// In-memory store (no DB needed for initial deploy)
export type Customer = { id: string; name: string; email: string; phone: string; address: string; createdAt: string; };
export type Job = { id: string; customerId: string; customerName: string; title: string; jobType: string; date: string; time: string; status: string; notes: string; createdAt: string; };
export type InvoiceItem = { description: string; quantity: number; unitPrice: number; };
export type Invoice = { id: string; number: string; customerId: string; customerName: string; customerEmail: string; customerAddress: string; items: InvoiceItem[]; total: number; status: string; date: string; dueDate: string; notes: string; createdAt: string; };
export type Quote = { id: string; customerId: string; customerName: string; template: string; items: InvoiceItem[]; total: number; status: string; date: string; notes: string; createdAt: string; };

// Seed data
let customers: Customer[] = [
  { id: "1", name: "John Smith", email: "john@example.com", phone: "07700 900001", address: "12 Oak Street, Norwich, NR1 2AB", createdAt: new Date().toISOString() },
];

let jobs: Job[] = [
  { id: "1", customerId: "1", customerName: "John Smith", title: "Annual Boiler Service", jobType: "Boiler Service", date: new Date().toISOString().split("T")[0], time: "09:00", status: "scheduled", notes: "", createdAt: new Date().toISOString() },
];

let invoices: Invoice[] = [
  { id: "1", number: "INV-001", customerId: "1", customerName: "John Smith", customerEmail: "john@example.com", customerAddress: "12 Oak Street, Norwich, NR1 2AB", items: [{ description: "Annual Boiler Service", quantity: 1, unitPrice: 85 }], total: 85, status: "outstanding", date: new Date().toISOString().split("T")[0], dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0], notes: "", createdAt: new Date().toISOString() },
];

let quotes: Quote[] = [];

let invoiceCounter = 2;

export const store = {
  getCustomers: () => customers,
  getCustomer: (id: string) => customers.find(c => c.id === id),
  addCustomer: (c: Omit<Customer, "id" | "createdAt">) => {
    const n = { ...c, id: Date.now().toString(), createdAt: new Date().toISOString() };
    customers.push(n); return n;
  },
  getJobs: () => jobs,
  addJob: (j: Omit<Job, "id" | "createdAt">) => {
    const n = { ...j, id: Date.now().toString(), createdAt: new Date().toISOString() };
    jobs.push(n); return n;
  },
  updateJob: (id: string, data: Partial<Job>) => {
    jobs = jobs.map(j => j.id === id ? { ...j, ...data } : j);
    return jobs.find(j => j.id === id);
  },
  getInvoices: () => invoices,
  getInvoice: (id: string) => invoices.find(i => i.id === id),
  addInvoice: (inv: Omit<Invoice, "id" | "number" | "createdAt">) => {
    const n = { ...inv, id: Date.now().toString(), number: `INV-${String(invoiceCounter++).padStart(3, "0")}`, createdAt: new Date().toISOString() };
    invoices.push(n); return n;
  },
  updateInvoice: (id: string, data: Partial<Invoice>) => {
    invoices = invoices.map(i => i.id === id ? { ...i, ...data } : i);
    return invoices.find(i => i.id === id);
  },
  getQuotes: () => quotes,
  addQuote: (q: Omit<Quote, "id" | "createdAt">) => {
    const n = { ...q, id: Date.now().toString(), createdAt: new Date().toISOString() };
    quotes.push(n); return n;
  },
};

export const QUOTE_TEMPLATES = [
  { name: "Boiler Service", items: [{ description: "Annual Boiler Service & Safety Check", quantity: 1, unitPrice: 85 }] },
  { name: "CP12 Gas Safety Certificate", items: [{ description: "Gas Safety Certificate (CP12) — up to 2 appliances", quantity: 1, unitPrice: 65 }, { description: "Additional appliance", quantity: 0, unitPrice: 15 }] },
  { name: "Emergency Callout", items: [{ description: "Emergency Callout (first hour)", quantity: 1, unitPrice: 120 }, { description: "Additional labour (per hour)", quantity: 0, unitPrice: 65 }] },
  { name: "General Plumbing", items: [{ description: "Labour (per hour)", quantity: 1, unitPrice: 65 }, { description: "Parts & materials", quantity: 1, unitPrice: 0 }] },
];
