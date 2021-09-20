<template>
  <basic-input>
      <textarea :value="value.value" @input="valueInput()" ref="textarea" :placeholder="$t('contactform.fields.text')"></textarea>
  </basic-input>
</template>

<script>
import BasicInput from './BasicInput.vue';

export default {
    components: { BasicInput },
    extends: BasicInput,
    props: ['value'],
    mounted() {
        this.$emit("input", 
        {
            value: this.$refs.textarea.value, 
            required: this.value.required,
            error: this.checkErrors()
        });
    },
    methods: {
        valueInput(){
            this.$emit("input", 
            {
                value: this.$refs.textarea.value, 
                required: this.value.required,
                error: this.checkErrors()
            });
        },
        checkErrors(){
            if(this.value.required){
                if(this.$refs.textarea.value.length > 0) return false;
                return true;
            }
            return false;
        }
    }
}
</script>

<style>

</style>