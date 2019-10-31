<template>
  <div>
    <AppHero />
    <div v-if="pageLoader_isDataLoaded" class="container">
      <section class="section">
      <div class="m-b-lg">
        
        <router-link v-if="user" :to="{name: 'PageExerciceCreate'}" class="button is-primary is-pulled-right m-r-sm">Create Exercices</router-link>
        
      </div>
      <section class="section page-find">
        <div class="columns cover is-multiline">
          <div v-for="exercice of exercices" :key="exercice._id" class="column is-one-third" :style="{'min-height': '160px'}">
            <router-link :to="'/exercices/' + exercice._id" class="exercice-card-find"
               href="#"
               :style="{'background-image': `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${exercice.image})`}">
              <div class="exercice-card-find-content">
                
                <div class="exercice-card-find-content-info">
                  <p class="title is-4 no-padding is-marginless m-b-xs">{{exercice.title}}</p>
                  <p class="insight">{{exercice.category.name | capitalize}}</p>
                  <p class="insight">{{exercice.time}}</p>
                </div>
                <div class="exercice-card-find-content-date is-pulled-right">
                  <span class="time">{{exercice.time}}</span></span>
                </div>
                
              </div>
            </router-link>
          </div>
        </div>
        <div>
          <span v-if="!this.exercices" class="tag is-warning is-large">No exercices found :( You might try to change search criteria (:</span>
        </div>
      </section>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <CategoryItem v-for="category in categories"
                          :key="category._id"
                          :category="category" />
          </div>
        </div>
      </section>
    </div>
    <div class="container" v-else>
      <AppSpinner />
    </div>
  </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem'
import ExercicesItem from '@/components/ExercicesItem'
import { mapActions, mapState, mapGetters } from 'vuex'
import pageLoader from '@/mixins/pageLoader'

  export default {
    components:{
      CategoryItem,
      ExercicesItem
    },
    mixins: [pageLoader],
    computed: {
      ...mapGetters({
        'user': 'auth/authUser'
      }),
      ...mapState({
        exercices: (state) => state.exercices.items,
        categories: (state) => state.categories.items,
      }),
    },
    created () {

      Promise.all([this.fetchExercices(),this.fetchCategories()])
        .then(() => this.pageLoader_resolveData())
        .catch((err) => {
          console.error(err)
          this.pageLoader_resolveData()
        })
    },
    methods: {
      ...mapActions('exercices',['fetchExercices']),
      ...mapActions('categories',['fetchCategories'])
    }
  }
</script>

<style scoped lang="scss">
  .page-find {
    margin-top: 50px;
  }
  .exercice-card-find {
    width: 100%;
    height: 350px;
    position: relative;
    display: block;
    border-radius: 9px;
    text-decoration: none;
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.05);
    background: #FFFFFF;
    background-clip: content-box;
    background-size: auto 200px;
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-color: #ffffff;
    -webkit-tap-highlight-color: transparent;
    color:#6A6A6A;
    &-interest {
      position: absolute;
      bottom: 20px;
      right: 12px;
      > p {
        font-weight: bold;
      }
    }
    .insight {
      margin: 10px
    }
    .subtitle {
      color: #6A6A6A;
    }
    &-content {
      &-date {
        margin: 10px;
        width: 70px;
        text-align: center;
        border-radius: 50%;
        .info {
          display: block;
          font-size: 10px;
          font-weight: bold;
        }
        .time {
          display: block;
          color: #6A6A6A;
          font-weight: bold;
          font-size: 23px;
          margin-bottom: -5px;
        }
      }
      &-info {
        position: absolute;
        top: 200px;
        left: 10px;
        padding: 15px;
        width: 100%;
      }
    }
  }
  .text-overlay-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .lookup-prebody {
    position: relative;
  }
  .exercice-lookup {
    width: 960px;
    margin: 0 auto;
    background-color: #fafafa;
    padding: 20px;
    color: white;
  }
  .exercice-lookup-wrap {
    width: 100%;
    z-index: 2;
    position: absolute;
    top: auto;
    bottom: -42px;
  }

</style>