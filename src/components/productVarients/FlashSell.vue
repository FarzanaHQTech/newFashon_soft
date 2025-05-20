<script setup>
import { onMounted } from 'vue'
import product1 from '../../assets/image/images/product/small/DSC26521741599665.jpg'
import product2 from '../../assets/image/images/product/small/DSC89281741599841.webp'
import product3 from '../../assets/image/images/product/small/DSC7412_09979133-5da6-4dad-9b69-f2a56fb1cddb1741598188.jpg'
import product4 from '../../assets/image/images/product/small/DSC27901741600029.webp'
import product5 from '../../assets/image/images/product/small/DSC82001741598337.webp'
import product6 from '../../assets/image/images/product/small/DSC64101741598476.webp'
import product7 from '../../assets/image/images/product/small/DSC24601741598621.webp'
import product8 from '../../assets/image/images/product/small/DSC58111741594128.webp'
import product9 from '../../assets/image/images/product/small/DSC57401741594233.webp'
import product10 from '../../assets/image/images/product/small/DSC57871741594350.webp'
import ptsv from '../../assets/pt.svg'

const flasSells = [
  {
    id: 96,
    name: "Regular Fit Templeton Formal Shirt",
    images:product1,
    currentPrice: "2430 Tk",
    originalPrice: "2700 Tk",
    categoryId: 49
  },
  {
    id: 97,
    name: "Regular Fit Micro Check Formal Shirt",
    images:product2,
    // images: ["posadmin/images/product/small/DSC89281741599841.webp", "posadmin/images/product/small/DSC89281741599841.webp"],
    currentPrice: "1530 Tk",
    originalPrice: "1700 Tk",
    categoryId: 49
  },
  {
    id: 89,
    name: "Slim Fit Jacquard Templeton Formal Shirt",
    images:product3,
    currentPrice: "2790 Tk",
    originalPrice: "3100 Tk",
    categoryId: 49
  },
  {
    id: 98,
    name: "Regular Fit Classic Checkered Formal Shirt",
    images: product4,
    currentPrice: "2070 Tk",
    originalPrice: "2300 Tk",
    categoryId: 49
  },
  {
    id: 90,
    name: "Slim Fit Dobby Templeton Formal Shirt",
    images: product5,
    currentPrice: "2790 Tk",
    originalPrice: "3100 Tk",
    categoryId: 49
  },
  {
    id: 91,
    name: "Slim Fit Formal Shirt",
    images: product6,
    currentPrice: "1530 Tk",
    originalPrice: "1700 Tk",
    categoryId: 49
  },
  {
    id: 92,
    name: "Regular Fit Multicolor Formal Shirt",
    images:product7,
    currentPrice: "2070 Tk",
    originalPrice: "2300 Tk",
    categoryId: 49
  },
  {
    id: 70,
    name: "Regular Fit Endy Cotton Semi-Formal Panjabi",
    images: product8,
    currentPrice: "2880 Tk",
    originalPrice: "3200 Tk",
    categoryId: 40,
   
  },
  {
    id: 71,
    name: "Panjabi Regular Fit Jacquard Cotton Semi-Formal Panjabi",
    images:product9,
    currentPrice: "2430 Tk",
    originalPrice: "2700 Tk",
    categoryId: 39
  },
  {
    id: 72,
    name: "Regular Fit Jacquard Cotton Semi-Formal Panjabi.",
    images:product10,
    currentPrice: "2520 Tk",
    originalPrice: "2800 Tk",
    categoryId: 40
  }
]


onMounted(() => {
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
</script>


<template >
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
          :data-categoryid="item.categoryId"
          :data-productname="item.name"
        >
          <img :src="item.images" :alt="item.name" class="first" />
          <img :src="item.images" :alt="item.name" class="second" />
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

      <div class="labels d-none">
        <div class="tag bg-dark text-light">-39%</div>
        <div class="tag bg-danger text-light">Sold Out</div>
      </div>

      <div class="content px-2 text-center">
        <a
          :href="`product-show/${item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}.html`"
          id="product_show"
          :data-productid="item.id"
          :data-categoryid="item.categoryId"
          :data-productname="item.name"
        >
          <div class="title">{{ item.name }}</div>
        </a>
        <div class="price">
          <span class="current_price" style="color: #00276C; font-weight: bold;">{{ item.currentPrice }}</span>
          <del style="color: red;">{{ item.originalPrice }}</del>
        </div>
      </div>
    </div>
  </div>

      <div class="text-center mt-3">
        <button class="btn btn-danger load-more-flash-sale" data-page="2">
          Load More Flash Deals
        </button>
      </div>


         <!--End girls Fashion -->

            <!-- Women Fashion -->
        
        <!--End Women Fashion -->
    
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
