<template>
  <div>
    <v-main>
      <v-container>
        <h2>Read</h2>
        <h2>{{ currentNote }}</h2>

        <!-- LIST -->
        <v-list two-line>
          <v-list-item-group multiple>
            <template v-for="(note, index) in notes">
              <v-list-item :key="note.title" 
              v-on:click="currentNote = note;
              openRead()">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="note.title"></v-list-item-title>

                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="note.text"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-text="note.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-text="note.created_at">
                    </v-list-item-action-text>
                  </v-list-item-action>
                </template>
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
    </v-main>
  </div>
</template>

<script>
//import Read from "./Read.vue"

export default {
  props: ["notes"],

  data() {
    return {
      test: "unchanged",
      currentNote: {},
    };
  },
  methods:{
    
    
        
  },
};
</script>

<style>
</style>

