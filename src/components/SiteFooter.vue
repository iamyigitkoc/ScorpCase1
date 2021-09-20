<template>
  <div class="footer container-fluid">
      <div class="container">
          <div class="row">
              <div class="footer-section col-12 col-lg-4">
                    <h1>{{ $t('footer.company') }}</h1>
                    <p>Brooker St. Van Dem, 86452</p>
                    <p>Vancouver, BC, Canada</p>
              </div>
              <div class="footer-section col-12 col-lg-4">
                  <h1>{{ $t('footer.contactus') }}</h1>
                  <p><i class="fas fa-phone-square"></i> +1 1111 111 111</p>
                  <p><i class="fas fa-envelope-square"></i> contact@dummyllc.ca</p>
              </div>
              <div class="footer-section col-12 col-lg-4">
                  <h1>{{ $t('footer.sitemap') }}</h1>
                  <p v-for="route in $root.availablePages" v-bind:key="route.name">
                    <router-link v-bind:to="{name: route.name}">{{ $t('pages.'+route.name+'.title') }}</router-link>
                  </p>
                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../style/variables';
@import '../style/breakpoint';

.footer{
    background-color: $c-light;
    padding-bottom: 16px;
    padding-top: 16px;
    h1{
        color: $c-primary;
        font-weight: 700;
        padding: 8px 0 8px;
        font-size: 1.2em;
    }
    p{
        color: $c-dark;
        padding-bottom: 8px ;
        i {
            color: $c-primary;
            font-size: 1em;
        }
    }
    a{
        color: $c-grey;
        text-decoration: none;
        &:link, &:visited{
            color: $c-grey;
        }
        &:hover, &:active{
            color: $c-dark;
        }
    }
    .footer-section{
        margin-bottom: 16px;

    }
}
</style>