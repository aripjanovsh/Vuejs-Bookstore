<template>
    <v-dialog v-model="intDialogVisible" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Login</span>
            </v-card-title>
            <v-card-text>
                <div class="text-right">
                    Admin/Admin<br/>
                    User/User
                </div>

                <v-col cols="12">
                    <v-text-field
                            label="Login*"
                            v-model="payload.login"
                            required
                            :error-messages="ERROR_BY_KEY('login')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Password*"
                            v-model="payload.password"
                            type="password"
                            required
                            :error-messages="ERROR_BY_KEY('password')"
                    ></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="intDialogVisible = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="logIn">Log in</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "LoginDialog",
        props: {
            dialogVisible: Boolean,
        },
        data() {
            return {
                payload: {},
            }
        },
        computed: {
            ...mapGetters('Account', [
                'ERRORS',
                'ERROR_BY_KEY'
            ]),
            intDialogVisible: {
                get: function () {
                    return this.dialogVisible
                },
                set: function (value) {
                    if (!value) {
                        this.payload = {};
                        this.CLEAR_ERRORS();
                        this.$emit('close')
                    }
                }
            }
        },

        methods: {
            ...mapActions('Account', [
                'AUTH_USER',
                'CLEAR_ERRORS'
            ]),
            async logIn() {
                await this.AUTH_USER(this.payload);
                const errors = this.ERRORS;
                if (errors == null) {
                    this.$set(this, 'intDialogVisible', false)
                }
            }
        }
    }
</script>

<style scoped>

</style>