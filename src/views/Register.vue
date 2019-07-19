<template>
	<v-card>
		<v-toolbar dark color="primary">
			<v-btn icon dark @click="close">
				<v-icon>close</v-icon>
			</v-btn>
			<v-toolbar-title>Daftar</v-toolbar-title>
		</v-toolbar>
		<v-divider></v-divider>

		<v-container fluid>
			<v-form ref="form" v-model="valid" lazy validation>
				
				<v-text-field
				v-model="name"
				:rules="nameRules"
				:counter="225"
				label="Name"
				required
				append-icon="person">
				</v-text-field>

				<v-text-field
				v-model="email"
				:rules="emailRules"
				label="E-mail"
				required
				append-icon="email">
				</v-text-field>

				<v-text-field
				v-model="password"
				:append-icon="showPassword ? 'visibility' : 'visibility_off'"
				:rules="passwordRules"
				:type="showPassword ? 'text' : 'password'"
				label="Password"
				hint="at least password 6 carakter"
				counter
				@click:append="showPassword = !showPassword"
				>	
				</v-text-field>

				<v-checkbox
				v-model="checkbox"
				:rules="[v => !!v || 'You must agrree to continue !']"
				label="Do you agree with your privacy policy"
				required>	
				</v-checkbox>

				<div class="text-xs-center">
					<v-btn
					color="accent lighten-1"
					:disabled="!valid"
					@click="submit">
					Register
					<v-icon right dark>person_add</v-icon>
					</v-btn>

					<v-btn @click="clear">Clear</v-btn>
				</div>
			
			</v-form>
		</v-container>

	</v-card>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default{
		name:'register',
		data(){
			return {


				valid: true,
				name:'',
				nameRules:[
					v => !!v || 'Nama harus diisi',
					v => (v && v.length <=225 ) || 'Nama melebihi'
				],
				email: '',
				emailRules:[
					v => !!v || 'Email harus diisi',
					v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
				],
				showPassword:false,
				password:'',
				passwordRules:[
					v => !!v || 'Email harus diisi',
					v => (v && v.length >= 6) || 'Password harus lebih dari 6'
				],
				checkbox: false
			}
		},

		computed: {
			...mapGetters({
				user: 'auth/user'
			})
		},

		methods: {
			...mapActions({
				setAlert: 'alert/seta',
				setStatusDialog: 'dialog/setStatus',
				setAuth: 'auth/set'
			}),

			close(){
				this.setStatusDialog(false)
			},

			submit(){
				if(this.$refs.form.validate()){
					let formData = new FormData()
					formData.set('name',this.name)
					formData.set('email',this.email)
					formData.set('password',this.password)

					this.axios.post('/register',formData)
					.then((response)=>{
						let data_user = response.data.data
						this.setAuth(data_user)
						this.setAlert({
							type:'success',
							status:true,
							text: 'Berhasil daftar'
						})
						this.close
					})
					.catch((error)=>{
						console.log(error)
						this.setAlert({
							type:'error',
							status:true,
							text: 'Gagal'
						})
					})
				}
			},

			clear(){
				this.$refs.form.reset()
			}

		}

	}
</script>