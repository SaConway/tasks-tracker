<template>
  <div class="container">
    <textarea
      placeholder="enter a new note.."
      v-model="note"
      ref="notetexterea"
      @keyup.ctrl.enter="addNote"
      v-autoresize
      class="new-note"
    ></textarea>

    <div class="notes">
      <div
        v-for="(note, index) in notes"
        :key="note.date"
        class="note"
        v-bind:style="{ animation: `fade-in 0.5s ${index * 0.3}s ease-in-out forwards` }"
      >
        <button @click="deleteNote(index)" class="delete-note">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
            />
          </svg>
        </button>
        <textarea v-model="note.text" v-autoresize></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: "",
      notes: JSON.parse(localStorage.getItem("notes")) || []
    };
  },
  mounted() {
    this.$refs.notetexterea.focus();
  },
  methods: {
    addNote() {
      if (this.note != "") {
        const newNote = { text: this.note, date: new Date().getTime() };
        this.notes.splice(0, 0, newNote);
        this.note = "";
      }
    },
    deleteNote(index) {
      window.Vue.delete(this.notes, index);
    }
  },
  watch: {
    notes: {
      handler: function(val) {
        localStorage.setItem("notes", JSON.stringify(val));
      },
      deep: true
    }
  },
  directives: {
    autoresize: {
      inserted: function(el) {
        el.style.height = el.scrollHeight + "px";

        function OnInput() {
          this.style.height = "auto";
          this.style.height = this.scrollHeight + "px";
        }

        el.addEventListener("keyup", OnInput);
        el.addEventListener("change", OnInput);
      }
    }
  }
};
</script>

<style scoped>
textarea {
  padding: 0.5rem;
  border-radius: var(--border-radius);
  resize: none;
  font-size: var(--normal-font-size);
}

textarea.new-note {
  width: 30rem;
  border: 1px solid #222831;
  background-color: #eee;
  vertical-align: middle;
  overflow-y: hidden;
}

button.delete-note {
  position: absolute;
  top: 5px;
  left: 2px;
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
}

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

.note textarea {
  background-color: transparent;
  color: var(--accent-color);
  width: 100%;
  padding: 2.5rem 1rem;
  overflow-y: hidden;
  border: 1px solid var(--accent-color);
  border-radius: var(--border-radius);
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
