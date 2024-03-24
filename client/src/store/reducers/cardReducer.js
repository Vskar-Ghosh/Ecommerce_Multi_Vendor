import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { base_url } from "../../utils/config";

export const add_to_card = createAsyncThunk(
  "card/add_to_card",
  async (info, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/product/add-to-card`,
        info,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_card_products = createAsyncThunk(
  "card/get_card_products",
  async (userId, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/product/get-card-product/${userId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_card_product = createAsyncThunk(
  "card/delete_card_product",
  async (cardId, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${base_url}/api/home/product/delete-card-product/${cardId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const quantity_inc = createAsyncThunk(
  "card/quantity_inc",
  async (cardId, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/home/product/qunatity-inc/${cardId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const quantity_dec = createAsyncThunk(
  "card/quantity_dec",
  async (cardId, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/home/product/qunatity-dec/${cardId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/product/add-to-wishlist`,
        info,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_wishlist_products = createAsyncThunk(
  "wishlist/get_wishlist_products",
  async (userId, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/product/get-wishlist-products/${userId}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const remove_wishlist = createAsyncThunk(
  "wishlist/remove_wishlist",
  async (wishlistId, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${base_url}/api/home/product/delete-wishlist-product/${wishlistId}`,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cardReducerr = createSlice({
  name: "card",
  initialState: {
    card_products: [],
    card_products_count: 0,
    wishlist_count: 0,
    price: 0,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    outOfStockProduct: [],
    buy_product_item: 0,
    wishlists: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    reset_count: (state, _) => {
      state.card_products_count = 0;
      state.wishlist_count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(add_to_card.pending, (state, _) => {
      //     state.loader = true;
      //   })
      .addCase(add_to_card.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(add_to_card.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.card_products_count = state.card_products_count + 1;
      })
      .addCase(get_card_products.fulfilled, (state, { payload }) => {
        state.card_products = payload.card_products;
        state.price = payload.price;
        state.card_products_count = payload.card_products_count;
        state.shipping_fee = payload.shipping_fee;
        state.outOfStockProduct = payload.outOfStockProduct;
        state.buy_product_item = payload.buy_product_item;
      })
      .addCase(delete_card_product.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(quantity_inc.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(quantity_dec.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(add_to_wishlist.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.wishlist_count =
          state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
      })
      .addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
        state.wishlists = payload.wishlists;
        state.wishlist_count = payload.wishlistCount;
      })
      .addCase(remove_wishlist.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.wishlists = state.wishlists.filter(
          (p) => p._id !== payload.wishlistId
        );
        state.wishlist_count = state.wishlist_count - 1;
      });
  },
});

export const { messageClear, reset_count } = cardReducerr.actions;
export default cardReducerr.reducer;
