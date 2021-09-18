import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        hasShowTips :false,
        clipData:'',
        needRefreshAll:false,
        needRefreshCollect:false,
        isSubscribeOk:undefined,
        noStartWhenCreated: false,
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
        setSubscribe(state,val){
            state.isSubscribeOk = val
        },
        setNoStartWhenCreated(state){
            state.noStartWhenCreated= true
        }
	},
	actions: {
    }
})

export default store
