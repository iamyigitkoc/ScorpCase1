<template>
  <div class="language-selections noselect" v-bind:class="{active: active}">
      <div class="language-code" v-for="lang in availableLanguages" v-bind:key="lang.code" v-on:click="changeLanguage(lang.code)" v-bind:class="{activelang: activeLanguage === lang.code} ">{{ lang.code }}</div>
  </div>
</template>

<script>
import { availableLanguages } from '../../lang/Languages';
import { ebus } from '../../main';
export default {
    data(){
        return {
            availableLanguages: availableLanguages,
            active: false
        }
    },
    props: {
        parentid: {
            type: Number,
            default: 0
        }
    },
    mounted(){
        ebus.$on('toggleLanguageSelections'+String(this.parentid), () => {
            this.active = !this.active;
        });
    },
    computed:{
        activeLanguage(){
            if(this.$root !== undefined){
                if(this.$root.$i18n !== undefined){
                    return this.$root.$i18n.locale;
                }
            }
            return undefined;
        }
    },
    methods: {
        changeLanguage(lang){
            ebus.$emit("changeLanguage", lang);
            ebus.$emit("toggleLanguageSelections"+String(this.parentid));
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/Variables';
@import '../../style/breakpoint';

.language-selections{
    right: 30%;
    left: 30%;
    width: 45px;
    display: none;
    position: absolute;
    overflow: hidden;
    
    height: auto;
    background-color: adjust-color($color: $c-light,$lightness: 1%);
    padding: 8px;
    top: 8px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 10px 12px 0px rgba(50, 50, 50, 0.23);
    -moz-box-shadow:    0px 10px 12px 0px rgba(50, 50, 50, 0.23);
    box-shadow:         0px 10px 12px 0px rgba(50, 50, 50, 0.23);
    .language-code {
        margin: 8px 0;
        text-transform: uppercase;
        &.activelang{
            color: $c-primary;
        }
    }
    &.active {
        display: block;
    }
}

@include media-breakpoint-up(lg) { 
    .language-selections{
        right: inherit;
        width: 65px;
        left: -5px;
        padding: 8px 16px;
        .language-code {
            cursor: pointer;
            color: $c-grey;
            &.activelang{
                cursor: default;
                color: $c-primary;
            }
        }
    }

}
</style>