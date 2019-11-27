<template>
    <v-tooltip key="label" :bottom="tooltipBottom" :top="tooltipTop" :left="tooltipLeft" :right="tooltipRight" :disabled="isTooltipDisabled">
        <v-btn :bottom="btnBottom" :top="btnTop" :left="btnLeft" :right="btnRight" :round="btnRound" :icon="btnIsIcon"
               :flat="btnFlat" :fab="btnFab" :dark="btnDark" :small="btnSmall" :color="btnColorClass" :to="routeCible"
               slot="activator" @click="onClick" class="grey--text">
            <v-icon :small="iconSmall" :color="iconColorClass">{{ icon }}</v-icon>
            <span v-if="showTextButton()" style="margin-left: 5px">{{detailButtonText}}</span>
        </v-btn>
        <span>{{ detail }}</span>
    </v-tooltip>
</template>

<script>
    /**
     * Component documented usig Propdoc syntax:
     * https://alligator.io/vuejs/propdoc-document-components/
     */
    export default {
        name: "VIconButtonWithToolTip",
        introduction: "Boutton avec tooltip.",
        description: "Composant affichant l'icone icon dans un bouton rond. Un tooltip avec le detail s'affiche en dessous quand la souris passe dessus",
        props: {
            detail: String,
            icon: String,
            btnColorClass: {
                type: String,
                required: false,
                default: "primary"
            },
            iconColorClass: {
                type: String,
                required: false,
                default: ""
            },
            routeCible: {
                type: Object,
                required: false,
                default: undefined
            },
            btnFab: {
                type: Boolean,
                required: false,
                default: false
            },
            btnFlat: {
                type: Boolean,
                required: false,
                default: false
            },
            btnIsIcon: {
                type: Boolean,
                required: false,
                default: false
            },
            btnDark: {
                type: Boolean,
                required: false,
                default: false
            },
            btnSmall: {
                type: Boolean,
                required: false,
                default: false
            },
            btnRound: {
                type: Boolean,
                required: false,
                default: false
            },
            iconSmall: {
                type: Boolean,
                required: false,
                default: false
            },
            tooltipBottom: {
                type: Boolean,
                required: false,
                default: false
            },
            tooltipTop: {
                type: Boolean,
                required: false,
                default: false
            },
            tooltipLeft: {
                type: Boolean,
                required: false,
                default: false
            },
            tooltipRight: {
                type: Boolean,
                required: false,
                default: false
            },
            btnBottom: {
                type: Boolean,
                required: false,
                default: false
            },
            btnTop: {
                type: Boolean,
                required: false,
                default: false
            },
            btnLeft: {
                type: Boolean,
                required: false,
                default: false
            },
            btnRight: {
                type: Boolean,
                required: false,
                default: false
            },
            detailButtonText:{
                type:String,
                required: false,
                default: null
            },
            isTooltipDisabled:{
                type: Boolean,
                required: false,
                default: false
            }
        },
        methods: {
            onClick() {
                this.$emit("buttonClick");
            },
            showTextButton() {
                return !_.isNil(this.detailButtonText);
            }
        }
    };
</script>
