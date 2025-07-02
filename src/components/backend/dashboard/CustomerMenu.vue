<script setup>
import { onMounted } from 'vue'
import { useLoginStore } from '../../../stores/Auth/login'

const loginStore = useLoginStore()
const { autoLogout } = loginStore

const userId = JSON.parse(sessionStorage.getItem('auth_user'))?.id || ''
</script>

<template>
  <div class="col-lg-3 usersidebardiv">
    <div class="usersidebar">
      <p style="margin: 0;font-size: 20px;color: #333;">Shortcuts</p>
      <ul id="usersidebar">
        <li><router-link to="/customer/dashboard">My Dashboard</router-link></li>
        <li><router-link :to="`/customer/profile-edit/${userId}`">Edit Profile</router-link></li>
        <li><router-link :to="`/customer/changePassword/${userId}`">Change Password</router-link></li>
        <li><router-link to="/customer/my-orders">My Orders</router-link></li>
        <!-- <li><router-link to="/customer/my-reviews">My Review</router-link></li> -->
        <li>
          <a href="#" @click.prevent="autoLogout()">Log Out</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
    
</style>