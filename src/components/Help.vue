<template>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }">
      <v-btn icon small text v-on="on">
        <v-icon>help</v-icon>
      </v-btn>
      </template>
      <v-card>
				<v-card-title primary-title>
					some hint
				</v-card-title>
        <v-card-text>
					try input 'ami'<br/>
					try input 'mami'<br/>
					try input 'pst'<br/>
					try input 'sr'<br/>
					try input '2nd'<br/>
					try input 'ロコ' and press  <v-icon samll>subdirectory_arrow_left</v-icon> on your keyborad<br/>
					try input 'koro' and press  <v-icon samll>subdirectory_arrow_left</v-icon> on your keyborad<br/>
					try input '制服' and press  <v-icon samll>subdirectory_arrow_left</v-icon> on your keyborad<br/>
          *you can press 'Esc' or tap on the top bar's space to close the menu
				</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text small color="warning" @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
  data: () => ({
    dialog: false
  })
}
</script>
