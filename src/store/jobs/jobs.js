const namespaced=true
const state={
    jobs : []
}
const getters={
    jobs(state){
        return state.jobs
    }
}
const mutations={
    SET_JOBS(state,x){
        state.jobs = x
    }
}
const actions={
    setJobs({commit},x){
        commit('SET_JOBS',x)
    }
}
export default{
    namespaced,
    state,
    getters,
    mutations,
    actions
}