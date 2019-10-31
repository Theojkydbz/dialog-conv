<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="'/'" class="navbar-item" >
        <h1 class="title is-4">Emorkshop</h1>
      </router-link>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-item">
            <img class="navbar-logo" src="@/assets/categorie.png"/>
            Categories
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              DISCOVER
            </a>
            <a class="navbar-item">
              DEFINE
            </a>
            <a class="navbar-item">
              IDEATE
            </a>
            <a class="navbar-item">
              PRODUCTION
            </a>
            <a class="navbar-item">
              EVALUATE
            </a>
          </div>
        </div>
        <router-link :to="'/'" class="navbar-item">
          <img class="navbar-logo" src="@/assets/fav.png"/>
          Favorites
        </router-link>

        <router-link :to="{name: 'PageExerciceFind'}" class="navbar-item">
          <img class="navbar-logo" src="@/assets/trends.png"/>
          Trends
        </router-link>

        
      </div>
      <div class="level-item">
        <input type="text" class="input" placeholder="Exercices...">
      </div>
      <div v-if="isAuthResolved" class="navbar-end">
        <div class="navbar-item">
          <div v-if="user">
           {{user.username}}
          </div>
          
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          
          <a class="">
            <div class="image is-32x32">
              <img class="is-rounded" :src="user.avatar">
            </div>
          </a>
          <div class="navbar-dropdown">
            
            <router-link :to="{name: 'PageProfile'}" class="navbar-item">
                Profile
            </router-link>
            <hr class="navbar-divider">
            <a @click.prevent="logout" class="navbar-item">
                Logout
            </a>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown ">
          <div class="buttons">
            <router-link :to="{name: 'PageRegister'}" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link :to="{name: 'PageLogin'}" class="button is-light">
              Log in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed:{
      ...mapGetters({
        'user': 'auth/authUser'
      }),
      isAuthResolved () {
        return this.$store.state.auth.isAuthResolved
      }
    },
    methods:{
      logout () {
        this.$store.dispatch('auth/logout')
      }
      
    }
  }
</script>

<style scoped>

.navbar-dropdown{
    margin-top: 0vh;
    left: -5vw;
}
.navbar-logo{
  margin: 10px;
  margin-right: 15px;
}
.navbar-link{
  color: #868686
}
.navbar-item{
  color: #868686
}
.button.is-light{
  color: #868686
}
h1{
  color: #868686
}
input {
  border-color:  #fff;
  -webkit-appearance: none; box-shadow: none !important; 
  }
:-webkit-autofill { 
  color: #F3F3F3 !important; 
  }
.input:focus{ 
  border-color:  #fff;
  }

  .input:hover{ 
  border-color:  #fff;
  }
.level-item input{
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;

  
  border-radius: 50px;
  background-color:#F3F3F3;
  background-image: url("../../assets/search.png");
  background-repeat: no-repeat;
  background-position: 90%; 

  text-indent: 10px
}
.input, .textarea, .select select {
  color: #868686;
}


</style>