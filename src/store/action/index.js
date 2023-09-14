import {createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "@/store/Api";


export const getPhotosPaginated = createAsyncThunk('get/photos-paginated', async (arg={}, thunkAPI) => {
    try {
        const {page, limit} = arg
        const {data} = await Api.getPhotos(page, limit)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response)
    }
})