import axios from '../../axios-instances/axios-read'

export const listMixin = {
    data(){
        return{
            gender:['Male','Female','Any'],
            experience: ['Fresh Graduate','Junior','Senior'],
            jobType:['Part Time','Full Time'],
            careerLevel:['Entry Level','Experienced Level','First-Level Management',
                            'Middle-Level Management','Top-Level Management'],
            position:['Cairo','Giza','Alex','Sharkia','Tanta','Gharbia','Assiut',
                        'Monufia','Suez','Ismailia'],
            categories:[]
        }
    },
    created(){
        axios.get('/categories.json').then(response=>{
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
            this.categories = res
        }).catch(err=>{
            alert(err)
        })
    }
}