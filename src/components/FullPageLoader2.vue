<template>
  <div class="main-loader-wrapper">
    <div class="holographic-loader">
      <div class="holographic-circle"></div>
      <div class="holographic-circle"></div>
      <div class="holographic-circle"></div>
      <div class="holographic-center"></div>
      <div class="holographic-text">Loading Experience</div>
    </div>
  </div>
</template>

<style scoped>
.main-loader-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  overflow: hidden;
}

.holographic-loader {
  position: relative;
  width: 200px;
  height: 200px;
  filter: drop-shadow(0 0 5px rgba(0,0,0,0.1));
}

.holographic-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
  animation: rotate 4s linear infinite;
  opacity: 0.9;
}

.holographic-circle:nth-child(1) {
  width: 100%;
  height: 100%;
  border-top-color: #3a86ff;  /* Vibrant blue */
  border-bottom-color: #3a86ff;
  animation-delay: 0s;
  box-shadow: 0 0 15px rgba(58, 134, 255, 0.5);
}

.holographic-circle:nth-child(2) {
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  border-left-color: #8338ec;  /* Royal purple */
  border-right-color: #8338ec;
  animation-delay: -1s;
  box-shadow: 0 0 15px rgba(131, 56, 236, 0.5);
}

.holographic-circle:nth-child(3) {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border-top-color: #ff006e;  /* Focus color - bright pink */
  border-bottom-color: #ff006e;
  animation-delay: -2s;
  box-shadow: 0 0 20px rgba(255, 0, 110, 0.6); /* Enhanced glow for focus color */
}

.holographic-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background: #ff006e;  /* Matching focus color */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px rgba(255, 0, 110, 0.7);
  z-index: 2;
}

.holographic-text {
  position: absolute;
  bottom: -40px;
  width: 100%;
  text-align: center;
  color: #ff006e;  /* Focus color */
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { 
    opacity: 0.8;
    text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
  }
  50% { 
    opacity: 1;
    text-shadow: 0 0 10px rgba(255, 0, 110, 0.6);
  }
}
</style>