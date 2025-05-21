<script setup>
import xsmall1 from '../../../assets/image/images/product/xsmall/ajl-1ba1741154819.jpg'
import xsmall2 from '../../../assets/image/images/product/xsmall/B-569a1746114429.jpeg'
import xsmall3 from '../../../assets/image/images/product/xsmall/B-524b1746553084.jpeg'
import xsmall4 from '../../../assets/image/images/product/xsmall/B-570b1746553084.jpeg'
// src/assets/image/images/product/small/
//large
import large1 from '../../../assets/image/images/product/large/ajl-1ba1741154819.jpg'
import large2 from '../../../assets/image/images/product/large/B-569a1746114429.jpeg'
import large3 from '../../../assets/image/images/product/large/B-524b1746553084.jpeg'
import large4 from '../../../assets/image/images/product/large/B-570b1746553084.jpeg'

import size from '../../../assets/image/size.png'
import GirlsRelatedProducts from '../../relatedProsducts/GirlsRelatedProducts.vue'
import { ref } from 'vue'

const activeIndex = ref(0)


const catelogues = [
  {
    id: 1,
    image: xsmall1
  },
  {
    id: 2,
    image: xsmall2
  },
  {
    id: 3,
    image: xsmall3
  },
  {
    id: 4,
    image: xsmall4
  },

];

const catelogues_Large = [
  {
    id: 5,
    image: large1
  },
  {
    id: 6,
    image: large2
  },
  {
    id: 7,
    image: large3
  },
  {
    id: 8,
    image: large4
  },
]
</script>

<template>

  <div class="container-fluid px-1 mt-2 mt-lg-4">
    <div class="row justify-content-between">
      <div class="col-lg-6 col-md-6 col-sm-8 col-12 img_section">
        <div class="d-flex gap-2">
          <div class="nav_image1" style="width: 100px">
            <div class="image mb-1" v-for="(item, index) in catelogues" :key="index">
              <img :src="item.image" width="100" :class="{ 'border border-primary': index === activeIndex }"
                @click="activeIndex = index" />
            </div>

          </div>
          <!-- <div class="carousel-item" v-for="(item, index) in catelogues_Large"
  :class="{ active: index === activeIndex }" :key="item.id"> -->

          <div class="col">
            <div id="product" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner pswp-gallery" id="product-gallery" role="listbox">
                <div class="carousel-item" v-for="(item, index) in catelogues_Large"
                  :class="{ active: index === activeIndex }" :key="item.id">
                  <a :href="item.image" target="_blank">
                    <img :src="item.image" class="d-block w-100" alt="Main Image" />
                  </a>
                </div>

              </div>

              <button class="carousel-control-prev" type="button" data-bs-target="#product" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#product" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>

        </div>

        <div class="slider-wrapper nav_images2 position-relative" v-for="item in catelogues">
          <div class="carousel-indicators nav_images" id="nav_images">
            <img :src="item.image" :alt="item.id" width="100" data-bs-target="#product" data-bs-slide-to="0"
              :class="active" aria-current="true" />

          </div>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-8 col-12">
        <div class="product_view_content">
          <h2 class="title light">
            Asim Jofa Luxury Lawn 2020 collections
          </h2>
          <span><i class="fa fa-eye"></i> 68 </span>
          <h4 class="pop bold"><span id="pro_price">6500</span> Tk</h4>
          <div class="size_chart mt-3 d-none">
            <img :src="size" alt="" class="img-fluid" />
          </div>

          <div id="alertDanger" class="alert alert-danger alert-dismissible fade show p-2 small d-none" role="alert">
          </div>

          <form method="POST" action="https://newfashion.softitglobal.com/carts" id="order_submit">
            <input type="hidden" name="_token" value="xsED4Nne1eihR0J1Q2QMZ66RViuU99odXVearmOw" autocomplete="off">

            <div class="d-flex">
              <h4 class="pop medium">Size:</h4>

              <div class="sizes d-flex flex-wrap align-items-center">
                <div class="burmanRadio me-2 999
                                                ">
                  <input type="radio" class="burmanRadio__input Size" id="size-34" name="variant_1" value="34">
                  <label for="size-34" class="burmanRadio__label"> 34 </label>
                </div>
                <div class="burmanRadio me-2 999
                                                ">
                  <input type="radio" class="burmanRadio__input Size" id="size-36" name="variant_1" value="36">
                  <label for="size-36" class="burmanRadio__label"> 36 </label>
                </div>
                <div class="burmanRadio me-2 999
                                                ">
                  <input type="radio" class="burmanRadio__input Size" id="size-38" name="variant_1" value="38">
                  <label for="size-38" class="burmanRadio__label"> 38 </label>
                </div>
                <div class="burmanRadio me-2 999
                                                ">
                  <input type="radio" class="burmanRadio__input Size" id="size-40" name="variant_1" value="40">
                  <label for="size-40" class="burmanRadio__label"> 40 </label>
                </div>
                <div class="burmanRadio me-2 999
                                                ">
                  <input type="radio" class="burmanRadio__input Size" id="size-42" name="variant_1" value="42">
                  <label for="size-42" class="burmanRadio__label"> 42 </label>
                </div>
                <div class="burmanRadio me-2 999
                                                ">
                  <input type="radio" class="burmanRadio__input Size" id="size-44" name="variant_1" value="44">
                  <label for="size-44" class="burmanRadio__label"> 44 </label>
                </div>
              </div>
            </div>


            <div class="d-flex">
              <h4 class="pop medium">color:</h4>

              <div class="sizes d-flex flex-wrap align-items-center">
                <div class="burmanRadio me-2 999">
                  <input type="radio" class="burmanRadio__input color" id="size-Red" name="variant_2" value="Red">
                  <label for="size-Red" class="burmanRadio__label"> Red </label>
                </div>
                <div class="burmanRadio me-2 999
                                                ">
                  <input type="radio" class="burmanRadio__input color" id="size-Blue" name="variant_2" value="Blue">
                  <label for="size-Blue" class="burmanRadio__label"> Blue </label>
                </div>
                <div class="burmanRadio me-2 999
                                                ">
                  <input type="radio" class="burmanRadio__input color" id="size-Black" name="variant_2" value="Black">
                  <label for="size-Black" class="burmanRadio__label"> Black </label>
                </div>
              </div>
            </div>

            <div class="align-items-center flex-wrap mt-2 col-lg-6">
              <input type="hidden" name="product_id" value="122">
              <div class="d-flex justify-content-between align-items-start mb-1" style="width: 100%;">
                <div class="quantity_box mb-2 quantityBtnDesign me-2" style="overflow: hidden;">
                  <button type="button" class="minus btn">-</button>
                  <input type="text" class="quantity_value placeholder_black form-control" name="quantity" value="1"
                    min="1" max="12">
                  <button type="button" class="plus btn">+</button>
                </div>

                <router-link to="/checkout"  style="overflow: hidden;"  class="btn rounded-5 flex-fill ord_btn orderBtnDesign btn_design">
  <div class="cart_btn bangali bold ord_bt">
    <i class="fa-solid fa-cart-plus text-white mx-2"></i> 
    <span>অর্ডার করুন</span>
  </div>
