<template>
  <div class="page-transition">
    <div class="current-page" v-show="showCurrent">
      <slot name="current" />
    </div>
    <div class="new-page" v-show="showNew">
      <slot name="new" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showCurrent = ref(true)
const showNew = ref(false)

router.beforeEach(() => {
  showNew.value = false
})

router.afterEach(() => {
  showCurrent.value = false
  showNew.value = true
})
</script>

<style>
.page-transition {
  position: relative;
  width: 100%;
  height: 100%;
}

.current-page, .new-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

.current-page {
  z-index: 1;
}

.new-page {
  z-index: 2;
  opacity: 0;
}

.new-page.v-show {
  opacity: 1;
}
</style>