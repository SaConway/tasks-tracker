<template>
  <div class="filters">
    <button :class="{ selected: selectedFilter === filter.type }" class="filter-btn" v-for="filter in filters" :key="filter.type" @click="setFilter(filter.type)">{{ filter.title }}</button>
  </div>
</template>

<script>
// IMPORTS
import ENUMS from '@/utils/enums'

export default {
  data() {
    return {
      filters: [
        { type: ENUMS.TASKS.FILTERS.ALL, title: 'All' },
        { type: ENUMS.TASKS.FILTERS.UNFINISHED_ONLY, title: 'Unfinished Only' }
      ]
    }
  },
  props: {
    selectedFilter: {
      type: String,
      required: false,
      default: ENUMS.TASKS.FILTERS.ALL
    }
  },
  methods: {
    setFilter(filter) {
      this.$emit('filter-selected', filter)
    }
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.filter-btn {
  color: var(--clr-accent);
  padding: 0.3rem 0.9rem;
  border: 1px solid currentColor;
  border-radius: var(--border-radius);
  font-size: 0.6rem;
}

.filter-btn:active {
  transform: translateY(3px);
}

.filter-btn.selected {
  background-color: var(--clr-secondary);
}
</style>
