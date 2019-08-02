<template>
  <v-combobox
    v-model="model"
    :filter="filter"
    :items="idol.concat(allSubItem).concat([{header:'click to submit'}])"
    :search-input.sync="search"
    hide-selected
    label="Search to apply options"
    multiple
    small-chips
    solo
    autocomplete="off"
  >
    <template v-slot:append>
      <v-btn icon small @click="model=[]">
        <v-icon>clear_all</v-icon>
      </v-btn>
    </template>
    <!-- <template v-slot:prepend-item>
      <v-card flat class="mx-2">
        <template  v-for="line in  ['rarity','idolType','extraType']">
        <div class="my-0 filter-divider" :key='line+1'> 
          <hr/><div> {{line.toUpperCase()}}</div><hr/>
        </div>  
        <v-card-text class="py-1 px-2" :key='line'>
        <v-chip v-for="item in subItems[line]" 
        class="mr-2 mb-1" @click="model.push(item);submit()"
        :key="item.text" :color="item.color"
        v-show="!model.includes(item)"
        dark label small>{{ item.text }}</v-chip>
        </v-card-text>
        </template>
        <v-divider></v-divider>
      </v-card>
    </template> -->
    <template v-slot:selection="{ item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="item.color?item.color:{
          1:'red',
          2:'blue lighten-1',
          3:'yellow darken-2'
        }[item.idolType]"
        :input-value="selected"
        label
        small
        dark
      >
        <span class="pr-2">{{ item.text }}</span>
        <v-icon small @click="parent.selectItem(item)">close</v-icon>
      </v-chip>
    </template>
    <template v-slot:item="{ index, item }">
      <v-chip  :color="item.color?item.color:{
          1:'red',
          2:'blue lighten-1',
          3:'yellow darken-2'
        }[item.idolType]" dark label small>{{ item.text }}</v-chip>
    </template>
  </v-combobox>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "searchbar",
  data: () => ({
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    index: -1,
    nonce: 1,
    menu: false,
    model: [],
    search: null,
    locker: true,
    locker_timer: null
  }),
  watch: {
    model (val, prev) {
      if (val.length === prev.length) return;
      this.model = val.map(v => {
        if (typeof v === "string") { 
          for(let item of this.allSubItem){
            if(v.toLowerCase() == item.text.toLowerCase()){
              return item
            }
          }
          v = {
            text: v,
            val:v,
            type:'custom',
            color: this.colors[this.nonce - 1]
          };
          this.nonce++;
        }
        return v;
      });
      this.submit()
      this.search = null
    },
    keywords(val){
      this.model = val
    }
  },
  computed:{
    ...mapState(['keywords','subItems','idol']),
    allSubItem(){
      let tmp = []
      for(let prop in this.subItems){
        tmp = tmp.concat(this.subItems[prop])
      }
      return tmp
    }
  },
  methods: {
    submit () {
      for(let val of this.model){
        if(typeof val === "string"){
          return
        }
      }
      // console.log(this.model)
      if (this.locker) {
        this.$store.dispatch('submit', this.model)
        this.locker = false
        this.locker_timer = setTimeout(() => {
          this.locker = true
        }, 500);
      } else {
        clearTimeout(this.locker_timer)
        this.locker_timer = setTimeout(() => {
          this.$store.dispatch('submit', this.model)
          this.locker = true
        }, 500)
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return true
      const hasValue = val => (val != null ? val : "")
      const text = hasValue(itemText)+hasValue(item.spell)
      const query = hasValue(queryText)
      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      )
    }
  },
  mounted () {
     this.model = this.keywords
     this.submit()
  }
};
</script>