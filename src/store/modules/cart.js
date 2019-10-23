import Vue from 'vue';

const updateCartItems = (cartItems, item, idx) => {

    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ];
    }

    if (idx === -1) {
        return [
            ...cartItems,
            item
        ];
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ];
};

const updateCartItem = (book, item = {}, quantity) => {

    const {
        id = book.id,
        count = 0,
        title = book.title,
        total = 0
    } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    };
};


const updateOrder = (state, book, quantity) => {
    const {items} = state;
    const {id: bookId} = book;

    const itemIndex = items.findIndex(({id}) => id === bookId);
    const item = items[itemIndex];

    const newItem = updateCartItem(book, item, quantity);
    return updateCartItems(items, newItem, itemIndex);
};


export default {
    namespaced: true,
    state: {
        items: [],
        orderTotal: 0
    },
    getters: {
        ITEM_BY_ID: (state) => (id) => state.items.find(item => item.id === id),
        ITEMS: (state) => state.items,
        ITEMS_COUNT: (state, getters) => getters.ITEMS.length,
        ITEMS_TOTAL_COUNT: (state, getters) => getters.ITEMS.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0),
        ORDER_TOTAL: (state) => state.orderTotal,
        ITEMS_COUNT_BY_ID: (state, getters) => (id) => {
            const item = getters.ITEM_BY_ID(id);
            return item ? item.count : 0;
        },
        IS_IN_STOCK: (state, getters, rootState, rootGetters) => (id) => {
            const itemTotalCount = getters.ITEMS_COUNT_BY_ID(id);
            return rootGetters['Books/IN_STOCK'](id, itemTotalCount);
        }
    },
    mutations: {
        UPDATE_CART_ITEM: (state, {book, quantity}) => {
            const items = updateOrder(state, book, quantity);
            const orderTotal = items.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.total;
            }, 0 );

            state.items = items;
            state.orderTotal = orderTotal;
        },
    },
    actions: {
        BOOK_ADDED_TO_CART: async ( {commit, rootGetters, getters}, bookId) => {
            const book = rootGetters['Books/BOOK_BY_ID'](bookId);
            const isInStock = getters.IS_IN_STOCK(bookId);
            if(isInStock) {
                commit('UPDATE_CART_ITEM', {book, quantity: 1});
                Vue.toasted.show('Book successfully added to cart', {
                    type: 'success',
                    position: "bottom-center",
                    duration : 3000
                });
            }
        },
        BOOK_REMOVED_FROM_CART: async ({commit, rootGetters}, bookId) => {
            const book = rootGetters['Books/BOOK_BY_ID'](bookId);
            commit('UPDATE_CART_ITEM', {book, quantity: -1});
            Vue.toasted.show('Book successfully removed from cart', {
                type: 'success',
                position: "bottom-center",
                duration : 3000
            });
        },
        ALL_BOOKS_REMOVED_FROM_CART: async ({state, commit, rootGetters}, bookId) => {
            const book = rootGetters['Books/BOOK_BY_ID'](bookId);
            const item = state.items.find(({id}) => id === bookId);
            commit('UPDATE_CART_ITEM', {book, quantity: -item.count});
        },
    }
};
