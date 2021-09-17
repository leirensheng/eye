import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        hasShowTips :false,
        clipData:'',
        needRefreshAll:false,
        needRefreshCollect:false
	},
	mutations: {
        setShowTips(state){
            state.hasShowTips = true
        },
        setClipData(state,val){
            state.clipData = val
        },
        setNeedRefreshAll(state,val){
            state.needRefreshAll = val
        },
        setNeedRefreshCollect(state,val){
            state.needRefreshCollect = val
        },
	},
	actions: {
    }
})

export default store
