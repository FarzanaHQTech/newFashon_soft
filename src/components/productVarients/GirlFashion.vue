<script setup> 
import product1 from '../../assets/image/images/product/small/ajl-1ba1741154819.jpg'
import product2 from '../../assets/image/images/product/small/25JH-872a174115444717456633351746606906.jpg'

import product3 from '../../assets/image/images/product/small/MAYRA-01a17411545661746607171.jpg'

import product4 from '../../assets/image/images/product/small/MIS3P2502-0417411546941746608383.jpg'

import product5 from '../../assets/image/images/product/small/MAYRA-01a174115456617466071721746612605.jpg'

import product6 from '../../assets/image/images/product/small/GULAL25-0217411542781747474373.jpg'

import product7 from '../../assets/image/images/product/small/25JH-874a174115444717456633351747471805.jpg'

import product8 from '../../assets/image/images/product/small/D-3077174116966317456639611747474705.jpg'

import product9 from '../../assets/image/images/product/small/8YzNcqgnUIYhupuxDVT9GT0a9DQWLt9J2r7cC6H61747476127.webp'
import product10 from '../../assets/image/images/product/small/g5GQX9dILyBg39UYD2F73JIUzHIbitd87Rp15PYM1747476567.webp'
import ptsv from '../../assets/pt.svg'

const girlsFashions = [
  {
    id: 96,
    name: "Asim Jofa Luxury Lawn 2020 collections-122",
    images:product1,
    currentPrice: "6500 Tk",

  },
  {
    id: 97,
    name: "Johra Khalwats",
    images:product2,
    
    currentPrice: "4200 Tk",
  },
  {
    id: 89,
    name: "Mayra ZA Clothes0",
    images:product3,
    currentPrice: "4500 Tk",
  
  },
  {
    id: 98,
    name: "Mishaal Vol-02 By GullJee0",
    images: product4,
    currentPrice: "2070 Tk",
  },
  {
    id: 90,
    name: "Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01",
    images: product5,
    currentPrice: "5000 Tk",
  },
  {
    id: 91,
    name: "Gulal Premium Eid Exclusive Lawn Collections 1",
    images: product6,
    currentPrice: "5500 Tk",
  },
  {
    id: 92,
    name: "Johra Khalwat 11",
    images:product7,
    currentPrice: "4100 Tk",
  
  },
  {
    id: 70,
    name: "Mehri vol-02 Chikankari by Tawakkal 11",
    images: product8,
    currentPrice: "5000 Tk",
   
  },
  {
    id: 71,
    name: "Saira Rizwan Unstitched Lawn Vol",
    images:product9,
    currentPrice: "5000 Tk",

  },
  {
    id: 72,
    name: "Unstitched Embroidered Chiffon Suit 3 Pc",
    images:product10,
    currentPrice: "2520 Tk",
    originalPrice: "2800 Tk",
    categoryId: 40
  }
]
</script>

