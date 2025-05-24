
<script script>
// E:\xampp\htdocs\SOFT_IT\newFashonE_soft\src\assets\image\images\product\large\
    import  checkoutimage from '../../../assets/image/images/product/large/25JH-870a17411544471745663335.jpg'

</script>
<template >
    <div class="container-xl my-3" bis_skin_checked="1">
        <div class="row g-5" bis_skin_checked="1">
            <div class="col-md-12 col-lg-6 order-md-last order-last" bis_skin_checked="1">
                <div class="card mb-4" bis_skin_checked="1">
                    <div class="card-header" bis_skin_checked="1">
                        <h5 class="mb-0">Cart - 1 items</h5>
                    </div>
                    <div class="card-body cartBody" bis_skin_checked="1">
                        <div class="input-group mb-3" bis_skin_checked="1">
                            <input type="text" name="coupon" class="form-control couponCode" value="" placeholder="Enter your coupon code">
                            <button type="button" class="btn btn-success couponButton">Apply Coupon</button>
                        </div>
                        <div class="table-responsive" bis_skin_checked="1">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" class="fontSize">ছবি</th>
                                        <th scope="col" class="fontSize">পন্যের নাম</th>
                                        <th scope="col" class="fontSize">সাইজ/কালার</th>
                                        <th scope="col" class="fontSize">পরিমান</th>
                                        <th scope="col" class="fontSize">পন্যের দাম</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" class="fontSize">
                                            <div class="d-flex" bis_skin_checked="1">
                                                <form method="POST" action="https://newfashion.softitglobal.com/carts/97" class="deleteCart" data-key="97">
                                                    <input type="hidden" name="_token" value="YYQBGdc7K9RR5NwGV96exA5d2KciNNrmiBOgFW4q" autocomplete="off">                                <input type="hidden" name="_method" value="DELETE">                                
                                                    <div class="remove" bis_skin_checked="1">
                                                        <button class="btn btn-sm text-danger remove-item" type="submit">
                                                        <i class="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                                <img :src="checkoutimage" alt="" class="rounded border" style="height: 60px;width: 60px;" width="">
                                                <!-- <img src="https://newfashion.softitglobal.com//posadmin/images/product/large/DSC89281741599841.webp" alt="" class="rounded border" style="height: 60px;width: 60px;" width=""> -->
                                            </div>
                                        </th>
                                        <td class="fontSize">Regular Fit Micro Check Formal Shirt</td>
                                        <td class="fontSize">
                                        </td>
                                        <td>
                                            <div class="d-flex mb-4 align-items-start" style="max-width: 300px" data-href="https://newfashion.softitglobal.com/carts/97/edit" bis_skin_checked="1">
                                                <button class="btn btn-primary me-2 qtybtn minus">
                                                <i class="fas fa-minus"></i>
                                                </button>
                                                <div class="form-outline" bis_skin_checked="1">
                                                    <input id="form1" min="1" name="quantity" value="1" style="width: 40px;" type="text" readonly="" class="form-control quantity">
                                                </div>
                                                <button class="btn btn-primary ms-2 qtybtn plus">
                                                <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="fontSize">
                                            <strong>
                                            1700 
                                            </strong>
                                            Discount: <strong> 170 </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="text-end" style="font-weight: bold;">সাবটোটাল</td>
                                        <td class="prices" style="font-weight: bold;">1530 ৳</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="text-end" style="font-weight: bold;">
                                            কুপন ডিসকাউন্ট 
                                        </td>
                                        <td class="prices" style="font-weight: bold;">
                                            <p id="coupon_cost">0 ৳</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="text-end" style="font-weight: bold;">ডেলিভারি চার্জ</td>
                                        <td class="prices" style="font-weight: bold;">
                                            <p id="shipping_cost">80</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="text-end" style="font-weight: bold;">টোটাল</td>
                                        <td class="prices">
                                            <p id="total_amount" style="font-weight: bold;">1610</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="cart-item-data" data-product-id="97" data-product-name="Regular Fit Micro Check Formal Shirt" data-price="1530" data-quantity="1" bis_skin_checked="1"></div>
                <input type="hidden" name="total_cart_price" value="1530">
            </div>
            <div class="col-md-6 col-lg-6" bis_skin_checked="1">
                <div class="card" bis_skin_checked="1">
                    <div class="card-header" bis_skin_checked="1">
                        <h4 class="mb-3">Billing address</h4>
                    </div>
                    <div class="card-body" bis_skin_checked="1">
                        <form class="needs-validation" action="https://newfashion.softitglobal.com/checkouts" method="post">
                            <input type="hidden" name="_token" value="YYQBGdc7K9RR5NwGV96exA5d2KciNNrmiBOgFW4q" autocomplete="off">                
                            <div class="row g-3" bis_skin_checked="1">
                                <div class="col-sm-12" bis_skin_checked="1">
                                    <label for="firstName" class="form-label">আপনার নাম</label>
                                    <input type="text" class="form-control p-2" placeholder="আপনার নাম লিখুন" value="" name="name">
                                </div>
                                <div class="col-sm-12" bis_skin_checked="1">
                                    <label for="firstName" class="form-label">আপনার মোবাইল নাম্বার</label>
                                    <input type="tel" class="form-control" id="mobile" placeholder="আপনার  মোবাইল নাম্বার লিখুন" maxlength="11" minlength="11" value="" name="mobile">
                                </div>
                                <div class="col-12" bis_skin_checked="1">
                                    <label for="address" class="form-label">আপনার সম্পূর্ন ঠিকানা</label>
                                    <input type="text" class="form-control p-4" placeholder="" name="address" value="">
                                </div>
                                <div class="col-12" bis_skin_checked="1">
                                    <label for="shipping_charge" class="form-label">ডেলিভারি চার্জ</label>
                                    <select class="form-select shadow-none" id="shipping_charge" name="shipping_charge">
                                        <option value="80">ঢাকার মধ্যে (80)</option>
                                        <option value="150">ঢাকার বাহিরে (150)</option>
                                    </select>
                                </div>
                                <button class="w-100 btn btn-warning orange-bg text-white btn-lg sub_btn" type="submit">অর্ডার কনফার্ম করুন</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="product_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" bis_skin_checked="1"></div>

</template>

<style lang="">
    
</style>