<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image  header-icon user-profile-image">
              <!-- TODO: Get user avatar here -->
              <img class="is-rounded" :src="user.avatar"/>
            </figure>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <p>
              <!-- TODO: Display user name here -->
              <span class="title is-bold">{{user.name}}</span>
              <br/>
              <!-- Here will be user update functionality -->
              <UserUpdateModal  :authUser="user"
                                @userSubmitted="updateUser" />
              <br/>
            </p>
            <!-- TODO: User Info Here if any -->
            <p class="tagline">
              {{user.info}}
            </p>
          </div>
          <!-- TODO: Set Active Tab to 'exercices' and class to 'isActive' -->
          <div @click="activeTab = 'exercices'"
               :class="{isActive: activeTab === 'exercices'}"
               class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{exercicesCount}}</p>
            <p class="stat-key">Exercices</p>
          </div>
          <!-- TODO: Set Active Tab to 'threads' and class to 'isActive' -->
          <div @click="activeTab = 'threads'"
               :class="{isActive: activeTab === 'threads'}"
               class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{threadsCount}}</p>
            <p class="stat-key">Threads</p>
          </div>
          <!-- TODO: Set Active Tab to 'posts' and class to 'isActive' -->
          <div @click="activeTab = 'posts'"
               :class="{isActive: activeTab === 'posts'}"
               class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{postsCount}}</p>
            <p class="stat-key">Posts</p>
          </div>
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'exercices' -->
      <div v-if="activeTab === 'exercices'" class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over exercices -->
        <div    v-for="exercice in exercices" :key="exercice._id"
                class="column is-3-tablet is-6-mobile">
          <!-- THREADS -->
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <!-- TODO: Display exercice Image -->
                <img :src="exercice.image"/>
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- TODO: Display exercice title -->
                  <p class="title is-4">{{exercice.title}}</p>
                  <!-- TODO: Display Category name -->
                  <p class="subtitle is-6">
                    <span class="tag is-dark subtitle">{{exercice.category.name | capitalize}}</span>
                  </p>
                </div>
              </div>
              <div class="content">
                <!-- TODO: Display exercice shortInfo -->
                <p>
                  {{exercice.shortInfo}}
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{name: 'PageExerciceEdit', params: {exerciceId: exercice._id}}" class="card-footer-item">Edit</router-link>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'threads' -->
      <div v-if="activeTab === 'threads'" 
            class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over threads -->
        <div    v-for="thread in threads" :key="thread._id" 
                class="column is-3-tablet is-6-mobile">
          <!-- THREADS -->
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- TODO: Display thread thread title -->
                  <p class="title is-4">{{thread.title}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'posts' -->
      <div v-if="activeTab === 'posts'" class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over posts -->
        <div    v-for="post in posts" :key="post._id" 
                class="column is-3-tablet is-6-mobile">
          <!-- POSTS -->
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <!-- TODO: Display post text -->
                  <p class="title is-4">{{post.text}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
 import UserUpdateModal from '@/components/UserUpdateModal'
 import { mapState } from 'vuex'

 export default {
     components: {
      UserUpdateModal
    },
     data () {
      return {
        activeTab: 'exercices'
      }
    },
     computed:{
     ...mapState({
        user: state => state.auth.user,
        exercices: state => state.stats.exercices.data,
        threads: state => state.stats.threads.data,
        posts: state => state.stats.posts.data,
        exercicesCount: state => state.stats.exercices.count,
        threadsCount: state => state.stats.threads.count,
        postsCount: state => state.stats.posts.count
      })
    },
    created () {
      this.$store.dispatch('stats/fetchUserStats')
        .then(stats => console.log(stats))
    },
    methods: {
      updateUser ({user, done}) {
        this.$store.dispatch('auth/updateUser', user)
          .then(() => {
            this.$toasted.success('Profile Successfuly Updated', {duration: 3000})
            done()
          })
          .catch(err => {
            console.log(err)
            done()
          })
      }
    }
  }
</script>

 <style scoped>
  body {
    background: #F5F7FA
  }
   .stats-tab {
    border-bottom: 2px solid transparent;
    transition: 0.5s;
  }
   .stats-tab:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
  }
   .stats-tab.isActive {
    border-bottom: 2px solid black;
  }
   .stat-val {
    font-size: 3em;
    padding-top: 20px;
    font-weight: bold;
  }
   .stat-key {
    font-size: 1.4em;
    font-weight: 200
  }
   .section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, .2);
  }
   .container.profile {
    margin-top: 1%;
  }
   .control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
  }
   .modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada
  }
   .container.profile .profile-options .tabs ul li.link a {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #F1F1F1;
  }
</style>