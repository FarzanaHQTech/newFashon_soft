<template>
  <!-- <div class="col-lg-3 usersidebardiv"> -->
  <div class="userdashboard">
    <div class="container">
      <div class="row" style="margin:0;">

        <CustomerMenu />
        <div class="col-lg-9 usermainbody">
          <div class="usercontent">
            <div class="myrecentorder">
              <p style="font-weight: bold;border-bottom: 1px solid #eaeded;padding: 5px 0;">Change Password</p>
              <div>
                <form @submit.prevent="submitForm">
                  <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Current password</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" v-model="formUpdate.current_password"
                        placeholder="Current Password">
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Password</label>
                    <div class="col-sm-9">
                      <input type="password" class="form-control" v-model="formUpdate.password"
                        placeholder="New Password">
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Confirmed</label>
                    <div class="col-sm-9">
                      <input type="password" class="form-control" v-model="formUpdate.password_confirmation"
                        placeholder="Confirm Password">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9">
                      <button type="submit" class="btn btn-primary">Change Password</button>
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
  <!-- </div> -->
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import CustomerMenu from './CustomerMenu.vue';
import { useCustomerStore } from '../../../stores/Auth/customerDash';
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const route = useRoute()
const toast = useToast()
const router = useRouter()

const updatePass = useCustomerStore()

const formUpdate = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const submitForm = async () => {
  const user = JSON.parse(sessionStorage.getItem('auth_user'))
  if (!user) {
    toast.error('User not found. Please login again.')
    return
  }

  const result = await updatePass.updatePassword(formUpdate.value, user.id)

  if (result.status === 'success') {
    toast.success(result.message || 'Password updated successfully')
    formUpdate.value.current_password = ''
    formUpdate.value.password = ''
    formUpdate.value.password_confirmation = ''
    router.push('/customer/dashboard') // ✅ Go back to dashboard
  } else {
    if (typeof result.message === 'object') {
      for (const key in result.message) {
        toast.error(result.message[key][0])
      }
    } else {
      toast.error(result.message || 'Failed to update password')
    }
  }
}

// const submitForm = async () => {
//   const user = JSON.parse(sessionStorage.getItem('auth_user'))
//   if (!user) {
//     toast.error('User not found. Please login again.')
//     return
//   }

//   await updatePass.updatePassword(formUpdate.value, user.id)

//   if (updatePass.updateStatus === 'success') {
//     toast.success(updatePass.updateMessage || 'Password updated successfully')
//     formUpdate.value.current_password = ''
//     formUpdate.value.password = ''
//     formUpdate.value.password_confirmation = ''

//   } else {
//     if (typeof updatePass.updateMessage === 'object') {
//       for (const key in updatePass.updateMessage) {
//         toast.error(updatePass.updateMessage[key][0])
//       }
//     } else {
//       toast.error(updatePass.updateMessage || 'Failed to update password')
//     }
//   }
// }
</script>

<style scoped></style>