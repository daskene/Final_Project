<template>
    <div class="home-header">
        <div class="logo-container">
            <Logo class="home-logo" />
            <span class="site-name">CyberCanvas</span>
        </div>
        <div class="links-container">
            <SearchBar class="home-search-bar" />
            <div class="nav-links">
                <router-link class="home-link" to="/">Home</router-link>
                <router-link class="gallery-link" to="/gallery">Galleries</router-link>
                <router-link class="posting-link" to="/posting">Post Artwork</router-link>
                <router-link class="login-link" to="/login">Login</router-link>
                <router-link class="signup-link" to="/signup">Sign up</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Logo from '../components/Logo.vue';
    import SearchBar from '../components/SearchBar.vue';
</script>



<style scoped>
    .home-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100vw; /* Use percentage to fit container width */
        background-color: black;
        padding: 10px 20px;
    }


    .logo-container {
        display: flex;
        align-items: center; /* Centers items vertically */
    }

    .site-name {
        color: white; /* Set text color */
        margin-left: 10px; /* Add spacing between logo and site name */
        font-size: 20px; /* Adjust font size */
    }

    .links-container {
        display: flex; /* Use flexbox for side-by-side layout */
        align-items: center; /* Center items vertically */
    }

    .nav-links {
        display: flex; /* Use flexbox for side-by-side layout */
    }

    /* Style for individual links */
    .home-link,
    .gallery-link,
    .posting-link,
    .login-link,
    .signup-link {
        margin-right: 20px; /* Adjust spacing between links */
        color: white; /* Set text color */
        text-decoration: none; /* Remove default underline */
    }

        /* Optional: Hover styles for links */
        .home-link:hover,
        .gallery-link:hover,
        .posting-link:hover,
        .login-link:hover,
        .signup-link:hover {
            text-decoration: underline; /* Add underline on hover */
        }

    .home-search-bar {
        width: auto; /* Adjust based on the layout, or use percentage */
        max-width: 600px; /* Example max-width, adjust as needed */
        margin-right: 20px; /* Existing margin */
        padding: 10px; /* Adjust padding to fit your design */
    }

    /* Example of a media query for responsive adjustment */
    @media (max-width: 768px) {
        .home-search-bar {
            width: 100%; /* Full width on smaller screens */
        }
    }
</style>
