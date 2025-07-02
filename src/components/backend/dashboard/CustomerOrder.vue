<script setup>
import { onMounted, ref } from 'vue';
import { useCustomerStore } from '../../../stores/Auth/customerDash';
import CustomerMenu from './CustomerMenu.vue';
import { storeToRefs } from 'pinia';
const orders = useCustomerStore()
const { order } = storeToRefs(orders)


onMounted(() => {
    orders.myOrders()
})

</script>


<template>
    <div class="container">
        <div class="row" style="margin:0;">
            <CustomerMenu />
            <div class="col-lg-9 usermainbody">
                <div class="usercontent">
                    <div class="myrecentorder" style="min-height: 300px;">
                        <p style="font-weight: bold;padding-top: 5px;">My Orders</p>
                        <div style="overflow: auto;">


                            <table class="table table-bordered">

                                <tbody>
                                    <tr>
                                        <th style="width: 50px;min-width: 50px;">SL</th>
                                        <th style="width: 150px;min-width: 150px;">Order ID</th>
                                        <th style="width: 170px;min-width: 170px;">Placed On</th>
                                        <th style="width: 50px;min-width: 50px;">Items</th>
                                        <th style="width: 150px;min-width: 150px;">Total</th>
                                        <th style="width: 80px;min-width: 80px;">Status</th>
                                    </tr>
                                    <tr v-if="order && order.data && order.data.length === 0">
                                        <td colspan="6" class="text-center">No orders found.</td>
                                    </tr>
                                    <tr v-for="(o, index) in order.data" :key="o.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ o.id }}</td>
                                        <td>{{ new Date(o.created_at).toLocaleString() }}</td>
                                        <td>{{ o.item }}</td>
                                        <td>{{ o.grand_total }} ৳</td>
                                        <td>{{ o.sale_status }}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>


<style scoped></style>