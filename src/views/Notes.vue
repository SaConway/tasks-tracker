<template>
  <div class="container">
    <AddNote />
    <Notes />
  </div>
</template>

<script>
import AddNote from "../components/AddNote";
import Notes from "../components/Notes";

export default {
  components: {
    AddNote,
    Notes
  }
};
</script>

<style scoped>
</style>
