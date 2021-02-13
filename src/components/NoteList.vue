<template>
  <div>
      <v-container>

        <!-- LIST -->
        <v-list two-line>
          <v-list-item-group               class="rounded-xl"
>
            <template v-for="(note, index) in notes">
              <v-list-item 
              :key="note.id"
              >
                <template >
                  <v-list-item-content @click="handler(note)">
                    <v-list-item-title v-text="note.title"></v-list-item-title>

                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="note.text"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-text="note.created_at">
                    </v-list-item-action-text>
                  </v-list-item-action>
                </template>
                <v-list-item-action>
                  <v-btn @click="$emit('deleteNote', note.id)" icon>
                    <v-icon color="grey lighten-1">mdi-delete </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider
                v-if="index < notes.length - 1"
                :key="index"
              ></v-divider>
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
    };
  },

  methods: {
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

