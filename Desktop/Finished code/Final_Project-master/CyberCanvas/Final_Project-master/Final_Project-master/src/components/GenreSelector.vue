<template>
    <div class="grid-container-genre">
        <!-- Welcome and Genre Description -->
        <div class="welcome-banner">
            <p v-if="!currentGenreDescription" class="welcome-message">Where everything starts with a stroke of a brush. Begin exploring here.</p>
            <p v-if="!currentGenreDescription" class="welcome-message">Select a genre to explore our collection.</p>
            <!-- Display the current genre's description if available -->
            <div v-if="currentGenreDescription" class="genre-description">
                <h3>{{ selectedGenre }}</h3>
                <p>{{ currentGenreDescription }}</p>
            </div>
        </div>

        <!-- Genre Images Selector -->
        <div class="gradient-border-wrapper">
            <div class="genre-selector">
                <div v-for="genre in genres" :key="genre.name" class="genre-image" @click="selectGenre(genre.name)">
                    <img :src="genre.imageUrl" :alt="genre.name">
                    <p>{{ genre.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GenreSelector',
        props: {
            genres: Array,
        },
        data() {
            return {
                currentGenreDescription: '', // Initialize the current genre's description
                selectedGenre: '', // Added selectedGenre data property
                genreDescriptions: {
                    'Abstract': 'Experience our Abstract art exhibition through colour, form, and creativity. Discover the boundless expressions of artists who are transcending the norms and luring you to look beyond the tangible.',
                    'Landscape': 'Embark on the optical adventure via our landscape exhibition, where you will discover the harmony of nature combined with artistic interpretation. Immerse yourself in tranquil sunsets, vibrant flowers and rocky mountains that echo the essence of the natural world.',
                    'Portrait': 'Here in our portrait exhibition you will encounter a myriad of narratives anxiously awaiting to be understood through the faces that tell stories. Dive into the intimate representations of individuals, where each brushstroke reveals an insight of their authentic essence.',
                    'Contemporary': 'Welcome to our contemporary exhibition, bold, avant-garde and cutting-edge. You will discover here, where each artist pushes traditional boundaries and invites you to investigate the continually evolving perspectives of modern art.',
                    'Photography': 'Take an adventure captured through the lens of a camera. Delve into our photography exhibition to explore where each photographer constructs compelling visual narrative that embodies the essence of time, place, and emotion.',
                    'StillLife': 'Take a deep breath of new life in our still life exhibition. Witness firsthand how an artist considers the mundane into fascinating works of art.',
                    'Impressionism': 'Through our impressionist exhibition you are invited to embrace a world of small, thin yet vivid brush strokes. Discover the elegance of the ordinary everyday scenes.'
                }, // Moved genreDescriptions here
            };
        },
        emits: ['genre-selected'],
        methods: {
            selectGenre(genreName) {
                this.currentGenreDescription = this.genreDescriptions[genreName];
                this.selectedGenre = genreName; // Update selectedGenre with the current genre
                this.$emit('genre-selected', genreName); // Emit the selected genre name
            }
        },
    };
</script>

<style scoped>

    .genre-image p {
        color: white;
    }

    .grid-container-genre {
        display: grid;
        grid-template-columns: 1fr; /* Full width */
        grid-template-rows: auto 1fr auto; /* Header, content, footer */
        width: 80%;
        gap: 1rem;
        padding: 1rem;
        place-self: center;
    }

    .welcome-banner {
        text-align: center;
        margin: 1rem 0;
    }

    .welcome-message {
        font-size: 20px; /* Larger font size */
    }

    .genre-description {
        text-align: center;
        margin-top: 20px; /* Margin between genre selector and description */
    }

        .genre-description h3 {
            font-size: 24px; /* Larger font size for genre title */
        }

    .genre-selector {
        display: flex;
        justify-content: center;
        padding: 1rem 0;
        background: linear-gradient(45deg, #000108, #000439);
        padding: 5px;
        border-radius: 7px; /* Slightly less than wrapper if using rounded borders */
        align-items: center; /* Center images vertically */
        height: 350px; /* Set a fixed height for the container */
    }

    .gradient-border-wrapper {
        padding: 10px; /* This acts as the border width */
        background: linear-gradient(45deg, #000439, #000970); /* Gradient color */
        border-radius: 10px; /* Optional for rounded corners */
        box-shadow: 0 4px 8px rgba(2, 2, 1, 0.2); /* Drop shadow: horizontal offset, vertical offset, blur radius, color */
    }

    .genre-image {
        margin: 10px;
        cursor: pointer;
        flex-basis: calc(15% - 30px); /* Adjust basis per item, minus margin */
        text-align: center; /* Center text under images */
        position: relative;
    }

        .genre-image img {
            max-width: 100%; /* Make image width responsive */
            height: auto;
            border: 2px solid white; /* Adjust the size (4px) as needed */
            display: block; /* Ensures the border wraps tightly around the image */
        }

    .home-footer {
        background-color: black;
        color: white;
        padding: 1rem;
        text-align: center;
    }

    @media (max-width: 600px) {
        .gallery-grid {
            grid-template-columns: repeat(2, 1fr); /* Two columns on smaller screens */
        }

        .genre-image {
            flex-basis: calc(50% - 20px); /* Adjust for smaller screen */
        }
    }
</style>