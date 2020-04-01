<template>
    <div>
        <h1>Mots :</h1>
        <v-layout row justify-space-around v-for="(mot, index) in localMots" :key="index">
            <v-flex xs12>
                <v-checkbox v-model="mot.ischeked" :label="mot.nom"/>
            </v-flex>
        </v-layout>
        <v-layout row justify-space-around>
            <v-flex xs3>
                <v-btn @click="validateWords">
                    Valider les mots cochés
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

    import internalApi from "@/api/internalApi";
    import _ from "lodash";

    export default {
        components: {},
        props: {
            motsList: {
                type: Array,
                required: true,
                default: []
            }
        },

        computed: {
            localMots: {
                get: function () {
                    const localValue = _.map(this.motsList, x => ({ "ischeked": false, "nom": x }));
                    console.log(localValue);
                    return localValue;
                }
            },
        },
        methods: {
            validateWords() {
                internalApi.timesup.validermots({"motsList":this.localMots})
                    .then(res => {
                        console.log(res.returnValue);
                        this.$emit("motValidated");
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
        }
    }
</script>
<style>
    .mot-classe {
        font-size: 100px;
        color: darkblue;
    }
</style>