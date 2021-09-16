import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        isReachBottom :false,
	},
	mutations: {
        setReachBottom(state,val){
            state.isReachBottom = val
        },
	},
	actions: {
    }
})

export default store
