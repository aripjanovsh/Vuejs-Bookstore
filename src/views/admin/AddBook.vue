<template>
    <div class="add-book">
        <v-card>
            <v-card-title>
                <span class="headline">Add book</span>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field
                            label="Title*"
                            v-model="payload.title"
                            required
                            :error-messages="ERROR_BY_KEY('title')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Author*"
                            v-model="payload.author"
                            required
                            :error-messages="ERROR_BY_KEY('author')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Price*"
                            v-model="payload.price"
                            type="number"
                            required
                            :error-messages="ERROR_BY_KEY('price')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="In Stock count*"
                            v-model="payload.inStock"
                            type="number"
                            required
                            :error-messages="ERROR_BY_KEY('inStock')"
                    ></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="STORE_BOOKS(payload)">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "AddBook",
        data() {
            return {
                payload: {},
                errors: {}
            }
        },

        computed: {
            ...mapGetters('Books', [
                'ERROR_BY_KEY'
            ]),
        },

        methods: {
            ...mapActions('Books', [
                'STORE_BOOKS'
            ])
        }
    }
</script>

<style scoped>

</style>