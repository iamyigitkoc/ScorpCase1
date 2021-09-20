<template>
<div class="nav-button d-inline-block d-lg-none sidebar-toggler">
    <div v-on:click="toggleSidebar()" class="sidebar-toggle-icon" v-bind:class="{'active': active}">
        <i class="fas fa-chevron-left"></i>
    </div>
</div>

</template>

<script>
import { ebus } from '../../main';

export default {
    data(){
        return {
            active: false
        }
    },
    mounted(){
        ebus.$on('toggleSidebar', () => {
            this.active = !this.active;
        });
    },
    methods: {
        toggleSidebar(){
            ebus.$emit('toggleSidebar');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
.sidebar-toggler{
    margin-right: 15px;
}
.sidebar-toggle-icon {
    i{
        font-size: 25px;
        transition: transform 0.5s ease-in-out;
    }
    &.active{
        .fas{
            transform: rotate(180deg);
        }

    }
}

</style>