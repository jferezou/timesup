<template>
    <v-layout style="margin-top: 10%;" justify-space-around>
        <v-flex xs4>
            <v-card class="elevation-12">
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="person"
                                      label="Identifiant"
                                      v-model="username"
                                      @keyup.enter="connexion"
                        ></v-text-field>
                        <v-text-field prepend-icon="lock"
                                      label="Mot de passe"
                                      v-model="password"
                                      :type="'password'"
                                      @keyup.enter="connexion"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="text-xs-center">
                        <v-btn color="primary" @click="connexion">Connexion</v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import authService from '@/services/authService.js';

    export default {
        data() {
            return {
                password: '',
                username: ''
            }
        },
        methods: {
            connexion:
                function () {
                    authService.login(this.username, this.password)
                }
        }
    };
</script>
