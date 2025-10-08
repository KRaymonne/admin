export type TypeCurrency = 'XOF' | 'EUR' | 'USD' | 'CFA' | 'GNF' | 'MAD' | 'FCFA' | 'XAF' | 'XPF' | 'CAD' | 'GBP' | 'CHF' | 'JPY' | 'CNY';
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive';
}

export interface Contact {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  group: string;
  company?: string;
  address: string;
  country?: string;
  email: string;
  cellPhone1: string;
  cellPhone2?: string;
  landlinePhone?: string;
  registrationDate: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  location: string;
  purchaseDate: string;
  value: number;
  assignedTo?: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  type: 'car' | 'truck' | 'van';
  year: number;
  mileage: number;
  status: 'available' | 'in-use' | 'maintenance';
  assignedTo?: string;
}

export interface Offer {
  id?: string;
  _id?: string;
  // Champs AMI
  activityCode?: string;
  depositDate?: string;
  name?: string;
  client?: string;
  contact?: string;
  submissionDate?: string;
  object?: string;
  status?: string;
  comment?: string;
  file?: any;
  // Champs DAO
  transmissionDate?: string;
  daoNumber?: string;
  submissionType?: string;
  conversionRate?: string;
  // Champs Devis
  indexNumber?: string;
  amount?: string | number;
  validityDate?: string;
  description?: string;
  currency?: TypeCurrency; // Uniquement pour DEVIS
  // Champs communs
  category?: string;
  // Pour compatibilité ancienne structure
  title?: string;
  price?: number;
  validFrom?: string;
  validTo?: string;
}

export interface Business {
  _id?: string; // MongoDB document ID
  businessId?: string; // Optional business identifier
  id?: string; // For compatibility with frontend logic
  name: string;
  client: string;
  contact?: string;
  value: number;
  currency: 'EUR' | 'USD' | 'GBP' | 'CFA' | 'XAF';
  status: 'prospect' | 'negotiation' | 'won' | 'lost';
  progress: number;
  startDate: string;
  expectedCloseDate: string;
  estimatedCost?: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  type: 'deadline' | 'payment' | 'maintenance' | 'contract';
  status: 'pending' | 'completed';
}

export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BankAccount {
  _id?: string; // MongoDB
  id?: string; // For frontend compatibility
  name: string;
  accountNumber?: string;
  balance: number;
  type: 'checking' | 'savings' | 'business' | 'Compte courant' | 'Compte épargne' | 'Compte projet' | 'investment';
  currency?: string;
  description?: string;
  transactions?: Transaction[];
  [key: string]: any;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
}

export interface CashRegister {
  id: string;
  name: string;
  location: string;
  balance: number;
  transactions: CashTransaction[];
}

export interface CashTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'in' | 'out';
}

export interface Tax {
  id: string;
  name: string;
  type: 'VAT' | 'corporate' | 'payroll';
  rate: number;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid';
}

export interface Record {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // Allow for additional properties
}

export interface RecordField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'email' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: any;
}