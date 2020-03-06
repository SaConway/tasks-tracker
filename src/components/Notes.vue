<template>
  <div class="notes">
    <Note
      v-for="(note, index) in notes"
      :key="note.date"
      :note="note"
      class="note"
      v-bind:style="{ animation: `fade-in 0.5s ${index * 0.3}s ease-in-out forwards` }"
    />
  </div>
</template>

<script>
import Note from "../components/Note";

export default {
  props: ["notes"],
  components: {
    Note
  },
  methods: {
    deleteNote(index) {
      window.Vue.delete(this.notes, index);
    }
  }
};
</script>

<style scoped>
.notes {
  padding: 0 0 2.5rem 0;
  margin-top: 1rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-content: flex-start;
  max-height: calc(100vh - 7rem);
  overflow-x: auto;
}

.note {
  width: 15rem;
  margin: 2rem 2rem 0 0;
  color: var(--accent-color);
  position: relative;
  opacity: 0;
}
</style>