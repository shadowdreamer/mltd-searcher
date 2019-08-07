<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card flat class="pa-2">
          <v-text-field
            label="Lounge name"
            hint="at least three characters please"
            type="text"
            v-model="text"
            @keyup.enter="search"
            :error="text.length<=2"
            counter
          >
            <template v-slot:append-outer>
              <v-btn color="primary" @click="search()" :loading="searching" 
              :disabled="searching || text.length<=2" outlined>
                <v-icon>search</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <div class="mx-2 mt-1 text-end body-2">found {{list.length}} results</div>
      </v-flex>
      <v-flex xs12>
        <transition-group tag="div" name="list">
          <v-card @click="crrt=item.viewerId" v-ripple class="my-2 mx-1" v-for="item in list" :key="item.viewerId">
            <v-card-text class="lounge-list" >
              <div class="black--text body-1">{{item.name}}</div>
              <div style="width:150px;">Lounge Id:{{item.viewerId}}</div>
            </v-card-text>            
          </v-card>
        </transition-group>
      </v-flex>
    </v-layout>
    <LoungeDetail :viewerId="crrt" @close="crrt=null"/>
    <div style="height:80px;"></div>
  </v-container>
</template>
<script>
export default {
  name: 'lounge',
  data: () => ({
    list: [],
    text:'',
    searching: false,
    crrt:null
  }),
  components:{
    LoungeDetail:()=>import('@/components/LoungeDetail')
  },
  methods: {
    async search () {
      if(this.text.length<=2)return
      this.list = []
      this.searching = true
      let {data} = await this.$axios('https://api.matsurihi.me/mltd/v1/lounges/search?name=' + this.text)
      for(let item of data){
        this.list.push(item)
        await this.sleep(100)
      }
      this.searching = false
    },
    sleep (t) {
      return new Promise(r => {
        setTimeout(() => {
          r();
        }, t);
      });
    }
  }
}
</script>
<style>
.list-enter-active,
.list-leave-active {
  transition: all .2s ease-in;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  /* transform: translateX(30px); */
  transform: scale(0.8)
}
.lounge-list {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
</style>

