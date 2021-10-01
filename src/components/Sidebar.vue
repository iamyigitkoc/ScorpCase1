<template>
  <div class="sidebar d-block d-lg-none" v-bind:class="{'active': this.active}">
        <div class="sidebar-header">
            <div class="brand">
                <div class="logo d-inline-block">
                <div class="logo-image"></div>
                </div>
                <h1 class="title">
                    {{ $t('footer.company') }}
                </h1>
            </div>
        </div>
        <hr/>
        <div class="sidebar-nav">
            <div class="sidebar-nav-item"  v-for="route in $root.availablePages" v-bind:key="route.name">
                <router-link v-bind:to="{name: route.name}">{{ $t('pages.'+route.name+'.title') }}</router-link>
            </div>
            <user></user>
        </div>
        <div class="sidebar-language-selection">
            <language-selector :pretext="$t('language')"></language-selector>
        </div>
  </div>
</template>

<script>
import { ebus } from '../main';
import LanguageSelector from './sub-components/LanguageSelector.vue';
import User from './sub-components/User.vue';
export default {
    data(){
        return {
            active: false
        };
    },
    mounted(){
        ebus.$on('toggleSidebar', () => {
            this.active = !this.active;
        });
    },
    computed: {
        
    },
    components: {
        LanguageSelector, User
    }
}
</script>

<style lang="scss" scoped>
@import './../style/variables';

.sidebar {
    z-index: 999;
    background-color: $c-light;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 65px;
    right: -100%;
    transition: right 0.5s ease-in-out;
    padding: 5%;
    &.active {
        right: 0;
    }
    .sidebar-header{
        z-index: 30;
        width: 100%;
        text-align: center;
        .brand{
            .logo{
                width: 45px;
                height: 45px;
                
            }
            .title{
                text-transform: uppercase;
                color: $c-primary;
                font-weight: 700;
                margin-top: 0.5em;
            }
        }
    }
    hr{
        width: 50%;
        margin: 28px auto 16px;
        z-index: 1;
    }
}

.sidebar-nav {
    margin: 16px auto;
    .sidebar-nav-item {
        color: $c-primary;
        text-align: center;
        font-weight: 700;
        font-size: 1.2em;
        width: 100%;
        display: block;
        overflow: hidden;
        text-transform: uppercase;
        a{
            letter-spacing: 0.1em;
            display: inline-block;
            padding: 8px;
            margin-bottom: 8px;
            color: $c-primary;
            text-decoration: none;
            &:visited, &:link{
                color: $c-primary;
            }
            &:hover, &:active{
                color: $c-secondary;
            }
        }
    }
}
</style>