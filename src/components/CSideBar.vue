<template>
	<v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      fixed
      clipped
    >
		<!-- header toolbar pada sidebar supaya lebih cantik -->
		<v-toolbar dark color="primary">
		<v-btn icon dark @click="drawer=false">
		<v-icon>close</v-icon>
		</v-btn>
		<v-toolbar-title>Serba-ada</v-toolbar-title>
		</v-toolbar>

		<v-list v-if="guest">
		<v-list-tile>
	<!-- tombol register -->
			<v-btn
			depressed
			block
			round
			color="secondary"
			class="white--text"
			@click="register()"
			>
			Register
			<v-icon right dark>person_add</v-icon>
			</v-btn>
		</v-list-tile>

		<v-list-tile>
		<!-- tombol login -->
		<v-btn
		block
		round
		depressed
		color="accent lighten-1"
		class="white--text"
		@click="login()"
		>
		Login
		<v-icon right dark>lock_open</v-icon>
		</v-btn>
		</v-list-tile>
		</v-list>


			<v-list v-if="!guest">
			<v-list-tile>
				<v-list-tile-avatar>
					<img :src="getImage('/users/'+user.avatar)">
				</v-list-tile-avatar>

				<v-list-tile-content>
					<v-list-tile-title>
					{{ user.name }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

			<v-list-tile>
				<v-btn
				block
				small
				round
				depressed
				color="error lighten-1"
				class="white--text"
				@click.stop="logout()"
				>
					Logout
					<v-icon small right dark>settings_power</v-icon>
				</v-btn>
			</v-list-tile>
			</v-list>


		
		<v-list class="pt-0" dense>
		<v-divider></v-divider>
		<!-- menu navigasi pada properti data items -->
		<v-list-tile
		v-for="(item,index) in items"
		:key="index"
		:href="item.route"
		:to="{name: item.route}"
		@click="drawer=false"
		v-if="!item.auth || (item.auth && !guest)"
		>
			<v-list-tile-action>
			<v-icon>{{ item.icon }}</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
			<v-list-tile-title>{{ item.title }}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</v-list>
</v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'c-side-bar',
	data: () => ({
	items: [
		{ title: 'Home', icon: 'dashboard', route: 'home' },
		{ title: 'About', icon: 'question_answer', route: 'about' },
		{ title: 'Profile', icon: 'person', route: 'profile', auth: true },
		{ title: 'My Order', icon: 'shop_two', route: 'my-order', auth: true },
		]
	}),

	computed: {
		// mapping state sideBar menggunakan map getter
		...mapGetters({
		sideBar : 'sideBar',
		user: 'auth/user',
		guest: 'auth/guest'
		}),
		// ubah properti data drawer menjadi computed dimana nilainya membaca dari state sideBar
		drawer: {
			get () {
			return this.sideBar
			},
			set (value) {
			this.setSideBar(value)
			}
		},
	},

	methods: {
		// mapping action setSideBar pada store menggunakan map action
		...mapActions({
		setSideBar : 'setSideBar',
		setComponent: 'dialog/setComponent',
		setStatusDialog: 'dialog/setStatus',
		setAuth: 'auth/set',
		setAlert:'alert/seta'
		}),

		login(){
			this.setStatusDialog(true)
			this.setSideBar(false)
			this.setComponent('login')
		},

		logout(){
			let config= {
				headers: {
					'Authorization' : 'Bearer' + " " + this.user.api_token
				}
			}

			this.axios.post('/logout', {},config)
			.then((response)=> {
				console.log(response)
				this.setAuth({})
				this.setAlert({
					status:true,
					text: 'Logout Berhasil',
					type: 'success'
				})
				this.setSideBar(false)
			})
			.catch((error)=>{
				console.log(error)
				this.setAlert({
					status:true,
					text: 'error',
					type: 'error'
				})
			})
		},

		register(){
			this.setStatusDialog(true)
			this.setComponent('register')
			this.setSideBar(false)
		}
	}
}
</script>