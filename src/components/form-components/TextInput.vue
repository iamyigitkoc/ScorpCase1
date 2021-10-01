<template>
  <basic-input v-bind="$props">
      <input :type="itype" :placeholder=" (label !== undefined ? label : ''  ) + (value.required ? '*' : '')" :value="value.value" @input="valueInput()" ref="textinput"/>
  </basic-input>
</template>

<script>
import BasicInput from "./BasicInput.vue";

export default {
    components: {
        BasicInput
    },
    extends: BasicInput,
    props: {
        "itype": {
            type: String,
            default: "text"
        },
        "label": {
            type: String,
            default: undefined
        },
        "value":{
            type: Object
        }
    },
    mounted() {
        this.$emit("input", 
        {
            value: this.$refs.textinput.value, 
            required: this.value.required,
            error: this.checkErrors()
        });
    },
    methods: {
        valueInput(){
            this.$emit("input", 
            {
                value: this.$refs.textinput.value, 
                required: this.value.required,
                error: this.checkErrors()
            });
        },
        checkErrors(){
            if(this.value.required){
                if(this.$refs.textinput.value.length > 0) return false;
                return true;
            }
            return false;
        }
    }
}
</script>

<style>

</style>