<template>
  <textarea class="new-note" placeholder="enter a new note.." ref="noteInput" v-autoresize-height @keyup.ctrl.enter="addNote"></textarea>
</template>

<script>
import { AutoResizeHeight } from '@/directives/AutoResizeHeight'
import { notesStore } from '@/store/notes'

export default {
  directives: {
    AutoResizeHeight
  },
  mounted() {
    this.$refs.noteInput.focus()
  },
  methods: {
    addNote() {
      if (this.$refs.noteInput.value != '') {
        const newNote = {
          text: this.$refs.noteInput.value,
          date: new Date().getTime()
        }

        notesStore.addNote(newNote)

        this.$refs.noteInput.value = ''
      }
    }
  }
}
</script>

<style scoped>
textarea.new-note {
  width: 30rem;
  font-size: var(--font-size-normal);
  background-color: #eee;
  padding: 0.5rem;
  border: 1px solid #222831;
  border-radius: var(--border-radius);
  overflow-y: hidden;
  resize: none;
}
</style>
