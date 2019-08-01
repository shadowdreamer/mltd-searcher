<template>
  <v-card class="ma-3">
    <v-card-text>
      <div class="headline black--text font-weight-regular mb-5">About this site</div>
      <div class="filter-divider">
        <hr /> <div>DATA PROVIDER</div> <hr />
      </div>
      <div class="subtitle-1">
        <p>Thanks to</p>
        <span class="princess">P</span>ublic<span class="princess">R</span>ESTful Application Programming<span class="princess"> In</span>terfa<span class="princess">ce</span><span class="princess"> S</span>erie<span class="princess">s</span>.
      </div>
      <div class="text-center mb-5">
        <v-btn color="#ea5b76" dark target="_blank" 
        href="https://api.matsurihi.me/docs/">matsurihi.me
        <v-icon small>mdi-open-in-new</v-icon>
         </v-btn>
      </div>
      <div></div>
      <div class="filter-divider">
        <hr /> <div>Source Code</div> <hr />
      </div>
        <p>Build by vue and vuetify,view more at github:</p>
      <div class="text-center mb-5">
        <v-btn  color="#1a1a1a" dark target="_blank" 
        href="https://github.com/shadowdreamer/mltd-searcher">github
        <v-icon small>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      <div class="filter-divider mt-5">
        <hr /> <div>copyright</div> <hr />
      </div>
       The copyright to THE IDOLM@STER contents belongs to BANDAI NAMCO Entertainment Inc.
      <div class="filter-divider mt-5">
        <hr /> <div>licenses</div> <hr />
      </div>
      <v-btn small text href="https://opensource.org/licenses/MIT"  target="_blank">MIT 
      <v-icon class="mdi" small>mdi-open-in-new</v-icon></v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'about'
}
</script>
<style scoped>
.princess {
  color: #ea5b76;
  font-weight: 600;
}
</style>

