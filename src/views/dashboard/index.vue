<template>
  <div class="dashboard-container">
    <Card></card>
    <Sales></Sales>
  </div>
</template>

<script>
import Card from './card'
import Sales from './sales'

export default {
  name: 'Dashboard',
  components: { Card, Sales }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
