<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 pa-3>
        <v-form name="feedback" method="POST" data-netlify-recaptcha="true" data-netlify="true">
					<p style="opacity:0;height:5px;">
					<label>Don’t fill this out if you're human: <input name="bot-field" /></label>
					</p>
          <v-text-field name="name" label="name"></v-text-field>
          <v-text-field name="email" label="email"></v-text-field>
          <v-text-field name="contact" label="twitter,QQ,weibo"></v-text-field>
          <v-textarea name="message" label="message" hint="not too long"></v-textarea>
          <div data-netlify-recaptcha="true"></div>
					<div class="text-end">
					<v-btn color="primary" type="submit">send</v-btn>
					</div>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {

}
</script>

