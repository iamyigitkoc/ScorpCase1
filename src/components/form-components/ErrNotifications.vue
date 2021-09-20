<template>
  <div class="error-notifications">
      <err-notification v-for="(error, index) in errors" 
      v-bind:key="index" :error="error.error" 
      :index="index" :globn="error.globaln"
      :maxTime="deadline" :time="error.time"></err-notification>
  </div>
</template>

<script>
import { ebus } from '../../main';
import ErrNotification from './ErrNotification.vue';

export default {
    data(){
        return {
            errors: [],
            total: 0,
            deadline: 10000,
            lastTimestamp: 0
        }
    },
    mounted(){
        ebus.$on('formNotification', (errormsg) => {
            this.errors.push({error: errormsg, globaln: this.total, time: this.deadline});
            this.total++;
        });
        ebus.$on('deleteFormNotification', (i) => {
            if(i < this.errors.length && i >= 0){
                this.errors.splice(i, 1);
            }
        });
        window.requestAnimationFrame(this.checkDeadlines);
    },
    methods: {
        checkDeadlines(time){
            let elapsed = time - this.lastTimestamp;
            for (let i = 0; i < this.errors.length; i++) {
            
                this.errors[i].time -= elapsed;
                if(this.errors[i].time < 0){
                    this.errors.splice(i, 1);
                    i--;
                }
            }
            this.lastTimestamp = time;
            window.requestAnimationFrame(this.checkDeadlines);
        }
    },
    components: {ErrNotification}
}
</script>

<style>

</style>