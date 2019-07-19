export default {
	namespaced: true,
	state:{
		carts:[],
		sisa: 0
	},

	mutations:{
		insert:(state,payload)=>{
			
			state.carts.push({
				id:payload.id,
				title:payload.title,
				cover:payload.cover,
				price:payload.price,
				weight: payload.weight,
				stock:payload.stock,
				sisa:state.sisa,
				quantity:1
			})
			
		},

		update:(state,payload)=> {
			let idx=state.carts.indexOf(payload)
			state.carts.splice(idx,1,{
				id:payload.id,
				title:payload.title,
				cover:payload.cover,
				price:payload.price,
				stock:payload.stock,
				sisa:payload.sisa,
				weight: payload.weight,
				quantity: payload.quantity
			})
			
			if (payload.quantity <= 0) {
				state.carts.splice(idx,1)
			}
		},

		set: (state,payload) => {
			state.carts = payload
		},
		sisa: (state,payload) => {
			
				state.sisa = payload.sisa
			
			
			console.log(payload)
		}

	},

	actions:{
		add:({state,commit},payload) =>{
			state.sisa--
			let cartItem = state.carts.find(item => item.id === payload.id)
			if (!cartItem) {
				commit('insert',payload)
			}
			else{
				cartItem.quantity++
				commit('update',cartItem)
			}
		},

		remove:({state,commit},payload) =>{
			let cartItem = state.carts.find(item => item.id === payload.id)
			if (cartItem) {
				cartItem.quantity--
				cartItem.sisa ++
				commit('update',cartItem)
			}
		},
		set: ({commit},payload) =>{
			commit('set',payload)
		},
		setSisa: ({state,commit},payload) =>{
			let cartItem = state.carts.find(item => item.id === payload.id)
			if (cartItem) {
			commit('sisa',cartItem)
			}
			else{
				state.sisa = payload.stock
			}
		}
	},

	getters: {
		carts: state => state.carts,
		count: state => state.carts.length,
		totalPrice: (state) => {
			let total = 0
			state.carts.forEach(function(cart){
				total += cart.price * cart.quantity
			})
			return total
		},
		totalWeight: (state) => {
			let total = 0
			state.carts.forEach(function(cart){
				total += cart.weight
			})
			return total
		},
		totalQuantity: (state) => {
			let total = 0
			state.carts.forEach(function(cart){
				total += cart.quantity
			})
			return total
		},
		sisa: state => state.sisa
	}
}