import { baseApi } from "./baseApi";
import { Product } from "./productApi";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<{ success: boolean; data: Product[] }, void>({
      query: () => "/wishlist",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Wishlist" as const, id })),
              { type: "Wishlist", id: "LIST" },
            ]
          : [{ type: "Wishlist", id: "LIST" }],
    }),
    addToWishlist: builder.mutation<{ success: boolean; data: Product }, { productId: string }>({
      query: (body) => ({
        url: "/wishlist",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
    removeFromWishlist: builder.mutation<{ success: boolean; message: string }, { productId: string }>({
      query: ({ productId }) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
