<template>
<div class='menu-create'>
  <create-or-edit :isEdit='isEdit'></create-or-edit>
</div>
</template>

<script>
import CreateOrEdit from './commpents/createOrEdit'

export default {
  name: 'MenuCreate',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      isEdit: true
    }
  }
}

</script>
<style  lang='scss' scoped></style>
