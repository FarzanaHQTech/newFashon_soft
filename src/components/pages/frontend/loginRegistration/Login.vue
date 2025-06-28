<template>
        <div class="container my-5" style="min-height: 450px">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login 
                    <!-- <a style="float:right;" class="btn btn-info" href="https://newfashion.softitglobal.com/register"> -->
                        <router-link to="/registration" style="float:right;" class="btn btn-info">
                    Go To Register
                </router-link>
                </div>

                <div class="card-body">
                    <form @submit.prevent="submitLogin" data-gtm-form-interact-id="0">
                         <div v-if="error?.message" class="alert alert-danger">{{ error.message }}</div>

                        <!-- <input type="hidden" name="_token" value="8DgvsUTdnmFI3L1UmdZl6lLPVYCYLcT2q7siFYhZ" autocomplete="off"> -->
                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control " v-model="form.email" value="" required="" autocomplete="email" autofocus="" data-gtm-form-interact-field-id="0">

                                                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control " v-model="form.password" required="" autocomplete="current-password" data-gtm-form-interact-field-id="1">

                                                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="form.password" id="remember">

                                    <label class="form-check-label" for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>
       <a class="btn btn-link" href="https://newfashion.softitglobal.com/password/reset">
                                        Forgot Your Password?
                                    </a>
                                                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
        <div class="modal fade" id="product_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"></div>
     
</template>

<!-- <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '../../../../stores/Auth/login'
import { storeToRefs } from 'pinia'

const router = useRouter()
const loginStore = useLoginStore()
const { error } = storeToRefs(loginStore)

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const submitLogin = async () => {
  console.log('Submitting login...', form.value)
  const success = await loginStore.fetchLoginUser(form.value)
  if (success) {
    router.push('/customer/dashboard')
  }
}
</script> -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '../../../../stores/Auth/login'
import { useAuthStore } from '../../../../stores/Auth/customer_reg'
// import { useLoginStore } from '../../../../stores/Auth/login'
// import { useAuthStore } from '../../../../stores/Auth/customer_reg'
// import { useAuthStore } from '../../../stores/Auth/customer_reg'

const router = useRouter()
const loginStore = useLoginStore()
// const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const submitLogin = async () => {
  console.log('Submitting login...', form.value)
  const success = await loginStore.fetchLoginUser(form.value)

  console.log('Login result:', success) // This was showing undefined
  if (success) {
    alert('Login Success')
    router.push('/customer/dashboard')
  } else {
    alert('Login failed. Please check your credentials.')
  }
}

</script>

