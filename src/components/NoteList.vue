<template>
  <div>
    <v-container>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline"> Sure? </v-card-title>
 <v-card-text>     <v-text-field
                  v-model="pass"
                ></v-text-field></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="dialog = false"> Cancel </v-btn>
            <v-btn color="error" text @click="confirmDelete()"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- LIST -->
      <v-list>
        <v-list-item-group class="rounded-xl">
          <template v-for="(note, index) in notes">
            <v-list-item :key="note.id">
              <template>
                <v-list-item-content @click="handler(note)">
                  <v-list-item-title>
                    <h3>{{ note.title }}</h3>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="note.created_at">
                  </v-list-item-action-text>
                </v-list-item-action>
              </template>
              <v-list-item-action>
                <v-btn @click="startDialog(note.id)" icon>
                  <v-icon color="grey lighten-1">mdi-delete </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider v-if="index < notes.length - 1" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
      <!-- LIST -->
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["notes"],

  data() {
    return {
      test: "unchanged",
      currentNote: {},
      commp: "",
      dialog: false,
      deleteId: "",
      pass :"",
    };
  },

  methods: {
    startDialog(id) {
      this.deleteId = id;
      this.dialog = true;
    },
    confirmDelete(){
      if(this.pass == "de"){
      this.$emit('deleteNote', this.deleteId)
      this.dialog = false}
    },
    setCurrentNote: function (note) {
      this.currentNote = note;
    },

    sendCurrentNote: function (currentNote) {
      this.$emit("updateCurrentNote", currentNote.id);
    },
    openEditor: function () {
      this.$emit("openEditor", true);
    },
    handler: function (note) {
      this.setCurrentNote(note), this.sendCurrentNote(note), this.openEditor();
    },
  },
};
</script>

