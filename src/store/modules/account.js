import BookStoreServices from '../../services/BookStoreServices';
import {objectGet} from "../../utils/object";

const bookStoreService = new BookStoreServices();


export default {
    namespaced: true,
    state: {
        user: null,
        isLoading: false,
        errors: null
    },
    getters: {
        ERRORS: state => state.errors,
        USER: state => state.user,
        IS_GUEST: state => state.user === null,
        IS_ADMIN: state => objectGet(state, 'user.isAdmin', false),
        ERROR_BY_KEY: (state) => (field, defaultValue = '') => objectGet(state, `errors.${field}`, defaultValue),
    },
    mutations: {
        CLEAR_ERRORS: (state) => {
            state.errors = null;
        },
        AUTH_USER_REQUESTED: (state) => {
            state.user = null;
            state.isLoading = true;
            state.errors = null;
        },
        AUTH_USER_LOADED: (state, payload) => {
            state.user = payload;
            state.isLoading = false;
            state.errors = null;
        },
        AUTH_USER_ERROR: (state, payload) => {
            state.user = null;
            state.isLoading = false;
            state.errors = payload;
        },
        AUTH_USER_LOGOUT: (state) => {
            state.user = null;
            state.isLoading = false;
            state.errors = null;
        }
    },
    actions: {
        AUTH_USER: async ({commit}, payload) => {
            commit('AUTH_USER_REQUESTED');

            await bookStoreService.login(payload)
                .then((data) => {
                    commit('AUTH_USER_LOADED', data.data);
                })
                .catch((error) => {
                    commit('AUTH_USER_ERROR', error.data);
                });
        },
        LOGOUT_USER: async ({commit}) => {
            commit('AUTH_USER_REQUESTED');

            await bookStoreService.logout()
                .then(() => {
                    commit('AUTH_USER_LOGOUT');
                })
                .catch((error) => {
                    commit('AUTH_USER_ERROR', error.data);
                });
        },
        CLEAR_ERRORS: async (context) => {
            context.commit('CLEAR_ERRORS');
        }

    }
};