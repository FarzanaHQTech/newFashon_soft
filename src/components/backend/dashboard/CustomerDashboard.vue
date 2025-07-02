<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../../stores/Auth/customer_reg'
import { posadminApi } from '../../../api' //  correct instance
import { useRouter } from 'vue-router'
import CustomerMenu from './CustomerMenu.vue'
import { useCustomerStore } from '../../../stores/Auth/customerDash'

const router = useRouter()
const authStore = useCustomerStore()
const { user } = storeToRefs(authStore)
const userId = JSON.parse(sessionStorage.getItem('auth_user'))?.id || ''

onMounted(() => {
  authStore.getUserFromStorage()

  if (!user.value) {
    router.push('/login')
  }
})

</script>


<template>
  <div class="userdashboard">
    <div class="container">
      <div class="row" style="margin:0;">

    
        <CustomerMenu/>

        <div class="col-lg-9 usermainbody">
          <div class="usercontent">
            <div class="profiledetails">
              <div class="row" style="margin: 0;padding: 10px;">
                <div class="col-6 col-md-2">
                  <div class="profileImage">
                    <img :src="user?.image || '/default-user.png'" width="100px" />
                  </div>
                </div>
                <div class="col-6 col-md-6">
                  <div class="parsonalprofile2">
                    <p><i class="fa fa-user"></i> {{ user?.name || 'Loading...' }}</p>
                    <p>Email: {{ user?.email || 'Loading...' }}</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="parsonalprofile">
                    <router-link :to="`/customer/profile-edit/${userId}`" class="editPrifilebtn">Edit Profile</router-link>
                    <router-link to="/customer/change-password" class="editPrifilebtn">Change Password</router-link>
                  </div>
                </div>
              </div>

              <div class="row" style="background: #fafafa;margin: 0;padding: 10px;text-align: center;">
                <div class="dashboardcountinfo">
                  <span>0</span>
                  <p><router-link to="/customer/my-orders">All Order</router-link></p>
                </div>
                <div class="dashboardcountinfo">
                  <span>0</span>
                  <p><router-link to="/customer/my-orders?type=2">Pending Order</router-link></p>
                </div>
                <div class="dashboardcountinfo">
                  <span>0</span>
                  <p><router-link to="/customer/my-orders?type=1">Complete Order</router-link></p>
                </div>
                <div class="dashboardcountinfo">
                  <span>0</span>
                  <p><router-link to="/customer/my-orders?type=5">Packing Order</router-link></p>
                </div>
                <div class="dashboardcountinfo">
                  <span>0</span>
                  <p><router-link to="/customer/my-orders?type=6">Delivered Order</router-link></p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="dashbaordInfo">
                  <p>Shipping Address</p>
                  <table class="table table-bordered shippingTable">
                    <tbody>
                      <tr>
                        <td>Company Name</td>
                        <td>: {{ user?.company_name || '-' }}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>: {{ user?.email || '-' }}</td>
                      </tr>
                      <tr>
                        <td>Mobile</td>
                        <td>: {{ user?.phone || '-' }}</td>
                      </tr>
                      <tr>
                        <td style="width:30%;">Address</td>
                        <td>: {{ user?.address || '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>

    
</style>