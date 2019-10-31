<template>
  <div>
    <h1 class="title m-b-sm">What's your new Exercice </h1>
    <div class="m-b-lg">
      <span class="subtitle">Name</span>
      <input  @input="emitFormdata" 
              v-model="form.title"
              @blur="$v.form.title.$touch()" 
              type="text" 
              class="input">
      <div v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="help is-danger">Title is required</span>
      </div>
    </div>
  </div>
</template>

 <script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
         form: {
           title: null
        }
      }
    },
    validations: {
      form: {
        title: {required}
      }
    },
    methods: {
      emitFormdata () {
        this.$emit('stepUpdated', {data: this.form,isValid: !this.$v.$invalid})
      }
    }
  }
</script>

 <style scoped>