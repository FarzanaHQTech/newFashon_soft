import { defineStore } from "pinia";
import { frontendApi, posadminApi ,csrfApi} from "../api";
import { useRouter } from "vue-router";

export const useCartCheckoutStore = defineStore("cartCheckout", {
  state: () => ({
    cartItems: [],
   couponCode: '',                  // <-- already present
  couponDetails: null,   
    selectedShippingCharge: '', 
    shippingCharge: [],         // To store the list of charges
    customer: {
      name: "",
      mobile: "",
      address: "",
    },
    restoreCartFromLocalStorage: "",

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

  // FIXED: Calculate the coupon discount dynamically
  computedCouponDiscount() {
    const subtotal = this.subtotal;
    if (this.couponType === 'percentage') {
      // Assuming you store percentage amount in couponDetails.amount
      return (subtotal * (this.couponDetails?.amount || 0)) / 100;
    }
    return this.couponDiscount || 0;
  },

  grandTotal() {
    const subtotal = Number(this.subtotal) || 0;
    const shipping = Number(this.selectedShippingCharge) || 0;
    const discount = this.computedCouponDiscount;

    return Math.max(subtotal - discount + shipping, 0);
  },
  cartCount() {
      // Count each product as 1 item
      return this.cartItems.length;
    },
    uniqueCartCount() {
      return this.cartItems.length;
    },
},




  actions: {


// Add this to your actions
async initializeCart() {
  console.log("Initializing cart..."); // Debug log
  
  // First try to restore from localStorage
  const restored = this.restoreCartFromLocalStorage();
  
  // If restored from localStorage, still try to sync with server
  if (restored) {
    try {
      await this.fetchCart();
    } catch (error) {
      console.log("Background sync failed, using localStorage data:", error);
    }
  } 
  // If not restored from localStorage, try server
  else {
    try {
      await this.fetchCart();
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }
  
  console.log("Current cart state:", this.cartItems); // Debug log
},

// Modify persistCartToLocalStorage
persistCartToLocalStorage() {
  try {
    localStorage.setItem("cart_backup", JSON.stringify({
      items: this.cartItems,
      timestamp: new Date().getTime()
    }));
  } catch (e) {
    console.error("Failed to persist cart:", e);
  }
},

// Modify restoreCartFromLocalStorage
restoreCartFromLocalStorage() {
  try {
    const backup = localStorage.getItem("cart_backup");
    if (backup) {
      const data = JSON.parse(backup);
      console.log("Restoring cart from localStorage:", data); // Debug log
      
      // Validate the data structure
      if (data.items && Array.isArray(data.items)) {
        this.cartItems = data.items;
        console.log("Cart restored successfully"); // Debug log
        return true;
      }
    }
    console.log("No valid cart data in localStorage"); // Debug log
    return false;
  } catch (e) {
    console.error("Failed to restore cart from localStorage:", e);
    return false;
  }
},

async fetchShippingCharge() {
  try {
    this.loading = true;
    const res = await frontendApi.get('/checkoutGet');
    this.shippingCharge = res.data.shipping_charges;
    // console.log("shipping charge", res.data);
    
    // Set first shipping option as default if none selected
    if (this.shippingCharge.length > 0 && !this.selectedShippingCharge) {
      this.selectedShippingCharge = this.shippingCharge[0].shipping_charge;
    }
    
    // console.log("Shipping charges:", this.shippingCharge);
  } catch (error) {
    console.error("Shipping charge fetch error", error);
    throw error;
  } finally {
    this.loading = false;
  }
},

    generateCartItemKey(productData) {
      return [
        productData.product_id,
        productData.variant_1 || "",
        productData.variant_2 || "",
        productData.variant_3 || "",
      ].join("|");
    },

    findCartItem(productData) {
      const key = this.generateCartItemKey(productData);
      return this.cartItems.find(
        (item) => this.generateCartItemKey(item) === key
      );
    },


    async addToCart(productData) {
      this.loading = true;
      try {
        const payload = {
          product_id: productData.product_id,
          slug: productData.slug,
          quantity: productData.quantity || 1, // Keep quantity from product data
          variant_1: productData.variant_1 || null,
          variant_2: productData.variant_2 || null,
          variant_3: productData.variant_3 || null,
          price: productData.price,
          discount: productData.discount || 0,
          image: productData.image,
          name: productData.name,
        };

        // Check if item already exists in cart
        const key = this.generateCartItemKey(payload);
        const existingIndex = this.cartItems.findIndex(
          (item) => this.generateCartItemKey(item) === key
        );

        if (existingIndex >= 0) {
          // If item exists, update it (including quantity)
          this.cartItems[existingIndex] = payload;
        } else {
          // Add new item
          this.cartItems.push(payload);
        }

        // Make API call
        const response = await frontendApi.post("/cartStore", payload);

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

    async fetchCart() {
      this.loading = true;
      try {
        const response = await frontendApi.get("/getcart");
        const cartData = response.data.cart || {};

        const newCartItems = Array.isArray(cartData)
          ? cartData
          : Object.values(cartData);

        this.cartItems = newCartItems.map((item) => ({
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
          variant_id: item.variant_id,
        }));

        this.persistCartToLocalStorage();
        this.updateHeaderCart();
        return response.data;
      } catch (error) {
        console.error("Fetch cart error:", error);
        this.error = error.response?.data?.message || "Failed to fetch cart";
        this.restoreCartFromLocalStorage(); // Add this line
        throw error;
      } finally {
        this.loading = false;
      }
    },

//     async processCheckout() {
//       this.loading = true;
   
// //end new
//       try {
//         await csrfApi.get('/sanctum/csrf-cookie');
    
//     const token = sessionStorage.getItem('auth_token');
//     if (!token) {
//       throw new Error('Not authenticated');
//     }

//         const orderData = {
//       name: this.customer.name,
//       mobile: this.customer.mobile,
//       address: this.customer.address,
//       shipping_charge: this.selectedShippingCharge, // Changed from this.shippingCharge
//       paying_method: this.payingMethod,
//       cart_items: this.cartItems.map((item) => ({
//         product_id: item.product_id,
//         variant_id: item.variant_id || null,
//         quantity: item.quantity,
//         price: item.price,
//         discount: item.discount || 0,
//       })),
//     };
// const response = await posadminApi.post("/checkout", orderData, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     // const response = await posadminApi.post("/checkout", orderData);
//     console.log('checkout data',response.data );
    
//         if (response.data.success) {
//           await this.clearCart();
//           this.updateHeaderCart();
//         }

//         return response.data;
//       } catch (error) {
//         console.error("Checkout error:", error);
//         this.error = error.response?.data?.message || "Checkout failed";
//         throw error;
//       } finally {
//         this.loading = false;
//       }
//     },

async processCheckout() {
  this.loading = true;
  
  try {
    // 1. First get CSRF token
    await csrfApi.get('/sanctum/csrf-cookie');
    
    // 2. Get auth token
    const token = sessionStorage.getItem('auth_token');
    // if (!token) {
    //   throw new Error('Authentication token not found');
    // }

    // 3. Get CSRF token from cookies
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };
    const csrfToken = getCookie('XSRF-TOKEN');

    // 4. Prepare order data
    const orderData = {
      name: this.customer.name,
      mobile: this.customer.mobile,
      address: this.customer.address,
      shipping_charge: this.selectedShippingCharge,
      paying_method: this.payingMethod,
      cart_items: this.cartItems.map(item => ({
        product_id: item.product_id,
        variant_id: item.variant_id || null,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount || 0,
      })),
    };

    // 5. Make the authenticated request
    
    const response = await posadminApi.post("/checkout", orderData, {

      // headers: {
      //   'Authorization': `Bearer ${token}`,
      //   'X-XSRF-TOKEN': csrfToken
      // }
    headers: {
  ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  'X-XSRF-TOKEN': csrfToken
}

    });

    if (response.data.success) {
      await this.clearCart();
      this.updateHeaderCart();
    }

    return response.data;
  } catch (error) {
    console.error("Checkout failed:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  } finally {
    this.loading = false;
  }
},


    async clearCart() {
      this.cartItems = [];
      localStorage.removeItem("cart_backup");
    },

  

    async updateQuantity(itemKey, newQuantity) {
      try {
        // Find item by its unique key
        const itemIndex = this.cartItems.findIndex(
          (item) => this.generateCartItemKey(item) === itemKey
        );

        if (itemIndex === -1) throw new Error("Item not found in cart");

        // Ensure quantity is at least 1
        newQuantity = Math.max(1, newQuantity);

        // Update quantity locally
        this.cartItems[itemIndex].quantity = newQuantity;

        // Make API call
        const response = await frontendApi.post("/cart/update", {
          item_id:
            this.cartItems[itemIndex].variant_id ||
            this.cartItems[itemIndex].product_id,
          quantity: newQuantity,
        });

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
        const itemIndex = this.cartItems.findIndex(
          (item) => this.generateCartItemKey(item) === itemKey
        );

        if (itemIndex === -1) throw new Error("Item not found in cart");

        const item = this.cartItems[itemIndex];

        const response = await frontendApi.delete(
          `/cartDelete/${item.variant_id || item.product_id}`
        );

        // Remove from local state
        this.cartItems.splice(itemIndex, 1);
        this.persistCartToLocalStorage();
        this.updateHeaderCart();

        // Redirect to home if cart is empty
        if (this.cartItems.length === 0) {
          const router = useRouter();
          router.push("/");
        }

        return response.data;
      } catch (error) {
        console.error("Remove item error:", error);
        throw error;
      }
    },

    async removeItem(itemKey) {
      try {
        // Find item by its unique key
        const itemIndex = this.cartItems.findIndex(
          (item) => this.generateCartItemKey(item) === itemKey
        );

        if (itemIndex === -1) throw new Error("Item not found in cart");

        const item = this.cartItems[itemIndex];

        const response = await frontendApi.delete(
          `/cartDelete/${item.variant_id || item.product_id}`
        );

        // Remove from local state
        this.cartItems.splice(itemIndex, 1);
        this.persistCartToLocalStorage();
        this.updateHeaderCart();

        // Redirect to home if cart is empty
        if (this.cartItems.length === 0) {
          const router = useRouter();
          router.push("/");
        }

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
    const response = await frontendApi.post('/apply-coupon', { couponCode: code });

    this.couponCode = response.data.couponCode || '';
    this.couponDiscount = response.data.discountAmount || 0;
    this.couponType = response.data.couponDetails?.type || 'fixed';
    this.couponDetails = response.data.couponDetails || null;  // store full coupon details

    if (response.data.message) {
      alert(response.data.message);
    }

    // Debug output
    console.log('Coupon applied:', {
      type: this.couponType,
      discountAmount: this.couponDiscount,
      details: this.couponDetails,
      computedDiscount: this.computedCouponDiscount,
    });

    return response.data;
  } catch (error) {
    console.error('Coupon error:', error);
    throw error;
  }
}

  },
});
