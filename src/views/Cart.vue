<template>
    <div>
        <v-simple-table height="300px" v-if="ITEMS.length">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left" width="50%">Title</th>
                    <th class="text-center">Count</th>
                    <th class="text-right">Total Price</th>
                    <th class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in ITEMS" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td class="text-center">{{ item.count }}</td>
                    <td class="text-right">${{ item.total }}</td>
                    <td class="text-center">
                        <v-btn-toggle>
                            <v-btn outlined fab small color="primary" @click="BOOK_REMOVED_FROM_CART(item.id)">
                                <v-icon>mdi-numeric-negative-1</v-icon>
                            </v-btn>
                            <v-btn outlined  fab small color="primary"  @click="BOOK_ADDED_TO_CART(item.id)" :disabled="!IS_IN_STOCK(item.id)">
                                <v-icon>mdi-plus-one</v-icon>
                            </v-btn>
                            <v-btn outlined color="error" fab small @click="ALL_BOOKS_REMOVED_FROM_CART(item.id)">
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="text-right">Total: ${{ORDER_TOTAL}}</td>
                    <td></td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
        <p v-else>Cart is empty</p>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Cart",

        computed: {
            ...mapGetters('Cart', [
                'ITEMS',
                'ORDER_TOTAL',
                'IS_IN_STOCK'
            ]),
        },
        methods: {
            ...mapActions('Cart', [
                'BOOK_ADDED_TO_CART',
                'BOOK_REMOVED_FROM_CART',
                'ALL_BOOKS_REMOVED_FROM_CART'
            ]),
        }
    }
</script>

<style scoped>

</style>