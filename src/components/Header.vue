<template>
    <v-toolbar app clipped-left fixed flat dark color="primary">
        <v-toolbar-side-icon @click="$emit('toggleNavigation')"></v-toolbar-side-icon>

        <v-layout fill-height justify-end align-end>
            <v-toolbar-items class="xs6 hidden-xs-only">
                <v-btn flat @click="onLogout">
                    <v-icon left size="22">{{$vuetify.icons.action.sign_out}}</v-icon>
                    Se déconnecter
                </v-btn>
            </v-toolbar-items>
        </v-layout>
    </v-toolbar>
</template>

<script>

    import authService from '@/services/authService.js';

    export default {
        data() {
            return {
                appVersion: process.env.VUE_APP_VERSION,
                appName: "Photos",
                username: ""
            };
        },
        mounted() {
            this.getAuthenticatedUser();
        },
        methods: {
            onLogout: function () {
                authService.logout();
            },
            getAuthenticatedUser: function () {
                authService.getUsername().then(
                    user => {
                        this.username = user
                    }
                );
            },
        }
    };
</script>
