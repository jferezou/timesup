<template>
    <v-navigation-drawer v-model="drawer" app clipped dark class="grey darken-3">
        <v-layout column justify-space-between align-space-between fill-height>
            <v-list>
                <v-list-tile active-class="primary--text" exact v-for="page in getMenuList()" :key="page.id"
                             :to="page.route">
                    <v-list-tile-action>
                        <v-icon v-html="page.icon"/>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="page.title"/>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <div class="app-version">
                <span class="caption pr-1"> v{{ appVersion }}</span>
            </div>
        </v-layout>
    </v-navigation-drawer>
</template>

<script>

    export default {
        props: ['universe'],
        methods: {
            toggleNavigation: function () {
                this.drawer = !this.drawer;
            },
            getMenuList: function () {
                return this.menu['commun']
            }
        },
        data() {
            return {
                appVersion: process.env.VUE_APP_VERSION,
                drawer: true,
                mini: true,
                menu: {
                    commun: [
                        {
                            id: 0,
                            title: " 1 - Ajouter un nom",
                            icon: "$vuetify.icons.concept.societe",
                            route: {
                                name: "addNewName"
                            }
                        },
                        {
                            id: 1,
                            title: " 2 - Faire deviner",
                            icon: "$vuetify.icons.concept.societe",
                            route: {
                                name: "new-round"
                            }
                        }
                    ]
                }
            };
        }
    };
</script>

<style>
    .app1 {
        background-color: #656565;
    }

    .app2 {
        background-color: #888888;
    }

    .app-version {
        color: white;
        text-align: right;
    }
</style>
