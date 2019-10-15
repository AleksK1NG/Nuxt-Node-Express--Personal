<template>
  <section class="hero is-black">
    <div class="hero-body">
      <div class="hero-img"></div>
      <div class="container">
        <div class="columns">
          <div class="column is-9">
            <h1 class="title">
              {{ title }}
            </h1>
            <h2 class="subtitle">
              {{ subtitle }}
            </h2>
            <div class="sub-subtitle">
              <UserTitle :name="author.name" :avatar="author.avatar" />
            </div>
          </div>
          <div class="column is-3">
            <div class="column-right">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import UserTitle from '../shared/UserTile'
export default {
  name: 'ProductHero',
  components: {
    UserTitle
  },
  props: {
    title: {
      type: String,
      default: 'Some Default Catchy Title'
    },
    subtitle: {
      type: String,
      default: 'Some Default Catchy Subtitle'
    },
    author: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.hero-body {
  position: relative;
}
.hero-img {
  opacity: 0.8;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  filter: sepia(0.1) grayscale(0.1) saturate(0.8);
}
.column-right {
  position: absolute;
}
@media screen and (max-width: 770px) {
  .column-right {
    position: inherit;
  }
}
.user-avatar {
  display: inline-block;
}
.is-black {
  background-color: black;
  background: linear-gradient(#29303b, #29303b, #29303b);
}
.title {
  font-weight: bold;
  font-size: 45px;
}
.subtitle {
  /*font-weight: bold;*/
  font-size: 25px;
}
.author-name {
  font-size: 20px;
  font-weight: bold;
}
</style>
