import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from "../views/Cart";
import AddBook from "../views/admin/AddBook";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/add-book',
        name: 'add-book',
        component: AddBook,
        meta: {requiresIsAdmin: true}
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresIsAdmin) && store.getters['Account/IS_ADMIN'] === false) {
        Vue.toasted.show('Access denied', {
            type: 'error',
            position: "bottom-center",
            duration : 3000
        });
        next("/")
    } else {
        next()
    }
});

export default router
