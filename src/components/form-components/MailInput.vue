<template>
  <basic-input :class="{error: value.error}">
      <input type="text" ref="mailinput" :value="value.value" @input="valueInput()" :placeholder="$t('contactform.fields.email')">
      <div class="mail-hint" :class="{'d-none': !value.error}">{{$t('contactform.errors.mailformat')}}</div>
  </basic-input>
</template>

<script>
import BasicInput from './BasicInput.vue';
export default {
    components: {
        BasicInput
    },
    extends: BasicInput,
    props: ['value'],
    methods: {
        valueInput(){
            let err = this.checkErrors();
            this.$emit("input", 
            {
                value: this.$refs.mailinput.value, 
                required: this.value.required,
                error: err
            });
        },
        checkErrors(){
            let mailregx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

            return !mailregx.test(this.$refs.mailinput.value);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../style/variables';
    .mail-hint {
        color: $c-primary;
        font-size: 0.8em;
        padding: 8px 16px;
    }
</style>