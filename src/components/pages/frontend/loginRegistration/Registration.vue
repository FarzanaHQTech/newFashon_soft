<template>
    <div class="container mt-5" style="min-height: 450px">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register <a style="float:right;" class="btn btn-info"
                            href="https://newfashion.softitglobal.com/login">Back Login</a></div>

                    <div class="card-body">
                        <!-- <form method="POST" action="https://newfashion.softitglobal.com/register">
                            <input type="hidden" name="_token" value="8DgvsUTdnmFI3L1UmdZl6lLPVYCYLcT2q7siFYhZ"
                                autocomplete="off">
                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control " name="name" value="" required=""
                                        autocomplete="name" autofocus="">

                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control " name="email" value=""
                                        required="" autocomplete="email">

                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="phone" class="col-md-4 col-form-label text-md-end">Phone</label>

                                <div class="col-md-6">
                                    <input id="phone" type="text" class="form-control " name="phone" value=""
                                        required="" autocomplete="phone" autofocus="">

                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control " name="password"
                                        required="" autocomplete="new-password">

                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm
                                    Password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control"
                                        name="password_confirmation" required="" autocomplete="new-password">
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form> -->
                       <form @submit.prevent="submitForm">
              <div class="row mb-3" v-if="errors?.name">
                <div class="col text-danger">{{ errors.name[0] }}</div>
              </div>
              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Name</label>
                <div class="col-md-6">
                  <input v-model="form.name" type="text" class="form-control" required />
                </div>
              </div>

              <div class="row mb-3" v-if="errors?.email">
                <div class="col text-danger">{{ errors.email[0] }}</div>
              </div>
              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Email</label>
                <div class="col-md-6">
                  <input v-model="form.email" type="email" class="form-control" required />
                </div>
              </div>

              <div class="row mb-3" v-if="errors?.phone">
                <div class="col text-danger">{{ errors.phone[0] }}</div>
              </div>
              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Phone</label>
                <div class="col-md-6">
                  <input v-model="form.phone" type="text" class="form-control" required />
                </div>
              </div>

              <div class="row mb-3" v-if="errors?.password">
                <div class="col text-danger">{{ errors.password[0] }}</div>
              </div>
              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Password</label>
                <div class="col-md-6">
                  <input v-model="form.password" type="password" class="form-control" required />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Confirm Password</label>
                <div class="col-md-6">
                  <input v-model="form.password_confirmation" type="password" class="form-control" required />
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
                    
                      </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="product_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    </div>

</template>
<script setup>

</script>




<!-- <template>
  <div class="container" style="min-height: 450px">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            Register
            <a style="float:right;" class="btn btn-info" href="/login">Back Login</a>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="row mb-3" v-if="errors?.name">
                <div class="col text-danger">{{ errors.name[0] }}</div>
              </div>
              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Name</label>
                <div class="col-md-6">
                  <input v-model="form.name" type="text" class="form-control" required />
                </div>
              </div>

              <div class="row mb-3" v-if="errors?.email">
                <div class="col text-danger">{{ errors.email[0] }}</div>
              </div>
              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Email</label>
                <div class="col-md-6">
                  <input v-model="form.email" type="email" class="form-control" required />
                </div>
              </div>

              <div class="row mb-3" v-if="errors?.phone">
                <div class="col text-danger">{{ errors.phone[0] }}</div>
              </div>
              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Phone</label>
                <div class="col-md-6">
                  <input v-model="form.phone" type="text" class="form-control" required />
                </div>
              </div>

              <div class="row mb-3" v-if="errors?.password">
                <div class="col text-danger">{{ errors.password[0] }}</div>
              </div>
              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Password</label>
                <div class="col-md-6">
                  <input v-model="form.password" type="password" class="form-control" required />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-md-4 col-form-label text-md-end">Confirm Password</label>
                <div class="col-md-6">
                  <input v-model="form.password_confirmation" type="password" class="form-control" required />
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<script setup>
import { computed, ref } from 'vue'
// import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../../stores/Auth/customer_reg'

const auth = useAuthStore()
const router = useRouter()

const form = ref({
  name: '',

  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
})

const errors = computed(() => auth.errors)

const submitForm = async () => {
  const success = await auth.register(form.value)
  if (success) {
    router.push('/customer/dashboard') // or redirect to profile page
  }else{
      router.push('/')
  }
}
</script>

<style scoped></style>