<template>
    <div class="side" :class="sideClass">
        <div class="show_hide" @click="toggle">
            <span uk-icon="icon: chevron-double-left; ratio: 4" style="color:white" v-if="show"></span>
            <span uk-icon="icon: chevron-double-right; ratio: 4" style="color:white" v-else></span>
        </div>
        <div class="body">
            <div class="uk-margin">
                <form class="uk-search uk-search-default">
                    <span uk-search-icon></span>
                    <input v-model="query" @input="filter()" class="uk-search-input"
                           type="search" placeholder="Search by job name..">
                </form>
            </div>

            <div id="gender">
                Gender :
                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label v-for="(g,index) in gender" :key="index">
                        <input @change="filter()" @click="chooseGender(g)" class="uk-checkbox"
                                type="checkbox" :value="g">
                        {{g}}
                    </label>
                </div>
            </div>

            <div id="category">
                Category :
                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label v-for="(category,index) in categories" :key="index">
                        <input @change="filter()" @click="chooseCat(category.title)" class="uk-checkbox" 
                               type="checkbox" :value="category.title">
                         {{category.title}}
                    </label>
                </div>
            </div>

            <div id="category">
                City :
                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label v-for="(p,index) in position" :key="index">
                    <input @change="filter()" @click="chooseCity(p)" class="uk-checkbox" type="checkbox" :value="p">
                     {{p}}
                    </label>
                </div>
            </div>

            <div id="salary">
                Salary :
                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label v-for="(salary,index) in salaries" :key="index">
                        <input @change="filter()" @click="chooseSalary(salary)" class="uk-checkbox"
                               type="checkbox"> 
                        {{salary.min}} - {{salary.max}}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { listMixin } from '../../mixins/list-mixin/list-mixin'
import { mapGetters } from 'vuex'
export default {
    mixins:[listMixin],
    data(){
        return{
            show : true,
            sideClass:'show',
            salaries:[{min:1000,max:4000},{min:4000,max:8000},{min:8000,max:'Or More'}],
            //////// for filters /////////////
            query:'',
            selectedGenders: [],
            selectedCategories : [],
            selectedAreas:[],
            selectedSalaries:[]
        }
    },
    computed:{
        ...mapGetters('jobs',['jobs']),
        filteredList(){
            var genderItems=[]
            var genderFilters=this.selectedGenders
            if(genderFilters.length==0){
                genderItems=this.jobs
            }else{
                this.jobs.forEach(element => {
                    function checkGenderFilter(filter){
                        if(toString(element.gender) == toString(filter)){
                            return element.gender.indexOf(filter) != -1
                        }
                    }
                    if(genderFilters.every(checkGenderFilter)){
                        genderItems.push(element)
                    }
                });
            }
            /////////////////////////////////////////////////////////////////
            var catItems=[]
            var catFilters=this.selectedCategories
            if(catFilters.length==0){
                catItems=genderItems
            }else{
                genderItems.forEach(element => {
                    function checkCatFilter(filter){
                        if(toString(element.category) == toString(filter)){
                            return element.category.indexOf(filter) != -1
                        }
                    }
                    if(catFilters.every(checkCatFilter)){
                        catItems.push(element)
                    }
                });
            }
            //////////////////////////////////////////////////////////////////////////
            var cityItems=[]
            var cityFilters=this.selectedAreas
            if(cityFilters.length==0){
                cityItems=catItems
            }else{
                catItems.forEach(element => {
                    function checkCityFilter(filter){
                        if(toString(element.position) == toString(filter)){
                            return element.position.indexOf(filter) != -1
                        }
                    }
                    if(cityFilters.every(checkCityFilter)){
                        cityItems.push(element)
                    }
                });
            }
            /////////////////////////////////////////////////////////////////////////////
            var salaryItems=[]
            var salaryFilters=this.selectedSalaries
            if(salaryFilters.length==0){
                salaryItems=cityItems
            }else{
                cityItems.forEach(element => {
                    function checkSalaryFilter(filter){
                        if((parseInt(element.salary) >= filter.min)&&
                            ((parseInt(element.salary) < filter.max)||(filter.max=='Or More'))){
                            return true
                        }
                    }
                    if(salaryFilters.every(checkSalaryFilter)){
                        salaryItems.push(element)
                    }
                });
            }
            ////////////////////////////////////////////////////////////////
            return salaryItems.filter(item => {
                return item.jobName.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
            })
            // return this.query ? this.salaryItems.filter(x=>x.jobName.includes(this.query)) : this.salaryItems
        }
    },
    methods:{
        toggle(){
            this.show =! this.show
        },
        filter(){
            this.$emit('searchItems',this.filteredList)
        },
        chooseGender(x){
            if(this.selectedGenders.indexOf(x) == -1){
                this.selectedGenders.push(x)
            }else{
                this.selectedGenders.splice(this.selectedGenders.indexOf(x),1)
            }
        },
        chooseCat(x){
            if(this.selectedCategories.indexOf(x) == -1){
                this.selectedCategories.push(x)
            }else{
                this.selectedCategories.splice(this.selectedCategories.indexOf(x),1)
            }
        },
        chooseCity(x){
           if(this.selectedAreas.indexOf(x) == -1){
                this.selectedAreas.push(x)
            }else{
                this.selectedAreas.splice(this.selectedAreas.indexOf(x),1)
            } 
        },
        chooseSalary(x){
            if(this.selectedSalaries.indexOf(x) == -1){
                this.selectedSalaries.push(x)
            }else{
                this.selectedSalaries.splice(this.selectedSalaries.indexOf(x),1)
            } 
        }
    },
    watch:{
        show(value){
            if(value){
                this.sideClass='show'
            }else{
                this.sideClass='hide'
            }
        }
    }
}
</script>
<style scoped>
.side{
    position: fixed;
    left: 0px;
    width: 350px;
    height: 100%;
    border-right: 1px solid #dfe3ee;
    z-index: 200;
    background-color: white;
}
.show_hide{
    position: absolute;
    right: -35px;
    top: 30%;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    background-color: #3b5998;
}
.hide{
    transform: translateX(-100%);
    transition: all 0.5s ease;
}
.show{
    transform: translateX(0%);
    transition: all 0.5s ease;
}
.body{
    margin: 50px;
}
.uk-search-input{
    width: unset;
}
</style>