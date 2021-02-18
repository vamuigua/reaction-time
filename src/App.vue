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
    };
  },
  methods: {
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
</style>
