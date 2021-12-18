export default {
  state: {
    notes: JSON.parse(localStorage.getItem('notes')) || []
  },
  addNote(newNote) {
    this.state.notes.splice(0, 0, newNote)
  },
  deleteNote(note) {
    const index = this.state.notes.findIndex(n => n.date === note.date)
    window.Vue.delete(this.state.notes, index)
  }
}