</router-link>
              </div>
              <div class="btn_submit">
                <button class="btn mt-lg-2 semi text-cap col-12 add_to_cart btn_design rounded-5"> <i
                    class="fa-solid fa-cart-plus text-white mx-2"></i> কার্টে রাখুন</button>
              </div>
              <div class="call_now">
                <a href="tel: 01615597820"
                  class="btn btn-warning mt-lg-1 semi text-cap col-12 add_to_cart rounded-5 btn_design"
                  style="background: #00276C;color: #ffffff;border: none;"><i class="fas fa-phone"
                    style="padding-right: 7px;"></i> 01615597820</a>
              </div>
            </div>
          </form>

          <div class="accordion accordion-flush mt-3" id="accordionFlushExample">
            <div class="accordion-item rounded-3 border-0 shadow mb-2">
              <h2 class="accordion-header">
                <button class="accordion-button border-bottom collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false"
                  aria-controls="flush-collapseOne">
                  Description
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p><span class="skus"><strong>By Pcs:</strong><span class="apni"> 3 Pcs</span></span> <br><span
                      class="skus"><strong>Shirt:</strong><span class="apni"> Lawn</span></span> <br><span
                      class="skus"><strong>Dupatta:</strong><span class="apni"> Chiffon </span></span> <br><span
                      class="skus"><strong>Color:</strong><span class="apni"> Purple</span></span> <br><span
                      class="skus"><strong>Trouser:</strong><span class="apni"> Cambri</span></span></p>
                </div>
              </div>
            </div>
            <div class="accordion-item rounded-3 border-0 shadow mb-2">
              <h2 class="accordion-header">
                <button class="accordion-button border-bottom collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo1" aria-expanded="false"
                  aria-controls="flush-collapseTwo1">
                  Size Guid
                </button>
              </h2>
              <div id="flush-collapseTwo1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <img :src="size" alt="" class="img-fluid">
                </div>
              </div>
            </div>
            <div class="accordion-item rounded-3 border-0 shadow mb-2">
              <h2 class="accordion-header">
                <button class="accordion-button border-bottom collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false"
                  aria-controls="flush-collapseTwo">
                  Terms & Conditions
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p>Terms &amp; Condition</p>
                </div>
              </div>
            </div>
            <div class="accordion-item rounded-3 border-0 mb-2 shadow">
              <h2 class="accordion-header">
                <button class="accordion-button border-bottom collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false"
                  aria-controls="flush-collapseThree">
                  Reviews
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <div class="wc-tab-inner">
                    <div class="woocommerce-tabs wc-tabs-wrapper" style="background: #dbd3d39e;">
                      <div class="container">
                        <div class="reviews-wrapper pt-4">
                          <div class="row">
                            <div class="col-lg-6 mb--20">
                              <div class="axil-comment-area pro-desc-commnet-area pt-3">
                                <h5 class="title">(<span class="reviewCount">3</span>) Relative Product</h5>
                                <ul class="comment-list">
                                  <!-- Start Single Comment  -->
                                  <li class="comment">
                                    <div class="comment-body">
                                      <div class="single-comment">
                                        <div class="comment-img">
                                          <img src="../assets/image/logo/account.png" alt="Author Images"
                                            style="width:60px">
                                        </div>
                                        <div class="comment-inner">
                                          <h6 class="commenter">
                                            <a class="hover-flip-item-wrapper" href="#">
                                              <span class="hover-flip-item">
                                                <span data-text="Cameron Williamson">dsfgasdf</span>
                                              </span>
                                            </a>
                                            <span class="commenter-rating ratiing-four-star">
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                            </span>
                                          </h6>
                                          <div class="comment-text">
                                            <p> dfgdfg </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li class="comment">
                                    <div class="comment-body">
                                      <div class="single-comment">
                                        <div class="comment-img">
                                          <img src="../assets/image/logo/account.png" alt="Author Images"
                                            style="width:60px">
                                        </div>
                                        <div class="comment-inner">
                                          <h6 class="commenter">
                                            <a class="hover-flip-item-wrapper" href="#">
                                              <span class="hover-flip-item">
                                                <span data-text="Cameron Williamson">asdfsd</span>
                                              </span>
                                            </a>
                                            <span class="commenter-rating ratiing-four-star">
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                            </span>
                                          </h6>
                                          <div class="comment-text">
                                            <p> asdfsd </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li class="comment">
                                    <div class="comment-body">
                                      <div class="single-comment">
                                        <div class="comment-img">
                                          <img src="../assets/image/logo/account.png" alt="Author Images"
                                            style="width:60px">
                                        </div>
                                        <div class="comment-inner">
                                          <h6 class="commenter">
                                            <a class="hover-flip-item-wrapper" href="#">
                                              <span class="hover-flip-item">
                                                <span data-text="Cameron Williamson">asdf</span>
                                              </span>
                                            </a>
                                            <span class="commenter-rating ratiing-four-star">
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                              <a><i class="fas fa-star"></i></a>
                                            </span>
                                          </h6>
                                          <div class="comment-text">
                                            <p> sdfsdf </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <!-- End Single Comment  -->
                                </ul>
                              </div>
                            </div>
                            <!-- End .col -->
                            <div class="col-lg-6 mb--20">
                              <div class="comment-respond pro-des-commend-respond mt--0">
                                <h5 class="title mb--10">Add a Review</h5>
                                <div class="rating-wrapper d-flex-center mb--10">
                                  <div class="wrapper">
                                    <div class="master">
                                      <div class="rating-component">
                                        <div class="status-msg">
                                          <label>
                                            <input class="rating_msg" type="hidden" name="rating_msg" value="">
                                          </label>
                                        </div>
                                        <div class="stars-box">
                                          <i class="star fa fa-star" title="1 star" data-message="Poor"
                                            data-value="1"></i>
                                          <i class="star fa fa-star" title="2 stars" data-message="Too bad"
                                            data-value="2"></i>
                                          <i class="star fa fa-star" title="3 stars" data-message="Average quality"
                                            data-value="3"></i>
                                          <i class="star fa fa-star" title="4 stars" data-message="Nice"
                                            data-value="4"></i>
                                          <i class="star fa fa-star" title="5 stars" data-message="very good qality"
                                            data-value="5"></i>
                                        </div>
                                        <div class="starrate">
                                          <label>
                                            <input class="ratevalue" type="hidden" name="rate_value" value="">
                                          </label>
                                        </div>
                                      </div>

                                      <div class="feedback-tags">
                                        <div class="tags-container" data-tag-set="1">
                                          <div class="question-tag">
                                            Why was your experience so bad?
                                          </div>
                                        </div>
                                        <div class="tags-container" data-tag-set="2">
                                          <div class="question-tag">
                                            Why was your experience so bad?
                                          </div>
                                        </div>

                                        <div class="tags-container" data-tag-set="3">
                                          <div class="question-tag">
                                            Why was your average rating experience ?
                                          </div>
                                        </div>
                                        <div class="tags-container" data-tag-set="4">
                                          <div class="question-tag">
                                            Why was your experience good?
                                          </div>
                                        </div>

                                        <div class="tags-container" data-tag-set="5">
                                          <div class="make-compliment">
                                            <div class="compliment-container">
                                              Give a compliment
                                              <i class="far fa-smile-wink"></i>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="tags-box">
                                          <form action="https://newfashion.softitglobal.com/review/store" method="POST"
                                            id="ajax_form2">
                                            <input type="hidden" name="_token"
                                              value="xsED4Nne1eihR0J1Q2QMZ66RViuU99odXVearmOw" autocomplete="off">
                                            <input type="hidden" name="product_id" value="122">
                                            <input type="hidden" name="review" id="review" value="">

                                            <div class="row">
                                              <div class="col-12">
                                                <div class="form-group">
                                                  <label>Review Notes (Mandatory)</label>
                                                  <textarea name="message" placeholder="Your Comment"
                                                    class="form-control"></textarea>
                                                </div>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-12 m-0">
                                                <div class="form-group">
                                                  <label>Name <span class="require">*</span></label>
                                                  <input id="name" type="text" name="name" placeholder="Your Name"
                                                    class="form-control">
                                                </div>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-12 m-0">
                                                <div class="form-group">
                                                  <label>Image <span class="require">*</span></label>
                                                  <input type="file" form="ajax_form2" class="form-control" name="image"
                                                    style="padding-top: 12px;">
                                                </div>
                                              </div>
                                              <div class="col-lg-12 mt-2 pb-4">
                                                <div class="button-box form-submit">
                                                  <button type="submit" class="axil-btn btn-bg-primary w-auto">Submit
                                                    Review</button>
                                                </div>
                                                <div class="submited-box">
                                                  <div class="loader"></div>
                                                  <div class="success-message">
                                                    Thank you!
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>


                      <!--  second woocomerce -->

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <hr />



    <br /><br />
    <!-- Girls Related Product  -->
    <GirlsRelatedProducts />
    <!-- Modal -->

    <div class="modal fade" id="product_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    </div>
  </div>
