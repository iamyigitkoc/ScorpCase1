<template>
  <div class="login-modal" :class="{active: active}">
    <div class="login-modal-overlay">

    </div>
    <div class="login-modal-content">
      <div class="container-fluid py-3 px-4">
        <div class="row">
          <div class="col-6"> <language-selector style="text-align:left !important;"></language-selector></div>
          <div class="col-6"> <div class="close-btn noselect" @click="toggleForm()">{{ $t('close') }}</div></div>
          <div class="col-12">
            <login-form></login-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './sub-components/LoginForm.vue';
import LanguageSelector from './sub-components/LanguageSelector.vue';
import { ebus } from '../main';
export default {
  data() {
    return {
      active: false,
    };
  },
  mounted(){
    ebus.$on('openLogin', () => {
      this.openForm();
    });

    ebus.$on('closeLogin', () => {
      this.closeForm();
    });
  },
  components: {LoginForm, LanguageSelector},
  methods: {
    toggleForm(){
      if(this.active){
        this.active = !this.active;
      }else if(!this.$root.user.loggedin){
        this.active = !this.active;
      }
      
    },
    openForm(){
      if(!this.active && !this.$root.user.loggedin){
        this.active = true;
      }      
    },
    closeForm(){
      if(this.active){
        this.active = false;
      }      
    }
  }
}
</script>

<style lang="scss">
    @import '../style/variables';
    @import '../style/breakpoint';

    .login-modal {
        display: none;
        z-index: 9999;
        width: 100%;
        height: 100vh;
        position: fixed;
        overflow: none;
        .login-modal-overlay{
          position: absolute;
          background-color: $c-dark;
          opacity: 0.4;
          z-index: 1;
          width: 100%;
          height: 100%;
        }
        .login-modal-content{
          position: relative;
          border-radius: 15px;
          z-index: 999;
          width: 90%;
          height: 90vh;
          margin: 5vh 5%;
          background-color: $c-light;
          .close-btn{
            cursor: pointer;
            text-align: right;
            color: $c-primary;
          }
        }
        &.active{
          display: block;
        }
    }

    @include media-breakpoint-up(lg) {
      .login-modal {
        .login-modal-content{
          width: 50%;
          height: 50vh;
          margin: 25vh 25%;
        }
      }
    }
</style>