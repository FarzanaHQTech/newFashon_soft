

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '../../stores/cartStoreCount'

const cartStore = useCartStore()
const { cartList, total, loading } = storeToRefs(cartStore)

onMounted(() => {
  cartStore.fetchCart()
})

const removeItem = (id) => {
  cartStore.removeFromCart(id)
}

const changeQty = (id, qty) => {
  if (qty >= 1) {
    cartStore.updateQuantity(id, qty)
  }
}

const getImage = (path) => `/storage/images/product/large/${path}`
</script>

<template>
  <div class="card border-0 h-100" v-if="!loading">
    <div class="card-header d-flex justify-between">
      <h5 class="mb-0">Shopping Cart</h5>
      <button class="btn cart_dismiss" @click="$emit('close')">
        <i class="fa fa-times"></i> Close
      </button>
    </div>

    <div class="card-body p-0">
      <div class="cart_item_scroll">
        <div v-if="cartList.length">
          <div v-for="(item, key) in cartList" :key="key" class="product d-flex">
            <div class="image p-2">
              <img :src="getImage(item.image)" alt="" />
            </div>
            <div class="content p-2 w-100">
              <p class="mb-1">{{ item.name }}</p>
              <div class="d-flex align-items-center">
                <small>{{ item.quantity }} x <span class="text-warning">{{ item.price }}</span></small>
                <div class="quantity_box d-flex ms-auto">
                  <button class="btn" @click="changeQty(key, item.quantity - 1)">-</button>
                  <input class="form-control form-control-sm" type="number" v-model.number="item.quantity" @change="changeQty(key, item.quantity)" style="width: 40px;" />
                  <button class="btn" @click="changeQty(key, item.quantity + 1)">+</button>
                </div>
              </div>
            </div>
            <div class="product_dismiss p-2">
              <button class="btn btn-danger btn-sm" @click="removeItem(key)">
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center p-4">
          <i class="fa fa-cart-arrow-down fa-2x mb-3"></i>
          <p>No products in the cart.</p>
          <router-link to="/shop" class="btn btn-dark">Return To Shop</router-link>
        </div>
      </div>

      <div v-if="cartList.length" class="subtotal p-2 border-top w-100">
        <div class="d-flex justify-content-between align-items-center">
          <h5>Subtotal:</h5>
          <h5 class="text-warning">{{ total }}</h5>
        </div>
        <router-link to="/checkout" class="btn btn-dark text-cap w-100 mt-2">Checkout</router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
.cart_item_scroll {
  max-height: 300px;
  overflow-y: auto;
}
.quantity_box .btn {
  padding: 0 5px;
}
</style>
