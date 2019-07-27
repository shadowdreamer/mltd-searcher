<template>
  <v-combobox
    v-model="model"
    @input="submit()"
    :filter="filter"
    :items="items"
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
    <template v-slot:prepend-item>
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
    </template>
    <template v-slot:selection="{ item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.color} lighten-3`"
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
      <v-chip :color="`${item.color} lighten-3`" dark label small>{{ item.text }}</v-chip>
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
    items: [
      { text: "haruka", type: 'idolId', val: 1, color: "blue" },
      { text: "chihaya", type: 'idolId', val: 2, color: "red" },
      { text: "miki", type: 'idolId', val: 3, color: "red" },
      { text: "yayoi", type: 'idolId', val: 4, color: "red" },
      { header: 'click to apply items' },
    ],
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
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          };
          this.nonce++;
        }
        return v;
      });
    },
    keywords(val){
      this.model = val
    }
  },
  computed:{
    ...mapState(['keywords','subItems'])
  },
  methods: {
    submit () {
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
      const text = hasValue(itemText)
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