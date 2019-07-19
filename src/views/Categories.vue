<template>
	<div>
		<v-container grid-list-md>
			<v-subheader>
				All Category
			</v-subheader>

			<v-layout row wrap>
				<v-flex v-for="category in categories" xs6 :key="category.id">
					<v-card :to="'/category/'+ category.slug">
						<!-- untuk load image supaya lebih rapi akan kita buatkan method getImage -->
						<v-card-media :src="getImage('/categories/'+category.image)" height ="150px">
							<v-container fill-height fluid pa-2>
								<v-layout fill-height>
									<v-flex xs12 align-end flexbox>
									<!-- nama category-nya akan ditampilkan di sini -->
									<span class="title white--text text-block" v-text="category.name"></span>
									</v-flex>
								</v-layout>
							</v-container>
						</v-card-media>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn icon>
								<v-icon>favorite</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>bookmark</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>share</v-icon>
							</v-btn>
						</v-card-actions>

					</v-card>
				</v-flex>
			</v-layout>

		</v-container>

		<template>
			<div class="text-xs-center">
				<v-pagination v-model="page" 
				@input="go"
				:length="lengthpage" 
				:total-visible="5">	
				</v-pagination>
			</div>
		</template>

	</div>
</template>

<style scoped>
/* mengatur posisi judul */
.text-block {
position: absolute;
bottom: 5px;
left: 5px;
background-color: black;
padding-left: 5px;
padding-right: 5px;
opacity: 0.7;
width:100%;
}
</style>

<script>
	export default{
		data() {
			return {
				categories: [],
				page: 0,
				lengthpage: 0
			}
		},

		methods: {
			go(){
				let url = '/categories'
				if(this.page>0) url = '/categories?page='+ this.page
				this.axios.get(url)
				.then((response)=> {
					let response_data = response.data
					let categories = response_data.data
					let lengthpage = response_data.meta.last_page
					this.categories = categories
					this.lengthpage = lengthpage
					this.page = response_data.meta.current_page
					window.scrollTo(0,0)
				})
				.catch((error)=>{
					console.log(error.response)
				})
			}
		},

		created(){
			this.go()
		}
	}
</script>