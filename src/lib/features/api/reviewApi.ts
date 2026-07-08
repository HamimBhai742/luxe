import { baseApi } from "./baseApi";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
  };
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkReviewEligibility: builder.query<
      { success: boolean; eligible: boolean; message?: string },
      string
    >({
      query: (productId) => `/reviews/eligibility/${productId}`,
    }),
    submitReview: builder.mutation<
      { success: boolean; message: string; data: Review },
      { productId: string; rating: number; comment: string }
    >({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Products", id: productId },
        { type: "Products", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useCheckReviewEligibilityQuery, useSubmitReviewMutation } = reviewApi;
export default reviewApi;
