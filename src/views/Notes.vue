<template>
  <div class="container">
    <AddNote @add-note="addNote($event)" />

    <Notes :notes="notes" />
  </div>
</template>

<script>
import AddNote from "../components/AddNote";
import Notes from "../components/Notes";

export default {
  components: {
    AddNote,
    Notes
  },
  data() {
    return {
      notes: JSON.parse(localStorage.getItem("notes")) || []
    };
  },
  methods: {
    addNote(note) {
      if (note != "") {
        const newNote = { text: note, date: new Date().getTime() };
        this.notes.splice(0, 0, newNote);
      }
    }
  },
  watch: {
    notes: {
      handler: function(val) {
        localStorage.setItem("notes", JSON.stringify(val));
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>
