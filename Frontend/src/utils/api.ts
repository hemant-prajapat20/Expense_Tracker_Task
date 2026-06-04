import axios from 'axios';
import { Expense, ExpenseSummary } from '../types';

const API_URL = 'http://localhost:5000/api/expenses';

export const fetchExpenses = async (filters?: { category?: string; startDate?: string; endDate?: string }) => {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);

  const response = await axios.get<Expense[]>(`${API_URL}?${params.toString()}`);
  return response.data;
};

export const fetchSummary = async () => {
  const response = await axios.get<ExpenseSummary>(`${API_URL}/summary`);
  return response.data;
};

export const createExpense = async (expense: Omit<Expense, 'id'>) => {
  const response = await axios.post<Expense>(API_URL, expense);
  return response.data;
};

export const updateExpense = async (id: string, expense: Partial<Expense>) => {
  const response = await axios.put<Expense>(`${API_URL}/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
