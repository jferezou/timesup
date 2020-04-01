<template>
    <div @keyup.enter="nextWord">
        <validate-words v-if="valider" :mots-list="this.motsList" v-on:motValidated="roundEnded"/>
        <div v-else>
            <h1>Mot à faire deviner :</h1>
            <circular-count-down-timer :initial-value="remainingSeconds"
                                       :key="rerender"
                                       :steps="30"
                                       :paused="paused"
                                       :size="200"
                                       :stroke-width="5"
                                       :seconds-stroke-color="'#f00'"
                                       :underneath-stroke-color="'lightgrey'"
                                       :seconds-fill-color="'#00ffff66'"
                                       :second-label="'secondes'"
                                       @finish="validateWords"/>
            <v-layout row justify-space-around>
                <span class="mot-classe" style="text-transform: uppercase;">{{motAFaireDeviner}}</span>
            </v-layout>
            <v-layout row wrap align-center v-if="!roundStarted">
                <v-flex xs6>
                    <v-btn @click="onStartNewRound">
                        Faire deviner !
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout v-else row justify-space-around>
                <v-flex xs3>
                    <v-btn @click="nextWord">
                        Mot suivant
                    </v-btn>
                </v-flex>
            </v-layout>
        </div>

    </div>
</template>

<script>

    import internalApi from "@/api/internalApi";
    import ValidateWords from "./ValidateWords";

    export default {
        components: {ValidateWords},

        data() {
            return {
                motAFaireDeviner: undefined,
                roundStarted: false,
                paused: true,
                remainingSeconds: 30,
                rerender: 1,
                motsList: [],
                valider: false,
            }
        },
        methods: {
            onStartNewRound() {
                internalApi.timesup.startround()
                    .then(res => {
                        this.roundStarted = true;
                        this.motAFaireDeviner = res.returnValue;
                        this.motsList.push(this.motAFaireDeviner);
                        this.paused = false;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            nextWord() {
                internalApi.timesup.founded({"newName": this.motAFaireDeviner})
                    .then(res => {
                        if (res.returnValue === "termine") {
                            this.validateWords();
                        } else {
                            this.motAFaireDeviner = res.returnValue;
                            this.motsList.push(this.motAFaireDeviner);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            validateWords() {
                this.valider = true;
            },
            roundEnded() {
                this.motAFaireDeviner = undefined;
                this.roundStarted = false;
                this.paused = true;
                this.valider = false;
                this.rerender += 1;
                this.motsList = [];
            }
        }
    }
</script>
<style>
    .mot-classe {
        font-size: 100px;
        color: darkblue;
    }
</style>