</template>




<style scoped>
/* //first style */
.rating-component .stars-box .star.selected {
  color: #ff5a49;
}

.rating-component .stars-box .star.hover {
  color: #ff5a49;
}

.feedback-tags .tags-container {
  display: none;
}

.submited-box .loader {
  border: 5px solid transparent;
  border-top: 5px solid #4dc7b7;
  border-bottom: 5px solid #ff5a49;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 0.8s linear infinite;
  animation: spin 0.8s linear infinite;
}

.submited-box .loader,
.submited-box .success-message {
  display: none;
}

.submited-box .loader,
.submited-box .success-message {
  display: none;
}

a.axil-btn,
button.axil-btn {
  border-radius: 6px;
  font-size: var(--font-size-b1);
  line-height: var(--line-height-b1);
  font-weight: 700;
  display: inline-block;
  padding: 10px 38px;
  position: relative;
  transition: all 0.3s ease-in-out;
  z-index: 1;
}

.comment-inner {
  margin-left: 15px;
  margin-top: 6px;
}

.single-comment {
  display: flex;
}

ul.comment-list {
  margin: 0;
  padding: 0;
}

li.comment {
  list-style: none;
  margin-bottom: 15px;
}

.comment-text {
  margin-bottom: 10px;
}

.pro-desc-commnet-area .comment-list .comment .commenter .hover-flip-item-wrapper a i:not(.empty-rating),
.pro-desc-commnet-area .comment-list .comment .commenter .commenter-rating a i:not(.empty-rating) {
  color: #ffca0f;
}

