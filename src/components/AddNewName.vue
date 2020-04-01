<template>
    <div>
        <h1>Ajouter un mot à la liste</h1>

        <v-layout row wrap align-center>
            <v-flex xs12>
                <v-text-field v-model="nouveauMot"
                              label="Nouveau mot"/>
                <v-btn @click="onAddName">
                    Ajouter à la liste
                </v-btn>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>

    import internalApi from "@/api/internalApi";

    export default {
        components: {},

        data() {
            return {
                nouveauMot: undefined
            }
        },
        methods: {
            onAddName() {
                internalApi.timesup.add_name({"newName":this.nouveauMot})
                    .then(res => {
                        this.nouveauMot = undefined;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    }
</script>
