<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Search..."
      />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      onSearch() {
        console.log("Searching for:", this.searchQuery);
      }
    }
  };
  </script>
  
  <style scoped>
  .search-bar input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
  }
  </style>
  
