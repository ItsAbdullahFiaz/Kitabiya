import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';

// Define product type
export interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
  condition: string;
  type: string;
  language: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

// Query keys as constants
export const QUERY_KEYS = {
  MY_PRODUCTS: 'myProducts',
  ALL_PRODUCTS: 'products'
} as const;

// Custom hook for fetching products
export const useProducts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ALL_PRODUCTS,
    queryFn: async () => {
      const response = await apiService.getProducts();
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch products');
      }
      return response.data.products as Product[];
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
  });
};

// Custom hook for creating a product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: FormData) => apiService.createProduct(productData),
    onSuccess: (response) => {
      // Invalidate both queries to trigger refetch
      queryClient.invalidateQueries([QUERY_KEYS.MY_PRODUCTS]);
      queryClient.invalidateQueries([QUERY_KEYS.ALL_PRODUCTS]);
      
      // Optionally, update the cache optimistically
      queryClient.setQueryData([QUERY_KEYS.MY_PRODUCTS], (oldData: any[] = []) => {
        return [response.data, ...oldData];
      });
    },
  });
};

// Custom hook for fetching my products
export const useMyProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_PRODUCTS],
    queryFn: async () => {
      const response = await apiService.getMyProducts();
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch my products');
      }
      return response.data || [];
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

// Custom hook for deleting a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => apiService.deleteProduct(productId),
    onSuccess: () => {
      // Invalidate both queries to trigger refetch
      queryClient.invalidateQueries([QUERY_KEYS.MY_PRODUCTS]);
      queryClient.invalidateQueries([QUERY_KEYS.ALL_PRODUCTS]);
    },
  });
}; 