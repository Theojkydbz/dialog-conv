<template>
  <div class="exercice-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <ExerciceCreateWizard @exerciceConfirmed="createExercice"/>
      </div>
    </section>
  </div>
</template>

 <script>
  import ExerciceCreateWizard from '@/components/ExerciceCreate/ExerciceCreateWizard'
  export default {
    components: {
      ExerciceCreateWizard
    },
    computed: {
      categories () {
        return this.$store.state.categories.items
      }
    },
    created () {
      if(this.categories.length === 0) {
        this.$store.dispatch('categories/fetchCategories')
      }
    },
    methods:{
      createExercice(exerciceToCreate){
        this.$store.dispatch('exercices/createExercice', exerciceToCreate)
        .then(createdExercice => {
            this.$router.push(`/exercices/${createdExercice._id}`)
          })
          .catch(err => console.log(err))
      }

    }
  }
</script>

 <style scoped lang="scss">
  .exercice-create-page {
    min-height: 100vh;
  }
</style>