p.noticText {
  background: #b2eeb8;
  padding: 5px 14px;
  width: 67%;
  margin-top: 12px;
  border-radius: 5px;
}

@media only screen and (max-width: 1199px) {
  p.noticText {
    background: #b2eeb8;
    padding: 5px 17px;
    width: 100%;
  }
}

/* second style  */
.quantity_box {
  display: inline-flex;
  vertical-align: top;
  white-space: nowrap;
  font-size: 0;
}

div.quantity_box button[type="button"] {
  padding: 0 5px;
  min-width: 25px;
  min-height: unset;
  height: 42px;
  border: 2px solid rgb(211, 211, 211);
  background: white;
  box-shadow: none;
  color: black;
  border-radius: 0;
}

div.quantity_box button[type="button"]:hover {
  color: #fff;
  background-color: orange;
  border-color: orange;
}

div.quantity_box input[type="text"] {
  width: 40px;
  color: black;
  border-radius: 0;
  border: 2px solid rgb(211, 211, 211);
  border-right: none;
  border-left: none;
}

div.quantity_box button[type="button"].minus {
  border-radius: 50px 0 0 50px;
  border-right: 0;
}

div.quantity_box button[type="button"].plus {
  border-radius: 0 50px 50px 0;
  border-left: 0;
}

