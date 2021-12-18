<template>
  <div class="container">
    <note-add />
    <note-list />
  </div>
</template>

<script>
import NoteAdd from '../components/NoteAdd'
import NoteList from '../components/NoteList'

export default {
  components: {
    NoteAdd,
    NoteList
  }
}
</script>

<style scoped></style>
