<template>
<div style="margin:30px 0px;">
    <form class="uk-grid-small" uk-grid>
        <legend class="uk-legend">Add Job</legend>
        <div class="uk-width-1-1">
                <input class="uk-input" @focus="$v.form.jobName.$touch()" type="text" 
                v-model="form.jobName" placeholder="Job Name">
        <alert-danger v-if="!$v.form.jobName.required && $v.form.jobName.$dirty">
            job name is required
        </alert-danger>
        <alert-danger v-if="!$v.form.jobName.lettersAndSpaces && $v.form.jobName.$dirty">
            job name must be only letters and spaces
        </alert-danger>
        <alert-danger v-if="!$v.form.jobName.minLength && $v.form.jobName.$dirty">
            job name must be at least {{$v.form.jobName.$params.minLength.min}} characters
        </alert-danger>
        </div>
        
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-select">Select Gender</label>
            <select @focus="$v.form.gender.$touch()" class="uk-select" v-model="form.gender" 
             @input="$v.form.gender.$touch()">
                <option v-for="(gender,index) in gender" :key="index" v-text="gender"></option>
            </select>
        <alert-danger v-if="!$v.form.gender.required && $v.form.gender.$dirty">
            gender is required
        </alert-danger>
        </div>
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-select">Select Category</label>
            <select @focus="$v.form.category.$touch()" class="uk-select" v-model="form.category">
                    <option v-for="(cat,index) in categories" :key="index" v-text="cat.title"></option>
            </select>
            <alert-danger v-if="!$v.form.category.required && $v.form.category.$dirty">
                category is required
            </alert-danger>
        </div>
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-select">Experience Needed</label>
            <select @focus="$v.form.experience.$touch()" class="uk-select" v-model="form.experience">
                    <option v-for="(ex,index) in experience" :key="index" v-text="ex"></option>
            </select>
            <alert-danger v-if="!$v.form.experience.required && $v.form.experience.$dirty">
                experience is required
            </alert-danger>
        </div>
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-select">Job Type</label>
            <select @focus="$v.form.jobType.$touch()" class="uk-select" v-model="form.jobType">
                    <option v-for="(type,index) in jobType" :key="index" v-text="type"></option>
            </select>
            <alert-danger v-if="!$v.form.jobType.required && $v.form.jobType.$dirty">
                job type is required
            </alert-danger>
        </div>
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-select">Career Level</label>
            <select @focus="$v.form.careerLevel.$touch()" class="uk-select" v-model="form.careerLevel">
                <option v-for="(level,index) in careerLevel" :key="index" v-text="level"></option>
            </select>
            <alert-danger v-if="!$v.form.careerLevel.required && $v.form.careerLevel.$dirty">
                career Level is required
            </alert-danger>
        </div>
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-select">Position</label>
            <select class="uk-select" @focus="$v.form.position.$touch()" v-model="form.position">
                <option v-for="(pos,index) in position" :key="index" v-text="pos"></option>
            </select>
            <alert-danger v-if="!$v.form.position.required && $v.form.position.$dirty">
                position is required
            </alert-danger>
        </div>
        <div class="uk-width-1-1@s">
            <label class="uk-form-label" for="form-stacked-select">Salary</label>
            <input  @focus="$v.form.salary.$touch()" class="uk-input" v-model="form.salary"
             type="text" placeholder="$">
            <alert-danger v-if="!$v.form.salary.required && $v.form.salary.$dirty">
                salary is required
            </alert-danger>
            <alert-danger v-if="!$v.form.salary.numeric && $v.form.salary.$dirty">
                salary must be numeric
            </alert-danger>
            <alert-danger v-if="!$v.form.salary.minValue && $v.form.salary.$dirty">
                minimum salary is 1000 $
            </alert-danger>
        </div>
        <div class="uk-width-1-1@s">
            <textarea @focus="$v.form.jobRequirements.$touch()" class="uk-textarea" 
            placeholder="Job Requirements" rows="3" v-model="form.jobRequirements" />
            <alert-danger v-if="!$v.form.jobRequirements.required && $v.form.jobRequirements.$dirty">
                job requirements is required
            </alert-danger>
            <alert-danger v-if="!$v.form.jobRequirements.minLength && $v.form.jobRequirements.$dirty">
                job requirements must be at least {{$v.form.jobRequirements.$params.minLength.min}} characters
            </alert-danger>
        </div>
        <div class="uk-width-1-1@s">
            <textarea @focus="$v.form.about.$touch()" class="uk-textarea"
             placeholder="About this Company" v-model='form.about' rows="3" />
            <alert-danger v-if="!$v.form.about.required && $v.form.about.$dirty">
                About this Company is required
            </alert-danger>
            <alert-danger v-if="!$v.form.about.minLength && $v.form.about.$dirty">
                About this Company must be at least {{$v.form.about.$params.minLength.min}} characters
            </alert-danger>
        </div> 
        <loader v-if="loading"></loader>
        <p uk-margin>
            <button :disabled="$v.$invalid" type="button" class="uk-button uk-button-primary uk-button-small" style="margin-right:5px" @click="onSave">
                Post Job
            </button>
            <button type="button" class="uk-button uk-button-danger uk-button-small" @click='onResetForm'>
                Reset Form
            </button>
        </p>
