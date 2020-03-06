<template>
  <div class="note">
    <button @click="deleteNote(index)" class="delete-note">
      <svg viewBox="0 0 24 24">
        <path
          d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
        />
      </svg>
    </button>
    <textarea v-model="note.text" v-autoresize-height></textarea>
  </div>
</template>

<script>
export default {
  props: ["note"]
};
</script>

<style scoped>
textarea {
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

.delete-note {
  position: absolute;
  top: 5px;
  left: 2px;
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
}

.delete-note svg {
  height: 15px;
  width: 15px;
  fill: var(--accent-color);
  transition: 0.3s transform ease-in-out;
}

.delete-note:hover svg {
  transform: scale(1.05, 1.05);
}
</style>