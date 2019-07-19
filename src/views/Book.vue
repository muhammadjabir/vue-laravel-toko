<template>
 <div class="about">
 	<v-container>
 		<v-subheader class="title"> {{ book.title }} </v-subheader>
 		<v-card-media
 		v-if="book.cover"
 		:src="getImage('/books/'+book.cover)" 
 		height="200px"></v-card-media>
 		<v-subheader > Information </v-subheader>
 		<table class="v-table">
 			<tbody>
 				<tr>
 					<th class="text-xs-left">Author</th>
 					<td>{{ book.author }}</td>
 				</tr>
 				<tr>
 					<th class="text-xs-left">Publisher</th>
 					<td>{{ book.publisher }}</td>
 				</tr>
 				<tr>
 					<th class="text-xs-left">Price</th>
 					<td>Rp{{ formatPrice(book.price) }}</td>
 				</tr>
 				<tr>
 					<th class="text-xs-left">Weight</th>
 					<td>{{ book.weight }} kg</td>
 				</tr>
 				<tr>
 					<th class="text-xs-left">Stok</th>
 					<td>{{ book.stock }}</td>
 				</tr>
 				<tr>
 					<th class="text-xs-left">Categories</th>
 					<td><template v-for="category in book.categories" v-key="category.id">{{ category.name }},</template></td>
 				</tr>
 			</tbody>
 		</table>
 		<v-subheader > Description </v-subheader>
 		<p class="body-2">{{ book.description }}</p>
 		<div class="position:relative">
 		<v-btn
 		color="success"
 		block
 		@click="buy"
 		:disabled="book.stock === 0 || sisa === 0">
 			<v-icon>save_alt</v-icon>&nbsp; Buy
 		</v-btn>
 		</div>
 	</v-container>
 </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
	export default{
		data () {
			return {
				book: {}
			}
		},

		methods: {
			...mapActions({
				addCart: 'cart/add',
				setAlert: 'alert/seta',
				setSisa: 'cart/setSisa'
			}),
			buy(){
				this.addCart(this.book)
				this.setAlert({
					status: true,
					text: "berhasil ditambah",
					type: 'success'
				})
				console.log(this.sisa)

			},
			 formatPrice(value) {
		        let val = (value/1).toFixed(2).replace('.',',')
		        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		    }
		},

		computed: {
			...mapGetters({
				sisa: 'cart/sisa'
			})
		},
		created() {
			let slug = this.$route.params.slug
			this.axios.get('/books/slug/' + slug)
			.then((response)=>{
				this.book=response.data.data
				this.setSisa(this.book)
				
			})
			.catch((error)=>{
				console.log(error.response)
			})

		
			
			
		}
	}
</script>