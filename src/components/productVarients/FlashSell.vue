<script setup>
import { onMounted, ref } from 'vue'

import ptsv from '../../assets/pt.svg'
import api from '../../api'
import { IMAGE_BASE_URL } from '../../api'
const flasSells = ref([])
const currentPage = ref(1)
const lastPage = ref(1)
const isLoading = ref(false)
const allLoaded = ref(false)

const fetchFlashSell = async (page = 1, loadAll = false) => {
  try {
    isLoading.value = true
    let url = `/flashProduct2?page=${page}`
    if (loadAll) url += `&all=true`  // add param to get all remaining products
    
    const res = await api.get(url)
    console.log(res);
 

    if (page === 1) {
      flasSells.value = res.data.products
    } else {
      flasSells.value = [...flasSells.value, ...res.data.products]
    }

    currentPage.value = res.data.pagination.current_page
    lastPage.value = res.data.pagination.last_page

    // If loading all, no more to load
    if (loadAll || !res.data.pagination.has_more) {
      allLoaded.value = true
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
fetchFlashSell()


  function startCountdown(elementId, endDate, design = false) {
    const countdownElement = document.getElementById(elementId);
    const targetDate = new Date(endDate).getTime();

    if (isNaN(targetDate)) {
      countdownElement.innerHTML = 'Invalid date';
      return;
    }

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        countdownElement.innerHTML = 'Expired';
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   countdownElement.innerHTML = design
  ? `
    <div class="countdown_box2">
      <div class="count_item">
        <div class="number">${days}</div>
        <div class="label">Days</div>
      </div>
      <div class="count_item">
        <div class="number">${hours}</div>
        <div class="label">Hrs</div>
      </div>
      <div class="count_item">
        <div class="number">${minutes}</div>
        <div class="label">Min</div>
      </div>
      <div class="count_item">
        <div class="number">${seconds}</div>
        <div class="label">Sec</div>
      </div>
    </div>
  `
  : `
    <div class="countdown_box">
      <div class="count_item">
        <div class="number">${days}</div>
        <div class="label">Days</div>
      </div>
      <div class="count_item">
        <div class="number">${hours}</div>
        <div class="label">Hrs</div>
      </div>
      <div class="count_item">
        <div class="number">${minutes}</div>
        <div class="label">Min</div>
      </div>
      <div class="count_item">
        <div class="number">${seconds}</div>
        <div class="label">Sec</div>
      </div>
    </div>
  `;

    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  }

  const countdownElement = document.querySelector('.promo-count');
  const endDate = countdownElement.dataset.date;
  startCountdown('promoCountdown2', endDate);
});

// Load More button click handler
const loadMore = () => {
  if (allLoaded.value) return // no more products

  if (currentPage.value < lastPage.value) {
    // Load next page normally (10 more)
    fetchFlashSell(currentPage.value + 1)
  } else {
    // Load all remaining products at once
    fetchFlashSell(1, true)
  }
}
</script>


<template>
  <div class="category_products flash-sale-container">
    <div class="banner rounded-2">
      <div class="text-center w-100">
        <div class="title">Flash Sell</div>
        <img :src="ptsv" style="width: 200px;">
        <span class="promo-count mx-2" id="promoCountdown2" data-date="2025-05-31"></span>
      </div>
    </div>
  </div>

  <!-- Products Container -->
  <div class="products mt-3 flash-sale-products">
    <div class="product" v-for="item in flasSells" :key="item.id">
      <div class="image">
        <a
          :href="`product-show/${item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}.html`"
          id="product_show"
          :data-productid="item.id"
          :data-categoryid="item.category_id"
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
            <input type="hidden" name="_token" value="xsED4Nne1eihR0J1Q2QMZ66RViuU99odXVearmOw" autocomplete="off" />
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

      <div class="content px-2 text-center">
        <a
          :href="`product-show/${item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}.html`"
          id="product_show"
          :data-productid="item.id"
          :data-categoryid="item.category_id"
          :data-productname="item.name"
        >
          <div class="title">{{ item.name }}</div>
        </a>
        <div class="price">
          <span class="current_price" style="color: #00276C; font-weight: bold;">
            {{ item.promotion && item.promotion_price ? item.promotion_price : item.price }}
          </span>
          <del v-if="item.promotion && item.promotion_price" style="color: red;">
            {{ item.price }} Tk
          </del>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center mt-3">
    <button 
      class="btn btn-danger load-more-flash-sale" 
      :disabled="isLoading || allLoaded" 
      @click="loadMore"
    >
      {{ allLoaded ? "All Products Loaded" : "Load More Flash Deals" }}
    </button>
  </div>
</template>

<style scoped>
/* Other styles */
.promo-count {
  padding: 2px 10px;
  color: #000;
  border-radius: 2px;
  font-size: 20px;
  display: block;
}

:deep(.countdown_box),
:deep(.countdown_box2) {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

:deep(.count_item) {
  background-color: #eee;
  padding: 8px;
  border-radius: 6px;
  font-weight: bold;
  width: 60px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

:deep(.count_item .number) {
  font-size: 20px;
  color: #00276C;
  font-weight: bold;
}

:deep(.count_item .label) {
  font-size: 12px;
  color: #555;
  margin-top: 2px;
}


.category_products .banner .title {
  font-size: 40px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .category_products .banner .title {
    font-size: 30px;
  }
}
</style>
