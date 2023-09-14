import {createSlice} from "@reduxjs/toolkit";
import {getPhotosPaginated} from "@/store/action";

const initialState = {
    data: {},
    isLoading: false,
    errorMassage: null
}

const photosSlice = createSlice({
    name: 'photos/slice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPhotosPaginated.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPhotosPaginated.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(getPhotosPaginated.rejected, (state, action) => {
                state.errorMassage = action.payload
            })
    }
})

export default photosSlice.reducer