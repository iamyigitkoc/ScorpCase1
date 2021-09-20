<template>
  <div class="form-component">
      <div class="form-field">
        <slot/>
      </div>
  </div>
</template>

<script>
import { ebus } from '../../main';

export default {
    props: {

    },
    methods: {
      pushError(msg){
        ebus.$emit('formNotification', msg);
      }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/breakpoint';



</style>