<template>
    <v-dialog v-model="dialog" persistent max-width="800">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" >
          <v-icon>sort</v-icon>sort
        </v-btn> 
      </template>
      <v-card>
        <v-card-title class="primary white--text headline">SORT</v-card-title>
        <v-card-text class="pb-0 ">
            <v-layout wrap>
              <v-flex xs12>
                <v-radio-group v-model="sortby" row>
                  <v-radio class="mb-3" v-for="item in keys" :key="item.val" 
                  :label="item.text" color="primary" :value="item.val"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-checkbox color="primary" label="Reverse result" v-model="isReverse"></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.native="dialog = false">cancel</v-btn>
          <v-btn color="primary" text @click.native="submit()">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    dialog:'',
    sortby: '',
    isReverse:'',
    keys:[
        {text:'default',val:'id'},
        {text:'idol',val:'idolId'},
        {text:'vocal',val:'vocalMaxAwakened'},
        {text:'dance',val:'danceMaxAwakened'},
        {text:'visual',val:'visualMaxAwakened'},
    ]
  }),
  methods:{
    submit(){
      this.$store.dispatch('sort',{sortby:this.sortby,isReverse:this.isReverse})
      this.dialog = false
    }
  }
}
</script>
 

