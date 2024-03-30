<template>
    <footer class="footer-black show">
        <div class="footer-content">
            <Logo />
            <router-link to="/policies" class="policies-link">Policies</router-link>
            <router-link to="/contact" class="contact-link">Contact Us</router-link>
            <div class="creator-credits">
                <div> Created By:</div>
                <div>Kellie Nash</div>
                <div>Daniel Skene</div>
                <div>Diarmuid O'Donnell'</div>
                <div>Grainne Lynch</div>
            </div>
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
        width: 100%;
        height: 150px; /* Increased height */
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s ease-in-out;
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        padding: 0 20px;
    }

    .creator-credits {
        color: white;
        font-size: 0.75rem;
    }

    .policies-link, .contact-link {
        color: white;
        text-decoration: none;
        margin: 0 15px;
    }
</style>