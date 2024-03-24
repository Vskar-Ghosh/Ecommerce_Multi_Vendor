import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { base_url } from "../../utils/config";

export const get_category = createAsyncThunk(
  "category/get_categoory",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/home/get-categorys`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/home/get-products`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);
export const get_product = createAsyncThunk(
  "product/get_product",
  async (slug, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/get-product/${slug}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const price_range_product = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/price-range-latest-products`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/query-products?category=${
          query.category
        }&&pageNumber=${query.pageNumber}&&rateingQ=${
          query.rateingQ
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${
          query.sortPrice
        }&&searchValue=${query.searchValue ? query.searchValue : ""}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/customer/submit-review`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const get_review = createAsyncThunk(
  "review/get_review",
  async ({ productId, pageNumber }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const get_banners = createAsyncThunk(
  "banner/get_banners",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/banners`);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    totalProduct: 0,
    parPage: 12,
    latest_product: [],
    topRated_product: [],
    discount_product: [],
    priceRange: {
      low: 0,
      high: 2000,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: "",
    errorMessage: "",
    reviews: [],
    totalReview: 0,
    rating_review: [],
    banners: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.categorys = payload.categorys;
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.latest_product = payload.latest_product;
        state.topRated_product = payload.topRated_product;
        state.discount_product = payload.discount_product;
      })
      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.relatedProducts = payload.relatedProducts;
        state.moreProducts = payload.moreProducts;
      })
      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        state.priceRange = payload.priceRange;
        state.latest_product = payload.latest_product;
      })
      .addCase(query_products.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.products = payload.products;
        state.parPage = payload.parPage;
      })
      .addCase(customer_review.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(get_review.fulfilled, (state, { payload }) => {
        state.totalReview = payload.totalReview;
        state.rating_review = payload.rating_review;
        state.reviews = payload.reviews;
      })
      .addCase(get_banners.fulfilled, (state, { payload }) => {
        state.banners = payload.banners;
      });
    //   .addCase(categoryAdd.pending, (state, _) => {
    //     state.loader = true;
    //   })
    //   .addCase(categoryAdd.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //   })
    //   .addCase(categoryAdd.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.successMessage = payload.message;
    //     state.categorys = [...state.categorys, payload.category];
    //   })
  },
});

export const { messageClear } = homeReducer.actions;

export default homeReducer.reducer;
