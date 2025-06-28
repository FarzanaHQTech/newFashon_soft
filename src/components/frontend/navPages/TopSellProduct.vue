<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFlashNewStore } from '../../../stores/navShopPage';
import { IMAGE_BASE_URL } from '../../../api';

const route = useRoute();
const flashStore = useFlashNewStore();
const { topProductsShops, loading } = storeToRefs(flashStore);

const searchQuery = ref('');
const selectedCategoryId = ref(null);

const loadProducts = () => {
  const catId = route.query.cat_id || null;
  const q = route.query.q || '';
  selectedCategoryId.value = catId;
  searchQuery.value = q;
  flashStore.fetchTopSellPage(1, catId, q);
};

onMounted(loadProducts);

// Re-fetch when query changes
watch(
  () => [route.query.cat_id, route.query.q],
  loadProducts
);
</script>

<template>
  <div class="container-fluid" style="min-height: 800px">
    <div class="products shopProducts">  

  <!-- Show message when no products found -->

<div class="d-flex justify-content-center align-items-center  w-100 ">
  <div v-if="topProductsShops.length === 0" class="text-center">
    <div class="alert alert-warning p-4 shadow-sm rounded-3 mx-auto mt-5" style="max-width: 600px;">
      <h4 class="mb-3">
        <i class="fa fa-box-open me-2"></i>দুঃখিত! কোনো পণ্য খুঁজে পাওয়া যায়নি
      </h4>
      <p class="text-muted">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই। অনুগ্রহ করে অন্য ক্যাটাগরি দেখুন।</p>
      <router-link to="/" class="btn btn-warning mt-3">হোম পেইজে ফিরে যান</router-link>
    </div>
  </div>
</div>

        <!-- //Top Selling Shop Products  -->
      <div class="product" v-for="(item , index) in topProductsShops" :key="index">
        <div class="image">
          
              <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
            <img :src="`${IMAGE_BASE_URL}images/product/small/${item.main_image}`" alt="" class="first" />
            <img :src="`${IMAGE_BASE_URL}images/product/small/${item.main_image}`" alt="" class="second" />
          <!-- </a> -->
           </router-link>

           <div class="product_btn_position content">
                        <!-- <form method="POST" action="https://newfashion.softitglobal.com/carts" id="cart_form"> -->
                                 <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
                            <input type="hidden" name="_token" value="LTHwQNjo5ToXg7e35OXohGlNKkBqzc0oghUkFajK"
                                autocomplete="off"> <input type="hidden" name="product_id" value="69">
                            <input type="hidden" name="quantity" value="1">
                            <input type="hidden" id="action_type" name="action_type" value="">
                            <div class="d-flex justify-content-between">
                                <button type="submit" class="submit_button btn btn-light d-block" data-type="order_now">
                                    <div class="cart_btn bangali bold ord_bt"><i class="fa fa-cart-shopping"></i><span>
                                            অর্ডার করুন</span></div>
                                </button>
                            </div>
               </router-link>
                    </div>
                </div>

                <div class="labels d-none">
                    <div class="tag bg-dark text-light">
                        -39%
                    </div>
                    <div class="tag bg-danger text-light">
                        Sold Out
                    </div>
                </div>

                <div class="content px-2 text-center">
     
                           <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
                        <div class="title">{{item.name}}</div>
                        </router-link>
                    <!-- </a> -->
                    <div class="price">


                        <span class="current_price" style="color: #00276C;font-weight: bold;">{{item.price}} Tk</span>
                        <!-- <del style="color: red;"> {{item.price}} Tk</del> -->
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
</style>