<template>
    <div class="grid-container">
        <!-- Welcome and Genre Description -->
        <div class="welcome-banner">
            <h1>Welcome to Cyber Canvas</h1>
            <p>Where everything starts with a stroke of a brush. Begin exploring here.</p>
            <p>{{ genreDescriptions[selectedGenre] || 'Select a genre to explore our collection.' }}</p>
        </div>

        <!-- Genre Images Selector -->
        <div class="genre-selector">
            <div v-for="genre in genres" :key="genre.name" class="genre-image" @click="selectGenre(genre.name)">
                <img :src="genre.imageUrl" :alt="genre.name">
                <p>{{ genre.name }}</p>
            </div>
        </div>

        <!-- Dynamic Gallery Based on Selected Genre -->
        <div class="gallery-grid">
            <article v-for="art in filteredArtworks" :key="art.id" class="image-container">
                <img :src="art.url" :alt="art.title">
                <figcaption>{{ art.title }}</figcaption>
            </article>
        </div>

        <!-- Footer Section -->
        <div class="home-footer">
            <MyFooter />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GalleryPage',
        data() {
            return {
                selectedGenre: 'all',
                genres: [
                    { name: 'Abstract', imageUrl: '/images/Abstract.png' },
                    { name: 'Landscape', imageUrl: '/images/landscape.jpg' },
                    { name: 'Portrait', imageUrl: '/images/portrait.jpg' },
                    { name: 'Contemporary', imageUrl: '/images/contemporary.jpg' },
                    { name: 'Photography', imageUrl: '/images/photography.jpg' },
                    { name: 'Still Life', imageUrl: '/images/StillLife.jpg' },
                    { name: 'Impressionism', imageUrl: '/images/impressionism.jpg' }
                ],
                genreDescriptions: {
                    'Abstract': 'Experience our Abstract art exhibition through colour, form and creativity. Discover the boundless expressions of artists who are transcending the norms and luring you to look beyond the tangible.',
                    'Landscape': 'Embark on the optical adventure via our landscape exhibition, where you will discover the harmony of nature combined with artistic interpretation. Immerse yourself in tranquil sunsets, vibrant flowers and rocky mountains that echo the essence of the natural world.',
                    'Portrait': 'Here in our portrait exhibition you’ll encounter a myriad of narratives anxiously awaiting to be understood through the faces that tell stories. Dive into the intimate representations of individuals, where each brushstroke reveals an insight of their authentic essence.',
                    'Contemporary': 'Welcome to our contemporary exhibition, bold, avant-garde and cutting-edge. You will discover here, where each artists push traditional boundaries and invites you to investigate the continually evolving perspectives of modern art.',
                    'Photography': 'Take an adventure captured through the lens of a camera. Delve into our photography exhibition to explore where each photographer constructs compelling visual narrative that embodies the essence of time, place and emotion.',
                    'Still Life': 'Take a deep breath of new life in our still life exhibition. Witness firsthand how an artist considers the mundane into fascinating works of art.',
                    'Impressionism': 'Through our impressionist exhibition you are invited to embrace a world of small, thin and yet vivid brush strokes. Discover the elegance of the ordinary everyday scenes.'
                },
                artworks: [
                    // Populate this array with your artworks and their genres
                ],
                filteredArtworks: []
            };
        },
        methods: {
            selectGenre(genreName) {
                this.selectedGenre = genreName;
                this.filterArtworks();
            },
            filterArtworks() {
                this.filteredArtworks = this.selectedGenre === 'all' ?
                    this.artworks : this.artworks.filter(art => art.genre === this.selectedGenre);
            }
        },
        mounted() {
            this.filterArtworks();
        }
    };
</script>

<style scoped>
    .grid-container {
        display: grid;
        grid-template-columns: 1fr; /* Full width */
        grid-template-rows: auto 1fr auto; /* Header, content, footer */
        gap: 1rem;
        min-height: 100vh; /* Minimum height to fill the screen */
        padding: 1rem;
    }

    .welcome-banner {
        text-align: center;
        margin: 1rem 0;
    }

    .genre-selector {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 1rem 0;
    }

    .genre-image {
        margin: 10px;
        cursor: pointer;
        flex-basis: calc(20% - 20px); /* Adjust basis per item, minus margin */
        text-align: center; /* Center text under images */
    }

        .genre-image img {
            max-width: 100%; /* Make image width responsive */
            height: auto;
        }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
        padding: 1rem;
        width: calc(100% - 2rem); /* Account for padding */
    }

    .image-container img {
        width: 100%; /* Use the full width of the column */
        height: auto; /* Maintain aspect ratio */
        object-fit: cover; /* Cover the area of the container without stretching */
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
