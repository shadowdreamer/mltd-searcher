<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      dense
      app
      :prominent="$route.name==='card'"
      :shrink-on-scroll="$route.name==='card'"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!!$store.state.crrt && $route.name==='card'">{{$store.state.crrt.name}}</v-toolbar-title>
      <v-toolbar-title v-else>{{$route.meta.text}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-show="$route.name === 'home'">
        <SortDialog/>
        <FilterDialog/>
        <Help/>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            MLTD Datebase
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item link :to="link.path" 
        v-for="link in links" :key="link.text">
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{link.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-layout justify-center>
        <v-flex xs12 md8>
          <keep-alive :include="['home','gamenews','lounge']">
            <router-view></router-view>
          </keep-alive>
        </v-flex>
      </v-layout>
      <SnackBar />      
     
      <v-footer absolute>
        <v-spacer></v-spacer>
        Data provider:
         <v-btn color="#ea5b76" small text dark target="_blank" 
        href="https://api.matsurihi.me/docs/">matsurihi.me
        <v-icon small>mdi-open-in-new</v-icon>
         </v-btn>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import routes from '@/router/routes'
export default {
  name: "App",
  data: () => ({
    drawer: false,
    routes
  }),
  computed:{
    links(){
      return Array.from(routes.filter(el=>!!el.meta),el=>({
        path:el.path,
        ...el.meta
      }))
    }
  },
  components: {
    SnackBar: () => import("@/components/SnackBar"),
    FilterDialog: () => import("@/components/FilterDialog"),
    SortDialog: () => import("@/components/SortDialog"),
    Help: () => import("@/components/Help"),
  },
  methods: {
   
  },
  mounted () {
    
  }
}
</script>
<style>
html {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;  /* 对iOS设备的idols列表滑动优化 */
}
* {
  scrollbar-color: #bd237f #f2f2f2;
  scrollbar-width: thin;
}
*::-webkit-scrollbar {
  width: 6px;
  background-color: #f2f2f2;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #bd237f;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
}
.filter-divider {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter-divider hr {
  border-color: rgba(0, 0, 0, 0.12);
  height: 0px;
  max-height: 0px;
  border-width: thin 0 0 0;
  transition: inherit;
}
.filter-divider hr:first-of-type {
  width: 20px;
}
.filter-divider hr:last-of-type {
  flex-grow: 1;
}
.filter-divider div {
  color: rgba(0, 0, 0, 0.438);
  padding: 0 10px;
  font-size: 12px;
}
</style>

