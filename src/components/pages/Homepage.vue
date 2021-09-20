<template>
  <div class="w-100" style="position: relative">
    <div class="container-fluid page-title-container">
      <div class="container py-2">
        <h1 class="page-title">{{ $t('pages.homepage.title') }}</h1>
      </div>
      
    </div>
    <div class=" homepage-hero">
      <div class="hero-background">
        <youtube 
        video-id="ei2FtOJIw9Y" ref="youtube" 
        style="min-width: 100%; min-height: 100%; top: 50%; transform: translateY(-50%); -ms-transform: translateY(-50%); position: absolute; margin: 0;" 
        :player-vars="youtubeconf" :fit-parent=true></youtube>
      </div>
      <div class="hero-shadowbox"></div>
      <div class="hero-content container pt-4">
        <div class="row">
          <div class="col-12">
            <h2 class="quote-msg">{{ $t('quote.message') }}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h5 class="quote-person">{{ $t('quote.quoted') }}</h5>
          </div>
        </div>
        <div class="hero-video-controls">
          <div v-on:click="togglePause()" class="video-control pause-video">
            <i class="fas " v-bind:class="{'fa-pause-circle': !isPaused, 'fa-play-circle': isPaused}"></i>
          </div>
          <div v-on:click="toggleMute()" class="video-control mute-video">
            <i class="fas " v-bind:class="{'fa-volume-mute': isMuted, 'fa-volume-up': !isMuted}"></i>
          </div>
        </div>
      </div>
      
    </div>
    <div class="container-fluid second-section pt-4">
      <div class="container">
          <div class="row">
            <div class="col-12 col-lg-6"> 
              <div class="ssection-image">
                <div class="ssection-image-inner" alt="Bauhaus"></div>
              </div>
              
            </div>
            <div class="col-12 col-lg-6 ssection-text" >
              <p>{{ $t('bauhaus.par1') }}</p>
              <p>{{ $t('bauhaus.par2') }}</p>
            </div>
          </div>
        </div>
    </div>
    <div class="section-spacer container-fluid">

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return  {
      youtubeconf: {
        autoplay: 1,
        fitParent: true,
        controls: 0,
        loop: 1,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        origin: 'http://locahost:5000'
      },
      isMuted: true,
      isPaused: false
    };
  },
  mounted(){
    this.$refs.youtube.player.setVolume(0);
    this.$refs.youtube.player.playVideo();
    this.$refs.youtube.player.addEventListener('onStateChange',  (val) => { this.loopVideo(val) });
  },
  methods:{
    toggleMute(){
      this.player.getVolume().then(value => {
        if(value > 0){
          this.player.setVolume(0);
          this.isMuted = true;
        }else{
          this.player.setVolume(30);
          this.isMuted = false;
        }
      });
    },
    togglePause(){
      this.player.getPlayerState().then(value => {
        if(value == 2){
          this.player.playVideo();
          this.isPaused = false;
        }else if(value == 1){
          this.player.pauseVideo();
          this.isPaused = true;
        }
      });
    },
    loopVideo(value){
      if(value.data == 0){
        this.player.seekTo(0);
        this.player.playVideo();
        this.isPaused = false;
      }
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/breakpoint';
.page-title-container{
  overflow: hidden;
  background-color: $c-primary;
  text-align: center;
  .page-title{
    padding: 0;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 2em;
    color: $c-light;
  }
}

.homepage-hero {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  .hero-background{
    overflow: hidden;
    background-image: url("/img/homepage_image.jpg");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    z-index: -1;
    top:0;
    left: 0;
    padding: 0;
    position: absolute;
  }
  .hero-shadowbox{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    padding: 0;
    background-color: $c-dark;
    opacity: 0.6;
  }
  .hero-content{
    z-index: 10;
    width: 100%;
    height: 100%;
    position: relative;
    .quote-msg{
      font-size: 1.8em;
      color: $c-light;
      font-weight: 800;
      line-height: 1.3em;
    }
    .quote-person{
      margin-top: 0.5em;
      font-size: 1.2em;
      color: $c-primary;
      font-weight: 500;
      font-style: italic;
      line-height: 1.3em;
    }
    .hero-video-controls{
      margin-top: 36px;
      color: $c-light;
      font-size: 35px;
      .video-control{
        display: inline-block;
        margin-right: 16px;
      }
    }
  }
}

.second-section {
  height: auto;
  background-color: $c-primary;
  color: $c-light;
  padding-bottom: 0;
  .container{
    height: 100%;
    padding-bottom: 0;
    margin-bottom: 0;
    .row{
      height: 100%;
    }
    .ssection-image{
      width: 100%;
      height: 300px;
      box-sizing: border-box;
      overflow: hidden;
      .ssection-image-inner{
        width: 100%;
        background-image: url("/img/bauhaus.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        position: relative;
        box-sizing: border-box;
      }
    }
    .ssection-text{
      margin-top: 16px;
      padding-bottom: 32px;
      p{
        margin-top: 16px;
      }
    }
  }
  

}
.section-spacer{
    background-color: $c-light;
    display: none;
}

@include media-breakpoint-up(lg) { 
  .page-title-container{
    text-align: left;
    .page-title{
      font-size: 3em;
    }
  }

  .homepage-hero{
    height: 500px;
    .hero-content{
      .quote-msg{
        font-size: 3em;
        letter-spacing: 0.04em;
      }
      .quote-person{
        margin-top: 0.5em;
        font-size: 2em;
      }
    }
  }
  .second-section {
    height: 400px;
    .container{
      .ssection-image{
        height: 100%;
        overflow: initial;
        .ssection-image-inner{
          height: 110%;
        }
      }
    }
    
  }
  .section-spacer{
    display: block;
    height: 40px;
  }
}
</style>