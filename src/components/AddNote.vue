<template>
  <textarea
    placeholder="enter a new note.."
    class="new-note"
    ref="noteInput"
    v-autoresize-height
    @keyup.ctrl.enter="addNote"
  ></textarea>
</template>

<script>
export default {
  mounted() {
    this.$refs.noteInput.focus();
  },
  methods: {
    addNote() {
      this.$emit("add-note", this.$refs.noteInput.value);
      this.$refs.noteInput.value = "";
    }
  }
};
</script>

<style scoped>
textarea.new-note {
  width: 30rem;
  font-size: var(--normal-font-size);
  background-color: #eee;
  padding: 0.5rem;
  border: 1px solid #222831;
  border-radius: var(--border-radius);
  overflow-y: hidden;
  resize: none;
}
</style>