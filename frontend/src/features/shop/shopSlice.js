import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: 'shop',
    initialState:{
        value: {
            categories: [],
            products: [],
            categoriesSelected: [],
        }
    },
    reducers:{
        setCategory : (state, action) => {
            state.value.categoriesSelected = action.payload
        }
    }
})

export const {setCategory} = shopSlice.actions

export default shopSlice.reducer