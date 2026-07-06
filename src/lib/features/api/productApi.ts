import { baseApi } from "./baseApi";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  sku: string;
  barcode?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<{ success: boolean; data: Product[] }, void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProductsQuery } = productApi;
