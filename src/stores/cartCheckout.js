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
        (sum, item) => sum + (item.discount || 0) * item.quantity,
        0
      );
    },
    grandTotal() {
      return this.subtotal - this.couponDiscount + this.shippingCharge;
    },
    cartCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    uniqueCartCount() {
      return this.cartItems.length;
    }
  },

  actions: {
    // generateCartItemKey(productData) {
    //   return [
    //     productData.product_id,
    //     productData.variant_1 || '',
    //     productData.variant_2 || '',
    //     productData.variant_3 || ''
    //   ].join('|');
    // },

    // findCartItem(productData) {
    //   const key = this.generateCartItemKey(productData);
    //   return this.cartItems.find(item => 
    //     this.generateCartItemKey(item) === key
    //   );
    // },

    // async addToCart(productData) {
    //   this.loading = true;
    //   try {
    //     // Normalize product data
    //     const payload = {
    //       product_id: productData.product_id,
    //       slug: productData.slug,
    //       quantity: productData.quantity || 1,
    //       variant_1: productData.variant_1 || null,
    //       variant_2: productData.variant_2 || null,
    //       variant_3: productData.variant_3 || null,
    //       price: productData.price,
    //       discount: productData.discount || 0,
    //       image: productData.image,
    //       name: productData.name
    //     };

    //     // Check if item already exists in cart
    //     const existingItem = this.findCartItem(payload);
        
    //     if (existingItem) {
    //       // Update quantity if item exists
    //       payload.quantity = existingItem.quantity + payload.quantity;
    //     }

    //     // Make API call
    //     const response = await frontendApi.post("/cart", payload);
        
    //     // Process response
    //     const cartData = response.data.cart || {};
    //     const newCartItems = Array.isArray(cartData) ? cartData : Object.values(cartData);

    //     // Update cart items
    //     this.cartItems = newCartItems.map(item => ({
    //       product_id: item.product_id,
    //       slug: item.slug,
    //       name: item.name,
    //       price: Number(item.price),
    //       quantity: Number(item.quantity),
    //       discount: Number(item.discount || 0),
    //       image: item.image,
    //       variant_1: item.variant_1,
    //       variant_2: item.variant_2,
    //       variant_3: item.variant_3,
    //       variant_id: item.variant_id
    //     }));

    //     this.persistCartToLocalStorage();
    //     this.updateHeaderCart();
    //     return { success: true, data: response.data };
    //   } catch (error) {
    //     console.error("Add to cart error:", error);
    //     this.error = error.response?.data?.message || "Failed to add to cart";
    //     throw error;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
generateCartItemKey(productData) {
  // Create a unique key based on product ID and variants
  return [
    productData.product_id,
    productData.variant_1 || '',
    productData.variant_2 || '',
    productData.variant_3 || ''
  ].join('|');
},

findCartItem(productData) {
  const key = this.generateCartItemKey(productData);
  return this.cartItems.find(item => 
    this.generateCartItemKey(item) === key
  );
},

async addToCart(productData) {
  this.loading = true;
  try {
    const payload = {
      product_id: productData.product_id,
      slug: productData.slug,
      quantity: productData.quantity || 1,
      variant_1: productData.variant_1 || null,
      variant_2: productData.variant_2 || null,
      variant_3: productData.variant_3 || null,
      price: productData.price,
      discount: productData.discount || 0,
      image: productData.image,
      name: productData.name
    };

    // Check if item already exists in cart
    const existingItem = this.findCartItem(payload);
    
    if (existingItem) {
      // Update quantity if item exists
      payload.quantity = existingItem.quantity + payload.quantity;
    }

    // Make API call
    const response = await frontendApi.post("/cartStore", payload);
    
    // Update cart items from response
    this.cartItems = response.data.carts ? Object.values(response.data.carts) : [];
    
    this.persistCartToLocalStorage();
    this.updateHeaderCart();
    return { success: true, data: response.data };
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
      try {
        const response = await frontendApi.get("/getcart");
        const cartData = response.data.cart || {};
        
        const newCartItems = Array.isArray(cartData) ? 
          cartData : 
          Object.values(cartData);

        this.cartItems = newCartItems.map(item => ({
          product_id: item.product_id,
          slug: item.slug,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          discount: Number(item.discount || 0),
          image: item.image,
          variant_1: item.variant_1,
          variant_2: item.variant_2,
          variant_3: item.variant_3,
          variant_id: item.variant_id
        }));

        this.persistCartToLocalStorage();
        this.updateHeaderCart();
        return response.data;
      } catch (error) {
        console.error("Fetch cart error:", error);
        this.error = error.response?.data?.message || "Failed to fetch cart";
        this.restoreCartFromLocalStorage();
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async processCheckout() {
      this.loading = true;
      try {
        const orderData = {
          name: this.customer.name,
          mobile: this.customer.mobile,
          address: this.customer.address,
          shipping_charge: this.shippingCharge,
          paying_method: this.payingMethod,
          cart_items: this.cartItems.map(item => ({
            product_id: item.product_id,
            variant_id: item.variant_id || null,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0,
          })),
        };

        const response = await frontendApi.post("/checkout", orderData);

        if (response.data.success) {
          await this.clearCart();
          this.updateHeaderCart();
        }

        return response.data;
      } catch (error) {
        console.error("Checkout error:", error);
        this.error = error.response?.data?.message || "Checkout failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async clearCart() {
      this.cartItems = [];
      localStorage.removeItem("cart_backup");
    },

    // async updateQuantity(itemKey, newQuantity) {
    //   try {
    //     // Find item by its unique key
    //     const item = this.cartItems.find(item => 
    //       this.generateCartItemKey(item) === itemKey
    //     );
        
    //     if (!item) throw new Error("Item not found in cart");
        
    //     // Ensure quantity is at least 1
    //     newQuantity = Math.max(1, newQuantity);
        
    //     const response = await frontendApi.post("/cart/update", {
    //       product_id: item.product_id,
    //       variant_1: item.variant_1,
    //       variant_2: item.variant_2,
    //       variant_3: item.variant_3,
    //       quantity: newQuantity
    //     });

    //     // Update local state
    //     item.quantity = newQuantity;
    //     this.persistCartToLocalStorage();
    //     this.updateHeaderCart();
        
    //     return response.data;
    //   } catch (error) {
    //     console.error("Update quantity error:", error);
    //     throw error;
    //   }
    // },

    // async removeItem(itemKey) {
    //   try {
    //     // Find item by its unique key
    //     const itemIndex = this.cartItems.findIndex(item => 
    //       this.generateCartItemKey(item) === itemKey
    //     );
        
    //     if (itemIndex === -1) throw new Error("Item not found in cart");
        
    //     const item = this.cartItems[itemIndex];
        
    //     const response = await frontendApi.post("/cart/remove", {
    //       product_id: item.product_id,
    //       variant_1: item.variant_1,
    //       variant_2: item.variant_2,
    //       variant_3: item.variant_3
    //     });

    //     // Remove from local state
    //     this.cartItems.splice(itemIndex, 1);
    //     this.persistCartToLocalStorage();
    //     this.updateHeaderCart();
        
    //     return response.data;
    //   } catch (error) {
    //     console.error("Remove item error:", error);
    //     throw error;
    //   }
    // },
async updateQuantity(itemKey, newQuantity) {
  try {
    // Find item by its unique key
    const item = this.cartItems.find(item => 
      this.generateCartItemKey(item) === itemKey
    );
    
    if (!item) throw new Error("Item not found in cart");
    
    // Ensure quantity is at least 1
    newQuantity = Math.max(1, newQuantity);
    
    const response = await frontendApi.post("/cart/update", {
      item_id: item.variant_id || item.product_id,
      quantity: newQuantity
    });

    // Update local state
    item.quantity = newQuantity;
    this.persistCartToLocalStorage();
    this.updateHeaderCart();
    
    return response.data;
  } catch (error) {
    console.error("Update quantity error:", error);
    throw error;
  }
},

async removeItem(itemKey) {
  try {
    // Find item by its unique key
    const item = this.cartItems.find(item => 
      this.generateCartItemKey(item) === itemKey
    );
    
    if (!item) throw new Error("Item not found in cart");
    
    const response = await frontendApi.delete(`/cartDelete/${item.variant_id || item.product_id}`);

    // Remove from local state
    this.cartItems = this.cartItems.filter(cartItem => 
      this.generateCartItemKey(cartItem) !== itemKey
    );
    this.persistCartToLocalStorage();
    this.updateHeaderCart();
    
    return response.data;
  } catch (error) {
    console.error("Remove item error:", error);
    throw error;
  }
},



    updateHeaderCart() {
      const cartNumber = document.getElementById("cart_number");
      const totalAmount = document.getElementById("total_amount");

      if (cartNumber) {
        cartNumber.textContent = this.cartCount;
      }

      if (totalAmount) {
        totalAmount.textContent = `৳ ${this.grandTotal.toFixed(2)}`;
      }
    },

    async applyCoupon(code) {
      try {
        const response = await frontendApi.post("/apply-coupon", { code });
        this.couponCode = code;
        this.couponDiscount = response.data.discount || 0;
        return response.data;
      } catch (error) {
        console.error("Coupon error:", error);
        throw error;
      }
    }
  }
});