<template>
    <v-app>
        <Header @toggleNavigation="toggleNavigation()"/>
        <div>
            <Menu ref="menuComponent"/>
            <v-content>
                <v-container fluid>
                    <router-view/>
                </v-container>
            </v-content>
        </div>
    </v-app>
</template>

<script>

    import Header from "@/components/Header.vue";
    import Menu from "@/components/Menu.vue";

    export default {
        name: 'App',

        components: {
            Header,
            Menu
        },
        methods: {
            toggleNavigation: function () {
                this.$refs.menuComponent.toggleNavigation();
            }
        },
    }
</script>
