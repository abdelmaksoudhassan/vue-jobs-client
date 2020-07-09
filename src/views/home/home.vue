<template>
    <div>
        <side-filter @searchItems="displayList"></side-filter>
        <div class="view">
            <div v-if="loading" class="center">
                    <loader></loader>
            </div>
            <card v-for="(job,index) in filterdjobs" :key="index" :job="job" class="margin-bottom"></card>
        </div>
    </div>
</template>
<script>
import axios from '../../axios-instances/axios-read'
import { mapGetters }from 'vuex'
export default {
    data(){
        return{
            filterdjobs : [],
            loading:false
        }
    },
    components:{
        card:()=>import('../../components/card/card'),
        'side-filter':()=>import('../../components/side-filter/side-filter'),
        'loader':()=>import('../../components/loader/loader')
    },
    computed:{
        ...mapGetters('jobs',['jobs'])
    },
    created(){
        this.loading = true
        axios.get('/jobs.json').then(response=>{
            const data = response.data
            const arr = []
            return new Promise((resolve,reject)=>{
                if(response.request.status == 200){
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key];
                            element.id = key
                            arr.push(element)
                        }
                    }
                    resolve(arr)
                }else{
                    reject('connection error,please reload the page')
                }
            })
        }).then(res=>{
            this.filterdjobs = res
            this.$store.dispatch('jobs/setJobs',res)
            this.loading = false
        }).catch(err=>{
            alert(err)
            this.loading = false
        })
    },
    methods:{
        displayList(value){
            this.filterdjobs=value
        }
    }
}
</script>
<style scoped>
.margin-bottom{
    margin-bottom: 20px;
}
</style>