<template>
  <basic-input>
      <!-- <input class="country-form-code" type="text" :value="value.value" ref="countryinput" @input="valueInput()" :placeholder="$t('contactform.fields.country')"> -->
      <div class="form-select noselect" @click="toggleSearch()">
          {{ value.value }}
      </div>
      <div class="country-search-wrapper">
        <div class="country-search" :class="{'d-none': !searchdisplay}">
                <input class="no-shadow input-field" type="text" v-model="search">
                <ul class="suggestion-list noselect">
                    <li @click="changeCountry(country.id)" v-for="country in countrySearch" v-bind:key="country.id">{{ country.name }}</li>
                </ul>
            </div>    
      </div>
      
  </basic-input>
</template>

<script>
import BasicInput from './BasicInput.vue';
export default {
    data(){
        return {
            search: "",
            options: [],
            searchdisplay: false
        }
    },
    components: {
        BasicInput
    },
    extends: BasicInput,
    props: ['value'],
    mounted(){
        this.$root.countryList.forEach(e => {
            this.options.push(e.id);
        });
        this.value.value = this.options[0];
    },
    methods: {
        valueInput(){
            
        },
        checkErrors(){
            return false;
        },
        toggleSearch(){
            this.searchdisplay = !this.searchdisplay;
            this.search = "";
        },
        changeCountry(coun){
            this.$emit("input", 
            {
                value: coun, 
                required: this.value.required,
                error: this.checkErrors()
            });
            this.toggleSearch();
            
        }
    },
    computed: {
        countrySearch(){
            if(this.search !== undefined){
                if(this.search.length > 0){
                    let res = [];
                    let cs = this.$root.countryList;
                    cs.forEach(c => {
                        let added = false;
                        let regx = new RegExp('('+this.search.toLowerCase()+')');
                        if(regx.test(c.id.toLowerCase())){
                            res.push(c);
                            added = true;
                        }
                        if(!added){
                            if(regx.test(c.name.toLowerCase())){
                                res.push(c);
                            }
                        }
                    });
                    return res;
                }
            }
            
            return this.$root.countryList;
        }
    }
}
</script>

<style lang="scss">
    @import '../../style/variables';
    .country-search-wrapper{
        width: 100%;
        position: relative;
    }
    .country-search{
        width: 100%;
        -webkit-box-shadow: 0px 15px 20px 0px rgba(115, 115, 115, .5);
        -moz-box-shadow:    0px 15px 20px 0px rgba(115, 115, 115, .5);
        box-shadow:         0px 15px 20px 0px rgba(115, 115, 115, .5);
        background-color: $c-light;
        position: absolute;
        overflow: hidden;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        .input-field{
            margin: 0 !important;
            background-color: $c-primary !important;
            color: $c-light !important;
            border-radius: 0 !important;
             &:focus-visible {
                -webkit-box-shadow: none;
                -moz-box-shadow:    none;
                box-shadow:         none;
            }
        }
        .suggestion-list{
                width: 100% ;
                li{
                    cursor: pointer;
                    padding: 8px 16px;
                    background-color: $c-light;
                    &:hover{
                        background-color: adjust-color($color: $c-light, $lightness: -5%);
                    }
                    &:active{
                        background-color: adjust-color($color: $c-light, $lightness: -8%);
                    }
                }
            }
    }
    
</style>