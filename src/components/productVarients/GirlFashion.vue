


<script setup>
import ptsv from '../../assets/pt.svg'
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useHomeCategoryStore } from '../../stores/homeCategoryStore'
import { IMAGE_BASE_URL } from '../../api'

const cateGirlsProducts = useHomeCategoryStore()
const { homeCategories, categoryProducts, loadingMore, currentPage, lastPage, productsCount } = storeToRefs(cateGirlsProducts)
const { loadMoreProducts, fetchHomeCategories } = cateGirlsProducts

onMounted(async () => {
  await fetchHomeCategories(1)
})

const girlsFashionCategory = computed(() => homeCategories.value[0] || {})

// Show Load More button only if there are more products to load AND not currently loading
const showLoadMore = computed(() => {
  return categoryProducts.value.length < productsCount.value && !loadingMore.value
})
// console.log('categoryProducts.length:', categoryProducts.value.length);
// console.log('productsCount:', productsCount.value);
// console.log('loadingMore:', loadingMore.value);

</script>

<template>
  <div
    v-if="girlsFashionCategory && girlsFashionCategory.id"
    class="category_products"
    :data-category-id="girlsFashionCategory.id"
  >
    <!-- Banner -->
    <div class="banner rounded-2">
      <div class="text-center w-100">
        <div class="title">{{ girlsFashionCategory.name }}</div>
        <img :src="ptsv" style="width: 200px;" />
        <div class="small">{{ girlsFashionCategory.tag }}</div>
      </div>
    </div>

    <!-- Product List -->
    <div class="products mt-3">
      <div class="product" v-for="item in categoryProducts" :key="item.id">
        <div class="image">
          <router-link :to="{ name: 'ProductDetail', params: { id: item.id } }">
            <div>
              <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" alt="" class="first" />
              <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.image}`" class="second" />
            </div>
          </router-link>

          <div class="product_btn_position content">
            <button type="button" class="submit_button btn btn-light d-block">
              <div class="cart_btn bangali bold ord_bt">
                <i class="fa fa-cart-shopping"></i><span> অর্ডার করুন</span>
              </div>
            </button>
          </div>
        </div>

        <div class="content px-2 text-center">
          <div class="title">{{ item.name }}</div>
          <div class="price">
            <span class="current_price" style="color: #00276C;">{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div class="text-center mt-3" v-if="showLoadMore">
      <button
        @click="loadMoreProducts"
        :disabled="loadingMore"
        class="btn btn-danger load-more-products"
      >
        {{ loadingMore ? "Loading..." : "Load More" }}
      </button>
    </div>
  </div>
</template>