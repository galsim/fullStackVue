<template>
  <h1>CHAT PAGE {{ user.name }}</h1>
</template>

<script>
import { mapState } from 'vuex'
export default {
  head() {
    return {
      title: `Комната ${this.user.room}`
    }
  },
  middleware: ['chat'],
  computed: mapState(['user'])
}
</script>

<style scoped></style>
