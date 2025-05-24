<script setup>

// import product1 from '../../assets/image/images/product/small/ajl-1ba1741154819.jpg'
import product1 from '../../../assets/image/images/product/small/ajl-1ba1741154819.jpg'

import product2 from '../../../assets/image/images/product/small/25JH-872a174115444717456633351746606906.jpg'
import product3 from '../../../assets/image/images/product/small/MAYRA-01a17411545661746607171.jpg'

import product4 from '../../../assets/image/images/product/small/MIS3P2502-0417411546941746608383.jpg'

import product5 from '../../../assets/image/images/product/small/MAYRA-01a174115456617466071721746612605.jpg'

import product6 from '../../../assets/image/images/product/small/GULAL25-0217411542781747474373.jpg'

import product7 from '../../../assets/image/images/product/small/25JH-874a174115444717456633351747471805.jpg'

import product8 from '../../../assets/image/images/product/small/D-3077174116966317456639611747474705.jpg'

import product9 from '../../../assets/image/images/product/small/8YzNcqgnUIYhupuxDVT9GT0a9DQWLt9J2r7cC6H61747476127.webp'

import product10 from '../../../assets/image/images/product/small/g5GQX9dILyBg39UYD2F73JIUzHIbitd87Rp15PYM1747476567.webp'
// import ptsv from '../../assets/pt.svg'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const girlsFashionShops = [
    {
        id: 96,
        name: "Asim Jofa Luxury Lawn 2020 collections-122",
        images: product1,
        currentPrice: "6500 Tk",
        categoryId: 41,
    },
    {
        id: 97,
        name: "Johra Khalwats",
        images: product2,
        categoryId: 42,
        currentPrice: "4200 Tk",
    },
    {
        id: 89,
        name: "Mayra ZA Clothes0",
        images: product3,
        currentPrice: "4500 Tk",
        categoryId: 43
    },
    {
        id: 98,
        name: "Mishaal Vol-02 By GullJee0",
        images: product4,
        currentPrice: "2070 Tk",
        categoryId: 44
    },
    {
        id: 90,
        name: "Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01",
        images: product5,
        currentPrice: "5000 Tk",
        categoryId: 45,
    },
    {
        id: 91,
        name: "Gulal Premium Eid Exclusive Lawn Collections 1",
        images: product6,
        currentPrice: "5500 Tk",
        categoryId: 46
    },
    {
        id: 92,
        name: "Johra Khalwat 11",
        images: product7,
        currentPrice: "4100 Tk",
        categoryId: 47
    },
    {
        id: 70,
        name: "Mehri vol-02 Chikankari by Tawakkal 11",
        images: product8,
        currentPrice: "5000 Tk",
        categoryId: 48
    },
    {
        id: 71,
        name: "Saira Rizwan Unstitched Lawn Vol",
        images: product9,
        currentPrice: "5000 Tk",
        categoryId: 49
    },
    {
        id: 72,
        name: "Unstitched Embroidered Chiffon Suit 3 Pc",
        images: product10,
        currentPrice: "2520 Tk",
        originalPrice: "2800 Tk",
        categoryId: 50,
    }
]
</script>


