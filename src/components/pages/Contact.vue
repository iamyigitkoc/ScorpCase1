<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row">
          <div class="col-12">
            <center><h1>{{ $t('contactform.title') }}</h1></center>
          </div>
        </div>
        <div class="row form-area">
          <div class="col-12 col-lg-6">
            <text-input :label="$t('contactform.fields.name')" v-model="fields.name"></text-input>
            
          </div>
          <div class="col-12 col-lg-6">
            <mail-input v-model="fields.email"></mail-input>
          </div>
          <div class="col-12 col-lg-6">
            <phone-input v-model="fields.phone"></phone-input>
          </div>
          <div class="col-12 col-lg-6">
            <country-input v-model="fields.country"></country-input>
          </div>
          <div class="col-12">
            <text-area v-model="fields.text"></text-area>
          </div>
          <div class="col-12">
            <button class="button-primary" @click="send()">{{ $t('contactform.send') }}</button>
          </div>
          <div class="col-12">
            <err-notifications></err-notifications>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 d-none d-lg-inline-block">
        <div class="form-hero">
          <div class="logo-image"></div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import ErrNotifications from '../form-components/ErrNotifications.vue';
import FormComponents from './../form-components/FormComponents'; 
import { ebus } from './../../main';

export default {
  components: { ErrNotifications },
  data(){
    return {
      fields: {
        name: {
          value: "",
          required: true,
          error: false
        },
        email: {
          value: "",
          required: true,
          error: false
        },
        phone: {
          value: "",
          required: true,
          error: false
        },
        country: {
          value: "",
          required: true,
          error: false
        },
        text: {
          value: "",
          required: true,
          error: false
        }
      },
      defaults: {}
    };
  },
  mounted(){
    this.defaults = JSON.parse(JSON.stringify(this.fields));
    ebus.$on('updateContactForm', (t)=>{
      if(t !== undefined ){
        if("email" === t && this.$root.user.loggedin){
          this.fields.email.value = this.$root.user.email;
        }else if("name" === t && this.$root.user.loggedin){
          this.fields.name.value = this.$root.user.name;
        }else if("clear" === t){
          this.fields.name = JSON.parse(JSON.stringify(this.defaults.name));
          this.fields.email = JSON.parse(JSON.stringify(this.defaults.email));
        }
      }
    });

    this.fields.email.value = this.$root.user.loggedin ? this.$root.user.email : "";
    this.fields.name.value = this.$root.user.loggedin ? this.$root.user.name : "";
  },
  components: FormComponents,
  methods: {
    send(){
      let error = 0;
      let servmsg = {
        name: this.fields.name.value,
        email: this.fields.email.value,
        phonenumber: this.fields.phone.value,
        country_code: this.fields.country.value,
        text: this.fields.text.value
      };
      if(this.fields.name.error){
        error++;
      }

      if(this.fields.email.error){
        error++;
      }

      if(this.fields.phone.error){
        error++;
      }

      if(this.fields.country.error){
        error++;
      }

      if(this.fields.text.error){
        error++;
      }

      
      if(error <= 0){
        console.log(JSON.stringify(servmsg));
        this.fields = JSON.parse(JSON.stringify(this.defaults));
        this.$forceUpdate();
      }else{
        ebus.$emit('formNotification', this.$t('contactform.errors.error'));
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  font-size: 1.5em;
  text-transform: uppercase;
}
.form-hero {
  padding: 45px;
  width: 100%;
  height: 300px;
}
</style>