<template>
  <div>
    <Hero />
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <!-- CARD-ITEM -->
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by2">
                  <img
                    src="https://images.unsplash.com/photo-1544980919-e17526d4ed0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Some Super Title</p>
                    <p class="subtitle is-6"><i>Some Super Subtitle</i></p>
                  </div>
                </div>
                <div class="content">
                  Some Description
                  <br />
                </div>
                <div class="price-box">
                  <span class="price">150$</span>
                  <span class="disc-price">9.99$</span>
                </div>
              </div>
              <footer class="card-footer">
                <nuxt-link :to="''" class="card-footer-item">Learn More</nuxt-link>
                <a target="_" :href="'#'" class="card-footer-item">Enroll</a>
              </footer>
            </div>
            <!-- CARD-ITEM-END -->
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <!-- CARD-ITEM -->
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Some Super Title</p>
                    <p class="subtitle is-6"><i>Some Super Subtitle</i></p>
                  </div>
                </div>
                <div class="content">
                  Some Description
                  <br />
                </div>
              </div>
              <footer class="card-footer">
                <nuxt-link :to="'#'" class="card-footer-item">Read More</nuxt-link>
              </footer>
            </div>
            <!-- CARD-ITEM-END -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Hero from '../components/shared/Hero'
export default {
  components: { Hero }
}
</script>

<style scoped lang="scss">
// card item
.card-image:hover {
  cursor: pointer;
  opacity: 0.9;
}
.price-box {
  text-align: right;
  .price {
    color: gray;
    font-size: 16px;
    text-decoration: line-through;
  }
  .disc-price {
    font-size: 21px;
    font-weight: bold;
  }
}
// card item end

// Home page
.links {
  padding-top: 15px;
}
</style>
