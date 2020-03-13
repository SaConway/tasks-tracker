<template>
  <div class="notes">
    <NoteListItem
      v-for="(note, index) in notes"
      :key="note.date"
      :note="note"
      v-bind:style="{ animation: `fade-in 0.5s ${index * 0.3}s ease-in-out forwards` }"
    />
  </div>
</template>

<script>
import { notesStore } from "../store/notesStore";
import NoteListItem from "../components/NoteListItem";

export default {
  components: {
    NoteListItem
  },
  data() {
    return {
      notes: notesStore.state.notes
    };
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
.notes {
  padding-bottom: 2.5rem;
  margin-top: 3rem;
  columns: 5;
  column-gap: 10px;
}
</style>