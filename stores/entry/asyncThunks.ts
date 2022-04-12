import { createAsyncThunk } from '@reduxjs/toolkit'
export const addFavorite = createAsyncThunk(
    'entry/addFavorite',
    async (entryKey: string, thunkAPI) => {
        const response: Response = await fetch("/api/entries/1/favorites", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({hello: "world"})
        });
        return { entryKey }
    }
  )