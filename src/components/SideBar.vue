<template>
  <header class="sidebar">
    <nav class="nav" aria-label="Main">
      <ul class="list" aria-label="Features">
        <li>
          <!-- TASKS -->
          <router-link class="link" to="/tasks-tracker">
            <svg>
              <defs>
                <path id="tasks" d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-4 7h-8v1h8v-1zm0 5h-8v1h8v-1zm0 5h-8v1h8v-1zm-10.516-11.304l-.71-.696-2.553 2.607-1.539-1.452-.698.71 2.25 2.135 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304z" />
              </defs>
              <use xlink:href="#tasks" class="hoverable-icon" />
              <use xlink:href="#tasks" class="shade-icon" />
            </svg>
            <span>Tasks Tracker</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.sidebar {
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.2);
  padding-block-start: 1.3rem;
  background-color: var(--clr-primary);
}

.list {
  display: flex;
  flex-direction: column;
}

.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 6.5rem;
  height: 5rem;
  margin: 0.8rem 0.3rem;
  transform: translateX(-100%);
}

.link svg {
  width: 24px;
  height: 24px;
  overflow: visible;
}

.link svg .hoverable-icon {
  fill: var(--clr-accent);
  transition: 0.3s fill ease-in-out, 0.3s transform ease-in-out;
  transform-origin: 50% 50%;
}

.link.router-link-exact-active svg .hoverable-icon {
  fill: var(--clr-secondary);
}

.link:not(.router-link-exact-active):hover .hoverable-icon {
  transform: scale(1.25, 1.25);
  fill: var(--clr-accent);
}

.link svg .shade-icon {
  opacity: 0;
  fill: #d3d3d3;
  transition: 0.3s fill ease-in-out, 0.3s transform ease-in-out;
}

.link:not(.router-link-exact-active):hover .shade-icon {
  transform: translate(8px, 8px);
  opacity: 0.125;
}

.link:nth-of-type(1) {
  animation: 1s slide-in ease-in-out forwards;
}

.link:nth-of-type(2) {
  animation: 1s slide-in 0.3s ease-in-out forwards;
}

.link:nth-of-type(3) {
  animation: 1s slide-in 0.6s ease-in-out forwards;
}

span {
  color: var(--clr-accent);
  font-size: 0.7rem;
  margin-block-start: 0.7rem;
  transition: 0.5s color ease-in-out;
}

.link.router-link-exact-active span {
  color: var(--clr-secondary);
}

@keyframes slide-in {
  to {
    transform: translateX(0);
  }
}
</style>
