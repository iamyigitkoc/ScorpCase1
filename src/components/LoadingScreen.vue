<template>
  <div class="load-splash" v-bind:class="{active: realActive, changing: changing}">
      <div class="brand">
        <div class="logo">
            <div class="logo-image"></div>
        </div>  
        <div class="brand-name">Dummy</div>  
      </div>
      
      
  </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            realActive: true,
            changing: false
        }
    },
    watch: {
        active: function(val){
            if(!val){
                this.changing = true;
                this.realActive = false;
                setTimeout(() => {this.changing = false}, 500);
            }else{
                this.realActive = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/Variables';

.load-splash{
    z-index: 9999;
    width: 100%;
    height: 100vh;
    line-height: 100vh;
    position: fixed;
    text-align: center;
    vertical-align: center;
    display: none;
    background-color: $c-light;
    transition: opacity 0.5s ease-in-out;
    opacity: 0.0;
    &.activating {
        display: block;
        opacity: 0.0;
    }
    &.active{
        display: block;
        opacity: 1.0;
        transition-delay: 0.1s;
    }
    &.changing{
        display: block;
        opacity: 0.0;
    }
    .brand{
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100px;
        text-align: center;
        .logo{
        width: 50px;
        height: 50px;
        margin: 0 auto;
        position: relative;
        display: block;
        margin-bottom: 25px;
            .logo-image{
                animation-name: loader-animation;
                animation-duration: 3s;
                animation-iteration-count: infinite;
                animation-timing-function: ease-in-out;
            }
        }
    
        .brand-name {
            height: 25px;
            font-weight: 700;
            letter-spacing: 0.1em;
            display: block;
            position: relative;
            font-size: 1.1em;
            color: $c-primary;
            overflow: hidden;
            line-height: 25px;
            text-transform: uppercase;
            animation-name: loader-text-animation;
            animation-duration: 3s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
        }
    }
    

}

@keyframes loader-animation {
  0%   {opacity: 1.0; transform: rotate(0deg);}
  50% {opacity: 0.3;}
  100% {opacity: 1.0; transform: rotate(360deg);}
}

@keyframes loader-text-animation {
  0%   {opacity: 1.0;}
  50% {opacity: 0.3;}
  100% {opacity: 1.0;}
}
</style>