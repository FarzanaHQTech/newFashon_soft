<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useHomeCategoryStore } from '../../stores/girlsWomenStore';
import { IMAGE_BASE_URL } from '../../api';
import ptsv from '../../assets/pt.svg';
import ProductModal from '../productVarients/ProductVarientModal.vue';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { useCartCheckoutStore } from '../../stores/cartCheckout';

const router = useRouter();
const homeStore = useHomeCategoryStore();
const cartStore = useCartCheckoutStore();
const selectedProduct = ref(null);
const productModal = ref(null);
const isLoading = ref(true);

// Computed property to get categories with products
const categoriesWithProducts = computed(() => {
  return homeStore.categories.filter(category => {
    const products = homeStore.getCategoryProducts(category.id);
    return products && products.length > 0;
  });
});

// Initialize and load data
onMounted(async () => {
  try {
    await homeStore.fetchCategories();
    initModal();
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
});

const initModal = () => {
  nextTick(() => {
    const modalElement = document.getElementById('productModal');
    if (modalElement && !productModal.value) {
      productModal.value = new Modal(modalElement);
    }
  });
};

const handleImageClick = (product, event) => {
  router.push(`/product-show/${product.slug}`);
};

// const handleOrderButtonClick = async (product, event) => {
//   event.preventDefault();
//   event.stopPropagation();

//   // Ensure modal is initialized
//   if (!productModal.value) {
//     initModal();
//   }

//   if (product.is_variant == 1 && product.variant_option) {
//     try {
//       selectedProduct.value = product;
//       await nextTick(); // Wait for the modal to be updated with new product
//       productModal.value?.show();
//     } catch (error) {
//       console.error('Error showing modal:', error);
//       // Fallback to direct checkout if modal fails
//       await addToCartAndCheckout(product);
//     }
//   } else {
//     await addToCartAndCheckout(product);
//   }
// };
const productModalRef = ref(null)

const handleOrderButtonClick = async (product, event) => {
  event.preventDefault()
  
  if (product.is_variant == 1 && product.variant_option) {
    selectedProduct.value = product
  await nextTick()
  productModalRef.value?.showModal()
  }else{

    await addToCartAndCheckout(product);
  }
}

const addToCartAndCheckout = async (product) => {
  try {
    const productData = {
      product_id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.main_image,
      price: product.price,
      quantity: 1,
      discount: 0
    };
    
    await cartStore.addToCart(productData);
    router.push('/checkout');
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

const handleLoadMore = async (categoryId) => {
  await homeStore.loadMore(categoryId);
  // Reinitialize modal if needed after new products are loaded
  if (!productModal.value) {
    initModal();
  }
};
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Content when loaded -->
    <template v-else>
      <!-- Product Modal Component -->
      <!-- <ProductModal v-if="selectedProduct" :product="selectedProduct" /> -->
      <ProductModal 
  ref="productModalRef" 
  v-if="selectedProduct" 
  :product="selectedProduct" 
/>
      <template v-if="categoriesWithProducts.length">
        <div class="category_products" v-for="category in categoriesWithProducts" 
             :key="category.id" :data-category-id="category.id">
          <!-- Category header -->
          <div class="banner rounded-2">
            <div class="text-center w-100">
              <div class="title">{{ category.name }}</div>
              <img :src="ptsv" style="width: 200px;">
              <div class="small" v-if="category.tag">{{ category.tag }}</div>
            </div>
          </div>
          
          <!-- Products grid -->
          <div class="products mt-3">
            <div class="product" v-for="item in homeStore.getCategoryProducts(category.id)" 
                 :key="item.id">
              <div class="image">
                <router-link :to="'/product-show/' + item.slug">
                  <div>
                    <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" 
                         :alt="item.name" class="first" @click="() => handleImageClick(item)"/>
                    <img :src="`${IMAGE_BASE_URL}/images/product/small/${item.main_image}`" 
                         class="second" @click="() => handleImageClick(item)"/>
                  </div>
                </router-link>
                
                <div class="product_btn_position content">
                  <button type="button" class="submit_button btn btn-light d-block" 
                          @click="(event) => handleOrderButtonClick(item, event)">
                    <div class="cart_btn bangali bold ord_bt">
                      <i class="fa fa-cart-shopping"></i><span> অর্ডার করুন</span>
                    </div>
                  </button>
                </div>
              </div>

              <div class="content px-2 text-center">
                <router-link :to="'/product-show/' + item.slug" class="title">
                  {{ item.name }}
                </router-link>
                <div class="price">
                  <span class="current_price" style="color: #00276C;">{{ item.price }} Tk</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Load More -->
          <div class="text-center mt-3" v-if="homeStore.hasMoreProducts(category.id)">
            <button class="btn btn-danger load-more-products" 
                    @click="() => handleLoadMore(category.id)"
                    :disabled="homeStore.loadingMoreMap[category.id]">
              {{ homeStore.loadingMoreMap[category.id] ? 'Loading...' : 'Load More' }}
            </button>
          </div>
        </div>
      </template>
      
      <div v-else class="text-center py-5">
        <p>No products found</p>
      </div>
    </template>
  </div>
</template>