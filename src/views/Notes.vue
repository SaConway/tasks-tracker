<template>
  <div class="container">
    <NoteAdd />
    <NoteList />
  </div>
</template>

<script>
import NoteAdd from "../components/NoteAdd";
import NoteList from "../components/NoteList";

export default {
  components: {
    NoteAdd,
    NoteList
  }
};
</script>

<style scoped>
</style>
