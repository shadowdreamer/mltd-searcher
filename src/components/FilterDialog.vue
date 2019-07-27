<template>
  <v-layout row justify-center>
    <v-dialog :value="value" persistent max-width="800">
      <v-card>
        <v-card-title class="primary white--text headline">FILTER</v-card-title>
        <div class="mb-0 mt-2 filter-divider"  > 
          <hr/><div> SELECTED</div><hr/>
        </div>
        <v-card-text  class="py-2">
        <div v-show="selected.length === 0 ">none selected</div>
        <v-chip v-for="(item,i) in selected" 
        class="mr-2 mb-1" @click="selected.splice(i,1)"
        :key="item.text" :color="item.color"
        dark label small>{{ item.text }}</v-chip>     
        </v-card-text>
        <template  v-for="line in  ['rarity','idolType','extraType']">
        <div class="my-0 filter-divider" :key='line+1'> 
          <hr/><div> {{line.toUpperCase()}}</div><hr/>
        </div>  
        <v-card-text class="py-1" :key='line'>
        <v-chip v-for="item in subItems[line]" 
        class="mr-2 mb-1" @click="selected.push(item)"
        :key="item.text" :color="item.color"
        v-show="!selected.includes(item)"
        dark label small>{{ item.text }}</v-chip>
        </v-card-text>
        </template>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.native="$emit('close')">cancel</v-btn>
          <v-btn color="primary" text @click.native="$store.dispatch('submit',selected);$emit('close')">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data: () => ({
    selected:[],
  }),
  computed:{
    ...mapState(['subItems'])
  },
  watch:{
    value(){
      this.selected = this.$store.state.keywords
    }
  },
  props:{
      value:Boolean
  }
}
</script>
<style>
  .filter-divider{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .filter-divider hr{
    border-color: rgba(0, 0, 0, 0.12);
    height: 0px;
    max-height: 0px;
    border-width: thin 0 0 0;
    transition: inherit;
  }
  .filter-divider hr:first-of-type{    
    width: 20px;
  }
  .filter-divider hr:last-of-type{
    flex-grow: 1
  }
  .filter-divider div{
    color:  rgba(0, 0, 0, 0.438);
    padding:0 10px;
    font-size: 12px;
  }
</style>

