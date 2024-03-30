import Home from '../pages/Home.vue';
import SignUp from '../pages/SignUp.vue';
import Login from '../pages/Login.vue';
import Posting from '../pages/PostingPage.vue';
import GalleryPage from '../pages/GalleryPage.vue';
import DeletePage from '../pages/DeletingPage.vue';
import Contact from '../pages/Contact.vue';
import Policies from '../pages/Policies.vue';
import AccountPage from "@/pages/AccountPage.vue";
import SearchResultPage from '../pages/SearchResultPage.vue';
import AdminPage from "@/pages/AdminPage.vue"; // Import the SearchResultPage component

export default [
    { path: '/', component: Home },
    { path: '/signup', component: SignUp },
    { path: '/login', component: Login },
    { path: '/posting', component: Posting },
    { path: '/gallery', component: GalleryPage },
    { path: '/delete', component: DeletePage },
    { path: '/account', component: AccountPage },
    { path: '/contact', component: Contact },
    { path: '/policies', component: Policies },
    { path: '/admin', component: AdminPage },
    // Adjusted search route definition to include name and props
    {
        path: '/search',
        name: 'SearchResult', // Add the name for referencing
        component: SearchResultPage,
        props: route => ({ query: route.query.q }) // Pass the query as props to SearchResultPage
    },
];
