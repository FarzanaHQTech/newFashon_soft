<script setup>
import { onMounted, computed, ref } from 'vue'
import { IMAGE_BASE_URL } from '../../../api'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { useCartCheckoutStore } from '../../../stores/cartCheckout'
import { storeToRefs } from 'pinia'
import { useCustomerStore } from '../../../stores/Auth/customerDash'
import { useToast } from 'vue-toast-notification'
const store = useCartCheckoutStore()
const { cartItems, subtotal, loading, selectedShippingCharge, shippingCharge } = storeToRefs(store)
const router = useRouter()

const authStore = useCustomerStore()
const { user } = storeToRefs(authStore)
const userId = JSON.parse(sessionStorage.getItem('auth_user'))?.id || ''
const toast = useToast()
onMounted(async () => {
 authStore.getUserFromStorage();                                       

  if (authStore.user) {
    const u = authStore.user;
    store.customer.name = u.name || '';
    store.customer.mobile = u.phone || u.phone_number || '';
    store.customer.address = u.address || '';
  }


  // console.log('Initializing checkout...');
  // console.log('Initial cart state:', store.cartItems);

  await store.fetchShippingCharge();
  // Set default shipping charge if needed
  if (store.shippingCharge.length > 0 && !store.selectedShippingCharge) {
    store.selectedShippingCharge = store.shippingCharge[0].shipping_charge;
  }
  // Debug: Check localStorage content
  const localStorageCart = localStorage.getItem('cart_backup');
  // console.log('LocalStorage cart data:', localStorageCart);

  // First try to restore from localStorage if cart is empty
  if (cartItems.value.length === 0) {
    console.log('Attempting to restore cart from localStorage...');
    const restored = store.restoreCartFromLocalStorage();
    console.log('Restoration result:', restored ? 'success' : 'failed');
  }

  // Debug: Log state after localStorage restoration
  // console.log('Cart after localStorage restoration:', store.cartItems);

  try {
    // If we still have no items, try fetching from server
    if (store.cartItems.length === 0) {
      console.log('Attempting to fetch cart from server...');
      await store.fetchCart();
      console.log('Fetched cart items:', store.cartItems);

      // If fetch succeeded but cart is empty, check localStorage again
      if (store.cartItems.length === 0) {
        console.warn('Cart empty after fetch, rechecking localStorage...');
        store.restoreCartFromLocalStorage();
      }
    }

    // Final check - if still empty, redirect
    if (store.cartItems.length === 0) {
      console.warn('Cart is empty after all attempts, redirecting...');
      router.push('/');
    } else {
      console.log('Checkout initialized with cart items:', store.cartItems);
    }
  } catch (error) {
    console.error('Checkout initialization failed:', error);

    // Additional error details
    if (error.response) {
      console.error('API Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }

    // Final fallback - try localStorage one more time
    console.log('Attempting final fallback to localStorage...');
    store.restoreCartFromLocalStorage();

    // If still empty after all attempts, redirect
    if (store.cartItems.length === 0) {
      router.push('/');
    }
  } finally {
    // Debug: Log final cart state
    console.log('Final cart state:', store.cartItems);
    console.log('Cart count:', store.cartCount);
    console.log('LocalStorage cart:', localStorage.getItem('cart_backup'));
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

    // Handle payment redirects
    if (result.redirect_url) {
      window.location.href = result.redirect_url;
      return;
    }

    // Standard success case
    if (result.success) {
      await store.clearCart();
      router.push({
        name: 'ThankYou',
        params: { order_id: result.order_id }
      });
      return;
    }

    throw new Error(result.message || 'Order processing failed');

  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error.message || 'Checkout failed for unknown reason';
    
    // Use a more user-friendly notification system
    toast.error(errorMessage, {
      position: 'top-right',
      duration: 5000
    });
  }
};

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

//     // Check for success message
//     if (result.message === 'Order placed successfully') {
//       // Clear the cart after successful order
//       await store.clearCart();

//       // Redirect to thank you page
//       router.push({
//         name: 'ThankYou',
//         params: { order_id: result.order_id }
//       });
//       return;
//     }

//     throw new Error(result.message || 'Order processing completed with unexpected response');
//   } catch (error) {
//     console.error('Checkout error:', error);
//     const errorMessage = error.response?.data?.message ||
//       error.message ||
//       'Checkout failed for unknown reason';
//     alert(errorMessage);
//   }
// };

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



const couponApplied = ref(false)

const handleApplyCoupon = async () => {
  if (!store.couponCode) return;

  try {
    // await store.applyCoupon(store.couponCode);
    const response = await store.applyCoupon(store.couponCode);

    if (response.success) {
      // toast.success(response.message);
      console.log(' Coupon applied:', {
        message: response.message,
        discountAmount: response.discountAmount,
        couponType: store.couponType,
        couponDetails: store.couponDetails,
        computedDiscount: store.computedCouponDiscount,
        couponQuantity: store.quantity,
        couponQuantityUsed: store.used,
      });
      couponApplied.value = true;
    }
  } catch (err) {
    console.error(' Coupon apply failed:', err);
  }
}


const handleRemoveCoupon = () => {
  store.couponCode = '';          // clear input
  // store.couponDiscount = 0;       // optional
  store.couponDetails = null;
  couponApplied.value = false;
};


</script>

<template>
  <div class="container-xl my-3">
    <div class="row g-5">
      <!-- Cart Summary -->
      <div class="col-md-12 col-lg-6 order-md-last order-last">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Cart - <span id="cart_number">{{ store.cartCount }}</span></h5>
          </div>
          <div class="card-body cartBody">
            <!-- Coupon Input & Buttons -->
            <p v-if="store.couponDetails?.used >= store.couponDetails?.quantity" class="text-danger">
              This coupon has already been fully used ({{ store.couponDetails.used }}/{{ store.couponDetails.quantity
              }}).
            </p>
            <div class="input-group mb-3">
              <input v-model="store.couponCode" type="text" class="form-control couponCode"
                placeholder="Enter your coupon code" />

              <!-- Show Remove if coupon was applied -->
              <button v-if="couponApplied" @click="handleRemoveCoupon" type="button"
                class="btn btn-danger couponButton">
                <i class="fas fa-times"></i>
              </button>

              <!-- Show Apply Coupon if not yet applied -->
              <button v-else @click="handleApplyCoupon" type="button" class="btn btn-success couponButton">
                Apply Coupon
              </button>
            </div>

            <div class="table-responsive">

              <table class="table table-bordered">
                <thead>
                  <tr class=" text-center ">
                    <th scope="col" class="fw-semibold fontSize">ছবি</th>
                    <th scope="col" class="fw-semibold fontSize">পন্যের নাম</th>
                    <th scope="col" class="fw-semibold fontSize">সাইজ/কালার</th>
                    <th scope="col" class="fw-semibold fontSize">পরিমান</th>
                    <th scope="col" class="fw-semibold fontSize">পন্যের দাম</th>
                  </tr>
                </thead>
                <tbody>


                  <tr v-for="(item, index) in store.cartItems" :key="index">
                    <th scope="row" class="fontSize">
                      <div class="d-flex">
                        <div class="remove">
                          <button @click="store.removeItem(store.generateCartItemKey(item))"
                            class="btn btn-sm text-danger remove-item" type="button">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                        <img :src="getImageUrl(item.image)" alt="" class="rounded border"
                          style="height: 60px;width: 60px;" @error="handleImageError">
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
                        <button @click="store.updateQuantity(store.generateCartItemKey(item), item.quantity - 1)"
                          class="btn btn-primary me-2 qtybtn minus" :disabled="item.quantity <= 1">
                          <i class="fas fa-minus"></i>
                        </button>
                        <div class="form-outline">
                          <input :value="item.quantity" style="width: 40px;" type="text" readonly
                            class="form-control quantity">
                        </div>
                        <button @click="store.updateQuantity(store.generateCartItemKey(item), item.quantity + 1)"
                          class="btn btn-primary ms-2 qtybtn plus">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td class="fontSize">
                      <strong>{{ (item.price) }} ৳</strong>
                      <span v-if="item.discount > 0">
                        <br>Discount: <strong>{{ (item.discount * item.quantity) }} ৳</strong>
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
                    <td class="prices" style="font-weight: bold;">
                      <template v-if="store.computedCouponDiscount > 0">
                        <template v-if="store.couponType === 'percentage'">
                          - {{ store.computedCouponDiscount.toFixed(2) }} ৳ ({{ store.couponDetails?.amount }}%)
                        </template>
                        <template v-else>
                          - {{ store.computedCouponDiscount.toFixed(2) }} ৳
                        </template>
                      </template>
                      <template v-else>0 ৳</template>

                    </td>
                  </tr>

                  <!-- <tr>
                    <td colspan="4" class="text-end" style="font-weight: bold;">ডেলিভারি চার্জ</td>
                    <td class="prices" style="font-weight: bold;">
                      {{ store.shippingCharge }} ৳
                    </td>
                  </tr> -->
                  <tr>
                    <td colspan="4" class="text-end" style="font-weight: bold;">ডেলিভারি চার্জ</td>
                    <td class="prices" style="font-weight: bold;">
                      {{ store.selectedShippingCharge || 0 }} ৳
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
      <div class="col-md-6 col-lg-6 ">
        <div class="card ">
          <div class="card-header">
            <p class="mb-3 fw-semibold fs-5">Billing address</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="needs-validation">
              <div class="row g-3">
                <div class="col-sm-12">
                  <label for="firstName" class="form-label fw-semibold">আপনার নাম</label>
                  <input v-model="store.customer.name" type="text" class="form-control p-2"
                    placeholder="আপনার নাম লিখুন" required>
                </div>
                <div class="col-sm-12">
                  <label for="firstName" class="form-label fw-semibold">আপনার মোবাইল নাম্বার</label>
                  <input v-model="store.customer.mobile" type="tel" class="form-control"
                    placeholder="আপনার  মোবাইল নাম্বার লিখুন" maxlength="11" minlength="11" required>
                </div>
                <div class="col-12">
                  <label for="address" class="form-label fw-semibold">আপনার সম্পূর্ন ঠিকানা</label>
                  <input v-model="store.customer.address" type="text" class="form-control p-4"
                    placeholder="ঠিকানা লিখুন" required>
                </div>
                <div class="col-12">
                  <label for="shipping_charge" class="form-label fw-semibold">ডেলিভারি চার্জ</label>
                  <select v-model="store.selectedShippingCharge" class="form-select shadow-none" id="shipping_charge"
                    required>
                    <option value="">Select delivery area</option>
                    <option v-for="charge in store.shippingCharge" :key="charge.id" :value="charge.shipping_charge">
                      {{ charge.shipping_title }} ({{ charge.shipping_charge }}৳)
                    </option>
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