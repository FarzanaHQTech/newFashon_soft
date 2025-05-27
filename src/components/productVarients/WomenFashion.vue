<script setup>
import { onMounted, computed } from 'vue'
import { useCategoryStore } from '../../stores/getProductStore'
import { IMAGE_BASE_URL } from '../../api'
import ptsv from '../../assets/pt.svg'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchProduct(47, 1)
})

function loadMore() {
  if (categoryStore.currentPage < categoryStore.lastPage) {
    const nextPage = categoryStore.currentPage + 1
    categoryStore.fetchProduct(47, nextPage)
  }
}

// Computed for filtered category products
const womenFashions = computed(() =>
  categoryStore.categoryProducts.filter(product => product.category_id === 47)
)
</script>

<template>
  <div class="category_products" data-category-id="47">
    <!-- Banner Section -->
    <div class="banner rounded-2">
      <div class="text-center w-100">
        <div class="title">Women Fashion</div>
        <img :src="ptsv" style="width: 200px;" />
        <div class="small">Top sale in this week</div>
      </div>
    </div>

    <!-- Product List -->
    <div class="products mt-3">
      <transition-group name="fade" tag="div" class="row g-3 justify-content-center">
        <div class="product col-md-3 col-6" v-for="item in womenFashions" :key="item.id">
          <div class="image">
            <a
              :href="`product-show/${item.slug}.html`"
              :data-productid="item.id"
              data-categoryid="47"
              :data-productname="item.name"
            >
              <img
                :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`"
                :alt="item.name"
                class="first"
              />
              <img
                :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`"
                :alt="item.name"
                class="second"
              />
            </a>

            <div class="product_btn_position content">
              <form method="POST" action="https://newfashion.softitglobal.com/carts" id="cart_form">
                <input type="hidden" name="_token" value="xsED4Nne1eihR0J1Q2QMZ66RViuU99odXVearmOw" />
                <input type="hidden" name="product_id" :value="item.id" />
                <input type="hidden" name="quantity" value="1" />
                <input type="hidden" id="action_type" name="action_type" value="" />

                <div class="d-flex justify-content-between">
                  <button type="submit" class="submit_button btn btn-light d-block" data-type="order_now">
                    <div class="cart_btn bangali bold ord_bt">
                      <i class="fa fa-cart-shopping"></i><span> অর্ডার করুন</span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Labels -->
          <div class="labels d-none">
            <div class="tag bg-dark text-light">-39%</div>
            <div class="tag bg-danger text-light">Sold Out</div>
          </div>

          <!-- Product Info -->
          <div class="content px-2 text-center">
            <a
              :href="`product-show/${item.slug}.html`"
              :data-productid="item.id"
              data-categoryid="47"
              :data-productname="item.name"
            >
              <div class="title">{{ item.name }}</div>
            </a>
            <div class="price">
              <span class="current_price" style="color: #00276C;">
                {{ item.currentPrice || item.price }}
              </span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Load More Button -->
    <div class="text-center mt-3">
      <button
        class="btn btn-danger load-more-products"
        @click="loadMore"
        :disabled="categoryStore.currentPage >= categoryStore.lastPage"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add fade animation */
/* .fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
} */
</style>




<!--  -->
