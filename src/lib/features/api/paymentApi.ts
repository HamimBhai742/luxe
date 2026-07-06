import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      { success: boolean; data: { clientSecret: string } },
      {
        amount: number;
        email: string;
        name: string;
        phone: string;
        address: {
          line1: string;
          line2?: string;
          city: string;
          state: string;
          postal_code: string;
          country: string;
        };
      }
    >({
      query: (body) => ({
        url: "/payments/create-payment-intent",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePaymentIntentMutation } = paymentApi;
