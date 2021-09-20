<template>
  <div class="navbar container-fluid">
    <div class="navbar-inner container">
      <div class="navbar-items-left">
        <div class="brand">
          <div class="logo d-none d-lg-inline-block">
            <div class="logo-image">

            </div>
          </div>
          <div class="title">
            {{ currentPage }}
          </div>
        </div>
      </div>
      
      <div class="navbar-items-right">
        <sidebar-toggle></sidebar-toggle>
        <div class="nav-button navbar-pages d-none d-lg-inline-block" v-for="route in $root.availablePages" v-bind:key="route.name">
          <router-link v-bind:to="{name: route.name}">{{ $t('pages.'+route.name+'.title') }}</router-link>
        </div>
        <div class="nav-button navbar-pages d-none d-lg-inline-block">
          <user></user>
        </div>
        <div class="d-none d-lg-inline-block">
          <language-selector></language-selector>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { ebus } from '../main';
import { availableLanguages } from '../lang/Languages';
import User from './sub-components/User.vue';
import SidebarToggle from './sub-components/SidebarToggle.vue';
import LanguageSelector from './sub-components/LanguageSelector.vue';

export default {
  props: {
  },
  data() {
    return {
      availableLanguages: availableLanguages,
      currentLanguage: availableLanguages[0].code,
      currentPage: ""
    };
  },
  computed: {
  },
  mounted(){
    this.currentLanguage = this.$root.$i18n.locale;
  
    let page = "Dummy";
    if(this.$router !== undefined){
        
        if(this.$router.currentRoute !== undefined){
          if(this.$router.currentRoute.name !== 'homepage' && this.$router.currentRoute.name !== 'notfound'){
            page = this.$t("pages."+this.$router.currentRoute.name+".title");
          }
        }
      }

      this.currentPage = page;

      ebus.$on("changeLanguageFinal", (lang) => {
        this.currentLanguage = lang;
        let page = "Dummy";
        if(this.$router !== undefined){
            
            if(this.$router.currentRoute !== undefined){
              if(this.$router.currentRoute.name !== 'homepage' && this.$router.currentRoute.name !== 'notfound'){
                page = this.$t("pages."+this.$router.currentRoute.name+".title");
              }
            }
          }

          this.currentPage = page;
      });
  },
  methods: {
    changeLang(lang){
      ebus.$emit("changeLanguage", lang);
    },
    toggleMenu(){
      ebus.$emit("toggleSidebar");
    }
  },
  watch: {
    $route (to, from){
      let page = "Dummy";
      if(to !== undefined){
    
          if(to.name !== 'homepage' && to.name !== 'notfound'){
            page = this.$t("pages."+this.$router.currentRoute.name+".title");
          }
        
      }

      this.currentPage = page;
    }
  },
  components: {
    SidebarToggle, LanguageSelector, User
  }
}
</script>

<style>

</style>