<template>

    <section class="our-commitment">

        <h2 class="section-title" style="color: white;" >Our Commitment</h2>

        <ul>

            <p style="color: white;">

                At CyberCanvas, our commitment is to bridge the gap between artists and art lovers in this modern digital age. We provide a platform for artists to freely express themselves and showcase their work to a global audience.

            </p>

            <br>

            <li style="color: white;">

                Unlike traditional art galleries, CyberCanvas offers an anonymous space, focusing solely on the art itself.

            </li>

            <li style="color: white;">

                We are dedicated to fostering a community where art enthusiasts can immerse themselves in a virtual gallery experience. Discover captivating artworks across various genres and styles, free from personal distractions.

            </li>

            <li style="color: white;">

                Join us in celebrating the boundless possibilities of art at Cybercanvas. Let's work in unity to paint a brighter and more colorful world.

            </li>

        </ul>

    </section>

</template>

<script setup>

</script>

<style scoped>

    .our-commitment {
        /*background-color: #ffffff;*/
        background-color: #060000;
        padding: 20px;
        border-radius: 20px;
        margin-bottom: 40px;
        max-width: 900px;
        width: 90%;
        margin: 0 auto;
        border: 2px solid #ddd;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .section-title {
        font-size: 30px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        font-size: 16px;
        line-height: 1.6;
        position: relative;
        padding-left: 20px;
        margin-bottom: 15px;
    }

        li:before {
            content: "\2022"; /* Bullet point character */

            color: #10100f; /* Orange color */

            font-size: 18px;
            position: absolute;
            left: 0;
            top: 4px;
        }

    @media (max-width: 768px) {

        .our-commitment {
            padding: 15px;
            border-radius: 15px;
        }

        .section-title {
            font-size: 26px;
            margin-bottom: 15px;
        }

        li {
            font-size: 14px;
            margin-bottom: 10px;
        }

            li:before {
                font-size: 16px;
                top: 3px;
            }
    }
</style>