.burmanRadio {
  margin-bottom: 10px;
}

.burmanRadio__input {
  display: none;
}

.burmanRadio__input:checked~.burmanRadio__label::after {
  opacity: 1;
  transform: scale(1);
}

.burmanRadio__label {
  cursor: pointer;
  line-height: 30px;
  position: relative;
  margin-left: 35px;
}

.burmanRadio__label::before,
.burmanRadio__label::after {
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: -30px;
  transition: all 0.3s ease-out;
  z-index: 2;
}

.burmanRadio__label::before {
  content: "";
  border: 1.5px solid #9d9d9d;
  width: 20px;
  height: 20px;
}

.burmanRadio__label::after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f00c";
  background: #ffc107;
  border: 1.5px solid #ffc107;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 20px;
  height: 20px;
  transform: scale(0);
}

.burmanRadio__label:hover::before {
  border-color: #7bc4ca;
}

.main-wrapper {
  background: #f8f9fa;
}

.carousel-inner {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0px;
  /* Leave room for arrows */
}

.nav_images {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  gap: 10px;
}

.nav_images::-webkit-scrollbar {
  display: none;
}

.nav_images img {
  flex: 0 0 auto;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;
  transition: border 0.3s;
}

.nav_images img.active {
  border-color: #007bff;
}

.arrow {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background: rgb(244 67 54);
  color: white;
  border: none;
  padding: 7px;
  height: 31px;
  font-size: 10px;
  border-radius: 53%;
  cursor: pointer;
  z-index: 10;
}

.left-arrow {
  left: 5px;
}

.right-arrow {
  right: 5px;
}

.nav_images [data-bs-target] {
  height: 100px;
  width: 81px;
  box-shadow: 0px 0px 3px 0px gray;
  padding: 5px;
}

.nav_images img {
  margin-bottom: 5px;
}

.nav_images .active {
  height: 100px;
  width: 81px;
}

.carousel-indicators [data-bs-target] {
  border: 0;
}

.wc-tab-inner iframe {
  width: 100%;
  height: 600px;
}

.quantityBtnDesign {
  width: 90px;
}

@media screen and (min-width: 320px) and (max-width: 340px) {
  .nav_images [data-bs-target] {
    height: 100px;
    width: 26.5%;
  }

  .nav_images .active {
    height: 100px;
    width: 26.5%;
  }
}

@media screen and (min-width: 320px) and (max-width: 390px) {
  #product_des li button {
    font-size: 16px;
  }

  .nav_images [data-bs-target] {
    height: 100px;
    width: 27%;
  }

  .nav_images .active {
    height: 100px;
    width: 27%;
  }

  .quantityBtnDesign {
    width: 36%;
  }
}

@media screen and (min-width: 391px) and (max-width: 449px) {
  #product_des li button {
    font-size: 20px;
  }

  .nav_images [data-bs-target] {
    height: 85px;
    width: 19.7%;
  }

  .nav_images .active {
    height: 85px;
    width: 19.7%;
  }
}

