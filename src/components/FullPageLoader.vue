<!-- FullPageLoader.vue -->
<template>
  <div class="main-loader-wrapper">
    <div class="loader-content">
      <img src="../assets/image/loader/green-circle-ok-check-mark-6uvrba3bd0fi8ue9.gif" alt="Logo" class="loader-logo" />
    </div>
  </div>
</template>

<style scoped>
.main-loader-wrapper {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.loader-logo {
  width: 100px;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
