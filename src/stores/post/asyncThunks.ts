import { createAsyncThunk } from '@reduxjs/toolkit'
export const addFavorite = createAsyncThunk(
    'post/addFavorite',
    async (postKey: string, thunkAPI) => {
        const response: Response = await fetch("/api/posts/1/favorites", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({hello: "world"})
        });
        return { postKey }
    }
  )