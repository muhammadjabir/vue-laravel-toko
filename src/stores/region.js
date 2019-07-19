export default{
	namespaced: true,
	state: {
		cities:[],
		provinces:[]
	},

	mutations:{
		setProvinces: (state,payload) => {
			state.provinces=payload
		},

		setCities: (state,payload)=> {
			state.cities = payload
		}
	},

	actions: {
		setProvinces: ({commit},payload) =>{
			commit('setProvinces',payload)
		},
		setCities:({commit},payload) => {
			commit('setCities',payload)
		}
	},

	getters: {
		provinces: state => state.provinces,
		cities: state=> state.cities
	}
}