<template>
    <div class="products">
        <Spinner v-if="books.isLoading" />
        <div v-if="!books.isLoading" class="text-right">
            <div class="btn-group">
                <v-btn-toggle>
                    <v-btn @click="changeViewList('grid')">
                        <v-icon>mdi-grid</v-icon>
                    </v-btn>

                    <v-btn @click="changeViewList('list')">
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </div>
        </div>
        <v-row v-if="listType === 'grid'">
            <template v-for="item in books.items" >
                <ProductGridItem :item="item" :type="listType" :key="'grid' + item.id"/>
            </template>
        </v-row>
        <v-simple-table v-if="listType === 'list'" class="mt-2">
            <thead>
                <tr>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Author</td>
                    <td></td>
                </tr>
            </thead>
            <template v-for="item in books.items" >
                <ProductTableItem
                        :item="item"
                        :key="'list' + item.id"/>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
    import Spinner from "./Spinner";
    import ProductGridItem from "./ProductGridItem";
    import ProductTableItem from "./ProductTableItem";
    import {mapActions} from "vuex";

    export default {
        name: "Products",
        data() {
            return {
                listType: 'grid'
            }
        },
        components: {
            Spinner,
            ProductGridItem,
            ProductTableItem
        },
        computed: {
            books(){
                return this.$store.state.Books;
            }
        },
        methods: {
            ...mapActions({
                getBooks: 'Books/GET_BOOKS',
            }),
            changeViewList(type) {
                this.$set(this, 'listType', type);
            }
        },

        mounted() {
            this.getBooks();
        }
    }
</script>

<style scoped>
    .products{
        margin: 50px;
    }
</style>