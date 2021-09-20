<template>
  <div class="error-notification" :class="{dead: time < 500}">
      <div @click="removeThis" class="error-notification-close noselect">{{ $t('remove') }}</div>
      <div class="error-notification-message">{{ error }}</div>
      <div class="error-time">
        <div class="error-time-fill" :style="{width: this.fillWidth}"></div>
      </div>
  </div>
</template>

<script>
import { ebus } from '../../main';
export default {
  props: {
    error: {
      type: String,
      default: "Error"
    },
    index: {
      type: Number,
      default: 0
    },
    globn: {
      type: Number,
      default: 0
    },
    maxTime: {
      type: Number,
      default: 3000
    },
    time: {
      type: Number,
      default: 3000
    }
  },
  mounted() {
  },
  methods: {
    removeThis(){
      ebus.$emit('deleteFormNotification', this.index);
    }
  },
  computed: {
    fillWidth(){
      return (this.time/this.maxTime)*100 + "%";
    }
  }
}
</script>

<style lang="scss">
@import '../../style/variables';

.error-notification {
  width: 100%;
  margin-top: 8px;
  padding: 16px 32px;
  background-color: $c-light;
  transition: opacity 0.5s ease-in-out;
  .error-notification-close {
    text-decoration: underline;
    color: $c-primary;
    cursor: pointer;
  }
  .error-notification-message{
    margin: 8px 0;
  }
  .error-time {
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background-color: $c-grey;
    .error-time-fill{
      height: 100%;
      background-color: $c-primary;
    }
  }
  &.dead{
    opacity: 0;
  }
}
</style>