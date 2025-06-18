<script setup>
import { ref, onMounted, computed } from 'vue';
import { useHomeCategoryStore } from '../../stores/girlsWomenStore';
import { IMAGE_BASE_URL } from '../../api';
import ptsv from '../../assets/pt.svg';

const homeStore = useHomeCategoryStore();

onMounted(async () => {
  await homeStore.fetchCategories();
});

const handleNavigate = (item, navigate) => {
  navigate(`/product/${item.id}`);
};

const handleOrder = (product) => {
  console.log('Ordering product:', product);
};

</script>
<template>
  <div class="">
    <div class="category_products" :data-category-id="category.id" v-for="category in homeStore.categories"
      :key="category.id">
      <!-- Category header -->
      <div class="banner rounded-2">
        <div class="text-center w-100">
          <div class="title">{{ category.name }}</div>
          <img :src="ptsv" style="width: 200px;">
          <div class="small" v-if="category.tag">{{ category.tag }}</div>
        </div>
      </div>
      <div class="products mt-3">
        <div class="product" v-for="item in homeStore.getCategoryProducts(category.id)" :key="item.id">

          <div class="image">

         
            <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
              <div>
                <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" alt="" class="first" />
                <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" class="second" />
              </div>
            </router-link>

            <!-- <router-link to="/product-show/${item.slug}" custom v-slot="{ navigate }"> -->
            <!-- <div class="product_btn_position content">
              <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
                <div @click="() => handleNavigate(item, navigate)">
                  <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" alt="" class="first" />
                  <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" class="second" />
                </div>
              </router-link>
            </div> -->

            <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
            <div class="product_btn_position content">
              <button type="button" class="submit_button btn btn-light d-block" @click="handleOrder()">
                <div class="cart_btn bangali bold ord_bt">
                  <i class="fa fa-cart-shopping"></i><span> অর্ডার করুন</span>
                </div>
              </button>

            </div>
            </router-link>
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
            <router-link :to="{name:'ProductDetail',params:{slug:item.slug}}" custom v-slot="{ navigate }">
              <div @click="navigate" class="title">{{ item.name }}</div>
            </router-link>
            <div class="price">
              <span class="current_price" style="color: #00276C;">{{ item.price }} Tk</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 
:disabled="homeStore.loadingMoreMap[category.id]"
{{ homeStore.loadingMoreMap[category.id] ? 'Loading...' : 'Load More' }} -->
      <!-- Load More -->
      <div class="text-center mt-3" v-if="homeStore.hasMoreProducts(category.id)">
        <button class="btn btn-danger load-more-products" @click="homeStore.loadMore(category.id)"
          :disabled="homeStore.loadingMoreMap[category.id]">
          {{ homeStore.loadingMoreMap[category.id] ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>
  </div>

</template>
