<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Login</div>

            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="row mb-3">
                  <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                  <div class="col-md-6">
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      v-model="email"
                      required
                      autocomplete="email"
                      autofocus
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                  <div class="col-md-6">
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      v-model="password"
                      required
                      autocomplete="current-password"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6 offset-md-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="remember"
                        v-model="remember"
                      />
                      <label class="form-check-label" for="remember">
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>

                <div class="row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">Login</button>
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
    <div
      class="modal fade"
      id="product_modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    ></div>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const remember = ref(false)

const handleLogin = async () => {
  try {
    const response = await axios.post('https://newfashion.softitglobal.com/login', {
      email: email.value,
      password: password.value,
      remember: remember.value
    }, {
      headers: {
        'Content-Type': 'application/json'
        // You can also set the CSRF token here if needed
      }
    })

    console.log('Login successful', response.data)
    // Redirect or show success message
  } catch (error) {
    console.error('Login failed', error)
    // Show error message
  }
}
</script>
