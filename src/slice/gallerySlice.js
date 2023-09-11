import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  images: [],
  isLoading: false,
  error: '',
  searchText:''
}

 

const BASE_URL = 'https://mysplash.onrender.com/api/images'

export const getImages = createAsyncThunk(
  "images/getImages",
  async(_, {rejectWithValue}) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jsonResponse = response.json();
      return jsonResponse
    } else {
      return rejectWithValue({error:'No Image found'})
    }
  }
)

export const postImage = createAsyncThunk(
  "images/postImage",
  async (image, { rejectWithValue }) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(image),
      headers: {
        "Content-type":"application/json; charset=UTF-8"
      }
    }
    const response = await fetch(BASE_URL,options);
    if (response.ok) {
      const jsonResponse = response.json();
      return jsonResponse
    } else {
      return rejectWithValue({error:'Images not added'})
    }
  }
)

export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (id, { rejectWithValue }) => {
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(`${BASE_URL}/${id}`,options);
    if (response.ok) {
      const jsonResponse = response.json();
      return jsonResponse
    } else {
      return rejectWithValue({error:'Images not deleted'})
    }
  }
)

const gallerySlice = createSlice({
  name: 'gallerySlice',
  initialState,
  reducers: {
    removeImage: (state, action) => {
      state.images = state.images.filter((img) => img._id !== action.payload);     
    },
    searchImage: (state, action) => {
      state.searchText = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getImages.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getImages.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = ''
        state.images = action.payload
      })
      .addCase(getImages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.images = []
      })
      .addCase(postImage.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = ''
        state.images.push(action.payload)
      })
      .addCase(postImage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(postImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = ''
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true
      })
  },
})

export const { searchImage, removeImage } = gallerySlice.actions;
export default gallerySlice.reducer;