<template>
  <div>
    <v-container id="text">
      <v-text-field class="ma-5" v-model="currentNote.title"> </v-text-field>

<div id="bgEditor">
      <VueEditor v-model="currentNote.text" />
      </div>
      <Footer
        @updateCurrentId="$emit('updateCurrentId', '')"
        @save="newNoteHandler()"
        :isSaved="isSaved"
      />
            <v-alert transition="scale-transition" v-if="alert" :type="alertType">
        {{ alertText }}
      </v-alert>
    </v-container>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import { VueEditor } from "vue2-editor/dist/vue2-editor.core.js";
import { db, Timestamp } from "../db";

export default {
  components: {
    Footer,
    VueEditor,
  },

  props: ["currentNote", "currentNoteId"],
  data() {
    return {
      dbNotes: [],
      error: false,
      newNoteId: "",
      isSaved: true,

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
    checkText: function () {
      if (this.currentNote.text == "" || !this.currentNote.text) {
        return false;
      } else {
        return true;
      }
    },

    newNoteHandler: function () {
      //revisa que haya texto en text area, si no hay, manda alerta, luega direcciona a create o a updateNote
      if (this.checkText()) {
        if (this.currentNoteId == "") {
          this.create();
        } else {
          this.updateNote();
        }
      } else {
        this.alert = true;
        this.alertType = "error";
        this.alertText = "El texto no puede estar vacío";
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
      } //puedo borrar este else?
      else {
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
  //puedo borrar esto?
  firestore: {
    dbNotes: db.collection("Notes"),
  },
};
</script>
<style>
#text {


}
#bgEditor{
    background-color: white,
}
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';

</style>