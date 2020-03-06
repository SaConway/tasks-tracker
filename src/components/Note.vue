<template>
  <div class="note">
    <button class="note-delete" @click="deleteNote">
      <DeleteIcon />
    </button>

    <textarea class="note-input" v-model="note.text" v-autoresize-height></textarea>
  </div>
</template>

<script>
import { notesStore } from "../store/notesStore";
import DeleteIcon from "../components/DeleteIcon";

export default {
  components: {
    DeleteIcon
  },
  props: ["note"],
  methods: {
    deleteNote() {
      notesStore.deleteNote(this.note);
    }
  }
};
</script>

<style scoped>
.note {
  width: 15rem;
  margin: 2rem 2rem 0 0;
  color: var(--accent-color);
  position: relative;
  opacity: 0;
}

.note-input {
  width: 100%;
  color: var(--accent-color);
  background-color: transparent;
  font-size: var(--normal-font-size);
  border: 1px solid var(--accent-color);
  border-radius: var(--border-radius);
  padding: 2.5rem 1rem;
  resize: none;
  overflow-y: hidden;
}

.note-delete {
  position: absolute;
  top: 5px;
  left: 2px;
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
}

.note-delete svg {
  height: 15px;
  width: 15px;
  fill: var(--accent-color);
  transition: 0.3s transform ease-in-out;
}

.note-delete:hover svg {
  transform: scale(1.05, 1.05);
}
</style>