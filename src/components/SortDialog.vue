<template>
  <v-layout row justify-center>
    <v-dialog :value="value" persistent max-width="800">
      <v-card>
        <v-card-title class="primary white--text headline">SORT</v-card-title>
        <v-card-text class="pb-0 ">
            <v-layout wrap>
              <v-flex xs12 sm4 md4>
                <v-radio-group v-model="sortby" row>
                  <v-radio class="mb-3" v-for="item in keys" :key="item.val" 
                  :label="item.text" color="primary" :value="item.val"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-checkbox label="Reverse result" v-model="isReverse"></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.native="$emit('close')">cancel</v-btn>
          <v-btn color="primary" text @click.native="submit();$emit('close')">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    sortby: '',
    isReverse:'',
    keys:[
        {text:'default',val:'id'},
        {text:'idol',val:'idolId'},
        {text:'volcal',val:'volcalMaxAwakened'},
        {text:'dance',val:'danceMaxAwakened'},
        {text:'visual',val:'visualMaxAwakened'},
    ]
  }),
  props: {
    value: Boolean
  },
  methods:{
    submit(){
      this.$store.dispatch('sort',{sortby:this.sortby,isReverse:this.isReverse})
    }
  }
}
</script>
 

