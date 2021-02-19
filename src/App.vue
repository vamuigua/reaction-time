<template>
  <h1>Reaction Time ⏲️</h1>
  <div class="my-link">
    <p>
      <a href="https://github.com/vamuigua" target="_blank">By Victor Allen</a>
    </p>
  </div>
  <div class="my-link">
    <p>
      <a href="https://github.com/vamuigua/reaction-time" target="_blank"
        >Project Repo</a
      >
    </p>
  </div>
  <p>
    <i>Test your reaction skills to see how fast you are</i>
  </p>
  <button @click="start" :disabled="isPlaying">Play</button>
  <p v-if="isPlaying">Get Ready...</p>
  <Block v-if="isPlaying" :delay="delay" @end="endGame" />
  <Results v-if="showResults" :score="score" />

  <!-- Update Dialog Prompt -->
  <div class="update-dialog" v-if="prompt">
    <div class="update-dialog__content">
      A new version is found. Refresh to load it?
    </div>
    <div class="update-dialog__actions">
      <button
        class="update-dialog__button update-dialog__button--confirm"
        @click="update"
      >
        Update
      </button>
      <button
        class="update-dialog__button update-dialog__button--cancel"
        @click="prompt = false"
      >
        Cancel
      </button>
    </div>
  </div>
  <!-- End of Update Dialog Prompt -->
</template>

<script>
import Block from "./components/Block.vue";
import Results from "./components/Results.vue";

export default {
  name: "App",
  components: { Block, Results },
  data() {
    return {
      isPlaying: false,
      delay: null,
      score: null,
      showResults: false,
      prompt: false,
    };
  },
  created() {
    if (this.workbox) {
      // Notify the user if a service worker has installed but is stuck waiting to activate
      this.workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },
  methods: {
    async update() {
      this.prompt = false;
      // Send a message to the waiting service worker, instructing it to activate.
      await this.workbox.messageSW({ type: "SKIP_WAITING" });
    },
    start() {
      this.delay = 2000 + Math.random() * 5000;
      this.isPlaying = true;
      this.showResults = false;
    },
    endGame(reactionTime) {
      this.score = reactionTime;
      this.isPlaying = false;
      this.showResults = true;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444;
  margin-top: 60px;
}
button {
  background: #0faf87;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 20px;
  letter-spacing: 1px;
  cursor: pointer;
  margin: 10px;
}
button[disabled] {
  opacity: 0.2;
  cursor: not-allowed;
}

.my-link {
  margin: 0px 15px;
  display: inline-block;
}

.my-link a {
  background-color: #0faf87;
  padding: 15px;
  border-radius: 10px;
  text-decoration: none;
  color: white;
}

.my-link a:hover {
  background-color: #54be92;
}

.update-dialog {
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 12px;
  max-width: 576px;
  color: white;
  background-color: #2c3e50;
  text-align: left;
}

.update-dialog__actions {
  display: flex;
  margin-top: 8px;
}

.update-dialog__button {
  margin-right: 8px;
}

.update-dialog__button--confirm {
  margin-left: auto;
}
</style>
