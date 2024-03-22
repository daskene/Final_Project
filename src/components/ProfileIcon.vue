<template>
    <router-link to="/profile">
        <img src="@/assets/profile-icon.png" alt="Profile" class="profile-icon" />
    </router-link>
</template>

<script>
    export default {
        name: 'ProfileIcon',
    };
</script>

<style scoped>
    .profile-icon {
        width: 50px;
        height: 50px; 
      border-radius: 50%; /*Makes the image a circle and 50px both width and height makes it a perfect circle*/
      object-fit: cover;
    }
</style>

