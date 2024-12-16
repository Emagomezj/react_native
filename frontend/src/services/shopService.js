import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from '@env';

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/api/categories/all'
        }),
        getProducts: builder.query({
            query: (object) => `/api/products?page=${object?.page}&limit=${object?.limit}&categories=${object?.categories}`
        }),

        filterProductsByCategory: builder.query({
            query: (categories) => `/api/products?${categories.map(category => `categories=${encodeURIComponent(category)}`).join('&')}`
        }),

        getProductById: builder.query({
            query: (id) => `/api/products/${id}`
        }),

        getUserProducts: builder.query({
            query: (id) => `/api/products/user/${id}`
        }),
        uploadProduct: builder.mutation({
            query: (formData) => ({
              url: '/api/products/add',
              method: 'POST',
              body: formData,
            //   headers: {
            //     Authorization: `Bearer ${token}`, 
            //   },
            }),
          }),
    })
});

export const {useGetCategoriesQuery, useGetProductsQuery, useGetProductByIdQuery, useFilterProductsByCategoryQuery, useGetUserProductsQuery, useUploadProductMutation} = shopApi