import router from '../../router/index'
const namespaced = true
const state={
    user:null
}
const getters = {
    user(state){
        return state.user
    },
    userName(state){
        return state.user ? state.user.email.substr(0,state.user.email.indexOf('@')) : 'User'
    },
    idToken(state){
        return state.user ? state.user.idToken : null
    },
    email(state){
        return state.user ? state.user.email : null
    }
}
const mutations={
    SET_USER(state,user){
        state.user = user
        user.expiresIn += new Date().getTime() + +user.expiresIn
        localStorage.setItem('myData',JSON.stringify(user))
        //Redirect User After Login Or SignUp
        const fullPath = localStorage.getItem('fullPath')
        if(fullPath){
            router.push(JSON.parse(fullPath))
            localStorage.removeItem('fullPath')
            return
        }
        router.push('/')
    },
    AUTO_LOGIN(state){
        const user = JSON.parse(localStorage.getItem('myData'))
        if(!user){
            return
        }
        if(new Date().getTime() > +user.expiresIn){
            localStorage.removeItem('myData')
            state.user = null
            return
        }
        state.user = user
    },
    LOG_OUT(state){
        state.user = null
        localStorage.removeItem('myData')
        if(router.currentRoute.path == '/') return
        router.push('/')
    }
}
const actions={
    setUser({commit},user){
        commit('SET_USER',user)
    },
    autoLogin({commit}){
        commit('AUTO_LOGIN')
    },
    logout({commit}){
        commit('LOG_OUT')
    }
}
export default{
    namespaced,
    state,
    getters,
    mutations,
    actions
}