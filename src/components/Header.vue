<template>
    <div class="toolbar">
        <v-toolbar dark color="primary">
            <router-link to="/">
                <img src="@/assets/logo.svg" height="40"/>
            </router-link>
            <v-toolbar-title color="light">
                BookStore
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text tile :to="{name: 'add-book'}">
                    <v-icon left>mdi-pencil</v-icon> Add Book
                </v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-btn icon :to="{name: 'cart'}">
                <v-badge top color="green">
                    <span slot="badge">{{ITEMS_TOTAL_COUNT}}</span>
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
            </v-btn>

            <v-toolbar-items>
                <v-btn text v-if="IS_GUEST" @click="toggleLoginDialogVisibility">Login</v-btn>
                <v-btn text v-if="!IS_GUEST" @click="LOGOUT_USER">Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <LoginDialog :dialogVisible="loginDialog" @close="toggleLoginDialogVisibility"/>
    </div>
</template>

<script>
import LoginDialog from "./LoginDialog";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Header",
    components: {
        LoginDialog
    },
    computed: {
        ...mapGetters('Account', [
            'IS_GUEST',
            'IS_ADMIN'
        ]),
        ...mapGetters('Cart', [
            'ITEMS_TOTAL_COUNT',
        ])
    },
    data() {
        return {
            loginDialog: false
        }
    },
    methods: {
        ...mapActions('Account', [
            'LOGOUT_USER'
        ]),
        addBook() {
            console.log('addBook');
        },
        toggleLoginDialogVisibility() {
            this.loginDialog = !this.loginDialog;
        }
    }
}
</script>

<style scoped>

</style>