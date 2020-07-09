<template>
    <div class="view">
        <add-job-form></add-job-form>
    </div>
</template>
<script>
export default {
    components:{
        'add-job-form':()=>import('../../components/add-job-form/add-job-form')
    }
}
</script>