<template >
      <!-- girls Fashion -->
      <div class="">
        <div class="category_products" data-category-id="73">
          <!-- Your category header content -->
          <div class="banner rounded-2">
            <div class="text-center w-100">
              <div class="title">Girls Fashion</div>
              <img src="assets/pt.svg" style="width: 200px;">
              <div class="small">Find the perfect match for any occasion.</div>
            </div>
          </div>
          <div class="products mt-3">
            <!-- Initial products -->
            <div class="product" v-for="item in girlsFashions">
              <div class="image">
                <a href="product-show/asim-jofa-luxury-lawn-2020-collections-122.html" id="product_show"
                  data-productid="122" data-categoryid="73"
                  data-productname="Asim Jofa Luxury Lawn 2020 collections-122">
                  <img :src="item->" alt="" class="first">
                  <img src="" alt="" class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block"
                    href="product-show/asim-jofa-luxury-lawn-2020-collections-122.html" style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/asim-jofa-luxury-lawn-2020-collections-122.html" id="product_show"
                  data-productid="122" data-categoryid="73"
                  data-productname="Asim Jofa Luxury Lawn 2020 collections-122">
                  <div class="title">Asim Jofa Luxury Lawn 2020 collections-122</div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;">6500 Tk</span>
                </div>

              </div>
            </div>

  

            <div class="product">
              <div class="image">
                <a href="product-show/johra-khalwats.html" id="product_show" data-productid="124" data-categoryid="73"
                  data-productname="Johra Khalwats">
                  <img src="posadmin/images/product/small/25JH-872a174115444717456633351746606906.jpg" alt=""
                    class="first">
                  <img src="posadmin/images/product/small/25JH-872a174115444717456633351746606906.jpg" alt=""
                    class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block" href="product-show/johra-khalwats.html"
                    style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/johra-khalwats.html" id="product_show" data-productid="124" data-categoryid="73"
                  data-productname="Johra Khalwats">
                  <div class="title"></div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;"></span>
                </div>

              </div>
            </div>

            <div class="product">
              <div class="image">
                <a href="product-show/mayra-za-clothes0.html" id="product_show" data-productid="125"
                  data-categoryid="73" data-productname="Mayra ZA Clothes0">
                  <img src="posadmin/images/product/small/MAYRA-01a17411545661746607171.jpg" alt="" class="first">
                  <img src="posadmin/images/product/small/MAYRA-01a17411545661746607171.jpg" alt="" class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block" href="product-show/mayra-za-clothes0.html"
                    style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/mayra-za-clothes0.html" id="product_show" data-productid="125"
                  data-categoryid="73" data-productname="Mayra ZA Clothes0">
                  <div class="title">Mayra ZA Clothes0</div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;">4500 Tk</span>
                </div>

              </div>
            </div>

        
            <div class="product">
              <div class="image">
                <a href="product-show/mishaal-vol-02-by-gulljee0.html" id="product_show" data-productid="127"
                  data-categoryid="73" data-productname="Mishaal Vol-02 By GullJee0">
                  <img src="posadmin/images/product/small/MIS3P2502-0417411546941746608383.jpg" alt="" class="first">
                  <img src="posadmin/images/product/small/MIS3P2502-0417411546941746608383.jpg" alt="" class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block"
                    href="product-show/mishaal-vol-02-by-gulljee0.html" style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/mishaal-vol-02-by-gulljee0.html" id="product_show" data-productid="127"
                  data-categoryid="73" data-productname="Mishaal Vol-02 By GullJee0">
                  <div class="title"></div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;"></span>
                </div>

              </div>
            </div>


            <div class="product">
              <div class="image">
                <a href="product-show/ethnic-co-ords-kurti-ready-to-wear-2-piece-gf01.html" id="product_show"
                  data-productid="128" data-categoryid="73"
                  data-productname="Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01">
                  <img src="posadmin/images/product/small/" alt=""
                    class="first">
                  <img src="posadmin/images/product/small/" alt=""
                    class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block"
                    href="product-show/ethnic-co-ords-kurti-ready-to-wear-2-piece-gf01.html" style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/ethnic-co-ords-kurti-ready-to-wear-2-piece-gf01.html" id="product_show"
                  data-productid="128" data-categoryid="73"
                  data-productname="Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01">
                  <div class="title"></div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;">5000 Tk</span>
                </div>

              </div>
            </div>


            <div class="product">
              <div class="image">
                <a href="product-show/gulal-premium-eid-exclusive-lawn-collections-1.html" id="product_show"
                  data-productid="135" data-categoryid="73"
                  data-productname="Gulal Premium Eid Exclusive Lawn Collections 1">
                  <img src="posadmin/images/product/small/" alt="" class="first">
                  <img src="posadmin/images/product/small/GULAL25-0217411542781747474373.jpg" alt="" class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block"
                    href="product-show/gulal-premium-eid-exclusive-lawn-collections-1.html" style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/gulal-premium-eid-exclusive-lawn-collections-1.html" id="product_show"
                  data-productid="135" data-categoryid="73"
                  data-productname="Gulal Premium Eid Exclusive Lawn Collections 1">
                  <div class="title"></div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;">5500 Tk</span>
                </div>

              </div>
            </div>

            <div class="product">
              <div class="image">
                <a href="product-show/johra-khalwat-11.html" id="product_show" data-productid="137" data-categoryid="73"
                  data-productname="Johra Khalwat 11">
                  <img src="posadmin/images/product/small/25JH-874a174115444717456633351747471805.jpg" alt=""
                    class="first">
                  <img src="posadmin/images/product/small/" alt=""
                    class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block" href="product-show/johra-khalwat-11.html"
                    style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/johra-khalwat-11.html" id="product_show" data-productid="137" data-categoryid="73"
                  data-productname="Johra Khalwat 11">
                  <div class="title">Johra Khalwat 11</div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;">4100 Tk</span>
                </div>

              </div>
            </div>

            <div class="product">
              <div class="image">
                <a href="product-show/mehri-vol-02-chikankari-by-tawakkal-11.html" id="product_show"
                  data-productid="138" data-categoryid="73" data-productname="Mehri vol-02 Chikankari by Tawakkal 11">
                  <img src="posadmin/images/product/small/D-3077174116966317456639611747474705.jpg" alt=""
                    class="first">
                  <img src="posadmin/images/product/small/D-3077174116966317456639611747474705.jpg" alt=""
                    class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block"
                    href="product-show/mehri-vol-02-chikankari-by-tawakkal-11.html" style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/mehri-vol-02-chikankari-by-tawakkal-11.html" id="product_show"
                  data-productid="138" data-categoryid="73" data-productname="Mehri vol-02 Chikankari by Tawakkal 11">
                  <div class="title"></div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;">5000 Tk</span>
                </div>

              </div>
            </div>

            <div class="product">
              <div class="image">
                <a href="product-show/saira-rizwan-unstitched-lawn-vol.html" id="product_show" data-productid="139"
                  data-categoryid="73" data-productname="Saira Rizwan Unstitched Lawn Vol">
                  <img src="posadmin/images/product/small/8YzNcqgnUIYhupuxDVT9GT0a9DQWLt9J2r7cC6H61747476127.webp"
                    alt="" class="first">
                  <img src="posadmin/images/product/small/8YzNcqgnUIYhupuxDVT9GT0a9DQWLt9J2r7cC6H61747476127.webp"
                    alt="" class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block"
                    href="product-show/saira-rizwan-unstitched-lawn-vol.html" style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/saira-rizwan-unstitched-lawn-vol.html" id="product_show" data-productid="139"
                  data-categoryid="73" data-productname="Saira Rizwan Unstitched Lawn Vol">
                  <div class="title"></div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;">5000 Tk</span>
                </div>

              </div>
            </div>

       
            <div class="product">
              <div class="image">
                <a href="product-show/unstitched-embroidered-chiffon-suit-3-pc.html" id="product_show"
                  data-productid="140" data-categoryid="73" data-productname="Unstitched Embroidered Chiffon Suit 3 Pc">
                  <img src="posadmin/images/product/small/g5GQX9dILyBg39UYD2F73JIUzHIbitd87Rp15PYM1747476567.webp"
                    alt="" class="first">
                  <img src="posadmin/images/product/small/"
                    alt="" class="second">
                </a>
                <div class="product_btn_position content">
                  <a class="submit_button btn btn-light btn_modal d-block"
                    href="product-show/unstitched-embroidered-chiffon-suit-3-pc.html" style="">
                    <div class="cart_btn bangali bold ord_bt"> <i class="fa fa-cart-shopping"></i><span> অর্ডার
                        করুন</span></div>
                  </a>
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
                <a href="product-show/unstitched-embroidered-chiffon-suit-3-pc.html" id="product_show"
                  data-productid="140" data-categoryid="73" data-productname="Unstitched Embroidered Chiffon Suit 3 Pc">
                  <div class="title"></div>
                </a>
                <div class="price">

                  <span class="current_price" style="color: #00276C;">6000 Tk</span>
                </div>

              </div>
            </div>

          </div>

          <!-- Load More button (only show if category has more products than initially shown) -->
          <div class="text-center mt-3">
            <button class="btn btn-danger load-more-products" data-category-id="73" data-page="2">
              Load More
            </button>
          </div>
        </div>
        </div>
</template>


<style scoped>
    
</style>