<template>
  <v-layout row justify-center>
    <v-dialog :value="value" scrollable persistent max-width="800">
      <v-card>
        <v-card-title class="primary white--text headline">FILTER</v-card-title>
        <v-card-text>
          <div class="mb-0 mt-2 filter-divider"> 
            <hr/><div> SELECTED</div><hr/>
          </div>        
        <div v-show="selected.length === 0 ">none selected</div>
        <v-chip v-for="(item,i) in selected" 
        class="mr-2 mb-1" @click="selected.splice(i,1)"
        :key="item.text" :color="item.color?item.color:{
          1:'red',
          2:'blue lighten-1',
          3:'yellow darken-2'
        }[item.idolType]"
        dark label small>{{ item.text }}</v-chip>
        </v-card-text>   
        <v-card-text>
        <template  v-for="line in  ['rarity','idolType','extraType','customTag']">
        <div class="my-0 filter-divider" :key='line+1'> 
          <hr/><div> {{line.toUpperCase()}}</div><hr/>
        </div> 

        <div class="py-1" :key='line'>
        <v-chip v-for="item in subItems[line]" 
        class="mr-2 mb-1" @click="selected.push(item)"
        :key="item.text" :color="item.color"
        v-show="!selected.includes(item)"
        dark label small>{{ item.text }}</v-chip>
        </div>
        </template>
        <div class="my-0 filter-divider"> 
          <hr/><div>IDOL</div><hr/>
        </div>  
        <v-chip v-for="item in cut?idol.slice(0,idollength):idol" 
        class="mr-2 mb-1" @click="selected.push(item)"
        :key="item.text" :color="{
          1:'red lighten-1',
          2:'blue lighten-1',
          3:'yellow darken-3'
        }[item.idolType]"
        v-show="!selected.includes(item)"
        dark label small>{{ item.text }}</v-chip>
        <v-chip label small @click.stop="cut=!cut" >show {{cut?'more':'less'}}</v-chip>
        </v-card-text>
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
    idollength:13,
    cut:true
  }),
  computed:{
    ...mapState(['subItems','idol'])
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

</style>

