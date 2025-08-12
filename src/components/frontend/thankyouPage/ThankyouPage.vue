<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { posadminApi } from '../../../api';
import { useCustomerStore } from '../../../stores/Auth/customerDash';
import { storeToRefs } from 'pinia';

const route = useRoute();
const orderId = route.params.order_id;
const order = ref(null);
const loading = ref(true);
const error = ref(null);
const customerInfo = useCustomerStore()

onMounted(async () => {
  customerInfo.getUserFromStorage()
  try {

    const response = await posadminApi.get(`/thank-you/${orderId}`);
    console.log('Order details:', response.data.order);

    if (response.data.order) {
      order.value = response.data.order; // 
    } else {
      throw new Error('Order data not found in response');
    }
  } catch (err) {
    console.error('Failed to load order:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to load order details';
  } finally {
    loading.value = false;
  }

});

</script>


<template>

  <div v-if="loading" class="text-center py-5 text-white">
    <h2>Loading your order details...</h2>

  </div>

  <div v-else class="container-xl" style="min-height: 800px">
    <section class="h-100 gradient-custom">
      <div class="container py-5"
        style="clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);background: #00276C;">
        <div class="d-flex my-5 justify-content-center flex-wrap flex-column align-items-center gap-5 thanks_section">
          <img src="https://newfashion.softitglobal.com/images/check-mark-1292787_1280.webp" width="70" alt="">
          <h2 class="bold" style="color: #fff;">অভিনন্দন !!!</h2>
          <h2 class="pop bold text-center" style="color: #fff;">
            আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। <br>
            Order ID #{{ order?.id }}
          </h2>
          <h5 class="text-center" style="color: #fff;">কিছুক্ষণের মাঝে আপনাকে মেসেজ অথবা কল করা হবে।</h5>
          <router-link to="/" class="btn btn-warning bold">Shop More</router-link>
     <router-link v-if="customerInfo.user" to="/customer/my-orders" class="btn btn-dark orange-bg bold">
  Show Order
</router-link>

          <!-- <router-link
          to="`https://vue.softitglobalbd.xyz//sales/gen_invoice/${order?.id}`" 
          class="btn btn-dark orange-bg bold"
          v-if="order"
        >
          Print Invoice
        </router-link> -->
        </div>
      </div>
    </section>
  </div>



</template>


<style scoped>
.thanks_section {
  margin-top: 0px !important;
  gap: 1rem !important;
}

.gradient-custom {
  padding-top: 15px;
  padding-bottom: 15px;
}

.orange-bg {
  background-color: #FF6B00;
  color: white;
}
</style>