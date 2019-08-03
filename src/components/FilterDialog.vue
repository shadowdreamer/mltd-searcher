<template>
    <v-dialog v-model="dialog" scrollable persistent max-width="800">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon>filter_list</v-icon>filter
        </v-btn>
      </template>
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
        <template  v-for="line in  ['rarity','idolType','extraType']">
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
          <v-btn color="primary" text @click.native="dialog=false">cancel</v-btn>
          <v-btn color="primary" text @click.native="$store.dispatch('submit',selected);dialog=false">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data: () => ({
    selected:[],
    idollength:13,
    cut:true,
    dialog:false,
  }),
  computed:{
    ...mapState(['subItems','idol'])
  },
  watch:{
    dialog(){
      this.selected = JSON.parse(JSON.stringify(this.$store.state.keywords)) 
    }
  }
}
</script>
<style>

</style>

