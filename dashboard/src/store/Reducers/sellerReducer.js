import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import api from "../../api/api";
import axios from "axios";
import { base_url } from "../../utils/config";

export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async (sellerId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/get-seller/${sellerId}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/seller-status-update`,
        info,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_active_sellers = createAsyncThunk(
  "seller/get_active_sellers",
  async (
    { page, searchValue, parPage },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_deactive_sellers = createAsyncThunk(
  "seller/get_deactive_sellers",
  async (
    { page, searchValue, parPage },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const create_stripe_connect_account = createAsyncThunk(
  "seller/create_stripe_connect_account",
  async (_, { getState }) => {
    console.log("reducer");
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      console.log("In try block");
      const {
        data: { url },
      } = await axios.get(
        `${base_url}/api/payment/create-stripe-connect-account`,
        config
      );
      window.location.href = url;
    } catch (error) {
      console.log("error in csca");
    }
  }
);

export const active_stripe_connect_account = createAsyncThunk(
  "seller/active_stripe_connect_account",
  async (activeCode, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/payment/active-stripe-connect-account/${activeCode}`,
        {},
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.totalSeller = payload.totalSeller;
        state.sellers = payload.sellers;
      })
      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })
      .addCase(seller_status_update.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message;
      })
      .addCase(get_active_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(active_stripe_connect_account.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(
        active_stripe_connect_account.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.successMessage = payload.message;
        }
      );
  },
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
