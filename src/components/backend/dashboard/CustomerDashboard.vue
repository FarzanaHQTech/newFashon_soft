<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../../stores/Auth/customer_reg'
import { posadminApi } from '../../../api' // ✅ correct instance
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

onMounted(async () => {
  const token = localStorage.getItem('auth_token')
  console.log('auth_token:', token)

  if (token) {
    try {
      const res = await posadminApi.get('/vue/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      authStore.$patch({ user: res.data }) // ✅ update user store
      console.log('User data loaded:', res.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      if (error.response?.status === 401) {
        router.push('/login')
      }
    }
  } else {
    router.push('/login')
  }
  
  const logout = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
  useAuthStore().$reset()
  window.location.href = '/login'
}
})
</script>


<template>
  <div class="userdashboard">
    <div class="container">
      <div class="row" style="margin:0;">
        <div class="col-lg-3 usersidebardiv">
          <div class="usersidebar">
            <p style="margin: 0;font-size: 20px;color: #333;">Shortcuts</p>
            <ul id="usersidebar">
              <li><router-link to="/customer/dashboard">My Dashboard</router-link></li>
              <li><router-link to="/customer/profile-edit">Edit Profile</router-link></li>
              <li><router-link to="/customer/change-password">Change Password</router-link></li>
              <li><router-link to="/customer/my-orders">My Orders</router-link></li>
              <li><router-link to="/customer/my-reviews">My Review</router-link></li>
              <li>
                <a href="#" @click.prevent="logout">Log Out</a>
              </li>
            </ul>
          </div>
        </div>

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
                    <router-link to="/customer/profile-edit" class="editPrifilebtn">Edit Profile</router-link>
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
                        <td>: {{ user?.mobile || '-' }}</td>
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

<!-- <script setup>

</script> -->




<style scoped>
    .usersidebardiv{
        padding:10px;
    }
    .usermainbody {
        padding: 10px;
    }
    .usersidebar {
        background: white;
        padding: 10px;
        border: 1px solid #dadada;
    }
    ul#usersidebar {
    padding: 0;
    margin: 0;
    }
    ul#usersidebar li {
    list-style: none;
    margin: 0;
    padding: 0;
    text-decoration: none;
    }
    ul#usersidebar li a {
    color: #333;
    padding: 2px 0;
    text-decoration: none;
    display: block;
    font-size: 14px;
    }
    .profiledetails {
    padding: 0px;
    background: white;
    margin-bottom: 15px;
    border: 1px solid #dadada;
    }
    .dashboardcountinfo {
    width: 20%;
    border-right: 1px solid #dcdcdc;
    }
    a.editPrifilebtn {
        padding: 5px 0px 4px;
        text-align: center;
        background: #0066bf;
        transition-duration: 0.3s;
        display: block;
        margin-bottom: 5px;
        text-decoration: none;
        color: #ffffff;
    }
    .dashbaordInfo {
    background: white;
    padding: 15px;
    border: 1px solid #dadada;
    }
    .usercontent {
    background: white;
    padding: 15px;
    border: 1px solid #dadada;
    }
    @media only screen and (max-width: 991px) {
      
        .dashboardcountinfo p {
            font-size: 10px;
        }
        
    }
    
    @media only screen and (max-width: 767px) {
        .dashboardcountinfo p {
            font-size: 8px;
        }
    }
    
    @media only screen and (max-width: 575px) {
        .dashboardcountinfo p {
            font-size: 6px;
        }
    }
    
</style>