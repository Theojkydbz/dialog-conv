<template>
  <div>
    <div class="lookup-prebody">
      <AppHero />
      
          
            
              <div v-if="category" class="level-item">
                <button @click="cancelCategory" class="button is-danger">{{category}} X</button>
              </div>
            
    
    </div>
    <div v-if="pageLoader_isDataLoaded" class="container">
      <section class="section page-find">
        <div class="columns cover is-multiline">
          <div v-for="exercice of exercices" :key="exercice._id" class="column is-one-third" :style="{'min-height': '160px'}">
            <router-link :to="'/exercices/' + exercice._id" class="exercice-card-find"
               href="#"
               :style="{'background-image': `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${exercice.image})`}">
              <div class="exercice-card-find-content">
                <div class="exercice-card-find-content-date is-pulled-right">
                  <span class="month">{{exercice.startDate | formatDate('MMM')}}</span>
                  <span class="day">{{exercice.startDate | formatDate('D')}}</span>
                </div>
                <div class="exercice-card-find-content-info">
                  <p class="title is-4 no-padding is-marginless m-b-xs">{{exercice.title}}</p>
                  <span class="tag is-success m-b-xs">{{exercice.category.name | capitalize}}</span>
                  <p class="subtitle is-7">{{exercice.location}}</p>
                </div>
                <div class="exercice-card-find-interest">
                  <p class="subtitle is-7">{{exercice.joinedPeopleCount}}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div>
          <span v-if="!this.exercices" class="tag is-warning is-large">No exercices found :( You might try to change search criteria (:</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import pageLoader from '@/mixins/pageLoader'
  export default {
    props: {
      category: {
        required: false,
        type: String
      }
    },
    mixins: [pageLoader],
    computed: {
      exercices () {
        return this.$store.state.exercices.items
      }
    },
    created () {
      this.fetchExercices()
    },
    methods: {
      fetchExercices () {
        this.pageLoader_isDataLoaded = false
        this.$store.dispatch('exercices/fetchExercices', {filter: this.category})
        .then(() => {
            this.pageLoader_resolveData()
          })
          .catch(err => {
            this.pageLoader_resolveData()
            console.log(err)
          })
      },
      cancelCategory () {
        this.$router.push({name: 'PageExerciceFind'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-find {
    margin-top: 50px;
  }
  .exercice-card-find {
    width: 100%;
    height: 180px;
    position: relative;
    display: block;
    border-radius: 3px;
    text-decoration: none;
    box-shadow: 0 0 1px rgba(0,0,0,.05);
    background-clip: content-box;
    background-size: cover;
    background-position: 50% 20%;
    border: 1px solid rgba(0,0,0,.12);
    -webkit-tap-highlight-color: transparent;
    &-interest {
      position: absolute;
      bottom: 12px;
      right: 12px;
      > p {
        font-weight: bold;
      }
    }
    .title {
      color: white;
    }
    .subtitle {
      color: white;
    }
    &-content {
      &-date {
        margin: 10px;
        width: 70px;
        text-align: center;
        border-radius: 50%;
        .day {
          display: block;
          font-size: 21px;
          color: white;
          font-weight: bold;
        }
        .month {
          display: block;
          color: #ff5050;
          font-weight: bold;
          font-size: 23px;
          margin-bottom: -5px;
        }
      }
      &-info {
        position: absolute;
        bottom: 0;
        left: 0;
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
    background-color: #1a2238;
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