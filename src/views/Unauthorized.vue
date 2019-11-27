<template>
    <v-container fluid text-xs-center>
        <v-layout row wrap align-center justify-center>
            <v-flex xs4>
                <v-icon size="100px">{{$vuetify.icons.concept.forbidden}}</v-icon>
            </v-flex>
        </v-layout>
        <v-layout row align-center justify-center>
            <v-flex xs4>
                <span>Vous n'êtes pas autorisé à accéder à cet écran.</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {};
</script>
