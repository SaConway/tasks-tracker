export const tagsStore = {
  state: {
    tags: JSON.parse(localStorage.getItem('tags')) || []
  },
  addTag(newTag) {
    // SAVE IN LOCAL STORAGE
    const tags = [...this.state.tags, newTag]
    localStorage.setItem('tags', JSON.stringify(tags))

    // SAVE IN STORE
    this.state.tags.splice(0, 0, newTag)
  }
}
