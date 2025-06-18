<script setup>
import posadmin from '../../assets/image/ecommerce_settings/ecom3logo17441769441747306879.png';
import home_footer from '../../assets/image/home_footer/FreeDelivery17112665361734178775.png';
import guaranty from '../../assets/image/home_footer/Guaranty1711266536.png';
import geography from '../../assets/image/home_footer/geography--v11711266536.png';
import payment from '../../assets/image/home_footer/payment1711266536.png';
import { onMounted } from 'vue';

onMounted(() => {
  const actionButton = document.querySelector('.action-button');
  if (actionButton) {
    actionButton.addEventListener('click', (event) => {
      event.currentTarget.classList.toggle('active');
    });
  }
});
</script>

<template>
  <div>
    <div class="container-fluid divide">
      <hr />
    </div>
    <div class="container-fluid">
      <div class="row service-support-box">
        <div class="col-lg-3 col-md-6 col-6 border-end mb-3">
          <div class="support service-support-single d-flex align-items-center ps-4">
            <img :src="home_footer" width="40" height="40">
            <div class="delivery">
              <h6 class="delivery_h6"><strong>Free Delivery</strong></h6>
              <p class="font-13 m-0">On all order above BDT 5000</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-6 border-end mb-3">
          <div class="support service-support-single d-flex align-items-center ps-4">
              <img :src="guaranty" width="40" height="40">
                <div class="" style="margin: 5px;padding: 0px;"></div>
            <div class="guaranty">
              <h6 class="guaranty_h6"><strong>Easy 7 days return</strong></h6>
              <p class="font-13 m-0">7 days Easy return Guaranty</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-6 border-end mb-3">
          <div class="support service-support-single d-flex align-items-center ps-4">
                <img :src="geography" width="40" height="40">
            <div class="warranty">
              <h6 class="International"><strong>International Warranty</strong></h6>
              <p class="font-13 m-0">1 year official warranty</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-6 mb-3">
          <div class="support service-support-single d-flex align-items-center ps-4">
               <img :src="payment" width="40" height="40">
            <div class="checkout">
              <h6 class="private"><strong>private2 100% secure checkout</strong></h6>
              <p class="font-13 m-0">COD/Mobile banking/visa</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="p-0">
      <div class="footerWidget">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4 mb-3 marginRight">
              <div class="widget">
                <h5>
                  <font-awesome-icon icon="home" /> HEAD OFFICE
                </h5>
                <ul class="contact ps-lg-4 ps-3">
                  <li>
                    <span>
                      <font-awesome-icon icon="map-marker-alt" /> Address:
                    </span>
                  </li>
                  <li>
                    <span><font-awesome-icon icon="phone" /> Hotline:</span> 01615597820
                  </li>
                  <li>
                    <span><font-awesome-icon icon="envelope" /> E-mail:</span> softitglobal@gmail.com
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4 mb-3 marginRight">
              <div class="widget">
                <h5>
                  <font-awesome-icon icon="book" /> PAGE
                </h5>
                <ul class="quickLink ps-lg-4 ps-3">
                  <li><router-link to="`about-site.html`">About Ecom</router-link></li>
                  <li><router-link to="`delivery-policy.html`">Delivery Policy</router-link></li>
                  <li><router-link to="`terms-condition.html`">Terms &amp; Condition</router-link></li>
                  <li><router-link to="`return-policy.html`">Return Policy</router-link></li>
                </ul>
                <h5>
                  <font-awesome-icon icon="star" /> FOLLOW US
                </h5>
                <div class="socials">
                  <router-link to="``" class="btn btn-sm btn-primary me-2">
                    <font-awesome-icon :icon="['fab', 'facebook']" />
                  </router-link>
                  <router-link to="``" class="btn btn-sm btn-danger me-2">
                    <font-awesome-icon :icon="['fab', 'youtube']" />
                  </router-link>
                  <router-link to="``" class="btn btn-sm btn-success me-2">
                    <font-awesome-icon :icon="['fab', 'instagram']" />
                  </router-link>
                  <router-link to="``" class="btn btn-sm btn-success me-2">
                    <font-awesome-icon :icon="['fab', 'tiktok']" />
                  </router-link>
                  <router-link to="``" class="btn btn-sm btn-success me-2">
                    <span class="x">𝕏</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="widget">
                <img :src="posadmin" style="max-width:100%; margin-bottom:20px" />
                <div>
                  <router-link to="order-tracking.html" class="btn btn-success">
                    <font-awesome-icon icon="search" /> Track Order
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="copyRight">
        <div class="container-fluid">
          <p class="m-0 pm">
            Develop by
            <router-link class="develop" to="https://softitglobal.com">Softitglobal.com</router-link>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Your existing styles */
</style>

