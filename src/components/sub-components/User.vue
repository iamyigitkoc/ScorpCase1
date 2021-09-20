<template>
  <div class="login">
      <div class="login-btn noselect" v-if="!$root.user.loggedin" @click="openForm()">
          {{ $t('pages.login.title') }}
      </div>
      <div class="user-details noselect" v-if="$root.user.loggedin">
          <div class="username" >
              <span v-on:click="toggleDetails()">{{ $root.user.name }} <i class="fas " v-bind:class="{'fa-caret-down': !details, 'fa-caret-up': details }"></i></span>
          </div>
          <div class="user-details-popover" :class="{active: details}">
              <div class="popover-content">
                  <p class="mail">{{ $root.user.email }}</p>
                  <span class="logout" @click="logout()"> {{ $t('loginform.logout') }}</span>
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>
import { ebus } from '../../main';
export default {
    data(){
        return {
            details: false
        };
    },
    methods: {
        openForm(){
            ebus.$emit('openLogin');
        },
        toggleDetails(){
            this.details = !this.details;
        },
        logout(){
            ebus.$emit('logout');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/breakpoint';

.login{
    letter-spacing: inherit;
    color: $c-primary;
    font-size: 1.2em;
    text-transform: uppercase;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.1em;
    .login-btn{
        cursor: pointer;
        color: inherit;
        letter-spacing: inherit;
    }
    .user-details{
        .username{
            span{
                cursor: pointer;
            }
        }
        .user-details-popover{
            z-index: 9999;
            position: relative;
            display: none;
            .popover-content{
                background-color: $c-light;
                padding: 8px 16px;
                width: 100%;
                -webkit-box-shadow: 0px 10px 12px 0px rgba(50, 50, 50, 0.23);
                -moz-box-shadow:    0px 10px 12px 0px rgba(50, 50, 50, 0.23);
                box-shadow:         0px 10px 12px 0px rgba(50, 50, 50, 0.23);
                border-radius: 5px;
                overflow: hidden;
                z-index: 99999;
                position: absolute;
                &>*{
                    margin: 8px auto;
                }
                .mail{
                    font-size: 1em;
                }
                .logout{
                    cursor: pointer;
                }
            }
            &.active{
                display: block;
            }
        }
    }
}


@include media-breakpoint-up(lg) {
    .login{
        font-size: 0.8em;
        .user-details{
            
            .username{
                span{
                    cursor: pointer;
                }
            }
            .user-details-popover{
                font-size: 0.7em;
                .popover-content{
                    width: auto;
                    * {
                        line-height: 1em;
                    }
                }
                &.active{
                    display: block;
                }
            }
        }
    }
}
</style>