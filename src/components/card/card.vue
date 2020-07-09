<template>
    <div class="uk-card uk-card-default uk-card-hover uk-card-body">
        <div class="uk-card-title">
            <span>{{job.jobName}}</span>
            <span class="fload-right">{{job.date | createdAt}}</span>
        </div>
        <hr>
        <div class="flex-row">
            <p>{{job.jobRequirements | short}}</p>
            <button class="uk-button uk-button-link" @click="readMore(job.id)">Read More</button>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props:{
        job:{
            required:true,
            type:Object
        }
    },
    filters:{
        short(value){
            return (value.length > 125) ? value.substr(0,125) + '....' : value
        }
    },
    methods:{
        readMore(id){
            this.$router.push('/job-details/'+id)
        }
    }
}
</script>