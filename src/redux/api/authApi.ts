import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: build.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["User"],
    }),
    providerLogin: build.mutation({
      query: (payload) => ({
        url: "/auth/provider",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["User"],
    }),
    me: build.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useMeQuery,
  useProviderLoginMutation,
} = authApi;
