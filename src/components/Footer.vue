
  <template>
  <v-card >
    <v-footer
    fixed
    id="text"
    >
    <h4>Status: {{ savedMessage }}</h4>
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
      savedMessage: "Not Saved"
    }
  },
  props: ["isSaved"],
  watch: {
    isSaved: function (){
      if (this.isSaved == true){
        this.savedMessage = "Saved"
      }
      else{
        this.savedMessage = "Not Saved"
      }

    }
  },
};
</script>

<style>
#text {
background-color: white;
}
</style>