</form>
</div>
</template>
<script>
import moment from 'moment'
import {mapGetters} from 'vuex'
import axiosWrite from '../../axios-instances/axios-write'
import { required,minLength,numeric,alpha,min,minValue } from 'vuelidate/lib/validators'
import { listMixin } from '../../mixins/list-mixin/list-mixin'
export default {
    components:{
        'alert-danger':()=>import('../alert-danger/alert-danger'),
        'loader':()=>import('../loader/loader')
    },
    computed:{
        ...mapGetters('auth',['user'])
    },
    mixins:[listMixin],
    validations:{
        form:{
            jobName:{
                required,
                lettersAndSpaces:function(value){
                    const reExp = /^[a-zA-Z\s]*$/
                    return reExp.test(value)
                },
                minLength:minLength(5)
            },
            gender:{
                required
            },
            category:{
                required
            },
            experience:{
                required
            },
            jobType:{
                required
            },
            careerLevel:{
                required
            },
            position:{
                required
            },
            salary:{
                required,
                numeric,
                minValue:minValue(1000)
            },
            jobRequirements:{
                required,
                minLength:minLength(100)
            },
            about:{
                required,
                minLength:minLength(100)
            }
        }
    },
    data(){
        return{
            form:{
                jobName:'',
                gender:'',
                category:'',
                experience: '',
                jobType:'',
                careerLevel:'',
                position:'',
                salary:'',
                jobRequirements:'',
                about:''
            },
            //////////////////////////////
            loading:false
        }
    },
    methods:{
        onSave(){
            this.loading=true
            var date=moment().format('MMMM Do YYYY, h:mm:ss a');
            axiosWrite.post('/waited-jobs.json',{...this.form,date:date,owner:this.user.email})
            .then(response=>{
                return new Promise((resolve,reject)=>{
                    if(response.request.status == 200){
                        resolve('Done, Your Job Is Waiting For Admin Approval')
                        return
                    }
                    reject('Unauthorized Request Or Connection Error')
                })
            }).then(res=>{
                this.onResetForm()
                this.$router.push('/')
                this.loading=false
                alert(res)
            }).catch(err=>{
                this.loading=false
                alert(err)
            })
        },
        onResetForm(){
            this.form.jobName='',
            this.form.gender='',
            this.form.category='',
            this.form.experience= '',
            this.form.jobType='',
            this.form.careerLevel='',
            this.form.position='',
            this.form.salary='',
            this.form.jobRequirements='',
            this.form.about=''
        }
    }   
}
</script>