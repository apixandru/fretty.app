<template>
  <section class="section" style="padding: 0">
    <div
      class="container"
      v-for="editor in editors"
      v-bind:key="editor.id"
      style="max-width: 100%"
    >
      <!--<note-select />-->
      <Editor :initial="editor.tuning" v-on:remove-fretboard="remove(editor.id)" />
    </div>
    <div class="container has-text-centered">
      <a @click="add">+ Add fretboard</a>
    </div>
  </section>
</template>

<script>
import Editor from "./components/Editor.vue";

export default {
  name: "App",
  components: {
    Editor,
  },
  data() {
    return {
      editors: [
        {
          id: 1,
          tuning: "E2 A2 D3 G3 B3 E4",
        },
        {
          id: 2,
          tuning: "E A D G B E",
        },
      ],
    };
  },
  methods: {
    add: function () {
      this.editors.push({
        id: Math.max(...this.editors.map((e) => e.id)) + 1,
        tuning: "E A D G B E",
      });
    },
    remove: function (editor) {
      let editors = this.editors.filter(e => e.id === editor);
      if (editors.length !== 1) {
        return;
      }
      const index = this.editors.indexOf(editors[0]);
      if (index > -1) {
        this.editors.splice(index, 1);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
