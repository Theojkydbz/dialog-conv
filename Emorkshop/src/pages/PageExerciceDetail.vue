<template>
  <div v-if="pageLoader_isDataLoaded" class="exercice-detail-page">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            <!-- TODO: exercice startDate -->
            <!-- 14th January 2019 -->
            
          </h2>
          <h1 class="title">
            <!-- TODO: title -->
            <!-- Burger Lovers Exercice -->
            {{exercice.title}}
          </h1>
          <article class="media v-center">
            <figure class="media-left">
              <p class="image is-64x64">
                <!-- exerciceCreator avatar -->
                <!-- OPTIONAL: exerciceCreator avatar -->
                <img class="is-rounded" :src="exerciceCreator.avatar">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <!-- exerciceCreator name -->
                  <!-- OPTIONAL: exerciceCreator name -->
                  Created by <strong>{{exerciceCreator.name}}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="is-pulled-right">
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
              
                
                <div class="exercice-side-box-date m-b-sm">
                  <!-- TODO: exercice timeFrom - timeTo -->
                  <span>{{exercice.time}}</span> 
                </div>
                
                <div class="exercice-side-box-date m-b-sm">
                  <span>User Stories</span> 
                </div>
                <div class="exercice-side-box-date m-b-sm">
                  <span>Customer</span> 
                </div>
                
              
              <!-- Threads Start 
              :key="thread._id"-->
              <p class="menu-label">
                Q&A
              </p>
              <ul>
                <li v-for="thread in threads"
                    :key="thread._id">
                    {{thread.title}}</li>
              </ul>
              <p class="menu-label">
                Who approved it
              </p>
              <div class="columns is-multiline is-mobile">
                <!-- Joined People Images Here 
                 -->
                <div  v-for="person in exercice.joinedPeople"
                      :key="person._id"
                      class="column is-3">
                  <figure class="image is-64x64">
                    <img class="is-rounded" :src="person.avatar" alt="Image">
                  </figure>
                </div>
              </div>
              <!-- Threads Ends -->
            </aside>
          </div>
          <div class="column is-7 is-offset-1">
            <div class="content is-medium">
              <h3 class="title is-3">About the Exercice</h3>
              <!-- TODO: exercice description -->
              <p>{{exercice.description}}</p>
              <!-- Join Exercice -->
              <!-- Join Exercice, We will handle it later (: -->
              <button v-if="canApprove" 
                      @click="approveExercice"
                      class="button is-primary">Approved It</button>
              <button v-if="isApprover" @click="disapproveExercice" class="button is-danger">Leave Group</button>
              <!-- Not logged In Case, handle it later (: -->
              <button v-if="!isAuthenticated"
                      :disabled="true"
                      class="button is-warning">You need authenticate in order to join</button>
             </div>
            <!-- Thread List START -->
            <div class="content is-medium">
              <h3 class="title is-3">Q&A</h3>
              <div  v-for="thread in threads"
                    :key="thread._id" 
                    class="box">
                <!-- Thread title -->
                <h4 id="const" class="title is-3">{{thread.title}}</h4>
                <!-- Create new post, handle later -->
                <form class="post-create">
                  <div class="field">
                    <textarea class="textarea textarea-post"
                              placeholder="Write a post"
                              rows="1"></textarea>
                    <button :disabled="true" class="button is-primary m-t-sm">Send</button>
                  </div>
                </form>
                <!-- Create new post END, handle later -->
                <!-- Posts START -->
                <article  v-for="post in thread.posts"
                          :key="post._id"
                          class="media post-item">
                  <figure class="media-left is-rounded user-image">
                    <p class="image is-32x32">
                      <img class="is-rounded" :src="post.user.avatar">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content is-medium">
                      <div class="post-content">
                        <!-- Post User Name -->
                        <strong class="author">{{post.user.name}}</strong>
                        {{' '}}
                        <!-- Post Updated at -->
                        <small class="post-time">{{post.updatedAt | formatDate('LLL')}}</small>
                        <br>
                        <p class="post-content-message">{{post.text}}</p>
                      </div>
                    </div>
                  </div>
                </article>
                <!-- Posts END -->
              </div>
            </div>
            <!-- Thread List END -->
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="container" v-else>
    <AppSpinner />
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import pageLoader from '@/mixins/pageLoader'

export default {
  data () {
      return {
        threadPageNum: 1,
        threadPageSize: 5
      }
    },
  mixins: [pageLoader],
  computed: {
    ...mapState({
        exercice: (state) => state.exercices.item,
        threads: (state) => state.threads.items,
        }),

    exerciceCreator () {
      return this.exercice.exerciceCreator || {}
    },
    isAuthenticated(){
      return this.$store.getters['auth/isAuthenticated']
    },
    isExerciceOwner () {
      return this.$store.getters['auth/isExerciceOwner'](this.exerciceCreator._id)
    },
    isApprover () {
      return this.$store.getters['auth/isApprover'](this.exercice._id)
    },
    canApprove() {
      return !this.isExerciceOwner &&
              this.isAuthenticated &&
              !this.isApprover
    }
  },
  created() {
    const exerciceId = this.$route.params.id
    this.fetchExerciceById(exerciceId)
    this.fetchThreadsHandler({exerciceId})

    Promise.all([this.fetchExerciceById(),this.fetchThreads()])
        .then(() => this.pageLoader_resolveData())
        .catch((err) => {
          console.error(err)
          this.pageLoader_resolveData()
        })
  },
  methods:{
    ...mapActions('exercices',['fetchExerciceById']),
    ...mapActions('threads',['fetchThreads']),
    fetchThreadsHandler ({meetupId}) {
        const filter = {
          pageNum: this.threadPageNum,
          pageSize: this.threadPageSize
        }
         this.fetchThreads({meetupId, filter})
          .then(() => {
            this.threadPageNum++
          })
      },
    approveExercice () {
      this.$store.dispatch('exercices/approveExercice', this.exercice._id)
    },
    disapproveExercice () {
      this.$store.dispatch('exercices/disapproveExercice', this.exercice._id)
    }
  }
}
</script>

<style scoped lang="scss">
  .tag.is-warning {
    opacity: 0.5;
  }
  .exercice-detail-page {
    background-color: #f5f5f5;
    .mapouter{text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}
    .hero-body {
      background-color: white;
      border: 1px solid rgba(46,62,72,.12);
      color: white;
      background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
        > p,h1,h2, strong {
          color: #363636;
        }
      }
    .exercice-side-box {
      background-color: white;
      border-radius: 10px;
      font-size: 16px;
      padding: 15px;
    }
  }
  pre,
  .message {
    max-width: 960px;
  }
  .v-center {
    align-items: center;
  }
  li {margin: 10px}
  .hero.is-primary {
  background: linear-gradient(to top right, #524ad0 10%, #D099FA);
  }
  .box {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  }
  .box span.icon {
    float: right;
    font-size: 1.7em;
    padding: 2rem 2rem 0 0;
  }
  .is-large.fab {
    font-size: 7em;
  }
  .is-large.fas {
    font-size: 5em;
    margin-left: 0.2em;
  }
  .media-content {overflow: hidden;}
  .menu-list li a:hover {
    background: #d9d9d9;
  }
  .token.number {
    display: inline;
    padding: inherit;
    font-size: inherit;
    line-height: inherit;
    text-align: inherit;
    vertical-align: inherit;
    border-radius: inherit;
    font-weight: inherit;
    white-space: inherit;
    background: inherit;
    margin: inherit;
  }
  .footer {background-color: white;}
  // Post Create Input START
  .textarea-post {
    padding-bottom: 30px;
  }
  .post-create {
    margin-bottom: 15px;
  }
  // Post Create END
  // Thread List START
  .content {
    figure {
      margin-bottom: 0;
    }
  }
  .media-content-threads {
    background-color: #f1f1f1;
    padding: 3px 20px;
    border-radius: 10px;
    margin-right: 40px;
    width: 100px;
  }
  .media-left.user-image {
    margin: 0;
    margin-right: 15px;
  }
  .post-item {
  }
  .media + .media {
    border: none;
    margin-top: 0;
  }
  .post-content {
    margin: 0;
    &-message {
      font-size: 16px;
    }
    .author {
      font-size: 18px;
    }
    .post-time {
      font-size: 16px;
    }
  }
  .exercice-detail-page .hero-body{
    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.4)), to(rgba(255, 255, 255, 0.4))), url(https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
  }
  .container{
    color: #363636;
  }
  // Thread List END
  </style>