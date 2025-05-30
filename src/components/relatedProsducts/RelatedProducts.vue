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

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const girlsFashions = [
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

const router = useRouter()

function goToCheckout() {
    router.push('/checkout')
}

</script>


<template>
    <div class="container-fluid mt-4">
        <div class="banner rounded-2" bis_skin_checked="1">
            <div class="ps-lg-5 text-center w-100" bis_skin_checked="1">
                <div class="title" bis_skin_checked="1">Related Products</div>
                <img :src="ptsv" style="width: 200px" />
            </div>
        </div>
        <div class="products mt-3">
            <div class="product" v-for="item in girlsFashions" :key="item.index">
                <div class="image">
                    <a href="andaaz-luxury-lawn-vol-08-by-ramsha-12.html" id="product_show" :data-productid="item.id"
                        :data-categoryid="item.id" :data-productname="item.name">
                        <img :src="item.images" alt="" class="first" />
                        <img :src="item.images" alt="" class="second" />
                    </a>
                    <div class="product_btn_position content">
                        
                        <!-- No need for <form>, use Vue methods instead -->
                        <button @click="goToCheckout" class="submit_button btn btn-light d-block">
                            <div class="cart_btn bangali bold ord_bt">
                                <i class="fa fa-cart-shopping"></i>
                                <span>অর্ডার করুন</span>
                            </div>
                        </button>

                    </div>
                </div>

                <div class="labels d-none">
                    <div class="tag bg-dark text-light">-39%</div>
                    <div class="tag bg-danger text-light">Sold Out</div>
                </div>

                <div class="content px-2 text-center">
                    <a href="andaaz-luxury-lawn-vol-08-by-ramsha-12.html" id="product_show" :data-productid="item.id"
                        :data-categoryid="item.id" :data-productname="item.name">
                        <div class="title">
                            <!-- Andaaz Luxury Lawn vol-08 by Ramsha-12 -->
                            {{ item.name }}
                        </div>
                    </a>
                    <div class="price">
                        <span class="current_price" style="color: #00276c">{{ item.currentPrice }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped></style>