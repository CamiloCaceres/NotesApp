
  <template>
  <v-card >
    <v-footer
    fixed
    id="text"
    >
    <h4>Status: {{ isSaved }}</h4>
       <v-spacer></v-spacer>
 
    <v-btn class="ma-2" @click='$emit("updateCurrentId")' icon> <v-icon> mdi-file-plus</v-icon> </v-btn>
    <v-btn class="ma-2" @click='$emit("save")' icon> <v-icon> mdi-check</v-icon></v-btn>
   
    </v-footer>

  </v-card>
</template>


<script>
export default {
  data (){
    return{
    }
  },
  props: ["isSaved"],

};
</script>

<style>
#text {
background-color: white;
}
</style>