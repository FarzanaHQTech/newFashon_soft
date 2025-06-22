
<template>
  <div class="skeleton-container">
    <div class="skeleton-title shimmer"></div>
    <div class="skeleton-grid">
      <div class="skeleton-card shimmer" v-for="i in 6" :key="i"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-container {
  padding: 1rem;
}
.skeleton-title {
  height: 20px;
  width: 200px;
  margin-bottom: 20px;
  background-color: #e0e0e0;
}
.skeleton-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.skeleton-card {
  height: 150px;
  flex: 1 1 calc(33% - 1rem);
  background-color: #e0e0e0;
  border-radius: 8px;
}

.shimmer {
  animation: shimmer 1.5s infinite;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 1000px 100%;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>
