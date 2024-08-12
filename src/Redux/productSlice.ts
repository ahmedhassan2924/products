import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  name: '',
  price: '',
  quantity: '',
  description: '',
  cameraPhoto: null,
  modalVisible: false,
  selectedProduct: null,
  isEdit: false,
};
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCameraPhoto: (state, action) => {
      state.cameraPhoto = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const index = state.products.findIndex(item => item.id == productId);
      state.products.splice(index, 1);
    },

    updateProductQuantity: (state, action) => {
      const cartItems = action.payload;

      cartItems.forEach(cartItem => {
        const index = state.products.findIndex(
          item => item.id == cartItem.productId,
        );

        state.products[index].quantity =
          parseInt(state.products[index].quantity) - 1;
      });
    },
  },
});

export const {
  setProducts,
  setCameraPhoto,
  setDescription,
  setIsEdit,
  setModalVisible,
  setName,
  setPrice,
  setSelectedProduct,
  setQuantity,
  deleteProduct,
  updateProductQuantity,
} = productSlice.actions;

export default productSlice.reducer;
