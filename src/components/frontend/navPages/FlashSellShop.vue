
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { IMAGE_BASE_URL } from '../../../api';
import { useFlashNewStore } from '../../../stores/navShopPage';

const flashSellShop = useFlashNewStore();
const { flashProductsShops } = storeToRefs(flashSellShop); 

onMounted(async () => {
  await flashSellShop.fetchFlashShopPage()
//   console.log("Data",flashSellShop.fetchFlashShopPage());
  ; 
});
</script>


<template>
  <div class="container-fluid" style="min-height: 800px">
    <div class="products shopProducts mt-3">  
      <div class="product" v-for="(item , index) in flashProductsShops" :key="index">
        <div class="image">
          <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }"
             :data-productid="item.id"
             :data-categoryid="item.category_id"
             :data-productname="item.name">
            <img :src="`${IMAGE_BASE_URL}images/product/small/${item.main_image}`" alt="" class="first" />
            <img :src="`${IMAGE_BASE_URL}images/product/small/${item.main_image}`" alt="" class="second" />
          </router-link>
           <div class="product_btn_position content">
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
                    <router-link  :to="{ name: 'ProductDetail', params: { slug: item.slug } }"
                        id="product_show" :data-productid="item.id" data-categoryid="item.category_id"
                        :data-productname="item.name">
                        <div class="title">{{item.name}}</div>
                    </router-link>
                    <div class="price">


                        <span class="current_price" style="color: #00276C;font-weight: bold;">{{item.price}} Tk</span>

                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
</style>