<template>
    <div class="contact-us-container">
        <h2>Contact Us</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input id="name" v-model="contact.name" type="text" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input id="email" v-model="contact.email" type="email" required />
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" v-model="contact.message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                contact: {
                    name: '',
                    email: '',
                    message: ''
                }
            };
        },
        methods: {
            async submitForm() {
                //send the contact information to a server
                console.log('Contact form submitted:', this.contact);
                alert('Thank you for your message! We will be in touch.');
                this.resetForm();
            },
            resetForm() {
                this.contact.name = '';
                this.contact.email = '';
                this.contact.message = '';
            }
        }
    };
</script>

<style>
    .contact-us-container {
        width: 100%;
        max-width: 600px; /* Set a max-width for larger screens */
        margin: auto;
        margin-bottom: 50px;
        padding: 20px;
        background: #000;
        color: #fff;
        border-radius: 8px;
    }

    .form-group {
        margin-bottom: 20px;
    }

        .form-group label {
            display: block;
            margin-bottom: 5px;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #333; /* Slightly lighter border for visibility */
            background: #222; /* Darker background for the inputs */
            color: #fff; /* White text for the inputs */
            border-radius: 4px;
        }

        .form-group textarea {
            height: 150px; /* Adjust height of textarea */
        }

    button {
        background-color: #007bff;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .contact-us-container {
            max-width: 95%;
            padding: 15px;
        }
    }

    button:hover {
        background-color: #0056b3;
    }

</style>