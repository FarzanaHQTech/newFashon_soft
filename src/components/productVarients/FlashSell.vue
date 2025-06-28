<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { IMAGE_BASE_URL, posadminApi } from '../../api'

const flasSells = ref([])
const currentPage = ref(1)
const lastPage = ref(1)
const isLoading = ref(false)
const allLoaded = ref(false)
const lastDate = ref(null)
const isFlashSellActive = ref(false)

const countdownTime = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

let countdownInterval = null

function checkFlashActive() {
  if (!lastDate.value) {
    isFlashSellActive.value = false
    return
  }
  const now = new Date()
  const end = new Date(lastDate.value)
  isFlashSellActive.value = end > now
}

function startCountdown(endDate) {
  if (countdownInterval) clearInterval(countdownInterval)

  const targetDate = new Date(endDate).getTime()
  if (isNaN(targetDate)) return

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = targetDate - now

    if (distance < 0) {
      countdownTime.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
      clearInterval(countdownInterval)
      isFlashSellActive.value = false
      return
    }

    countdownTime.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    }
  }

  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
}

const fetchFlashSell = async (page = 1) => {
  if (isLoading.value || allLoaded.value) return

  try {
    isLoading.value = true
    const res = await posadminApi.get(`/flashProduct2?page=${page}`)

    if (res.data.success) {
      currentPage.value = res.data.pagination.current_page
      lastPage.value = res.data.pagination.last_page
      lastDate.value = res.data.last_date
      checkFlashActive()

      flasSells.value.push(...res.data.products)

      if (currentPage.value >= lastPage.value) {
        allLoaded.value = true
      }

      if (lastDate.value) {
        await nextTick()
        startCountdown(lastDate.value)
      }
    }
  } catch (error) {
    console.error('Failed to load flash sale products:', error)
  } finally {
    isLoading.value = false
  }
}

const loadMore = () => {
  if (currentPage.value < lastPage.value && !isLoading.value) {
    fetchFlashSell(currentPage.value + 1)
  }
}

onMounted(() => {
  fetchFlashSell()
  setInterval(checkFlashActive, 60000)
})
</script>

<template>
  <section v-if="isFlashSellActive" class="flash-sale">
    <div class="banner text-center">
      <h2 class="title">Flash Sell</h2>
      <span class="promo-count">
        <div class="countdown_box">
          <div class="count_item" v-for="(val, key) in countdownTime" :key="key">
            <div class="number">{{ val }}</div>
            <div class="label">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</div>
          </div>
        </div>
      </span>
    </div>

    <div class="products mt-3 flash-sale-products">
      <article class="product" v-for="item in flasSells" :key="item.id">
        <div class="image">
          <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
            <img
              :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`"
              :alt="`${item.name} product image`"
              class="first"
            />
          </router-link>

          <div class="product_btn_position content">
            <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
              <button class="submit_button btn btn-light d-block">
                <div class="cart_btn bangali bold ord_bt">
                  <i class="fa fa-cart-shopping"></i><span> অর্ডার করুন</span>
                </div>
              </button>
            </router-link>
          </div>
        </div>

        <div class="content px-2 text-center">
          <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }">
            <h3 class="title">{{ item.name }}</h3>
          </router-link>
          <div class="price">
            <span class="current_price">
                {{ item.promotion_price }} Tk
            </span>
            <del v-if="item.promotion && item.promotion_price" class="original_price" style="color: red;">
           
               {{ item.price }} Tk
            </del>
          </div>
        </div>
      </article>
    </div>

    <div class="text-center mt-3">
      <button class="btn btn-danger load-more-flash-sale" :disabled="isLoading || allLoaded" @click="loadMore">
        {{ allLoaded ? "All Products Loaded" : "Load More Flash Deals" }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.flash-sale .title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 15px;
}
.promo-count {
  font-size: 20px;
  margin-top: 10px;
}

.countdown_box {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
.count_item {
  background-color: #eee;
  padding: 8px;
  border-radius: 6px;
  font-weight: bold;
  width: 60px;
  text-align: center;
  transition: all 0.3s ease;
}
.count_item .number {
  font-size: 20px;
  color: #00276c;
}
.count_item .label {
  font-size: 12px;
  color: #555;
  margin-top: 2px;
}

.product {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.product:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.current_price {
  color: #00276c;
  font-weight: bold;
}
.original_price {
  color: red;
}

@media (max-width: 768px) {
  .flash-sale .title {
    font-size: 30px;
  }
}
</style>
