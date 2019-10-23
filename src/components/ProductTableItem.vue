<template>
    <tr>
        <td>
            {{item.title}}
        </td>
        <td>
            {{item.price}}
        </td>
        <td>
            {{item.author}}
        </td>
        <td>
            <v-btn
                color="orange"
                text
                @click="BOOK_ADDED_TO_CART(item.id)"
                v-if="IS_IN_STOCK(item.id)"
            >
                Add to cart
            </v-btn>

            <v-btn
                color="orange"
                text
                disabled
                v-if="!IS_IN_STOCK(item.id)"
            >
                Out of stock
            </v-btn>
        </td>
    </tr>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "ProductTableItem",
        props: ['item'],
        computed: {
            ...mapGetters('Cart', [
                'ITEMS_COUNT_BY_ID',
                'IS_IN_STOCK'
            ]),
        },
        methods: {
            ...mapActions('Cart', [
                'BOOK_ADDED_TO_CART'
            ])
        }
    }
</script>

<style scoped>

</style>