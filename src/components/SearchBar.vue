<template>
  <v-combobox
    v-model="model"
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
    <!-- <template v-slot:no-data>
      <v-list-item>
        <span class="subheading">Create</span>
        <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>{{ search }}</v-chip>
      </v-list-item>
    </template>-->
    <template v-slot:append>
      <v-btn icon small @click.stop="model=[]">
        <v-icon>clear_all</v-icon>
      </v-btn>
    </template>
    <template v-slot:prepend-item>
      <v-card flat class="mx-2">
        <v-card-text class="my-0 py-2 px-2">
          <v-chip v-for="item in subItems.rarity" 
          class="mr-2"
          :key="item.text" @click.stop="model.push(item)"
          v-show="!model.includes(item)"
          dark label small>{{ item.text }}</v-chip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="my-0 py-2 px-2">
          <v-chip v-for="item in subItems.idolType" 
          class="mr-2"
          :key="item.text" @click.stop="model.push(item)"
          v-show="!model.includes(item)"
          dark label small>{{ item.text }}</v-chip>
        </v-card-text>        
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
export default {
  name: "searchbar",
  data: () => ({
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    index: -1,
    items: [
      { text: "haruka", type: 'idolId', val: '1', color: "blue" },
      { text: "chihaya", type: 'idolId', val: '2', color: "red" },
      { text: "miki", type: 'idolId', val: '3', color: "red" },
      { text: "yayoi", type: 'idolId', val: '4', color: "red" },
      { header:'click to apply items'},
    ],
    subItems: {
      rarity: [
        { text: 'ssr', type: 'rarity', val: '4', color: 'green' },
        { text: 'sr', type: 'rarity', val: '3', color: 'green' },
      ],
      idolType: [
        { text: 'princess', type: 'idolType', val: '1', color: 'red' },
        { text: 'fairy', type: 'idolType', val: '2', color: 'blue' },
        { text: 'angel', type: 'idolType', val: '3', color: 'blue' },
      ]
    },
    nonce: 1,
    menu: false,
    model: [],
    search: null,
    locker: true,
    locker_timer: null
  }),
  props: {
    value: {
      type: Array,
      default: []
    }
  },
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
      this.submit()
    }
  },
  methods: {
    submit () {
      if (this.locker) {
        this.$emit('input', this.model)
        this.locker = false
        this.locker_timer = setTimeout(() => {
          this.locker = true
        }, 500);
      } else {
        clearTimeout(this.locker_timer)
        this.locker_timer = setTimeout(() => {
          this.$emit('input', this.model)
          this.locker = true
        }, 500)
      }
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false
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
    this.submit()
  }
};
</script>