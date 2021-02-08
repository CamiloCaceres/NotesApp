<template>
  <div>
    <h2>{{ newNoteId }}</h2>

    <v-btn @click="create(currentNote)">CREATE! </v-btn>
    <v-btn v-on:click='$emit("updateCurrentId", "")'> NewNote </v-btn>
    <h2 v-if="error">YA EXISTE</h2>
    <v-text-field v-model="currentNote.title"> </v-text-field>

    <v-textarea
      v-model="currentNote.text"
      class="pa-3"
      name=""
      label=""
      rows="20"
    ></v-textarea>
  </div>
</template>

<script>
import { db, Timestamp } from "../db";

export default {
  props: ["currentNote", "currentNoteId"],
  data() {
    return {
      dbNotes: [],
      error: false,
      newNoteId: "",
      };
  },

  watch: {
    newNoteId: function () {
      this.$emit("updateCurrentId", this.newNoteId);
    },
  },
  methods: {
    create: function () {
      if (this.currentNoteId == "") {
        db.collection("Notes")
          .add({
            title: this.currentNote.title,
            text: this.currentNote.text,
            created: Timestamp.now(),
          })
          .then((docRef) => {
            this.newNoteId = docRef.id;
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } else {
        this.error = true;
      }
    },

  },
  firestore: {
    dbNotes: db.collection("Notes"),
  },
};
</script>

<style>
</style>