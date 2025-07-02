 <script setup>
import { useToast } from 'vue-toast-notification';
import { useCustomerStore } from '../../../stores/Auth/customerDash';
import { ref,onMounted } from 'vue';
import CustomerMenu from './CustomerMenu.vue';
import { useRoute } from 'vue-router';



 const customerStore = useCustomerStore();
 const toast = useToast();


const route = useRoute()
const userId = route.params.id

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  address: '',
})


onMounted(() => {
const user = JSON.parse(sessionStorage.getItem('auth_user'))
 customerStore.updateProfile(form.value, user.id)
  if (user) {
    form.value.name = user.name || ''
    form.value.email = user.email || ''
    form.value.phone = user.phone || ''
    form.value.company = user.company_name || ''
    form.value.address = user.address || ''
  }
})

//submitHandler
// Submit Profile Update
const submitProfile = async () => {
  const user = JSON.parse(sessionStorage.getItem('auth_user'))

  if (!user || !user.id) {
    toast.error('User ID missing from sessionStorage')
    return
  }

  await customerStore.updateProfile(form.value, user.id)

  if (customerStore.updateStatus === 'success') {
    toast.success(customerStore.updateMessage)
  } else if (typeof customerStore.updateMessage === 'object') {
    const messages = Object.values(customerStore.updateMessage).flat().join(', ')
    toast.error(messages)
  } else {
    toast.error(customerStore.updateMessage || 'Failed to Update Profile')
  }
}


</script>
<template>
  <div class="userdashboard">
    <div class="container">
      <div class="row" style="margin:0;">

        <CustomerMenu />

        <div class="col-lg-9 usermainbody">
          <div class="usercontent">
            <div class="myrecentorder">
              <p style="font-weight: bold; border-bottom: 1px solid #eaeded; padding: 5px 0;">My Profile Update</p>
              <div>
                <form @submit.prevent="submitProfile" enctype="multipart/form-data">

                  <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Name*</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" v-model="form.name" placeholder="Your Name">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Company Name</label>
                    <div class="col-sm-9">
                      <div class="input-group mb-3">
                        <input type="text" class="form-control" v-model="form.company" placeholder="Company Name">
                      </div>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Email Name*</label>
                    <div class="col-sm-9">
                      <div class="input-group mb-3">
                        <input type="email" class="form-control" v-model="form.email" placeholder="Email Address" required>
                      </div>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Mobile Number*</label>
                    <div class="col-sm-9">
                      <div class="input-group mb-3">
                        <input type="text" class="form-control" v-model="form.phone" placeholder="Phone Number">
                      </div>
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Address*</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" v-model="form.address" placeholder="Address">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9">
                      <button type="submit" class="btn btn-primary">Update Profile</button>
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
</template>

<style scoped>
</style>