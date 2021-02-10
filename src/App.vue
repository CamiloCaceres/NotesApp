<template>
  <v-app>
    <v-app-bar app dense color="primary" dark>
      <div class="d-flex align-center">
        <v-icon x-large>mdi-book-open-outline</v-icon>
        <h2 class="ma-2">Notes App</h2>
      </div>

      <v-spacer> </v-spacer>
      <v-btn
        v-show="editor"
        class="ma-2"
        color="accent"
        v-on:click="editor = !editor"
      >
        Notes List
      </v-btn>
      <v-btn
        v-show="!editor"
        v-on:click="editor = !editor"
        class="ma-2"
        color="accent"
      >
        Editor
      </v-btn>
    </v-app-bar>

    <v-main>
 

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
            @deleteNote="deleteNote($event)"
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
import { truncate } from "lodash";

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

  }),

  methods: {
    //Work on this
    createTitle: function () {
      if (this.currentNote.title == "" || !this.currentNote.title) {
         (this.currentNote.title = ""),
         (this.currentNote.title = truncate(this.currentNote.text, {
          length: 24,
          }));
      }
    },
    deleteNote: function (id) {
      db.collection("Notes")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    setCurrentNote: function (id) {
      if (id == "") {
        this.currentNoteId = id;
        this.currentNote = {};
      } else {
        this.currentNoteId = id;
        this.getCurrentNote(id);
      }
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
      } else if (this.currentNoteId == "") {
        this.currentNote = {};
      }
    },
  },
  firestore: {
    notes: db.collection("Notes"),
  },
};
</script>
