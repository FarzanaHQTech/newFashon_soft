import { defineStore } from "pinia";
import api from "../api"; // Ensure your API setup is working

export const useHomeCategoryStore = defineStore("girlsWomen", {
  state: () => ({
    homeCategories: [],
    sliders: [],
    loading: false,
    error: null,

    categoryProductsMap: {}, // <-- holds products per category
    // loadingMore: false,
    loadingMoreMap: {}, // categoryId => true/false
    productsCountMap: {}, // <-- track total per category
  }),

  actions: {
    async fetchCategories(page = 1) {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get(`/home?page=${page}`);

        if (res.data.success) {
          // const filteredCategories = (res.data.categoriesProducts || []).filter(
          //   (cat) => cat.products_count > 0 && cat.products?.length > 0
          // );
          const filteredCategories = (res.data.categoriesProducts || []).filter(
            (cat) => cat.products_count > 0
          );
          this.homeCategories = filteredCategories;
          this.sliders = res.data.sliders || [];

          // filteredCategories.forEach((cat) => {
          //   this.categoryProductsMap[cat.id] = cat.products || [];
          //   this.productsCountMap[cat.id] =
          //     cat.products_count || cat.products?.length || 0;
          // });
          filteredCategories.forEach((cat) => {
            this.categoryProductsMap[cat.id] = cat.products?.length
              ? cat.products
              : [];
            this.productsCountMap[cat.id] = cat.products_count || 0;
          });
        } else {
          this.error = "Failed to load data from server";
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        this.error = err.message || "Network error occurred";
      } finally {
        this.loading = false;
      }
    },

    async loadMore(categoryId) {
      if (this.loadingMoreMap[categoryId]) return;
      this.loadingMoreMap[categoryId] = true;
      this.error = null;

      try {
        const currentProducts = this.categoryProductsMap[categoryId] || [];
        const offset = currentProducts.length;

        const res = await api.get(
          `/category-products/${categoryId}?offset=${offset}`
        );

        if (res.data.success) {
          const newProducts = res.data.products || [];

          // Filter out duplicates just in case
          const existingIds = new Set(currentProducts.map((p) => p.id));
          const filteredNew = newProducts.filter((p) => !existingIds.has(p.id));

          this.categoryProductsMap[categoryId] = [
            ...currentProducts,
            ...filteredNew,
          ];

          if (typeof res.data.total === "number") {
            this.productsCountMap[categoryId] = res.data.total;
          }
        } else {
          this.error = "Failed to load more products";
        }
      } catch (err) {
        console.error("Load More Error:", err);
        this.error = err.message || "Failed to load more products";
      } finally {
        this.loadingMoreMap[categoryId] = false;
      }
    },
  },

  getters: {
    categories: (state) => state.homeCategories,

    getCategoryProducts: (state) => {
      return (categoryId) => state.categoryProductsMap[categoryId] || [];
    },

    hasMoreProducts: (state) => {
      return (categoryId) => {
        const current = state.categoryProductsMap[categoryId]?.length || 0;
        const total = state.productsCountMap[categoryId] || 0;
        return current < total;
      };
    },
  },
});

// <script setup>
// import product1 from '../../assets/image/images/product/small/ajl-1ba1741154819.jpg'
// import product2 from '../../assets/image/images/product/small/25JH-872a174115444717456633351746606906.jpg'

// import product3 from '../../assets/image/images/product/small/MAYRA-01a17411545661746607171.jpg'

// import product4 from '../../assets/image/images/product/small/MIS3P2502-0417411546941746608383.jpg'

// import product5 from '../../assets/image/images/product/small/MAYRA-01a174115456617466071721746612605.jpg'

// import product6 from '../../assets/image/images/product/small/GULAL25-0217411542781747474373.jpg'

// import product7 from '../../assets/image/images/product/small/25JH-874a174115444717456633351747471805.jpg'

// import product8 from '../../assets/image/images/product/small/D-3077174116966317456639611747474705.jpg'

// import product9 from '../../assets/image/images/product/small/8YzNcqgnUIYhupuxDVT9GT0a9DQWLt9J2r7cC6H61747476127.webp'
// import product10 from '../../assets/image/images/product/small/g5GQX9dILyBg39UYD2F73JIUzHIbitd87Rp15PYM1747476567.webp'
// import ptsv from '../../assets/pt.svg'

// import product11 from '../../assets/image/images/product/small/25JH-865a1741154447.jpg'

// import product12 from '../../assets/image/images/product/small/MAYRA-01a1741154566.jpg'
// import product13 from '../../assets/image/images/product/small/MAYRA-01a17411545661746607171.jpg'

// import product14 from '../../assets/image/images/product/small/MIS3P2502-041741154694.jpg'
// import product15 from '../../assets/image/images/product/small/ajl-1ba1741154819.jpg'

// import product16 from '../../assets/image/images/product/small/ETHNIC-261741155366.jpg'

