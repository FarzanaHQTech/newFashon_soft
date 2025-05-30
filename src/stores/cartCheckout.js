import { defineStore } from "pinia";
import { frontendApi } from "../api";


export const useCartCheckoutStore = defineStore("cartCheckout", {
  state: () => ({
    cartItems: [],
    couponCode: "",
    couponDiscount: 0,
    shippingCharge: 80,
    customer: {
      name: "",
      mobile: "",
      address: "",
    },
    payingMethod: "cash_on_delivery",
    loading: false,
    error: null,
    orderResponse: null,
  }),

  getters: {
    subtotal() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    totalDiscount() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.discount * item.quantity,
        0
      );
    },
    grandTotal() {
      return this.subtotal - this.couponDiscount + this.shippingCharge;
    },

  cartCount() {
  if (!Array.isArray(this.cartItems)) return 0;
  return this.cartItems.reduce((total, item) => {
    const quantity = parseInt(item.quantity) || 0;
    console.log(`Item ${item.product_id} quantity:`, quantity); // Debug log
    return total + quantity;
  }, 0);
},
  },

  actions: {
    // ✅ Add to Cart

    findCartItem(productData) {
      return this.cartItems.find(
        (item) =>
          item.product_id === productData.product_id &&
          item.variant_1 === (productData.variant_1 || null) &&
          item.variant_2 === (productData.variant_2 || null) &&
          item.variant_3 === (productData.variant_3 || null)
      );
    },

    // async addToCart(productData) {
    //   this.loading = true;
    //   try {
    //     const payload = {
    //       product_id: productData.product_id,
    //       quantity: productData.quantity || 1,
    //       variant_1: productData.variant_1 || null,
    //       variant_2: productData.variant_2 || null,
    //       variant_3: productData.variant_3 || null,
    //     };

    //     const existingItemIndex = this.cartItems.findIndex(
    //       (item) =>
    //         item.product_id === payload.product_id &&
    //         item.variant_1 === payload.variant_1 &&
    //         item.variant_2 === payload.variant_2 &&
    //         item.variant_3 === payload.variant_3
    //     );

    //     if (existingItemIndex >= 0) {
    //       payload.quantity =
    //         this.cartItems[existingItemIndex].quantity +
    //         (payload.quantity || 1);
    //     }

    //     const response = await frontendApi.post("/cart", payload);

    //     const cartData = response.data.cart || {};
    //     const newCartItems = Array.isArray(cartData)
    //       ? cartData
    //       : Object.values(cartData);

    //     this.cartItems = newCartItems.map((item) => ({
    //       product_id: item.product_id || item.id,
    //       name: item.name || item.product_name,
    //       price: Number(item.price) || 0,
    //       quantity: Number(item.quantity) || 1,
    //       discount: Number(item.discount) || 0, // Ensure discount is always a number
    //       image: item.image || item.product_image,
    //       variant_1: item.variant_1 || null,
    //       variant_2: item.variant_2 || null,
    //       variant_3: item.variant_3 || null,
    //       variant_id: item.variant_id || null,
    //     }));

    //     this.persistCartToLocalStorage();
    //     this.updateHeaderCart();
    //     return response.data;
    //   } catch (error) {
    //     console.error("Add to cart error:", error);
    //     this.error = error.response?.data?.message || "Failed to add to cart";
    //     throw error;
    //   } finally {
    //     this.loading = false;
    //   }
    // },


    async addToCart(productData) {
  this.loading = true;
  try {
    const payload = {
      product_id: productData.product_id,
      quantity: productData.quantity || 1,
      variant_1: productData.variant_1 || null,
      variant_2: productData.variant_2 || null,
      variant_3: productData.variant_3 || null,
    };

    // Find existing item with the same product and variants
    const existingItem = this.cartItems.find(item => 
      item.product_id === payload.product_id &&
      item.variant_1 === payload.variant_1 &&
      item.variant_2 === payload.variant_2 &&
      item.variant_3 === payload.variant_3
    );

    // If item exists, update the quantity in the payload
    if (existingItem) {
      payload.quantity = existingItem.quantity + (productData.quantity || 1);
    }

    const response = await frontendApi.post("/cart", payload);

    // Process the response
    const cartData = response.data.cart || {};
    const newCartItems = Array.isArray(cartData)
      ? cartData
      : Object.values(cartData);

    // Update cart items with proper quantity handling
    this.cartItems = newCartItems.map((item) => ({
      product_id: item.product_id || item.id,
      name: item.name || item.product_name,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      discount: Number(item.discount) || 0,
      image: item.image || item.product_image,
      variant_1: item.variant_1 || null,
      variant_2: item.variant_2 || null,
      variant_3: item.variant_3 || null,
      variant_id: item.variant_id || null,
    }));

    this.persistCartToLocalStorage();
    this.updateHeaderCart();
    return response.data;
  } catch (error) {
    console.error("Add to cart error:", error);
    this.error = error.response?.data?.message || "Failed to add to cart";
    throw error;
  } finally {
    this.loading = false;
  }
},
    persistCartToLocalStorage() {
      localStorage.setItem("cart_backup", JSON.stringify(this.cartItems));
    },

    restoreCartFromLocalStorage() {
      const backup = localStorage.getItem("cart_backup");
      if (backup) {
        this.cartItems = JSON.parse(backup);
      }
    },

    async fetchCart() {
  this.loading = true;
  this.error = null; // Reset previous errors
  
  try {
    console.log('Fetching cart from server...');
    const response = await frontendApi.get("/getcart");
    
    // Debug logging
    console.log('Raw cart response:', response.data);
    
    const cartData = response.data.cart || {};
    console.log('Cart data before processing:', cartData);

    // Process cart data
    let normalizedItems = [];
    if (Array.isArray(cartData)) {
      normalizedItems = cartData;
    } else if (typeof cartData === "object" && cartData !== null) {
      normalizedItems = Object.values(cartData);
    }

    this.cartItems = normalizedItems.map((item) => ({
      product_id: item.product_id || item.id,
      name: item.name || item.product_name,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      discount: Number(item.discount) || 0, // Ensure discount is always a number
      image: item.image || item.product_image,
      variant_1: item.variant_1 || null,
      variant_2: item.variant_2 || null,
      variant_3: item.variant_3 || null,
      variant_id: item.variant_id || null,
    }));

    this.persistCartToLocalStorage();
    this.updateHeaderCart();
    return response.data;

  } catch (error) {
    // Enhanced error logging
    const errorDetails = {
      message: error.message,
      response: error.response?.data,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
    
    console.error('Detailed fetch error:', errorDetails);
    
    // Store the error in state for UI to display
    this.error = {
      userMessage: error.response?.data?.message || 'Failed to fetch cart',
      technicalMessage: process.env.NODE_ENV === 'development' ? error.message : undefined,
      code: error.response?.status
    };
    
    // Attempt to restore from local storage if available
    try {
      this.restoreCartFromLocalStorage();
      if (this.cartItems.length > 0) {
        console.warn('Fell back to local storage cart data');
      }
    } catch (localStorageError) {
      console.error('Failed to restore from local storage:', localStorageError);
    }
    
    // Re-throw a more specific error if needed
    throw new Error('CART_FETCH_FAILED', { cause: error });
    
  } finally {
    this.loading = false;
  }
},
  //   async fetchCart() {
  //     this.loading = true;
  // try {
  //   console.log('Fetching cart from server...');
  //   const response = await frontendApi.get("/getcart");
  //   console.log('Raw cart response:', response.data);
    
  //   const cartData = response.data.cart || {};
  //   console.log('Cart data before processing:', cartData);
  //       let normalizedItems = [];
  //       if (Array.isArray(cartData)) {
  //         normalizedItems = cartData;
  //       } else if (typeof cartData === "object") {
  //         normalizedItems = Object.values(cartData);
  //       }

  //       this.cartItems = normalizedItems.map((item) => ({
  //         product_id: item.product_id || item.id,
  //         name: item.name || item.product_name,
  //         price: Number(item.price) || 0,
  //         quantity: Number(item.quantity) || 1,
  //         discount: Number(item.discount) || 0,
  //         image: item.image || item.product_image,
  //         variant_1: item.variant_1 || null,
  //         variant_2: item.variant_2 || null,
  //         variant_3: item.variant_3 || null,
  //         variant_id: item.variant_id || null,
  //       }));

  //       this.persistCartToLocalStorage();
  //       this.updateHeaderCart();
  //       return response.data;
  //     } catch (error) {
  //       console.error("Fetch cart error:", error);
  //       this.error = error.response?.data?.message || "Failed to fetch cart";
  //       throw error;
  //     } finally {
  //       this.loading = false;
  //     }
  //   },

    async processCheckout() {
      this.loading = true;
      try {
        const orderData = {
          name: this.customer.name,
          mobile: this.customer.mobile,
          address: this.customer.address,
          shipping_charge: this.shippingCharge,
          paying_method: this.payingMethod,
          cart_items: this.cartItems.map((item) => ({
            product_id: item.product_id,
            variant_id: item.variant_id || null,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0,
          })),
        };

        const response = await frontendApi.post("/checkout", orderData);

          // Verify the response structure
    if (!response.data || !response.data.message) {
      throw new Error('Invalid server response');
    }
        if (response.data.success) {
          await this.clearCart();
          this.updateHeaderCart();
        }

        return response.data;
      } catch (error) {
       console.error("Detailed checkout error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
     this.error = error.response?.data?.message || "Checkout failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async clearCart() {
      this.cartItems = [];
      this.persistCartToLocalStorage();
    },

    // ✅ Sync Local with Server Cart
    async syncCartWithServer() {
      try {
        await this.fetchCart();
      } catch (error) {
        console.error("Failed to sync cart:", error);
      }
    },

    // ✅ Update Cart Header (UI Helper)
    updateHeaderCart() {
      const cartNumber = document.getElementById("cart_number");
      const totalAmount = document.getElementById("total_amount");

      // if (cartNumber) {
      //   cartNumber.textContent = this.cartCount;
      // }
      if (cartNumber) {
        cartNumber.textContent = this.cartCount;
      }

      if (totalAmount) {
        totalAmount.textContent = `৳ ${this.grandTotal}`;
      }
    },

    // ✅ Apply Coupon (mock logic)
    async applyCoupon(code) {
      this.couponCode = code;
      this.couponDiscount = 50; // Example discount
    },

    // ✅ Update Shipping Charge
    updateShipping(charge) {
      this.shippingCharge = charge;
    },

    // ✅ Update Item Quantity
    async updateQuantity(itemId, newQuantity) {
      try {
        const response = await frontendApi.post("/cart/update", {
          item_id: itemId,
          quantity: newQuantity,
        });

        // Update local state from server response
        this.cartItems = Object.values(response.data.cart || {});
        this.updateHeaderCart();
        return response.data;
      } catch (error) {
        console.error("Update quantity error:", error);
        this.error = error.response?.data?.msg || "Failed to update quantity";
        throw error;
      }
    },
    //    async clearCart() {
    //   try {
    //     const response = await frontendApi.post('/cart/clear');
    //     this.cartItems = [];
    //     return response.data;
    //   } catch (error) {
    //     console.error("Clear cart error:", error);
    //     throw error;
    //   }
    // },

    // ✅ Remove Item from Cart
    async removeItem(itemId) {
      try {
        const response = await frontendApi.post("/cart/remove", {
          item_id: itemId,
        });

        // Update local state from server response
        this.cartItems = Object.values(response.data.cart || {});
        this.updateHeaderCart();
        return response.data;
      } catch (error) {
        console.error("Remove item error:", error);
        this.error = error.response?.data?.msg || "Failed to remove item";
        throw error;
      }
    },
  },
});
