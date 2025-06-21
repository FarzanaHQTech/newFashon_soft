<!-- 
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
</style> -->
<template>
  <div class="bouncing-dots">
    <div v-for="i in 3" :key="i" :style="`--delay: ${i * 0.2}s`"></div>
  </div>
</template>

<style>
.bouncing-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 8px;
}
.bouncing-dots div {
  width: 12px;
  height: 12px;
  background: #6a5acd;
  border-radius: 50%;
  animation: bounce 1s infinite var(--delay);
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
</style>
