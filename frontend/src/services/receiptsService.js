import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '@env';

export const receiptApi = createApi({
    reducerPath: "receiptsApi",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        postReceipt: builder.mutation({
            query: ({...receipt})=>({
                url: '/api/receipts/add',
                method: 'POST',
                body:receipt
            })
        }),
        getUserReceipts: builder.query({
            query: (obj) => `/api/receipts/user/${obj.uid}`
        })
    })

})

export const {usePostReceiptMutation, useGetUserReceiptsQuery} = receiptApi