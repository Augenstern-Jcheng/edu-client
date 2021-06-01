<template>
  <div class="course">
    <course-list></course-list>
  </div>
</template>

<script>
import courseList from './components/list'
export default {
  name: 'course',
  components: {
    courseList
  }
}
</script>
<style lang='scss' scoped>
.createBtn{
  margin-left: 100px;
}
</style>
