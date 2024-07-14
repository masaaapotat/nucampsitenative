import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing the favorites state
const favoritesSlice = createSlice({
  name: "favorites", // Name of the slice
  initialState: [], // Initial state is an empty array
  reducers: {
    // Reducer function to add or remove favorites
    toggleFavorite: (favorites, action) => {
        // If the payload is already in the favorites array, remove it
        if (favorites.includes(action.payload)) {
          // Return a new array without the removed item
          return favorites.filter((favorite) => favorite !== action.payload);
        } else {
            // If the payload is not in the favorites array, add it
            favorites.push(action.payload);
        }
    },
  },
});

// Export the action creator for toggling favorites
export const { toggleFavorite } = favoritesSlice.actions;
// Export the reducer to be used in the store
export const favoritesReducer = favoritesSlice.reducer;