<style>
/* General styles */
.load-more-products {
  transition: all 0.3s ease;
  padding: 8px 25px;
  font-weight: 500;
}

.load-more-products:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.load-more-products:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.loaded-products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* Footer specific styles */
.first_div_seperate {
  display: none;
}

.footer-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  display: none;
  z-index: 99;
}

.m-nav-main {
  display: flex;
}

.m-nav-main .button-shop {
  flex-grow: 1;
  padding: 10px;
  padding-bottom: 5px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.quick-link {
  padding-bottom: 45px !important;
}

ul.quickLink {
  list-style: none;
}

ul.quickLink li a {
  color: black;
}

ul.quickLink li a:hover {
  color: #ef6600;
}

ul.contact li span {
  width: 100px;
  display: inline-block;
}

ul.contact li span i {
  margin-right: 20px;
  font-size: 20px;
}

ul.contact {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footerWidget {
  padding: 30px 20px;
}

.marginRight {
  border-right: 1px solid navy;
}

/* Component specific classes */
.delivery {
  margin: 5px;
  padding: 0px;
}

.delivery_h6 {
  margin: 0px;
}

.guaranty {
  margin: 5px;
  padding: 0px;
}

.guaranty_h6 {
  margin: 0px;
}

.warranty {
  margin: 5px;
  padding: 0px;
}

.International {
  margin: 0px;
}

.private {
  margin: 0px;
}

.checkout {
  margin: 5px;
  padding: 0px;
}

.socials {
  margin: 0;
}

.x {
  font-family: sans-serif;
}

.copyRight {
  background: #f8f9fa;
  text-align: center;
}

.pm {
  padding: 5px 0;
}

.develop {
  text-decoration: underline;
}

/* Button shop styles */
.button-shop a {
  text-align: center;
}

.button-shop a.footerBtn i {
  font-size: 25px;
  display: grid;
  text-align: center;
  color: #f44336;
}

.button-shop a.footerBtn span {
  color: #00276C;
}

/* Multi-action styles */
.multi-action {
  position: fixed;
  bottom: 8rem;
  right: 90px;
  cursor: pointer;
  box-shadow: 2px 2px 8px gray;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  z-index: 9999;
}

.action-button {
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 0;
  outline: 0;
  background: #f44336;
  font-size: 24px;
  color: white;
  z-index: 2;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  transition: all .3s;
}

.actions {
  position: absolute;
  list-style: none inside none;
  margin: 0;
  padding: 0;
  width: auto;
  float: left;
  background-color: transparent;
  top: 8px;
  left: 8px;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.actions li {
  position: absolute;
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  margin: 0;
  background: #212121;
  color: #ffffff;
  transition: all .3s;
  transform: scale(.3);
}

.actions li:nth-child(1) {
  background: #ff9800;
}

.actions li:nth-child(2) {
  background: #2196F3;
}

.actions li:nth-child(3) {
  background: #00cc06;
}

.actions li:nth-child(4) {
  background: #E91E63;
}

.actions li:nth-child(5) {
  background: #4CAF50;
}

.actions li a {
  background: inherit;
  color: inherit;
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
}

.actions li:active {
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 8px 17px 0 rgba(0, 0, 0, 0.2);
}

.action-button.active {
  box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19), 0 12px 15px 0 rgba(0, 0, 0, 0.24);
}

.action-button.active~.actions li {
  transition: all .3s;
  transform: scale(1);
}

.action-button.active~.actions li:nth-child(1) {
  margin-top: -56px;
}

.action-button.active~.actions li:nth-child(2) {
  margin-top: -104px;
}

.action-button.active~.actions li:nth-child(3) {
  margin-top: -152px;
}

.action-button.active~.actions li:nth-child(4) {
  margin-top: -200px;
}

.action-button.active~.actions li:nth-child(5) {
  margin-top: -248px;
}

.action-button span {
  transition: all .3s;
}

.action-button.active:not(.no-rotate) span {
  transform: scale(1.2) rotate(-180deg);
}

/* Responsive styles */
@media (max-width: 569px) {
  ul.contact li span {
    width: 75px;
    font-size: 13px;
    display: inline-block;
  }

  ul.contact li span i {
    margin-right: 8px;
    font-size: 18px;
  }

  ul.contact li {
    font-size: 14px;
  }
}

@media (min-width: 320px) and (max-width: 768px) {
  .marginRight {
    border-right: none;
  }

  .top_socials {
    text-align: center;
    display: grid;
    width: 100% !important;
  }

  footer .socials {
    margin-top: 0px;
    margin-bottom: 13px;
  }

  .addresss {
    width: 100% !important;
    text-align: center;
  }

  .footer-nav {
    display: block !important;
  }

  .first_div_seperate {
    display: block !important;
  }
}

@media (min-width: 1600px) {
  .multi-action {
    right: 13% !important;
  }
}
</style>
