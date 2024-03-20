<template>
    <footer class="footer-black show">
        <div class="footer-content">
            <Logo />
            <p>This is a Footer</p>
            <router-link to="/policies" class="policies-link">Policies</router-link>
            <router-link to="/contact" class="contact-link">Contact Us</router-link>
        </div>
    </footer>
</template>

<script>
    import Logo from './Logo.vue'; // Adjust the import path to where Logo.vue is located relative to this file

    export default {
        components: {
            Logo
        }
    }
</script>
<style scoped>
    .footer-black {
        background-color: black;
        width: 100%; /* to Ensure the footer extends full width */
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s ease-in-out;
    }

    .footer-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo {
        margin-right: 15px;
    }

    .policies-link {
        margin-left: 15px;
        color: white; /* Ensuring it's visible against the black background */
        text-decoration: none;
    }

    .contact-link {
        margin-left: 15px;
        color: white; /* Ensuring it's visible against the black background */
        text-decoration: none;
    }
</style>
