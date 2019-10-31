<template>
  <form @input="emitFormdata" >
    
    <div class="field">
      <label class="title m-b-sm">Time</label>
      <vue-timepicker @change="changeTime($event, 'time')" ></vue-timepicker>
      <div v-if="$v.form.time.$error">
        <span v-if="!$v.form.time.required" class="help is-danger">Time is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">Please Choose the Category.</label>
      <div class="m-b-lg">
        <div class="select">
          <!-- TODO: Get Here Categories -->
          <select v-model="form.category" 
                  @blur="$v.form.category.$touch()"
                  @change="emitFormdata">
            <option v-for="category of categories"
                    :value="category"
                    :key="category.id">{{category.name}}</option>
          </select>
        </div>
        <div v-if="$v.form.category.$error">
          <span v-if="!$v.form.category.required" class="help is-danger">Category is required</span>
        </div>
      </div>
    </div>
  </form>
</template>

 <script>
  import { required } from 'vuelidate/lib/validators'
  import VueTimepicker from 'vue2-timepicker'
  export default {
    components: {
      VueTimepicker
    },
    data () {
      return {
        form: {
          time: null,
          category: null
        }
      }
    },
    validations: {
      form: {
        category: { required },
        time: { required }
      }
    },
    computed: {
      categories () {
        return this.$store.state.categories.items
      }
    },
    methods: {
      changeTime({data}, field){
        const minutes = data.mm || '00'
        const hours = data.HH || '00'
        this.form[field] = hours + ':' + minutes
        this.emitFormdata()
      },
      emitFormdata () {
        this.$emit('stepUpdated', {data: this.form,isValid: !this.$v.$invalid})
      }
    }
  }
</script>

 <style scoped>
  .time-picker {
    display: block;
  }
</style>