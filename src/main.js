import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'; //Localization
import VueYoutube from 'vue-youtube';

import { defaultLanguage, applicationLanguages } from './lang/Languages.js';

//Page layout components
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import SiteFooter from './components/SiteFooter.vue';
import LoginModal from './components/LoginModal.vue';


//Import page components
import Homepage from './components/pages/Homepage.vue';
import Contact from './components/pages/Contact.vue';
import PageNotExist from './components/pages/PageNotExist.vue';

export const ebus = new Vue();

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VueYoutube);

const messages = Object.assign(applicationLanguages);

let localization = new VueI18n({
    locale: defaultLanguage,

    fallbackLocale: 'en',
    messages
});

const approutes = [
    {path: '/home', component: Homepage, name: 'homepage', alias: '/', meta: {type: 'page'}},
    {path: '/contact', component: Contact, name: 'contact', meta: {type: 'page'}},
    {path: '/:catchAll(.*)', component: PageNotExist, name: 'notfound', meta: {type: 'error'}}
];

const router = new VueRouter({
    routes: approutes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if(to !== undefined){
        document.title = "Dummy | " + localization.t('pages.'+to.name+".title");
    }else{
        document.title = "Dummy";
    }
    ebus.$emit('toggleSidebar');
    next();
});

new Vue({
    router: router,
    i18n: localization,
    el: '#Application',
    data(){
        return {
            countryList: [
                { id: "TR", name: this.$t("countries.tr") },
                { id: "US", name: this.$t("countries.us") },
                { id: "GB", name: this.$t("countries.gb") },
                { id: "DE", name: this.$t("countries.de") },
                { id: "SE", name: this.$t("countries.se") },
                { id: "KE", name: this.$t("countries.ke") },
                { id: "BR", name: this.$t("countries.br") },
                { id: "ZW", name: this.$t("countries.zw") }
            ],
            loadingScreenActive: true,
            user: {
                name: "",
                loggedin: false,
                email: "",
                password: ""
            },
            userdef: {}
        };
    },
    components: { Navbar, Sidebar, LoadingScreen, SiteFooter, LoginModal },
    created() {
        document.documentElement.setAttribute("lang", this.$i18n.locale);
        ebus.$on('changeLanguage', (lang) => {
            this.loadingScreenActive = true;
            document.documentElement.setAttribute("lang", lang);
            setTimeout(() => {
                this.rerenderForLanguage(lang)
            }, 500);
        });
        ebus.$on('logout', () => {this.logout()});
        setTimeout(this.rerenderForLanguage, 500);
    },
    mounted(){
        this.userdef = JSON.parse(JSON.stringify(this.user));
    },
    computed: {
        availablePages(){
            let routes = this.$router.options.routes;
            let available = new Array();
            routes.forEach(route => {
                if(route.meta.type === 'page'){
                available.push(route);
                }
            });
            return available;
        }
    },
    methods: {
        rerenderForLanguage(lang){
            if(lang !== undefined){
                this.$forceUpdate();
                this.$i18n.locale = lang; 
                document.title = "Dummy | " + localization.t('pages.'+this.$router.currentRoute.name+".title");
                
            }
            this.countryList = [
                { id: "TR", name: this.$t("countries.tr") },
                { id: "US", name: this.$t("countries.us") },
                { id: "GB", name: this.$t("countries.gb") },
                { id: "DE", name: this.$t("countries.de") },
                { id: "SE", name: this.$t("countries.se") },
                { id: "KE", name: this.$t("countries.ke") },
                { id: "BR", name: this.$t("countries.br") },
                { id: "ZW", name: this.$t("countries.zw") }
            ];
            ebus.$emit('changeLanguageFinal', lang);
            this.loadingScreenActive = false;
        },
        logout(){
            this.user = JSON.parse(JSON.stringify(this.userdef));
        }
    },
    watch: {
        'user.name': function(val) {
            ebus.$emit('updateContactForm', 'name');
        },
        'user.email': function(val){
            ebus.$emit('updateContactForm', 'email');
        },
        user: function(val){
            ebus.$emit('updateContactForm', 'clear');
        }
    }
});