import { createAsyncThunk, EntityId } from '@reduxjs/toolkit'
export const addFavorite = createAsyncThunk(
    'posts/addFavorite',
    async (postId: EntityId, thunkAPI) => {
        const response: Response = await fetch(`/api/posts/${postId}/favorites`, {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({hello: "world"})
        });
        return { postId }
    }
  )