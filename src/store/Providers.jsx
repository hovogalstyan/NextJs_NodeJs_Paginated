'use client';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import photos from "@/store/reducer/photos";

const root = {
    photos
}

const store = configureStore({reducer: root})

export default function Providers({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}