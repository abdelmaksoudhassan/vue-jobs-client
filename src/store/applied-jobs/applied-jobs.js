const namespaced = true
const state={
    applies:[]
}
const getters={
    applies(state){
        return state.applies
    }
}
const mutations={
    SET_APPLIES(state,x){
        state.applies = []
        state.applies = x
    },
    ADD_APPLIES(state,x){
        state.applies.push(x)
    }
}
const actions={
    setApplies({commit},x){
        commit('SET_APPLIES',x)
    },
    addApplies({commit},x){
        commit('ADD_APPLIES',x)
    }
}
export default{
    namespaced,
    state,
    getters,
    mutations,
    actions
}