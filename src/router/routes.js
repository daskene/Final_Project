
import Home from '../pages/Home.vue';
import SignUp from '../pages/SignUp.vue';
import Login from '../pages/Login.vue';
import Posting from '../pages/PostingPage.vue';
import GalleryPage from '../pages/GalleryPage.vue';

export default [
    { path: '/', component: Home },
    { path: '/signup', component: SignUp },
    { path: '/login', component: Login },
    { path: '/posting', component: Posting },
    { path: '/gallery', component: GalleryPage },
];
