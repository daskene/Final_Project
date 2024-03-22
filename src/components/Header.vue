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
                <router-link class="delete-link" to="/delete">Delete artwork</router-link>
            </div>
            <ProfileIcon class="profile-icon" />
        </div>
    </div>
</template>

<script setup>
    import Logo from '../components/Logo.vue';
    import SearchBar from '../components/SearchBar.vue';
    import ProfileIcon from '../components/ProfileIcon.vue'; // Ensure this is the correct path
</script>



<style scoped>
    .home-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100vw;
        background-color: black;
        padding: 10px 20px;
    }

    .logo-container {
        display: flex;
        align-items: center;
    }

    .home-logo {
        width: 100px; /* Increase size of the logo */
        height: auto; /* Maintain aspect ratio */
    }

    .site-name {
        color: white;
        margin-left: 10px;
        font-size: 24px; /* Increase font size */
    }

    .links-container {
        display: flex;
        align-items: center;
    }

    .nav-links {
        display: flex;
    }

    .home-link,
    .gallery-link,
    .posting-link,
    .login-link,
    .delete-link,
    .signup-link {
        margin-right: 20px;
        color: white;
        text-decoration: none;
    }

        .home-link:hover,
        .gallery-link:hover,
        .posting-link:hover,
        .login-link:hover,
        .delete-link:hover,
        .signup-link:hover {
            text-decoration: underline;
        }

    .home-search-bar {
        max-width: 600px;
        margin-right: 20px;
        padding: 10px;
    }

    .profile-icon {
        margin-left: auto; /* Push the profile icon to the far right */
    }

    @media (max-width: 768px) {
        .home-search-bar {
            width: 100%;
        }
    }
</style>
