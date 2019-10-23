import Vue from 'vue'
import Vuex from 'vuex'
import Books from './modules/books'
import Cart from './modules/cart';
import Account from './modules/account'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Books,
        Cart,
        Account
    }
})