// import product17 from '../../assets/image/images/product/small/NU2-142a1741155520.jpg'

// import product18 from '../../assets/image/images/product/small/D-17531741156294.jpg'

// import product19 from '../../assets/image/images/product/small/ck-19378a1741156393.jpg'
// import product20 from '../../assets/image/images/product/small/GL-01a1741156515.jpg'

// const womenFashions = [
//   {
//     id: 96,
//     name: "Asim Jofa Luxury Lawn 2020 collections-122",
//     images:product11,
//     currentPrice: "6500 Tk",
//      categoryId: 41,
//   },
//   {
//     id: 97,
//     name: "Johra Khalwats",
//     images:product12,
//      categoryId: 42,
//     currentPrice: "4200 Tk",
//   },
//   {
//     id: 89,
//     name: "Mayra ZA Clothes0",
//     images:product13,
//     currentPrice: "4500 Tk",
//    categoryId: 43
//   },
//   {
//     id: 98,
//     name: "Mishaal Vol-02 By GullJee0",
//     images: product14,
//     currentPrice: "2070 Tk",
//      categoryId: 44
//   },
//   {
//     id: 90,
//     name: "Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01",
//     images: product15,
//     currentPrice: "5000 Tk",
//      categoryId: 45,
//   },
//   {
//     id: 91,
//     name: "Gulal Premium Eid Exclusive Lawn Collections 1",
//     images: product16,
//     currentPrice: "5500 Tk",
//      categoryId: 46
//   },
//   {
//     id: 92,
//     name: "Johra Khalwat",
//     images:product17,
//     currentPrice: "4100 Tk",
//    categoryId: 47
//   },
//   {
//     id: 70,
//     name: "Mehri vol-02 Chikankari by Tawakkal 11",
//     images: product18,
//     currentPrice: "5000 Tk",
//     categoryId: 48
//   },
//   {
//     id: 71,
//     name: "Saira Rizwan Unstitched Lawn Vol",
//     images:product19,
//     currentPrice: "5000 Tk",
//  categoryId: 49
//   },
//   {
//     id: 72,
//     name: "Unstitched Embroidered Chiffon Suit 3 Pc",
//     images:product20,
//     currentPrice: "2520 Tk",
//     originalPrice: "2800 Tk",
//     categoryId: 50,
//   }
// ]

// const handleNavigate = (item, navigate) => {
//   localStorage.setItem('selectedProduct', JSON.stringify(item));
//   console.log("Navigating to product with:", item);
//   navigate();
// };

// const girlsFashions = [
//   {
//     id: 96,
//     name: "Asim Jofa Luxury Lawn 2020 collections-122",
//     images: product1,
//     currentPrice: "6500 Tk",
//     categoryId: 41,
//   },
//   {
//     id: 97,
//     name: "Johra Khalwats",
//     images: product2,
//     categoryId: 42,
//     currentPrice: "4200 Tk",
//   },
//   {
//     id: 89,
//     name: "Mayra ZA Clothes0",
//     images: product3,
//     currentPrice: "4500 Tk",
//     categoryId: 43
//   },
//   {
//     id: 98,
//     name: "Mishaal Vol-02 By GullJee0",
//     images: product4,
//     currentPrice: "2070 Tk",
//     categoryId: 44
//   },
//   {
//     id: 90,
//     name: "Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01",
//     images: product5,
//     currentPrice: "5000 Tk",
//     categoryId: 45,
//   },
//   {
//     id: 91,
//     name: "Gulal Premium Eid Exclusive Lawn Collections 1",
//     images: product6,
//     currentPrice: "5500 Tk",
//     categoryId: 46
//   },
//   {
//     id: 92,
//     name: "Johra Khalwat 11",
//     images: product7,
//     currentPrice: "4100 Tk",
//     categoryId: 47
//   },
//   {
//     id: 70,
//     name: "Mehri vol-02 Chikankari by Tawakkal 11",
//     images: product8,
//     currentPrice: "5000 Tk",
//     categoryId: 48
//   },
//   {
//     id: 71,
//     name: "Saira Rizwan Unstitched Lawn Vol",
//     images: product9,
//     currentPrice: "5000 Tk",
//     categoryId: 49
//   },
//   {
//     id: 72,
//     name: "Unstitched Embroidered Chiffon Suit 3 Pc",
//     images: product10,
//     currentPrice: "2520 Tk",
//     originalPrice: "2800 Tk",
//     categoryId: 50,
//   }
// ]
// </script>

// <template>
//   <!-- girls Fashion -->
//   <div class="">
//     <div class="category_products" data-category-id="73">
//       <!-- Your category header content -->
//       <div class="banner rounded-2">
//         <div class="text-center w-100">
//           <div class="title">Girls Fashion</div>
//           <img :src="ptsv" style="width: 200px;">
//           <div class="small">Find the perfect match for any occasion.</div>
//         </div>
//       </div>
//       <div class="products mt-3">
//         <!-- Initial products -->
//         <div class="product" v-for="item in girlsFashions" :key="item.id">
//           <div class="image">

