<script setup>
import { defineEmits } from 'vue'
import { useCartCheckoutStore } from '../../stores/cartCheckout'
import { storeToRefs } from 'pinia'
import { IMAGE_BASE_URL } from '../../api'

// Proper emit definition at top level
const emit = defineEmits(['close'])

const cartStore = useCartCheckoutStore()
const { cartItems, subtotal, cartCount, loading } = storeToRefs(cartStore)
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

// const emit = defineEmits(['close'])

// const cartStore = useCartCheckoutStore()
// const { cartItems, subtotal, cartCount, loading } = storeToRefs(cartStore)

const removeItem = async (itemKey) => {
  await cartStore.removeItem(itemKey)
}

const changeQty = async (itemKey, qty) => {
  if (qty >= 1) {
    await cartStore.updateQuantity(itemKey, qty)
  }
}

const generateCartItemKey = (productData) => {
  return [
    productData.product_id,
    productData.variant_1 || "",
    productData.variant_2 || "",
    productData.variant_3 || "",
  ].join("|")
}

// const getImage = (path) => `/storage/images/product/large/${path}`
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/path/to/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.includes('images/product/')) {
    return `${IMAGE_BASE_URL}/${imagePath}`;
  }
  return `${IMAGE_BASE_URL}/images/product/large/${imagePath}`;
}
</script>

<template>
  <div class="cart-sidebar" :class="{ 'open': show }">
    <div class="cart-sidebar-header">
      <h5>Shopping Cart ({{ cartCount }})</h5>
      <button class="btn btn-danger close-btn" @click="emit('close')">
        <i class="fa fa-times"></i>
      </button>
    </div>

    <div class="cart-sidebar-body">
      <div v-if="!loading && cartItems.length > 0">
        <div v-for="item in cartItems" :key="generateCartItemKey(item)" class="cart-item">
         
            <img :src="getImageUrl(item.image)" :alt="item.name" class="cart-item-image" />
          <div class="cart-item-details">
            <h6>{{ item.name }}</h6>
            <div class="d-flex justify-content-between">
              <span>{{ item.quantity }} × {{ item.price }}৳</span>
              <span>{{ (item.price * item.quantity) }}৳</span>
            </div>
            <div class="quantity_box d-flex mt-2">
              <button class="btn btn-sm" @click="changeQty(generateCartItemKey(item), item.quantity - 1)">-</button>
              <input class="form-control form-control-sm" type="number" v-model.number="item.quantity" 
                @change="changeQty(generateCartItemKey(item), item.quantity)" style="width: 50px;" />
              <button class="btn btn-sm" @click="changeQty(generateCartItemKey(item), item.quantity + 1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" @click="removeItem(generateCartItemKey(item))">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
      <div v-else-if="!loading" class="empty-cart">
        <i class="fa fa-shopping-cart fs-1"></i>
        <p>Your cart is empty</p>
        <router-link to="/shop" class="btn btn-warning w-100" @click="emit('close')">
        Return To Shop Page
      </router-link>
      </div>
      <div v-else class="empty-cart">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div v-if="cartItems.length > 0" class="cart-sidebar-footer">
      <div class="cart-total">
        <span>Subtotal:</span>
        <span>{{ subtotal }}৳</span>
      </div>
      <router-link to="/checkout" class="btn btn-info w-100" @click="emit('close')">
        Checkout
      </router-link>
    </div>
  </div>
  
  <div class="cart-overlay" :class="{ 'active': show }" @click="emit('close')"></div>
</template>

<style scoped>
/* Cart Sidebar Styles */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1050;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
}

.cart-sidebar.open {
  right: 0;
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.cart-overlay.active {
  opacity: 1;
  visibility: visible;
}

.cart-sidebar-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-sidebar-body {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.cart-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-remove {
  background: none;
  border: none;
  color: #dc3545;
  align-self: flex-start;
}

.empty-cart {
  text-align: center;
  padding: 40px 0;
  color: #777;
}

.cart-sidebar-footer {
  padding: 15px;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-weight: bold;
}

@media (max-width: 576px) {
  .cart-sidebar {
    width: 100%;
    right: -100%;
  }
}
/* .cart_item_scroll {
  max-height: 300px;
  overflow-y: auto;
}
.quantity_box .btn {
  padding: 0 5px;
} */
</style>