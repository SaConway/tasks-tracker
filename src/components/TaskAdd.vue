<template>
  <form class="form">
    <!-- NEW TASK INPUT -->
    <input class="new-task" type="text" placeholder="enter a new task.." ref="taskInput" v-autoresize-width="500" @keyup.enter="addTask" />

    <!-- TAGS -->
    <div class="tags">
      <template v-if="!showNewTagInput" @keyup.enter="addTask">
        <!-- TAG -->
        <label class="tag-container" v-for="tag in tags" :key="tag">
          <input class="tag-input" v-model="selectedTag" type="radio" :value="tag" :aria-label="tag" />
          <span class="tag" aria-hidden="true">{{ tag }}</span>
        </label>
      </template>

      <!-- NEW TAG BUTTON -->
      <button v-if="!showNewTagInput" class="tag" @click="addTag">+ Tag</button>

      <!-- NEW TAG INPUT -->
      <input v-if="showNewTagInput" class="tag" type="text" placeholder="enter a tag" ref="newTagEle" v-model="newTag" v-autoresize-width="175" @keyup.enter="addTask" />
    </div>
  </form>
</template>

<script>
import { AutoReszeWidth } from '@/directives/AutoResizeWidth'
import { tasksStore } from '@/store/tasks'
import { tagsStore } from '@/store/tags'

export default {
  data() {
    return {
      selectedTag: '',
      newTag: '',
      showNewTagInput: false
    }
  },
  props: {
    tags: {
      type: Array,
      default: () => {
        return []
      },
      required: false
    }
  },
  directives: {
    AutoReszeWidth
  },
  mounted() {
    this.$refs.taskInput.focus()
  },
  methods: {
    addTask() {
      if (this.$refs.taskInput.value != '') {
        const newTask = {
          text: this.$refs.taskInput.value,
          done: false,
          date: new Date().getTime(),
          duration: null,
          tags: [this.newTag || this.selectedTag]
        }

        tasksStore.addTask(newTask)

        this.$refs.taskInput.value = ''
        this.$refs.taskInput.style.width = '500px'

        if (this.newTag) {
          tagsStore.addTag(this.newTag)
        }

        this.showNewTagInput = false
        this.newTag = ''
        this.selectedTag = ''

        this.$refs.taskInput.focus()
      }
    },
    addTag() {
      this.showNewTagInput = true

      this.$nextTick(() => {
        this.$refs.newTagEle.focus()
      })
    }
  }
}
</script>

<style scoped>
.form {
  background-color: var(--clr-accent);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  max-width: calc(500px + 1rem);
}

.new-task {
  border: none;
  background-color: #eee;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  font-size: var(--font-size-normal);
}

.tags {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: var(--clr-accent);
}

.exist-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-container {
  flex-shrink: 0;

  position: relative;
}

.tag-input {
  appearance: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 100vmax;
  padding: 0;
  margin: 0;
}

.tag {
  display: inline-block;
  color: var(--clr-primary);
  background-color: transparent;
  border: 1px solid var(--clr-primary);
  border-radius: 100vmax;
  font-size: 0.65rem;
  padding: 0.25rem 0.5rem;
}

.tag-input:checked + .tag {
  background: var(--clr-secondary);
  color: var(--clr-accent);
}
</style>
