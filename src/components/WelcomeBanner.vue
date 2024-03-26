<template>
    <div class="welcome-banner">
        <h1>Welcome to CyberCanvas</h1>
        <p>Discover a world where art meets digital. Explore, create, and share.</p>
        <router-link to="/gallery" class="explore-button">Explore Artwork</router-link>
    </div>
</template>

<style scoped>
    .welcome-banner {
        background-color: black; /* Solid black background */
        text-align: center;
        padding: 50px 20px;
        color: white; /* White text for contrast */
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
        margin: 0 0 20px;
        font-size: 2.5em; /* Large, eye-catching title */
        font-weight: bold;
    }

    p {
        margin: 0 0 30px;
        font-size: 1.2em; /* Clear and readable text size */
    }

    .explore-button {
        background-color: #4CAF50; /* A green button to stand out */
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        font-size: 1em;
        font-weight: bold;
        cursor: pointer;
    }

        .explore-button:hover {
            background-color: #43a047; /* Slightly darker on hover */
        }
</style>
