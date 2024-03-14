<template>
    <footer class="footer-black show">
      <p>
        This is a Footer
      </p>
    </footer>
  </template>
  
  <style scoped>
    .footer-black {
      background-color: black;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s ease-in-out;
      transform: translateY(100%);
      opacity: 0;
    }
  
    .show {
      transform: translateY(0);
      opacity: 1;
    }
  </style>