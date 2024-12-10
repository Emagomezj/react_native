import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from '@env';

export const sessionApi = createApi({
    reducerPath: 'sessionApi',
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (builder) => ({
        postLogin: builder.mutation({
            query: ({...credentials}) => ({
                url: '/api/session/login',
                method: 'POST',
                body: credentials
            })
        })
    })
});

export const {usePostLoginMutation} = sessionApi;