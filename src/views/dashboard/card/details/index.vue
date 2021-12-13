<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-svg">
      <!-- 作用域插槽     -->
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  props: ['title', 'count']
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between; /* 均匀排列每个元素 首个元素放置于起点，末尾元素放置于终点 */
  color: #d9d9d9;
}

.card-content {
  font-size: 30px;
  padding: 10px 0;
}

.card-svg {
  height: 50px;
  border-bottom: whitesmoke 1px solid;
}

.card-footer {
  padding-top: 10px;
}
</style>
