import BookStoreServices from '../../services/BookStoreServices';
import {objectGet} from "../../utils/object";
import Vue from "vue";

const bookStoreService = new BookStoreServices();
export default {
    namespaced: true,
    state: {
        items: [],
        isLoading: true,
        error: null
    },
    getters: {
        BOOKS: state => state.items,
        BOOK_BY_ID: (state) => (id) => state.items.find(item => item.id === id),
        IN_STOCK: (state, getters) => (id, buyCount) => {
            const book = getters.BOOK_BY_ID(id);
            return book.inStock > buyCount;
        },
        ERRORS: (state) => state.error,
        ERROR_BY_KEY: (state) => (field, defaultValue = '') => objectGet(state, `error.${field}`, defaultValue),
    },
    mutations: {
        GET_BOOKS_REQUESTED: (state) => {
            state.items = [];
            state.isLoading = true;
            state.error = null;
        },
        GET_BOOKS_LOADED: (state, payload) => {
            state.items = payload;
            state.isLoading = false;
            state.error = null;
        },
        GET_BOOKS_ERROR: (state, payload) => {
            state.items = [];
            state.isLoading = false;
            state.error = payload;
        },
        STORE_BOOKS_REQUESTED: (state) => {
            state.isLoading = true;
            state.error = null;

        },
        STORE_BOOKS_SAVED: (state, payload) => {
            state.items.push(payload);
            state.isLoading = false;
            state.error = null;
        },
        STORE_BOOKS_ERROR: (state, payload) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
    actions: {
        GET_BOOKS: async ({commit}) => {
            commit('GET_BOOKS_REQUESTED');
            await bookStoreService.getBooks()
                .then((books) => {
                    commit('GET_BOOKS_LOADED', books);
                })
                .catch((error) => {
                    commit('GET_BOOKS_ERROR', error.message);
                    Vue.toasted.show(error.message, {
                        type: 'error',
                        position: "bottom-center",
                        duration : 3000
                    });
                });

        },

        STORE_BOOKS: async ({commit}, payload) => {
            commit('STORE_BOOKS_REQUESTED');

            await bookStoreService.storeBook(payload)
                .then((books) => {
                    commit('STORE_BOOKS_SAVED', books)
                })
                .catch((error) => {
                    commit('STORE_BOOKS_ERROR', error);
                });
        },
    }
};