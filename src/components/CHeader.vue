<template>
<!-- toolbar vuetify dengan warna primary -->
	<v-toolbar dark color="primary">
	<!-- header bagian kiri -->
	<v-toolbar-side-icon @click="setSideBar(!sideBar)" v-if="isHome"></v-toolbar-side-icon>
	<v-btn v-if="!isHome" icon @click="$router.go(-1)">
		<v-icon>arrow_back</v-icon>
	</v-btn>
	<!-- header bagian tengah -->
	<v-toolbar-title class="white-text">Serba-ada</v-toolbar-title>
	<!-- separator supaya header bagaian kanan posisinya rata kanan -->
	<v-spacer></v-spacer>
	<!-- header bagian kanan -->
	<v-btn icon @click="cart()"> 
	<v-badge left overlap color="orange" >
	<span slot="badge" v-if="count>0">{{count}}</span>
	<v-icon>shopping_cart</v-icon>
	</v-badge>
	</v-btn>
	<!-- kolom pencarian di bawah header -->
	<v-text-field
	slot="extension"
	@click="search"
	hide-details
	append-icon="mic"
	flat
	label="Search"
	prepend-inner-icon="search"
	solo-inverted
	v-if="isHome"></v-text-field>
	</v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name:'c-header',
	methods: {
		...mapActions({
			setSideBar: 'setSideBar',
			setStatusDialog: 'dialog/setStatus',
			setComponent: 'dialog/setComponent'
		}),

		search(){
			this.setStatusDialog(true)
			this.setComponent('search')
			this.setSideBar(false)
		},

		cart(){
			this.setStatusDialog(true)
			this.setComponent('cart')
			this.setSideBar(false)
		}

	},
	computed:{
		...mapGetters({
			sideBar: 'sideBar',
			count: 'cart/count'
		}),
		isHome(){
			return (this.$route.path==='/')
		}
	}
}
</script>