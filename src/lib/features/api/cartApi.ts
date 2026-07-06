import { baseApi } from "./baseApi";

export interface DbCartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  specsText?: string;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
  };
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDbCart: builder.query<{ success: boolean; data: DbCartItem[] }, void>({
      query: () => "/cart",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Cart" as const, id })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    syncDbCart: builder.mutation<
      { success: boolean; data: DbCartItem[] },
      { items: Array<{ productId: string; quantity: number; specsText?: string }>; overwrite?: boolean }
    >({
      query: (body) => ({
        url: "/cart/sync",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    removeDbCartItem: builder.mutation<{ success: boolean }, { productId: string }>({
      query: ({ productId }) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    clearDbCart: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDbCartQuery,
  useSyncDbCartMutation,
  useRemoveDbCartItemMutation,
  useClearDbCartMutation,
} = cartApi;
