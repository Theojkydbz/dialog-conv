<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

     <div class="content">
      <div >
        <span class="result-title">
        Title
        </span>
        <p>{{exerciceToCreate.title}}</p>
      </div>
      <div>
        <span class="result-title">
        Time
        </span>
        <p>{{exerciceToCreate.time}}</p>
      </div>
      <div>
        <span class="result-title">
        Categorie
        </span>
        <p>{{exerciceToCreate.category.name}}</p>
      </div>
      <div>
        <span class="result-title">
        Image
        </span>
        <p>{{exerciceToCreate.image}}</p>
      </div>
      <div>
        <span class="result-title">
        Short Info
        </span>
        <p>{{exerciceToCreate.shortInfo}}</p>
      </div>
      <div>
        <span class="result-title">
        Description
        </span>
        <p>{{exerciceToCreate.description}}</p>
      </div>
    </div>
  </div>
</template>

 <script>
  export default { 
    props:{
      exerciceToCreate:{
        required:true,
        type:Object
      }
    },
    validations: {}
  }
</script>

 <style scoped>
  .result-title {
    font-size: 29px;
    font-weight: bold;
  }
   .result-title + p {
    font-size: 20px;
  }
</style>