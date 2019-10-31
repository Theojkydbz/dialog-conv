<template>
  <div class="exercice-create-form">
    <div class="current-step is-pulled-right">
      {{currentStep}} of {{allStepsCount}}
    </div>
    <!-- Form Steps -->
    <keep-alive>
      <component  :is="currentComponent"
                  @stepUpdated="mergeStepData" 
                  ref="currentComponent"
                  :exerciceToCreate="form" />
    </keep-alive>

     <progress  class="progress" 
                :value="currentProgress" 
                max="100">{{currentProgress}}</progress>
    <div class="controll-btns m-b-md">
      <button v-if="currentStep > 1" @click="moveToPreviousStep" class="button is-primary m-r-sm">Back</button>
      <button v-if="currentStep < allStepsCount" @click="moveToNextStep" :disabled="!canProceed" class="button is-primary">Next</button>
      <!-- Confirm Data -->
      <button v-else
              @click="emitExerciceConfirm"
              class="button is-primary">Confirm</button>
    </div>
    <!-- Just To See Data in the Form -->
    <!-- <pre><code>{{form}}</code></pre> -->
  </div>
</template>

 <script>
  import ExerciceTitle from './ExerciceTitle'
  import ExerciceDetail from './ExerciceDetail'
  import ExerciceDescription from './ExerciceDescription'
  import ExerciceConfirmation from './ExerciceConfirmation'
  export default {
    components: {
      ExerciceTitle,
      ExerciceDetail,
      ExerciceDescription,
      ExerciceConfirmation
    },
    data () {
      return {
        currentStep: 1,
        canProceed: false,
        formSteps:['ExerciceTitle', 'ExerciceDetail', 'ExerciceDescription', 'ExerciceConfirmation'],
        form: {
          title: null,
          category: null,
          image: null,
          shortInfo: null,
          description: null,
          time: null
        }
      }
    },
    computed: {
      currentComponent(){
        return this.formSteps[this.currentStep - 1]
      },
      allStepsCount(){
        return this.formSteps.length
      },
      currentProgress(){
        return (100 / this.allStepsCount) * this.currentStep
      }
    },
    methods: {
      emitExerciceConfirm(){
        this.$emit('exerciceConfirmed', this.form)
      },
      moveToNextStep () {
        this.currentStep++
        this.$nextTick(()=>{
          this.canProceed = !this.$refs['currentComponent'].$v.$invalid
        })
      },
      moveToPreviousStep () {
        this.currentStep--
        this.canProceed = true
      },
      mergeStepData (step) {
        this.form = {...this.form, ...step.data}
        this.canProceed = step.isValid
      }
    },
  }
</script>

 <style scoped>
  .ExerciceLocation-create-form {
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 840px;
    padding: 24px 16px 8px;
    width: 100%;
  }
</style>