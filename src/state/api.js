import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Update the base URL
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "PakistanGeography",
    "Sales",
    "Pathologists",
    "Performance",
    "Dashboard",
    "Tests",
    "Admins"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getTests: build.query({
      // query: () => "client/tests",
      query: () => "client/medical-tests",
      providesTags: ["Tests"],
    }),

    deleteTest: build.mutation({
      query: (id) => ({
        url: `client/medical-tests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tests"],
    }),

    
    getPateint: build.query({
      query: () => "client/patients",
      providesTags: ["Patient"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getPakistanGeography: build.query({
      query: () => "client/geography/pakistan", // Update the endpoint URL
      providesTags: ["PakistanGeography"], // Add a new tag for PakistanGeography
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    addAdmin: build.mutation({
      query: (newAdmin) => ({
        url: "management/admins",
        method: "POST",
        body: newAdmin,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateAdmin: build.mutation({
      query: ({ id, updatedAdmin }) => ({
        url: `management/admins/${id}`,
        method: "PUT",
        body: updatedAdmin,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `management/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),



    getPathologists: build.query({
      query: () => "management/pathologists",
      providesTags: ["Pathologists"],
    }),
    addPathologist: build.mutation({
      query: (newPathologist) => ({
        url: "management/pathologists",
        method: "POST",
        body: newPathologist,
      }),
      invalidatesTags: ["Pathologists"],
    }),
    updatePathologist: build.mutation({
      query: ({ id, updatedPathologist }) => ({
        url: `management/pathologists/${id}`,
        method: "PUT",
        body: updatedPathologist,
      }),
      invalidatesTags: ["Pathologists"],
    }),
    deletePathologist: build.mutation({
      query: (id) => ({
        url: `management/pathologists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pathologists"],
    }),

  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetTestsQuery,
  useGetPateintQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useGetPathologistsQuery,
  useAddPathologistMutation,
  useUpdatePathologistMutation,
  useDeletePathologistMutation,

  useGetAdminsQuery,
  useAddAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,

  useGetPakistanGeographyQuery,
  useDeleteTestMutation,
} = api;
