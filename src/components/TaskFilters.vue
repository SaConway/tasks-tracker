<template>
  <div class="filters">
    <button
      v-for="filter in filters"
      :key="filter.type"
      :class="{ selected: selectedFilter === filter.type }"
      class="filter-btn"
      @click="setFilter(filter.type)"
    >{{ filter.title }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: [],
      selectedFilter: "all"
    };
  },
  created() {
    this.filters = [
      { type: "all", title: "All" },
      { type: "unfinised-only", title: "Unfinished Only" }
    ];
  },
  methods: {
    setFilter(filter) {
      this.selectedFilter = filter;
      this.$emit("filter-selected", filter);
    }
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  align-items: flex-start;
}

.filter-btn {
  color: var(--accent-color);
  padding: 0.4rem 1rem;
  margin: 0 0.3rem;
  border: 1px solid currentColor;
  border-radius: var(--border-radius);
  font-size: 0.7rem;
}

.filter-btn:focus {
  outline: none;
}

.filter-btn.selected {
  animation: 0.3s selected forwards;
}

/* Animatinos */

@keyframes selected {
  50% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0);
    background-color: var(--secondary-color);
  }
}
</style>