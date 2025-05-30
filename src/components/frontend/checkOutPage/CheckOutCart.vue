<script setup>
import { onMounted, computed } from 'vue'
import { useCartCheckoutStore } from '../../../stores/cartCheckout'
import { frontendApi, IMAGE_BASE_URL } from '../../../api'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
const store = useCartCheckoutStore()

const router = useRouter()


onMounted(async () => {
  console.log('Initializing checkout...');

  try {
    
    // Check if ae have any local cart data first
    if (store.cartItems.length > 0) {
      console.log('Using existing cart items:', store.cartItems);
      return;
    }

    await store.fetchCart();
    console.log('Fetched cart items:', store.cartItems);

    if (store.cartItems.length === 0) {
      console.warn('Cart is empty after fetch. Checking localStorage...');
      // Additional fallback checks can go here
    }
  } catch (error) {
    console.error('Checkout initialization failed:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
});
const handleSubmit = async () => {
  try {
    // Validate inputs
    if (!store.customer.name || !store.customer.mobile || !store.customer.address) {
      throw new Error('Please fill all required fields');
    }

    if (store.cartCount === 0) {
      throw new Error('Your cart is empty');
    }

    // Process checkout
    const result = await store.processCheckout();
    
    // Check for success message
     
    if (result.message === 'Order placed successfully') {
      router.push({
        name: 'ThankYou',
        params: { order_id: result.order_id }
      });
      return;
    }
    
    // If we get here, there might be an unexpected response
    throw new Error(result.message || 'Order processing completed with unexpected response');

  } catch (error) {
    console.error('Checkout error:', error);
    
    // Show the actual error message from the response if available
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Checkout failed for unknown reason';
    
    alert(errorMessage);
  }
};


// Enhanced Handle Submit
// const handleSubmit = async () => {
//   try {
//     // Validate inputs
//     if (!store.customer.name || !store.customer.mobile || !store.customer.address) {
//       throw new Error('Please fill all required fields');
//     }

//     if (store.cartCount === 0) {
//       throw new Error('Your cart is empty');
//     }

//     // Process checkout
//     const result = await store.processCheckout();
    
//     if (result.message === 'Order failed') {
//       throw new Error(result.error || 'Order processing failed');
//     }

//     if (result.order_id) {
//       router.push({
//         name: 'ThankYou',
//         params: { order_id: result.order_id }
//       });
//     }
//   } catch (error) {
//     console.error('Checkout error:', error);
//     alert(error.response?.data?.message || error.message || 'Checkout failed');
//   }
// };
// In your checkout page script
// const getImageUrl = (imagePath) => {
//   if (!imagePath) return '/path/to/placeholder.jpg'

//   // Check if already a full URL
//   if (imagePath.startsWith('http')) return imagePath

//   // Handle different image path formats
//   if (imagePath.includes('images/product/')) {
//     return `${IMAGE_BASE_URL}/${imagePath}`
//   }

//   // Default case - assume it's just the filename
//   return `${IMAGE_BASE_URL}/images/product/large/${imagePath}`
// }
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/path/to/placeholder.jpg';

  // Check if already a full URL
  if (imagePath.startsWith('http')) return imagePath;

  // Handle different image path formats
  if (imagePath.includes('images/product/')) {
    return `${IMAGE_BASE_URL}/${imagePath}`;
  }

  // Default case - assume it's just the filename
  return `${IMAGE_BASE_URL}/images/product/large/${imagePath}`;
}




const handleImageError = (event) => {
  event.target.src = 'path_to_placeholder_image'
}

const getVariantText = (variants) => {
  if (!variants) return ''
  // Implement logic to format variant text based on your data structure
  return variants.map(v => v.name).join(' / ')
}

</script>

<template>
  <div class="container-xl my-3">
    <div class="row g-5">
      <!-- Cart Summary -->
      <div class="col-md-12 col-lg-6 order-md-last order-last">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Cart - <span id="cart_number">{{ store.cartCount }}</span></h5>
            <!-- <h5 class="mb-0">Cart - {{ store.cartCount }} items</h5> -->
          </div>
          <div class="card-body cartBody">
            <div class="input-group mb-3">
              <input v-model="store.couponCode" type="text" class="form-control couponCode"
                placeholder="Enter your coupon code">
              <button @click="store.applyCoupon(store.couponCode)" type="button" class="btn btn-success couponButton">
                Apply Coupon
              </button>
            </div>

            <div class="table-responsive">

              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" class="fontSize">ছবি</th>
                    <th scope="col" class="fontSize">পন্যের নাম</th>
                    <th scope="col" class="fontSize">সাইজ/কালার</th>
                    <th scope="col" class="fontSize">পরিমান</th>
                    <th scope="col" class="fontSize">পন্যের দাম</th>
                  </tr>
                </thead>
                <tbody>
                +
                  <!-- <tr v-for="item in store.cartItems"
                    :key="item.product_id + (item.variant_1 || '') + (item.variant_2 || '') + (item.variant_3 || '')">
                    <th scope="row" class="fontSize">
                      <div class="d-flex">
                        <div class="remove">
                          <button @click="store.removeItem(item.product_id)" class="btn btn-sm text-danger remove-item"
                            type="button">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                        <img :src="getImageUrl(item.image)" alt="" class="rounded border"
                          style="height: 60px;width: 60px;" @error="handleImageError">
                      </div>
                    </th> -->
                    <tr v-for="item in store.cartItems" :key="item.product_id + (item.variant_1 || '') + (item.variant_2 || '') + (item.variant_3 || '')">
  <th scope="row" class="fontSize">
    <div class="d-flex">
      <div class="remove">
        <button @click="store.removeItem(item.product_id)" class="btn btn-sm text-danger remove-item" type="button">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <img :src="getImageUrl(item.image)" alt="" class="rounded border" style="height: 60px;width: 60px;" @error="handleImageError">
    </div>
  </th>
                    <td class="fontSize">{{ item.name }}</td>
                    <td class="fontSize">
                      <template v-if="item.variant_1 || item.variant_2 || item.variant_3">
                        {{[item.variant_1, item.variant_2, item.variant_3].filter(v => v).join(' / ')}}
                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </td>
                    <td>
                      <div class="d-flex mb-4 align-items-start" style="max-width: 300px">
                        <button @click="store.updateQuantity(item.product_id, item.quantity - 1)"
                          class="btn btn-primary me-2 qtybtn minus" :disabled="item.quantity <= 1">
                          <i class="fas fa-minus"></i>
                        </button>
                        <div class="form-outline">
                          <input :value="item.quantity" style="width: 40px;" type="text" readonly
                            class="form-control quantity">
                        </div>
                        <button @click="store.updateQuantity(item.product_id, item.quantity + 1)"
                          class="btn btn-primary ms-2 qtybtn plus">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td class="fontSize">
                      <strong>{{ (item.price * item.quantity).toFixed(2) }} ৳</strong>
                      <span v-if="item.discount > 0">
                        <br>Discount: <strong>{{ (item.discount * item.quantity).toFixed(2) }} ৳</strong>
                      </span>
                    </td>
                  </tr>
                  <!-- Summary Rows -->
                  <tr>
                    <td colspan="4" class="text-end" style="font-weight: bold;">সাবটোটাল</td>
                    <td class="prices" style="font-weight: bold;">{{ store.subtotal }} ৳</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-end" style="font-weight: bold;">কুপন ডিসকাউন্ট</td>
                    <td class="prices" style="font-weight: bold;">{{ store.couponDiscount }} ৳</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-end" style="font-weight: bold;">ডেলিভারি চার্জ</td>
                    <td class="prices" style="font-weight: bold;">
                      {{ store.shippingCharge }} ৳
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-end" style="font-weight: bold;">টোটাল</td>
                    <td class="prices">
                      <p id="total_amount" style="font-weight: bold;">{{ store.grandTotal }} ৳</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Billing Form -->
      <div class="col-md-6 col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4 class="mb-3">Billing address</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="needs-validation">
              <div class="row g-3">
                <div class="col-sm-12">
                  <label for="firstName" class="form-label">আপনার নাম</label>
                  <input v-model="store.customer.name" type="text" class="form-control p-2"
                    placeholder="আপনার নাম লিখুন" required>
                </div>
                <div class="col-sm-12">
                  <label for="firstName" class="form-label">আপনার মোবাইল নাম্বার</label>
                  <input v-model="store.customer.mobile" type="tel" class="form-control"
                    placeholder="আপনার  মোবাইল নাম্বার লিখুন" maxlength="11" minlength="11" required>
                </div>
                <div class="col-12">
                  <label for="address" class="form-label">আপনার সম্পূর্ন ঠিকানা</label>
                  <input v-model="store.customer.address" type="text" class="form-control p-4"
                    placeholder="ঠিকানা লিখুন" required>
                </div>
                <div class="col-12">
                  <label for="shipping_charge" class="form-label">ডেলিভারি চার্জ</label>
                  <select v-model="store.shippingCharge" class="form-select shadow-none" id="shipping_charge">
                    <option value="80">ঢাকার মধ্যে (80)</option>
                    <option value="150">ঢাকার বাহিরে (150)</option>
                  </select>
                </div>
                <button :disabled="store.loading || store.cartCount === 0"
                  class="w-100 btn btn-warning orange-bg text-white btn-lg sub_btn" type="submit">
                  {{ store.loading ? 'Processing...' : 'অর্ডার কনফার্ম করুন' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
