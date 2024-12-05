import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from '@env';

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (builder) => ({
        getHomeData: builder.query({
            query: () => '/api/home/'
        })
    })
});

export const {useGetHomeDataQuery} = homeApi