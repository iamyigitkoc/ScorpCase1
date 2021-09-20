<template>
  <div class="language-selector noselect">
      <div>{{ pretext }} <span v-on:click="toggleSelections()" class="active-language">{{ $root.$i18n.locale }} <i class="fas " v-bind:class="{'fa-caret-down': !active, 'fa-caret-up': active }"></i></span> </div>
      <div class="language-dropdown">
            <language-selections :parentid="randid"></language-selections>
      </div>
      
  </div>
</template>

<script>
import LanguageSelections from './LanguageSelections.vue';
import { ebus } from './../../main';

export default {
    props: {
        pretext: String
    },
    data() {
        return {
            isI18NAvailable: false,
            active: false,
            randid: Math.random()
        };
    },
    mounted(){
        if(this.$root.$i18n !== undefined){
            this.isI18NAvailable = true;
        }
        ebus.$on("toggleLanguageSelections"+String(this.randid), () => {
            this.active = !this.active;
        });
    },
    methods: {
        toggleSelections(){
            ebus.$emit("toggleLanguageSelections"+String(this.randid));
        }
    },
    components: {
        LanguageSelections
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/breakpoint';

.language-selector{
    text-align: center;
    text-transform: uppercase;
    position: relative;
    font-weight: 500;
    font-size: 1.0em;
    width: auto;
    cursor: pointer;
    .active-language{
        color: $c-primary;
    }
    .language-dropdown {
        position: absolute;
        left: 30%;
        right: 30%;
        width: 40%;
    }
}

@include media-breakpoint-up(lg) { 
    .language-selector{
        font-size: 0.9em;
        .active-language{
            color: $c-grey;
        }
        .language-dropdown {
            position: absolute;
            left: 10%;
            right: 10%;
            width: 80%;
        }
    }
}
</style>