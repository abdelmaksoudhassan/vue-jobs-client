<template>
    <div class="view">
        <div class="uk-card uk-card-default uk-card-hover uk-card-body">
            <h3 class="uk-card-title">{{job.jobName}}</h3>
            <p><strong>In : </strong>{{job.position}}</p>
            <p><strong>Posted : </strong>{{job.date | createdAt}}</p>
            <hr class="uk-divider-icon">
            <p uk-margin>
                <button type="button" v-show="!jobOwner" class="uk-button uk-button-primary btn-margin" :disabled="ifApplied" @click="onApply">
                    {{ !ifApplied ? 'Applay this job' : 'Applied this job' }}
                </button>
                <button type="button" class="uk-button uk-button-default btn-margin" @click="onBack">
                    Back to jobs page
                </button>
                <button type="button" class="uk-button uk-button-text btn-margin" href="#modal-example" uk-toggle>
                    {{ ifApplied ? 'You and ' + (appliedPersonsCount-1) : appliedPersonsCount}} Persons applied this
                </button>
            </p>
        </div>
        <div class="row">
            <div class="col-md-6">
                <job-details>
                    <div slot="head">Needed Experience</div>
                    <div slot="body">{{job.experience}}</div>
                </job-details>
                <job-details>
                    <div slot="head">Job Requirements</div>
                    <div slot="body">{{job.jobRequirements}}</div>
                </job-details>
                <job-details>
                    <div slot="head">About Company</div>
                    <div slot="body">{{job.about}}</div>
                </job-details>
            </div>
            <div class="col-md-6">
                <job-details>
                    <div slot="head">Gender</div>
                    <div slot="body">{{job.gender}}</div>
                </job-details>
                <job-details>
                    <div slot="head">Category</div>
                    <div slot="body">{{job.category}}</div>
                </job-details>
                <job-details>
                    <div slot="head">Career Level</div>
                    <div slot="body">{{job.careerLevel}}</div>
                </job-details>
                <job-details>
                    <div slot="head">Salary</div>
                    <div slot="body">{{job.salary | dollar}}</div>
                </job-details>
            </div>
        </div>
        <div id="modal-example" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
                <button class="uk-modal-close-outside" type="button" uk-close></button>
                <h2 class="uk-modal-title">Applicants</h2>
                <p v-if="!jobOwner">Sorry, Only the job holder who created it can see applicants</p>
                <ol v-else>
                    <p v-show="appliedPersonsCount==0">There is no applicants yet</p>
                    <li v-for="(app,index) in appliedThisJob" :key="index">{{app.userEmail}}</li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from '../../axios-instances/axios-read'
import axiosWrite from '../../axios-instances/axios-write'
export default {
    components:{
        'job-details':()=>import('../../components/details/details')
    },
    data(){
        return{
            job:{}
        }
    },
    created(){
        this.fetchData()
        this.fetchApplied()
    },
    watch:{
        '$route': 'fetchData'
    },
    computed:{
        ...mapGetters('jobs',['jobs']),
        ...mapGetters('auth',['user','email']),
        ...mapGetters('appliedJobs',['applies']),
        ifApplied(){
            const x = this.applies.find(item=> 
            (item.userEmail==this.email && item.jobId==this.$route.params.id) )
            return !!x
        },
        appliedPersons(){
            const arr = []
            this.applies.forEach(item => {
                if(item.jobId==this.$route.params.id) arr.push(item)
            })
            return arr
        },
        appliedPersonsCount(){
            return this.appliedPersons.length
        },
        jobOwner(){
            return this.email == this.job.owner
        },
        appliedThisJob(){
            return this.applies.filter(x => x.jobId==this.$route.params.id)
        }
    },
    filters:{
        dollar(value){
            return value + ' $'
        }
    },
    methods:{
        fetchApplied(){
            axios.get('/applied.json').then(response=>{
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
                this.$store.dispatch('appliedJobs/setApplies',res)
            }).catch(err=>{
                alert(err)
            })
        },
        fetchData (){
            axios.get('/jobs/'+ this.$route.params.id +'.json').then(response=>{
                const data = response.data
                return new Promise((resolve,reject)=>{
                    if(response.request.status == 200){
                        resolve(data)
                    }else{
                        reject('connection error,please reload the page')
                    }
                })
            }).then(res=>{
                if(!res){
                    this.$router.push('/')
                    return
                }
                this.job = res
            }).catch(err=>{
                alert(err)
            })
        },
        onBack(){
            this.$router.push('/')
        },
        onApply(){
            if(!this.user){
                const path = this.$router.history.current.fullPath
                localStorage.setItem('fullPath',JSON.stringify(path))
                this.$router.push('/login')
                return
            }
            const x = { userEmail : this.email,jobId : this.$route.params.id }
            axiosWrite.post('/applied.json',x).then(response=>{
                return new Promise((resolve,reject)=>{
                    this.$store.dispatch('appliedJobs/addApplies',x)
                    if(response.request.status == 200){
                        resolve('you ared applied to job')
                        return
                    }
                    reject('connection error or internal error')
                })
            }).then(res=>{alert(res)
            }).catch(err=>{alert(err)})
        }
    }
}
</script>
<style scoped>
.uk-divider-icon{
    background-color: white;
}
</style>
