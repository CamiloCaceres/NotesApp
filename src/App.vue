<template>
  <v-app>
    <v-app-bar app dense color="primary" dark>
      <div class="d-flex align-center">
        <v-icon x-large>mdi-book-open-outline</v-icon>
        <h2 class="ma-2">Notes App</h2>
      </div>

      <v-spacer> </v-spacer>
      <div v-show="editor">
        <v-btn class="ma-2" color="accent" v-on:click="editor = !editor">
          Notes List
        </v-btn>
        <v-btn class="ma-2" color="accent"> Save </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <h1 v-if="currentNoteId">
        EL ID ES: {{ currentNoteId }} {{ currentNote }}
      </h1>

      <transition>
        <div v-show="editor">
          <Editor
            @updateCurrentId="setCurrentNote($event)"
            :currentNote="currentNote"
            :currentNoteId="currentNoteId"
          />
        </div>
      </transition>
      <transition>
        <div v-show="!editor">
          <NoteList
            @openEditor="editor = $event"
            @updateCurrentNote="setCurrentNote($event)"
            :notes="notes"
          >
          </NoteList>
        </div>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import NoteList from "./components/NoteList.vue";
import Editor from "./components/Editor.vue";
import { db } from "./db";

export default {
  name: "App",

  components: {
    Editor,
    NoteList,
  },

  data: () => ({
    editor: true,
    notes: [],
    currentNoteId: "",
    currentNote: {},

    //
  }),

  methods: {
    setCurrentNote: function (id) {
      this.currentNoteId = id;
      this.getCurrentNote(id);
    },
    openEditor: function () {
      this.editor = true;
    },
    getCurrentNote: function (id) {
      if (this.currentNoteId) {
        return db
          .collection("Notes")
          .doc(id)
          .get()
          .then((snapshot) => {
            const document = snapshot.data();
            this.currentNote = document;
          });
      } else {
        return "no hay aún";
      }
    },
  },
  watch: {
    currentNoteId: function () {
      if (this.currentNoteId != "") {
        this.setCurrentNote(this.currentNoteId);
      }
      else if(this.currentNoteId == ""){
        this.currentNote = {}
      }
    },
  },
  firestore: {
    notes: db.collection("Notes"),
  },
};
</script>