<template>
    <div>
        <div class="products shopProducts mt-3" >
            <div class="product" v-for="(item,index) in girlsFashionShops" :key="index">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/asim-jofa-luxury-lawn-2020-collections-122"
                        id="product_show" :data-productid="item.id" :data-categoryid="item.id"
                        :data-productname="item.name">
                        <img :src="item.images"
                            :alt="item.name" class="first">
                        <img :src="item.images"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/asim-jofa-luxury-lawn-2020-collections-122"
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
                    <a href="https://newfashion.softitglobal.com/product-show/asim-jofa-luxury-lawn-2020-collections-122"
                        id="product_show" data-productid="122" data-categoryid="73"
                        :data-productname="item.name">
                        <div class="title">{{item.name}}</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">{{item.currentPrice}}</span>
                    </div>

                </div>
            </div> 
            <!-- <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/ethnic-co-ords-kurti-ready-to-wear-2-piece-gf01"
                        id="product_show" data-productid="128" data-categoryid="73"
                        data-productname="Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/MAYRA-01a174115456617466071721746612605.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/MAYRA-01a174115456617466071721746612605.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/ethnic-co-ords-kurti-ready-to-wear-2-piece-gf01"
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
                    <a href="https://newfashion.softitglobal.com/product-show/ethnic-co-ords-kurti-ready-to-wear-2-piece-gf01"
                        id="product_show" data-productid="128" data-categoryid="73"
                        data-productname="Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01">
                        <div class="title">Ethnic Co Ords Kurti (Ready to Wear 2 Piece gf01</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">5000 Tk</span>
                    </div>

                </div>
            </div>

            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/gulal-premium-eid-exclusive-lawn-collections-1"
                        id="product_show" data-productid="135" data-categoryid="73"
                        data-productname="Gulal Premium Eid Exclusive Lawn Collections 1">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/GULAL25-0217411542781747474373.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/GULAL25-0217411542781747474373.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/gulal-premium-eid-exclusive-lawn-collections-1"
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
                    <a href="https://newfashion.softitglobal.com/product-show/gulal-premium-eid-exclusive-lawn-collections-1"
                        id="product_show" data-productid="135" data-categoryid="73"
                        data-productname="Gulal Premium Eid Exclusive Lawn Collections 1">
                        <div class="title">Gulal Premium Eid Exclusive Lawn Collections 1</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">5500 Tk</span>
                    </div>

                </div>
            </div>
            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/johra-khalwat-11" id="product_show"
                        data-productid="137" data-categoryid="73" data-productname="Johra Khalwat 11">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/25JH-874a174115444717456633351747471805.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/25JH-874a174115444717456633351747471805.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/johra-khalwat-11" style="">
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
                    <a href="https://newfashion.softitglobal.com/product-show/johra-khalwat-11" id="product_show"
                        data-productid="137" data-categoryid="73" data-productname="Johra Khalwat 11">
                        <div class="title">Johra Khalwat 11</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4100 Tk</span>
                    </div>

                </div>
            </div>
            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/johra-khalwats" id="product_show"
                        data-productid="124" data-categoryid="73" data-productname="Johra Khalwats">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/25JH-872a174115444717456633351746606906.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/25JH-872a174115444717456633351746606906.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/johra-khalwats" style="">
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
                    <a href="https://newfashion.softitglobal.com/product-show/johra-khalwats" id="product_show"
                        data-productid="124" data-categoryid="73" data-productname="Johra Khalwats">
                        <div class="title">Johra Khalwats</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4200 Tk</span>
                    </div>

                </div>
            </div>

            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/mayra-za-clothes0" id="product_show"
                        data-productid="125" data-categoryid="73" data-productname="Mayra ZA Clothes0">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/MAYRA-01a17411545661746607171.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/MAYRA-01a17411545661746607171.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/mayra-za-clothes0" style="">
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
                    <a href="https://newfashion.softitglobal.com/product-show/mayra-za-clothes0" id="product_show"
                        data-productid="125" data-categoryid="73" data-productname="Mayra ZA Clothes0">
                        <div class="title">Mayra ZA Clothes0</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4500 Tk</span>
                    </div>

                </div>
            </div>
            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/mishaal-vol-02-by-gulljee0"
                        id="product_show" data-productid="127" data-categoryid="73"
                        data-productname="Mishaal Vol-02 By GullJee0">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/MIS3P2502-0417411546941746608383.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/MIS3P2502-0417411546941746608383.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/mishaal-vol-02-by-gulljee0" style="">
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
                    <a href="https://newfashion.softitglobal.com/product-show/mishaal-vol-02-by-gulljee0"
                        id="product_show" data-productid="127" data-categoryid="73"
                        data-productname="Mishaal Vol-02 By GullJee0">
                        <div class="title">Mishaal Vol-02 By GullJee0</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4200 Tk</span>
                    </div>

                </div>
            </div>
            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/tawakkal-alara-fancy-silk-stitched-kurti-01"
                        id="product_show" data-productid="130" data-categoryid="73"
                        data-productname="Tawakkal Alara Fancy Silk Stitched Kurti 01">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/D-175317411562941746614651.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/D-175317411562941746614651.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/tawakkal-alara-fancy-silk-stitched-kurti-01"
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
                    <a href="https://newfashion.softitglobal.com/product-show/tawakkal-alara-fancy-silk-stitched-kurti-01"
                        id="product_show" data-productid="130" data-categoryid="73"
                        data-productname="Tawakkal Alara Fancy Silk Stitched Kurti 01">
                        <div class="title">Tawakkal Alara Fancy Silk Stitched Kurti 01</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4200 Tk</span>
                    </div>

                </div>
            </div>
            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/charizma-rang-e-bahar-crb5-9-embroidered-lawn-with-chiffon-dupatta-and-trouser"
                        id="product_show" data-productid="142" data-categoryid="73"
                        data-productname="Charizma Rang-E-Bahar CRB5-9 Embroidered Lawn with Chiffon Dupatta and Trouser">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/6z8k9XXvsxLSuNcVsxagGN4liTdoG57g3ywBDCMk1747480183.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/6z8k9XXvsxLSuNcVsxagGN4liTdoG57g3ywBDCMk1747480183.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/charizma-rang-e-bahar-crb5-9-embroidered-lawn-with-chiffon-dupatta-and-trouser"
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
                    <a href="https://newfashion.softitglobal.com/product-show/charizma-rang-e-bahar-crb5-9-embroidered-lawn-with-chiffon-dupatta-and-trouser"
                        id="product_show" data-productid="142" data-categoryid="73"
                        data-productname="Charizma Rang-E-Bahar CRB5-9 Embroidered Lawn with Chiffon Dupatta and Trouser">
                        <div class="title">Charizma Rang-E-Bahar CRB5-9 Embroidered Lawn with Chiffon D...</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4500 Tk</span>
                    </div>

                </div>
            </div>
            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee" id="product_show"
                        data-productid="144" data-categoryid="73" data-productname="Esme By Gulljee">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/NteNdqxTllOxFjKcoKTOX7bJ7XBHB7tCYuePYJTo1747481287.png"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/NteNdqxTllOxFjKcoKTOX7bJ7XBHB7tCYuePYJTo1747481287.png"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee" style="">
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
                    <a href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee" id="product_show"
                        data-productid="144" data-categoryid="73" data-productname="Esme By Gulljee">
                        <div class="title">Esme By Gulljee</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">5000 Tk</span>
                    </div>

                </div>
            </div>
            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee" id="product_show"
                        data-productid="145" data-categoryid="73" data-productname="Esme By Gulljee">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/NteNdqxTllOxFjKcoKTOX7bJ7XBHB7tCYuePYJTo1747481290.png"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/NteNdqxTllOxFjKcoKTOX7bJ7XBHB7tCYuePYJTo1747481290.png"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee" style="">
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
                    <a href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee" id="product_show"
                        data-productid="145" data-categoryid="73" data-productname="Esme By Gulljee">
                        <div class="title">Esme By Gulljee</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">5000 Tk</span>
                    </div>

                </div>
            </div>
            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee-vol-01-printed-embroidered-lawn"
                        id="product_show" data-productid="143" data-categoryid="73"
                        data-productname="Esme By Gulljee Vol-01 Printed Embroidered Lawn">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/49plOWfMqihw5dvQV60BD7yKDnVek8IgJbR2Q7tO1747480466.png"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/49plOWfMqihw5dvQV60BD7yKDnVek8IgJbR2Q7tO1747480466.png"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee-vol-01-printed-embroidered-lawn"
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
                    <a href="https://newfashion.softitglobal.com/product-show/esme-by-gulljee-vol-01-printed-embroidered-lawn"
                        id="product_show" data-productid="143" data-categoryid="73"
                        data-productname="Esme By Gulljee Vol-01 Printed Embroidered Lawn">
                        <div class="title">Esme By Gulljee Vol-01 Printed Embroidered Lawn</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">5000 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/glam-girl-by-nureh-gf02" id="product_show"
                        data-productid="131" data-categoryid="73" data-productname="Glam Girl By Nureh gf02">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/GL-03a174115651517456630881746614941.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/GL-03a174115651517456630881746614941.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/glam-girl-by-nureh-gf02" style="">
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
                    <a href="https://newfashion.softitglobal.com/product-show/glam-girl-by-nureh-gf02" id="product_show"
                        data-productid="131" data-categoryid="73" data-productname="Glam Girl By Nureh gf02">
                        <div class="title">Glam Girl By Nureh gf02</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4500 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/gulal-premium-eid-exclusive-lawn-collection-gf02"
                        id="product_show" data-productid="129" data-categoryid="73"
                        data-productname="Gulal Premium Eid Exclusive Lawn Collection gf02">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/GULAL25-08a1741154279174566324517466066351746614376.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/GULAL25-08a1741154279174566324517466066351746614376.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/gulal-premium-eid-exclusive-lawn-collection-gf02"
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
                    <a href="https://newfashion.softitglobal.com/product-show/gulal-premium-eid-exclusive-lawn-collection-gf02"
                        id="product_show" data-productid="129" data-categoryid="73"
                        data-productname="Gulal Premium Eid Exclusive Lawn Collection gf02">
                        <div class="title">Gulal Premium Eid Exclusive Lawn Collection gf02</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4500 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/jade-needle-wonder-cotton-satin-fall"
                        id="product_show" data-productid="146" data-categoryid="73"
                        data-productname="Jade Needle Wonder Cotton Satin Fall">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/z2lTjWIBRl7YQxutGN69L4cEY9MktSTDIoWc5Aeu1747481810.png"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/z2lTjWIBRl7YQxutGN69L4cEY9MktSTDIoWc5Aeu1747481810.png"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/jade-needle-wonder-cotton-satin-fall"
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
                    <a href="https://newfashion.softitglobal.com/product-show/jade-needle-wonder-cotton-satin-fall"
                        id="product_show" data-productid="146" data-categoryid="73"
                        data-productname="Jade Needle Wonder Cotton Satin Fall">
                        <div class="title">Jade Needle Wonder Cotton Satin Fall</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4500 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/johra-khalwat-1" id="product_show"
                        data-productid="136" data-categoryid="73" data-productname="Johra Khalwat 1">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/25JH-874a174115444717456633351747471804.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/25JH-874a174115444717456633351747471804.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/johra-khalwat-1" style="">
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
                    <a href="https://newfashion.softitglobal.com/product-show/johra-khalwat-1" id="product_show"
                        data-productid="136" data-categoryid="73" data-productname="Johra Khalwat 1">
                        <div class="title">Johra Khalwat 1</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4100 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/mehri-vol-02-chikankari-by-tawakkal-02"
                        id="product_show" data-productid="132" data-categoryid="73"
                        data-productname="Mehri vol-02 Chikankari by Tawakkal 02">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/D-3077174116966317456639611746615583.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/D-3077174116966317456639611746615583.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/mehri-vol-02-chikankari-by-tawakkal-02"
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
                    <a href="https://newfashion.softitglobal.com/product-show/mehri-vol-02-chikankari-by-tawakkal-02"
                        id="product_show" data-productid="132" data-categoryid="73"
                        data-productname="Mehri vol-02 Chikankari by Tawakkal 02">
                        <div class="title">Mehri vol-02 Chikankari by Tawakkal 02</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4500 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/mehri-vol-02-chikankari-by-tawakkal-11"
                        id="product_show" data-productid="138" data-categoryid="73"
                        data-productname="Mehri vol-02 Chikankari by Tawakkal 11">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/D-3077174116966317456639611747474705.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/D-3077174116966317456639611747474705.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/mehri-vol-02-chikankari-by-tawakkal-11"
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
                    <a href="https://newfashion.softitglobal.com/product-show/mehri-vol-02-chikankari-by-tawakkal-11"
                        id="product_show" data-productid="138" data-categoryid="73"
                        data-productname="Mehri vol-02 Chikankari by Tawakkal 11">
                        <div class="title">Mehri vol-02 Chikankari by Tawakkal 11</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">5000 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/rungrez-festive-collection-01"
                        id="product_show" data-productid="133" data-categoryid="73"
                        data-productname="Rungrez Festive Collection 01">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/RNG-07a174115669217456638991746616244.jpg"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/RNG-07a174115669217456638991746616244.jpg"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/rungrez-festive-collection-01"
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
                    <a href="https://newfashion.softitglobal.com/product-show/rungrez-festive-collection-01"
                        id="product_show" data-productid="133" data-categoryid="73"
                        data-productname="Rungrez Festive Collection 01">
                        <div class="title">Rungrez Festive Collection 01</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">4200 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/saira-rizwan-unstitched-lawn-vol"
                        id="product_show" data-productid="139" data-categoryid="73"
                        data-productname="Saira Rizwan Unstitched Lawn Vol">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/8YzNcqgnUIYhupuxDVT9GT0a9DQWLt9J2r7cC6H61747476127.webp"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/8YzNcqgnUIYhupuxDVT9GT0a9DQWLt9J2r7cC6H61747476127.webp"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/saira-rizwan-unstitched-lawn-vol"
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
                    <a href="https://newfashion.softitglobal.com/product-show/saira-rizwan-unstitched-lawn-vol"
                        id="product_show" data-productid="139" data-categoryid="73"
                        data-productname="Saira Rizwan Unstitched Lawn Vol">
                        <div class="title">Saira Rizwan Unstitched Lawn Vol</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">5000 Tk</span>
                    </div>

                </div>
            </div>





            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/unstitched-embroidered-chiffon-suit"
                        id="product_show" data-productid="141" data-categoryid="73"
                        data-productname="Unstitched Embroidered Chiffon Suit">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/pHcma30ZdYxX4t11WY9Ot920c4CADbBePmbzlLMw1747477696.webp"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/pHcma30ZdYxX4t11WY9Ot920c4CADbBePmbzlLMw1747477696.webp"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/unstitched-embroidered-chiffon-suit"
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
                    <a href="https://newfashion.softitglobal.com/product-show/unstitched-embroidered-chiffon-suit"
                        id="product_show" data-productid="141" data-categoryid="73"
                        data-productname="Unstitched Embroidered Chiffon Suit">
                        <div class="title">Unstitched Embroidered Chiffon Suit</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">6500 Tk</span>
                    </div>

                </div>
            </div>




            <div class="product">
                <div class="image">
                    <a href="https://newfashion.softitglobal.com/product-show/unstitched-embroidered-chiffon-suit-3-pc"
                        id="product_show" data-productid="140" data-categoryid="73"
                        data-productname="Unstitched Embroidered Chiffon Suit 3 Pc">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/g5GQX9dILyBg39UYD2F73JIUzHIbitd87Rp15PYM1747476567.webp"
                            alt="" class="first">
                        <img src="https://newfashion.softitglobal.com//posadmin/images/product/small/g5GQX9dILyBg39UYD2F73JIUzHIbitd87Rp15PYM1747476567.webp"
                            alt="" class="second">
                    </a>
                    <div class="product_btn_position content">
                        <a class="submit_button btn btn-light btn_modal d-block"
                            href="https://newfashion.softitglobal.com/product-show/unstitched-embroidered-chiffon-suit-3-pc"
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
                    <a href="https://newfashion.softitglobal.com/product-show/unstitched-embroidered-chiffon-suit-3-pc"
                        id="product_show" data-productid="140" data-categoryid="73"
                        data-productname="Unstitched Embroidered Chiffon Suit 3 Pc">
                        <div class="title">Unstitched Embroidered Chiffon Suit 3 Pc</div>
                    </a>
                    <div class="price">

                        <span class="current_price" style="color: #00276C;">6000 Tk</span>
                    </div>

                </div>
            </div> -->


        </div>
    </div>
</template>

<style scoped></style>