//             <!-- <router-link :to="{ name: 'ProductDetail', params: { id: item.id } }" :data-productid="item.id"
//               :data-categoryid="item.categoryId" :data-productname="item.name"> -->
//             <router-link to="/product" custom v-slot="{ navigate }">
//               <div @click="() => handleNavigate(item, navigate)">
//                 <img :src="item.images" alt="" class="first" />
//                 <img :src="item.images" class="second" />
//               </div>
//             </router-link>

//             <div class="product_btn_position content">
//               <!-- <a class="submit_button btn btn-light btn_modal d-block" -->
//               <!-- href="product-show/asim-jofa-luxury-lawn-2020-collections-122.html" style=""> -->

//               <router-link to="/product" custom v-slot="{ navigate }">
//                 <div @click="() => handleNavigate(item, navigate)">
//                   <img :src="item.images" alt="" class="first" />
//                   <img :src="item.images" class="second" />
//                 </div>
//               </router-link>
//             </div>

//                      <div class="product_btn_position content">
//                 <button type="button" class="submit_button btn btn-light d-block" @click="handleOrder()">
//                   <div class="cart_btn bangali bold ord_bt">
//                     <i class="fa fa-cart-shopping"></i><span> অর্ডার করুন</span>
//                   </div>
//                 </button>
//               </div>
//           </div>

//           <div class="labels d-none">
//             <div class="tag bg-dark text-light">
//               -39%
//             </div>
//             <div class="tag bg-danger text-light">
//               Sold Out
//             </div>
//           </div>

//           <div class="content px-2 text-center">
//             <a href="product-show/asim-jofa-luxury-lawn-2020-collections-122.html" id="product_show"
//               data-productid="122" data-categoryid="73" :data-productname="item.name">
//               <div class="title">{{ item.name }}</div>
//             </a>
//             <div class="price">

//               <span class="current_price" style="color: #00276C;">{{ item.currentPrice }}</span>
//             </div>

//           </div>
//         </div>

//       </div>
//       <!-- Load More button (only show if category has more products than initially shown) -->
//       <div class="text-center mt-3">
//         <button class="btn btn-danger load-more-products" data-category-id="73" data-page="2">
//           Load More
//         </button>
//       </div>
//     </div>

//   </div>
//  <!-- women Fashion -->
//      <div class="category_products" data-category-id="47">
//           <!-- Your category header content -->
//           <div class="banner rounded-2">
//             <div class="text-center w-100">
//               <div class="title">Women Fashion</div>
//               <img :src="ptsv" style="width: 200px;">
//               <div class="small"> Top sale in this week</div>
//             </div>
//           </div>
//           <div class="products mt-3" >
//             <!-- Initial products -->
//             <div class="product" v-for="item in womenFashions" :key="item.id">
//               <div class="image">
//                 <a href="product-show/johra-khalwat.html" id="product_show" data-productid="51" data-categoryid="47"
//                   data-productname="Johra Khalwat">
//                   <img :src="item.images" alt="item.name" class="first">
//                   <img :src="item.images" alt="item.name" class="second">
//                 </a>
//                 <div class="product_btn_position content">
//                   <form method="POST" action="https://newfashion.softitglobal.com/carts" id="cart_form">
//                     <input type="hidden" name="_token" value="xsED4Nne1eihR0J1Q2QMZ66RViuU99odXVearmOw"
//                       autocomplete="off"> <input type="hidden" name="product_id" value="51">
//                     <input type="hidden" name="quantity" value="1">
//                     <input type="hidden" id="action_type" name="action_type" value="">
//                     <div class="d-flex justify-content-between">
//                       <button type="submit" class="submit_button btn btn-light d-block" data-type="order_now">
//                         <div class="cart_btn bangali bold ord_bt"><i class="fa fa-cart-shopping"></i><span> অর্ডার
//                             করুন</span></div>
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>

//               <div class="labels d-none">
//                 <div class="tag bg-dark text-light">
//                   -39%
//                 </div>
//                 <div class="tag bg-danger text-light">
//                   Sold Out
//                 </div>
//               </div>

//               <div class="content px-2 text-center">
//                 <a href="product-show/johra-khalwat.html" id="product_show" data-productid="51" data-categoryid="47"
//                   data-productname="Johra Khalwat">
//                   <div class="title">{{item.name}}</div>
//                 </a>
//                 <div class="price">

//                   <span class="current_price" style="color: #00276C;">{{ item.currentPrice }}</span>
//                 </div>

//               </div>
//             </div>

//           </div>
//           <div class="text-center mt-3">
//             <button class="btn btn-danger load-more-products" data-category-id="47" data-page="2">
//               Load More
//             </button>
//           </div>
//         </div>
// </template>
// <style scoped></style>
