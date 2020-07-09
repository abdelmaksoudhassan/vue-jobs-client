<template>
    <div class='super'>
        <div class="container">
            <div class="all">
                <router-link :to="{name:'home'}" class="link" exact active-class="activeLink" >Home</router-link>
                <router-link v-show="user" :to="{name:'add-job'}" class="link" active-class="activeLink">Add Job</router-link>
                <div class="right">
                    <transition name="fade" mode="out-in">
                    <p uk-margin v-if="!user">
                        <button type="button" class="uk-button uk-button-primary uk-button-small btn-margin" @click="toSignUp">
                            SignUp
                        </button>
                        <button type="button" class="uk-button uk-button-default uk-button-small" @click="toLogIn">
                            LogIn
                        </button>
                    </p>
                    <div v-else style="margin-top:5px">
                        <button class="uk-button uk-button-default uk-button-small" type="button">
                            {{userName}}
                        </button>
                        <div uk-dropdown="mode: click;pos: top-right">
                            <ul class="uk-nav uk-dropdown-nav">
                                <li>
                                    <button type="button" @click="onLogout" class="uk-button uk-button-danger uk-button-small btn-block">
                                        LogOut
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters('auth',['userName','user'])
    },
    methods:{
        toSignUp(){
            this.$router.push('/signup')
        },
        toLogIn(){
            this.$router.push('/login')
        },
        onLogout(){
            this.$store.dispatch('auth/logout')
        }
    }
}
</script>
<style scoped>
.super{
    position: fixed;
    z-index: 2000;
    background-color: #ffffff;
    width:100%;
    border-bottom: 1px solid #dfe3ee ;
}
.all{
    display: flex;
    position: relative;
}
.link{
    color: #3b5998  ;
    font-size: 20px;
    text-decoration: none;
    padding: 5px 10px;
    transition: all 0.5s;
}
.link:hover,
.activeLink{
    background-color: #3b5998 ;
    color: #ffffff;
    transition: all 0.3s;
}
.right{
    position: absolute;
    right: 0px;
}
.uk-dropdown{
    padding: 15px 0px;
}

.fade-enter{
    opacity: 0;
}
.fade-enter-active{
    transition: all 0.5s linear;
}
.fade-leave-active{
    opacity: 0;
    transition: all 0.5s linear;
}



@media(max-width: 800px){
    .link{
        font-size: 18px;
    }
}

</style>