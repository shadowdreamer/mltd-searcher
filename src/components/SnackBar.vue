<template>
  <v-snackbar
    v-model="snackbar"
    bottom
    right
    :color="crrt.type?crrt.type:'primary'"
    :timeout="2500"
  >{{crrt.text}}</v-snackbar>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    snackbar: false,
    crrt: {},
    list: [],
    dealing: false
  }),
  computed: {
    ...mapState(["message"])
  },
  watch: {
    message (val) {
      this.list.push(val)
      if (!this.dealing) {
        this.dealMessage()
      }
    }
  },
  methods: {
    async dealMessage () {
      this.dealing = true
      if (this.list.length > 0) {
        this.snackbar = true
        this.crrt = this.list.splice(0, 1)[0]
        await this.sleep(900)
        if (this.list.length > 0) {
          this.snackbar = false
        }
        await this.sleep(300)
        this.dealMessage();
      } else {
        this.dealing = false;
      }
    },
    sleep (t) {
      return new Promise(r => {
        setTimeout(() => {
          r();
        }, t);
      });
    }
  }
};
</script>