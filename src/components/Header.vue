<template>
    <v-toolbar app clipped-left fixed flat dark color="primary">
        <v-toolbar-side-icon @click="$emit('toggleNavigation')"></v-toolbar-side-icon>
        <v-layout fill-height justify-end align-center>
            <v-flex md4 lg4 xl4>
                <span>TIMES UP</span>
            </v-flex>
            <v-flex md2 lg2 xl2 align-end>
                <v-btn @click="onShuffle">
                    Démarrer une nouvelle manche
                </v-btn>
            </v-flex>
        </v-layout>
    </v-toolbar>
</template>

<script>

    import internalApi from "@/api/internalApi";

    export default {
        data() {
            return {
                appVersion: process.env.VUE_APP_VERSION,
                appName: "Times-Up !",
                username: ""
            };
        },
        mounted() {
        },
        methods: {
            onShuffle() {
                internalApi.timesup.shuffle()
                    .then(res => {
                        this.$router.push({
                            name: "new-round"
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    };
</script>