@media screen and (min-width: 450px) and (max-width: 500px) {
  #product_des li button {
    font-size: 20px;
  }

  .nav_images [data-bs-target] {
    height: 85px;
    width: 20.4% !important;
  }

  .nav_images .active {
    height: 85px;
    width: 20.4% !important;
  }
}

@media screen and (min-width: 501px) and (max-width: 575px) {
  .nav_images [data-bs-target] {
    height: 85px;
    width: 15.9%;
  }

  .nav_images .active {
    height: 85px;
    width: 15.9%;
  }
}

@media screen and (min-width: 576px) and (max-width: 604px) {
  .nav_images [data-bs-target] {
    height: 85px;
    width: 19.5%;
  }

  .nav_images .active {
    height: 85px;
    width: 19.5%;
  }
}

@media screen and (min-width: 605px) and (max-width: 767px) {
  .nav_images [data-bs-target] {
    height: 85px;
    width: 19.9%;
  }

  .nav_images .active {
    height: 85px;
    width: 19.9%;
  }
}

@media screen and (min-width: 1400px) and (max-width: 1700px) {
  .nav_images [data-bs-target] {
    height: 100px;
    width: 16.6%;
  }

  .nav_images .active {
    height: 100px;
    width: 16.6%;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
  .btn_submit {
    display: inline !important;
  }

  .wc-tab-inner img {
    width: 100%;
  }

  .ord_btn {
    font-size: 16px;
    padding: 8px;
  }
}

.call_now button {
  width: 100%;
}

.call_now {
  margin-top: 10px;
}

.add_to_cart {
  font-size: 19px;
}

.nav-tabs {
  border: 1px solid #000 !important;
  padding: 0px;
  border-radius: 5px;
}

.nav-tabs .nav-link.active {
  background: #000;
  border-radius: 5px;
}

.burmanRadio.disabled {
  position: relative;
  background: #e1dede8a;
  border-radius: 5px;
  cursor: no-drop;
  border: 1px solid #d9d7d7;
  padding: 0 5px;
}

.burmanRadio.disabled::after {
  content: "";
  border-bottom: 1px solid #d1d1d1;
  width: 100%;
  position: absolute;
  left: 4px;
  right: 0;
  top: -13px;
  z-index: 9;
  height: 30px;
  transform: rotate(15deg);
}

.burmanRadio.disabled::before {
  content: "";
  border-top: 1px solid #d5d5d5;
  width: 100%;
  position: absolute;
  left: 6px;
  right: 0;
  bottom: -15px;
  z-index: 9;
  height: 30px;
  transform: rotate(344deg);
}

.nav_image1 {
  max-height: 682px;
  overflow-x: hidden;
  overflow-y: auto;
}

.nav_image1::-webkit-scrollbar {
  display: none;
}

@media (max-width: 992px) {
  .nav_image1 {
    display: none;
  }
}

@media (min-width: 992px) {
  .nav_images2 {
    display: none;
  }
}

.product_view_content {
  transition: opacity 0.2s;
  background-color: ghostwhite;
  padding: 20px;
  border-radius: 40px;
  box-shadow: inset 0px 0px 0 2px #000000;
}

.accordion-button:not(.collapsed),
.accordion-button:focus {
  outline: none;
  border-color: transparent;
  box-shadow: none;
  background-color: transparent;
}

.accordion-button::after {
  width: 11px;
  height: 11px;
  border-radius: 100%;
  background-color: var(--bs-danger);
  background-image: none !important;
}

.accordion-button.collapsed::after {
  background-color: var(--bs-gray-300);
}

.btn_design {
  border: 1px solid red;
  background: red;
  color: white;
  box-shadow: 2px 6px 7px #0000005e;
  position: relative;
  top: -5px;
  left: -5px;
  transition: 0.3s;
  font-family: sans-serif;
  font-weight: 600;
  height: 42px;
}

.btn_design:hover {
  background: red;
  color: white;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 0px #00000040;
}

@media (max-width: 700px) {
  .orderBtnDesign {
    width: 65%;
    flex-grow: 1;
    margin-left: auto;
  }
}


/* style end  */
.banner .title {
  font-size: 34px;
  text-transform: uppercase;
  font-family: "poppins";
  color: #043c32;
  font-weight: 700;
}

@media (max-width: 400px) {
  .banner .title {
    font-size: 25px;
    text-transform: uppercase;
    font-family: "poppins";
    color: #043c32;
    font-weight: 700;
  }
}
</style>