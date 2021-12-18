<template>
  <div class="filters">
    <button :class="{ selected: selectedFilter === filter.type }" class="filter-btn" v-for="filter in filters" :key="filter.type" @click="setFilter(filter.type)">{{ filter.title }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: [],
      selectedFilter: 'all'
    }
  },
  created() {
    this.filters = [
      { type: 'all', title: 'All' },
      { type: 'unfinished-only', title: 'Unfinished Only' }
    ]
  },
  methods: {
    setFilter(filter) {
      this.selectedFilter = filter
      this.$emit('filter-selected', filter)
    }
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  align-items: flex-start;
}

.filter-btn {
  color: var(--clr-accent);
  padding: 0.4rem 1rem;
  margin: 0 0.3rem;
  border: 1px solid currentColor;
  border-radius: var(--border-radius);
  font-size: 0.7rem;
}

.filter-btn:active {
  transform: translateY(3px);
}

.filter-btn.selected {
  background-color: var(--clr-secondary);
}
</style>
