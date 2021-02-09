
  <template>
  <v-card >
    <v-footer
    fixed
    >
       <v-spacer></v-spacer>
 
    <v-btn class="ma-2" @click='$emit("updateCurrentId")'> NewNote </v-btn>
    <v-btn class="ma-2" @click='$emit("save")'> Save </v-btn>
   
    </v-footer>

  </v-card>
</template>


<script>
export default {};
</script>

<style>
</style>