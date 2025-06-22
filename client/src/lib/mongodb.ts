// This file would typically contain MongoDB connection logic for the client
// In our case, the client communicates with the server via REST API
// This file serves as a placeholder for any client-side database utilities

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const formatMongoDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatMongoCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
