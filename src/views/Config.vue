<template>
  <v-container>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card>
					<v-card-text>
						<v-text-field label="producer name" hint="not too long" v-model="pname" counter></v-text-field>
						
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click.native="confirm" text color="primary">confirm</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
export default {
	name:'config',
	data:()=>({
		pname:''
	}),
	mounted(){
		let pname = localStorage.getItem('pname')
		this.pname = pname || ''
	},
	methods:{
		confirm(){
			if(/[<>\/\\\*\^\&\(\)\%\$\#\{\}\[\]\+\=]/.test(this.pname)){
				this.$store.commit('sendMessage', {text: 'invalid symbol!',type:'error'})
				return
			}
			localStorage.setItem('pname',this.pname)
			this.$store.commit('sendMessage', {text: 'edit success'})
		}
	}
}
</script>
