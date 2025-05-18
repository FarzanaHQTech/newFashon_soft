<script>
export default {
  name: 'Header'
}
// import ecomLogo from '@/assets/image/ecommerce_settings/ecom3logo17441769441747306879.png';
import ecomLogo from '../../assets/image/ecommerce_settings/ecom3logo17441769441747306879.png';
import c1 from '../../assets/image/c1.png';
import login from '../../assets/image/login.png';


// import ecomLogo from '../../assets/image/ecommerce_settings/ecom3_logo17441769441747306879.png'
</script>

<template>
  <header class="header">
    <!-- Top Navigation Bar -->
    <nav class="navbar navbar-expand-lg top_nav navbar-dark" style="background-color: #fafcff;">
      <div class="container-fluid align-items-center">
        <button class="navbar-toggler side_menu_toggler display_sm border-0 p-0" style="font-size: 26px; color: navy;" type="button">
          <i class="fa fa-bars"></i>
        </button>
        
        <a class="navbar-brand" href="index.htm">
          <img :src="ecomLogo" alt="Ecom Logo" />
          <!-- import ecomLogo from '@/assets/image/ecommerce_settings/ecom3_logo17441769441747306879.png'; -->
          <!-- <img src="images/posadmin/ecommerce_settings/ecom3%20logo17441769441747306879.png" class="logo" /> -->
        </a>

        <div class="icon_cart semi btn p-0 me-lg-0 pe-lg-0 display_sm">
          <div class="btn badge2 px-0">
            <img :src="c1" width="40" alt="" style="filter: invert(1);" />
            <span class="badge text-light" style="background-color: navy;">0</span>
          </div>
        </div>

        <div class="display_sm">
          <a href="login.html" class="btn px-0" style="color: navy;">
            <!-- <img :src="login" style="width: 30px; filter: invert(1);" alt="" /> -->
          </a>
        </div>

        <form class="d-flex header_search col-lg-6 m-auto" action="https://newfashion.softitglobal.com/shop">
          <select name="cat_id" class="form-select d-lg-block d-none" style="width: 70px; font-size: 14px; border-radius: 5px 0 0 5px; font-weight: 600; background-color: #d5d5d5;">
            <option value="">All</option>
            <option value="73">Girls Fashion</option>
            <option value="48">Saree</option>
            <option value="39">Baby Collection</option>
            <option value="42">Polo Shirt</option>
            <option value="43">T-Shirt</option>
            <option value="49">Formal Shirt</option>
            <option value="56">Jeans pant</option>
          </select>
          <input class="form-control" type="text" placeholder="Search" name="q" />
          <button class="btn text-dark" type="submit" style="background-color: red; color: white;">
            <i class="fa fa-search text-light"></i>
          </button>
        </form>

        <div class="display_lg">
          <div class="d-lg-flex d-none align-items-center gap-2 ps-lg-3">
            <a href="tel:01615597820" class="font-22" style="font-size: 20px;color: #000">
              <i class="fa fa-phone"></i> 01615597820
            </a>
            <a href="login.html" class="font-22 px-2" style="color: #000">
              <img :src="login" style="width: 28px; filter: invert(1);" alt="" />
            </a>
            <div class="icon_cart semi btn p-0">
              <div class="btn badge2 px-0">
                <img :src="c1" width="40" alt="" style="filter: invert(1);" />
                <span class="badge text-light bg-dark">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Bottom Navigation Bar -->
    <nav class="navbar navbar-expand-lg bottom_nav navbar-light orange-bg2 border-bottom">
      <div class="container-fluid display_lg">
        <div class="d-lg-flex align-items-center">
          <div class="dropdown category_dropdown_box">
            <div class="category_dropdown text-dark btn rounded-0">
              <i class="fa fa-bars"></i>
              <span class="text-cap medium font-13 mx-2 nato">Browse Categories</span>
              <i class="fa fa-angle-down ms-auto"></i>
            </div>

            <div class="categories dp_content">
              <li class="nav-item"><a href="shop.html?cat_id=73" class="nav-link"><img src="..." width="20" /> Girls Fashion</a></li>
              <li class="nav-item"><a href="shop-1.html?cat_id=48" class="nav-link"><img src="..." width="20" /> Saree</a></li>
              <li class="nav-item has_menu">
                <a href="shop-2.html?cat_id=39" class="nav-link"><img src="..." width="20" /> Baby Collection</a>
                <ul class="inner_menu">
                  <li class="nav-item"><a href="shop-3.html?cat_id=39&amp;sub_cat_id=68" class="nav-link">Baby shoe</a></li>
                  <ul class="inner_menu_child"></ul>
                </ul>
              </li>
              <!-- Add other categories -->
            </div>
          </div>

          <ul class="navbar-nav ms-2">
            <li class="nav-item"><a href="shop-8.html" class="nav-link text-dark font-14 text-cap">Top Selling</a></li>
            <li class="nav-item"><a href="new-product.html" class="nav-link text-dark font-14">NEW PRODUCT</a></li>
            <li class="nav-item"><a href="flash-product.html" class="nav-link text-dark font-14">FLASH SELL</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Floating Cart Button -->
    <a href="index.htm" class="cart-dropdown-btn">
      <div class="fixed-cart-bottom">
        <p style="background: #00276C;border-top-left-radius: 12px;border-top-right-radius: 12px;margin-bottom: 0px;">
          <i class="fas fa-shopping-cart" style="color: #ffffff !important;"></i>
        </p>
        <p style="color: white;font-size: 12px;background: #00276C;margin-bottom: 0px;">
          <span id="cart_number">0</span> items 
        </p>
        <p id="total_amount" style="color: white;font-size: 12px;background: #f14705;border-bottom-left-radius: 12px;border-bottom-right-radius: 12px;margin-top: 0px;">৳ 0</p>
      </div>
    </a>
  </header>
</template>



<style scoped>
.fixed-cart-whats {
  position: fixed;
  bottom: 14rem;
  right: 35px;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  z-index: 9999;
}

.fixed-cart-bottom {
  position: fixed;
  bottom: 9rem;
  right: 35px;
  background: #000000;
  border-radius: 12px;
  height: 54px;
  width: 60px;
  cursor: pointer;
  box-shadow: 2px 2px 8px gray;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  z-index: 9999;
}

@media(max-width: 768px) {
  .navbar-brand {
    width: auto;
  }
}
@media(min-width: 1600px) {
  .fixed-cart-bottom {
    right: calc(13% - 55px);
  }
}

.cart_button {
  background: #00276C !important;
}

.cart_icon {
  color: #000000 !important;
}

.products {
  align-content: flex-start;
}

@media(max-width: 769px) {
  .navbar-brand img.logo {
    width: 160px !important;
    height: 50px;
    margin-left: 10px;
  }
}

@media(min-width: 1600px) {
  .container-fluid {
    max-width: 1600px !important;
    margin: 0 auto !important;
  }
}

.category_dropdown_box .categories li.has_menu .inner_menu_child {
  left: 95%;
  top: 0;
  list-style: none;
  background: white;
  padding: 0;
  margin-left: 30px;
  opacity: 1;
  transition: 0.5s;
}
</style>
