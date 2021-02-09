<template>
  <div>
  <v-btn @click="checkText()"> click </v-btn>
  <h2 v-if="!isText"> NO HAY TEXTO</h2>
    <v-text-field 
    class="px-2"
    v-model="currentNote.title"> </v-text-field>
    <v-alert transition="scale-transition" v-if="alert" :type="alertType">
      {{ alertText }}
    </v-alert>
    <v-textarea
      v-model="currentNote.text"
      class="px-3"
      name=""
      label=""
      rows="20"
    ></v-textarea>

    <Footer
      @updateCurrentId="$emit('updateCurrentId', '')"
      @save="newNoteHandler()"
    />
  </div>
</template>

<script>
import Footer from "./Footer.vue";

import { db, Timestamp } from "../db";

export default {
  components: {
    Footer,
  },

  props: ["currentNote", "currentNoteId"],
  data() {
    return {
      dbNotes: [],
      error: false,
      newNoteId: "",
      isText: false,

      //alert data:
      alert: false,
      alertType: "success",
      alertText: "",
    };
  },

  watch: {
    newNoteId: function () {
      this.$emit("updateCurrentId", this.newNoteId);
    },
    alert: function () {
      setTimeout(() => {
        this.alert = false;
      }, 2000);
    },
  },
  methods: {
    //pasar a newNoteHandler y poner un return a true o false
    //borrar data: isText
    checkText: function(){
      if(this.currentNote.text == "" || !this.currentNote.text){
        this.isText = false
      }
      else{
        this.isText = true
      }
    },
    newNoteHandler: function () {
      if (this.currentNoteId == "") {
        this.create();
      } else {
        this.updateNote();
      }
    },

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
        this.alert = true;
        this.alertType = "success";
        this.alertText = "Nota creada";
      } else {
        this.alert = true;
        this.alertType = "error";
        this.alertText = "Ya existe esta nota";
      }
    },
    updateNote: function () {
      db.collection("Notes")
        .doc(this.currentNoteId)
        .set({
          title: this.currentNote.title,
          text: this.currentNote.text,
          created: this.currentNote.created,
          updated: Timestamp.now(),
        })
        .then(() => {
          this.alert = true;
          this.alertType = "success";
          this.alertText = "Nota Actualizada";
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
  firestore: {
    dbNotes: db.collection("Notes"),
  },
};
</script>

<style>
</style>