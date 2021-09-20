<template>
  <basic-input :class="{error: value.error}">
      <input type="text" ref="phoneinput" :value="value.value" @input="valueInput()" :placeholder="$t('contactform.fields.phone')" v-bind:class="{error: error}">
  </basic-input>
</template>

<script>
import BasicInput from './BasicInput.vue';
export default {
    components: {
        BasicInput
    },
    extends: BasicInput,
    data(){
        return {
            error: false
        };
    },
    props: ['value'],
    methods: {
        valueInput(){
            
            let err = this.checkErrors();
            if(err) this.pushError(this.$t('contactform.errors.phone'));
            this.$emit("input", 
            {
                value: err ? this.value.value : this.$refs.phoneinput.value, 
                required: this.value.required,
                error: err
            });
        },
        checkErrors(){
            let newvalue = this.$refs.phoneinput.value;
            let reg = /^[0-9]{0,15}$/;
            return !reg.test(newvalue);
        }
    }
}
</script>

<style>

</style>