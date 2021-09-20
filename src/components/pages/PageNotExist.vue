<template>
  <div class="container page-not-found">
    <div class="middle">
       <h1>404</h1>
        <h2>{{ $t('notfound.msg') }}</h2>
        <p v-if="isBack" @click="$router.go(-1)">{{ $t('notfound.back') }}</p>
        <p v-if="!isBack" @click="$router.push('/')">{{ $t('notfound.home') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isBack(){
      return window.history.length > 2;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/breakpoint';

.page-not-found {
  width: 100%;
  height: 60vh;
  .middle{
    padding: 2rem;
    h1{
      font-size: 4em;
      letter-spacing: 0.2em;
      font-weight: 700;
    }
    h2{
      padding-top: 0.1em;
      font-size: 2em;
      letter-spacing: 0.1em;
      font-weight: 600;
    }
    p{
      cursor: pointer;
      color: $c-primary;
      margin-top: 1em;
      font-size: 1.4em;
      text-decoration: underline;
      &:hover{
        color: $c-secondary;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .page-not-found{
    .middle{
      padding: 5rem;
    }
  }
}
</style>