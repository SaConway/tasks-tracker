<template>
  <div class="nav">
    <router-link class="link" to="/tasks-tracker">
      <svg>
        <defs>
          <path
            id="tasks"
            d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-4 7h-8v1h8v-1zm0 5h-8v1h8v-1zm0 5h-8v1h8v-1zm-10.516-11.304l-.71-.696-2.553 2.607-1.539-1.452-.698.71 2.25 2.135 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304z"
          />
        </defs>
        <use xlink:href="#tasks" class="hoverable-icon" />
        <use xlink:href="#tasks" class="shade-icon" />
      </svg>
      <h3>Tasks Tracker</h3>
    </router-link>

    <router-link class="link" to="/timer">
      <svg>
        <defs>
          <path
            id="timer"
            d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z"
          />
        </defs>
        <use xlink:href="#timer" class="hoverable-icon" />
        <use xlink:href="#timer" class="shade-icon" />
      </svg>
      <h3>Timer</h3>
    </router-link>

    <router-link class="link" to="/notes">
      <svg>
        <defs>
          <path
            id="notes"
            d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm2-7h-19v19h-2v-21h21v2z"
          />
        </defs>
        <use xlink:href="#notes" class="hoverable-icon" />
        <use xlink:href="#notes" class="shade-icon" />
      </svg>
      <h3>Notes</h3>
    </router-link>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 2;
  padding-top: 1.3rem;
  background-color: var(--primary-color);
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
  fill: var(--accent-color);
  transition: 0.3s fill ease-in-out, 0.3s transform ease-in-out;
  transform-origin: 50% 50%;
}

.link.router-link-exact-active svg .hoverable-icon {
  fill: var(--secondary-color);
}

.link:not(.router-link-exact-active):hover .hoverable-icon {
  transform: scale(1.25, 1.25);
  fill: var(--accent-color);
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

h3 {
  color: var(--accent-color);
  font-size: 0.7rem;
  margin-top: 0.7rem;
  transition: 0.5s color ease-in-out;
}

.link.router-link-exact-active h3 {
  color: var(--secondary-color);
}

@keyframes slide-in {
  to {
    transform: translateX(0);
  }
}
</style>
