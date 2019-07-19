<template>
	<v-card>
		<v-toolbar dark color="primary">
			<v-btn icon dark @click="close">
				<v-icon>close</v-icon>
			</v-btn>
			<v-text-field v-model="keyword"
			@input="doSearch"
			hide-details
			append-icon="mic"
			flat
			lagel="search"
			prepend-inner-icon="search"
			solo-inverted
			ref="txtSearch"
			id="search"
			></v-text-field>
		</v-toolbar>

		<v-divider></v-divider>

		<v-subheader v-if="keyword.length>0">
			Text pencarian {{ keyword }}
		</v-subheader>

		<v-alert
		:value="items.length==0 && keyword.length>0"
		color="warning">
			Barang yang anda cari tidak ditemukan
		</v-alert>

		<v-list two-line v-if="items.length>0">
			<template>
				<v-list-tile v-for="item in items" :key="item.id"
				avatar @click="close" :to="'/book/'+item.slug">
				<v-list-tile-avatar>
					<img :src="getImage('/books/'+item.cover)">
				</v-list-tile-avatar>
				<v-list-tile-content>
					<v-list-tile-title v-html="item.title">
					</v-list-tile-title>
				</v-list-tile-content>	
				</v-list-tile>
			</template>
		</v-list>

	</v-card>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		name: 'search',
		data() {
			return {
				keyword:'',
				items:[],
				resetData: []
			}
		},

		methods:{
			...mapActions({
				setStatusDialog: 'dialog/setStatus',
				setComponent:'dialog/setComponent'
			}),

			doSearch(){
				let keyword = this.keyword
				if (keyword.length>0) {
					this.axios.get('/books/search/'+keyword)
					.then((response)=>{
						this.items = response.data.data
					})
					.catch((error)=>{
						console.log(error)
					})
				}
			},

			close(){
				this.items = this.resetData
				this.keyword = ''
				this.setStatusDialog(false)
				this.setComponent('')
				
			},

			reset() {
				this.items = this.resetData
			}
		},

		mounted(){
			if(this.$refs.txtSearch != undefined){
				this.$nextTick(()=>this.$refs.txtSearch.focus())
			}
			this.$nextTick(()=>this.$refs.txtSearch.focus())
		},

		created(){
			this.reset()
		}
	}
</script>