<template>
  <div class="column is-one-third">
    <div class="card large">
      <div class="card is-hoverable large">
      <router-link :to="{name: 'PageExerciceDetail', params: {id: exercice._id}}" class="card-exercice-link" >
        <div class="card-image">
          <figure class="image is-4by3">
              <!-- get here exercice image -->
              <img :src="exercice.image" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="level m-b-md">
            <div class="media-left">
              <div class="level-item has-text-centered">
                <div>
                  <!-- get here startDate, don't worry about formatting -->
                  <p class="title">{{exercice.startDate | formatDate('MMM')}}</p>
                  <p class="title">{{exercice.startDate | formatDate('D')}}</p>
                </div>
                </div>
              </div>
            </div>
              <div class="media-content">
                <!-- get here exercice title -->
                  <p class="title is-4 no-padding is-marginless">{{exercice.title}}</p>
                  <!-- get here exercice category -->
                  <span class="tag is-success">{{exercice.category.name | capitalize}}</span>
                  <!-- get here exercice location -->
                  <p class="subtitle is-7">{{exercice.location}}</p>
              </div>
              <div class="content">
              <!-- get here exercice description -->
              {{exercice.description}}
              <div class="background-icon"><span class="icon-barcode"></span></div>
            </div>
          </div>
          </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        exercice:{
        required: true,
        type: Object
        },
    }

}
</script>

<style scoped lang="scss">
  .card-exercice-link{
    color: black;
  }
  .is-hoverable {
    transition: 0.3s;
     &:hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      -moz-box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
      box-shadow: 2px 4px 15px -2px rgba(189,189,189,1);
    }
  }

</style>