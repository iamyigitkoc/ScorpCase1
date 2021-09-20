<template>
  <div class="loginform container-fluid">
    <div class="row">
        <div class="col-12"><center><h1 style="font-size: 1.5em; text-transform: uppercase">{{ $t('loginform.title') }}</h1></center></div>
    </div>
    <div class="row">
        <div class="col-12 col-lg-6">
            <text-input v-model="fields.name" :label="$t('loginform.name')"></text-input>
        </div>
        <div class="col-12 col-lg-6">
            <mail-input v-model="fields.email" :label="$t('loginform.email')"></mail-input>
        </div>
        <div class="col-12">
            <text-input itype="password" v-model="fields.password" :label="$t('loginform.pass')"></text-input>
        </div>
        <div class="col-12">
            <div class="login-error" :class="{'d-none': !err}">{{$t('loginform.invalid')}}</div>
        </div>
        <div class="col-12">
            <button class="button-primary" @click="login()">{{ $t('loginform.login') }}</button>
        </div>
    </div>
  </div>
</template>

<script>
import FormComponents from './../form-components/FormComponents';
import { ebus } from '../../main';
export default {
    components: FormComponents,
    data() {
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
                password: {
                    value: "",
                    required: true,
                    error: false
                }
            },
            err: false,
            defaultfields: {

            }
        };
    },
    mounted(){
        this.defaultfields = JSON.parse(JSON.stringify(this.fields));
    },
    methods: {
        login(){

            let err = 0;

            if(this.fields.name.error){
                err++;
            }

            if(this.fields.email.error){
                err++;
            }

            if(this.fields.password.error){
                err++;
            }

            if(err<=0){
                this.$root.user.loggedin = true;
                this.$root.user.name = this.fields.name.value;
                this.$root.user.password = this.fields.password.value;
                this.$root.user.email = this.fields.email.value;
                this.fields = JSON.parse(JSON.stringify(this.fields));
                ebus.$emit("closeLogin");
            }else{
                this.err = true;
            }
            
        }
    }
}
</script>

<style>

</style>