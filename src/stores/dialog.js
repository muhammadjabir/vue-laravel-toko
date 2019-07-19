export default{
	namespaced: true,
	state: {
		status: false,
		currentComponent: ''
	},

	mutations: {
		setStatus: (state,value) => {
			state.status = value
		},
		setComponent: (state,value) => {
			state.currentComponent = value
		}
	},

	actions: {
		setStatus: ({commit},value)=>{
			commit('setStatus',value)
		},

		setComponent: ({commit},value) => {
			commit('setComponent',value)
		}
	},

	getters: {
		status: state=> state.status,
		currentComponent: state=> state.currentComponent
	}
}