<template>
  <div>

    <v-container id="text">
      <v-text-field class="ma-5" v-model="currentNote.title"> </v-text-field>

      <div id="bgEditor">
        <VueEditor
          @ready="setQuill($event)"
          id="editor1"
          @text-change="autosave()"
          v-model="currentNote.text"
          :editorOptions="editorSettings"
        />
      </div>
      <Footer
        @updateCurrentId="$emit('updateCurrentId', '')"
        @save="saveNote()"
        @downloadTxt="downloadTxt()"
        @downloadHTML="downloadHTML()"
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
import { debounce } from "debounce";
import { truncate } from "lodash";
import { saveAs } from "file-saver";
//import ImageResize from "quill-image-resize-module";

//Quill.register("modules/imageResize", ImageResize);


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
      isSaved: "Not Saved",
      quillEditor: null,

      //alert data:
      alert: false,
      alertType: "success",
      alertText: "",

      editorSettings: {
        modules: {
         // imageResize: {}
        }
      }
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
    downloadTxt() {
      let text = this.quillEditor.getText();
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      saveAs(blob, this.currentNote.title + ".txt");
    },
    downloadHTML() {
      const blob = new Blob([this.currentNote.text], { type: "text/html" });
      saveAs(blob, this.currentNote.title + ".html");
    },
    setQuill(event) {
      this.quillEditor = event;
    },

    autosave() {
      this.isSaved = "Not Saved";
      if (this.currentNoteId != "") {
        this.debouncedSave();
      }
    },
    debouncedSave: debounce(function () {
      this.saveNote();
    }, 1500),

    checkTitle() {
      if (this.currentNote.title == "" || !this.currentNote.title) {
        let text = this.quillEditor.getText();
        this.currentNote.title = truncate(text, {
          lenght: 32,
        });
      }
    },

    checkText() {
      if (this.currentNote.text == "" || !this.currentNote.text) {
        return false;
      } else {
        return true;
      }
    },

    saveNote() {
      this.isSaved = "Saving...";
      //revisa que haya texto en text area, si no hay, manda alerta, luega direcciona a create o a updateNote
      if (this.checkText()) {
        this.checkTitle();
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

    async create() {
      if (this.currentNoteId == "") {
        await db
          .collection("Notes")
          .add({
            title: this.currentNote.title,
            text: this.currentNote.text,
            created: Timestamp.now(),
          })
          .then((docRef) => {
            this.newNoteId = docRef.id;
            this.isSaved = "Saved";
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
    async updateNote() {
      await db
        .collection("Notes")
        .doc(this.currentNoteId)
        .set({
          title: this.currentNote.title,
          text: this.currentNote.text,
          created: this.currentNote.created,
          updated: Timestamp.now(),
        })
        .then(() => {
          this.isSaved = "Saved";
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
};
</script>
<style>
#bgEditor {
  background-color: white;
}
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>