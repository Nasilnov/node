Vue.component('tasks', {
    data(){
        return {
            tasks: [],
            taskUrl: '/tasks',
            req: 'tasks',
            desc: '',
            date: ''
        }
    },
    methods: {
        delItem(id) {
            this.$parent.deleteJson(`${this.taskUrl}`, id)
                .then(data => {
                    console.log(data);
                    this.fillTasks()
                })
        },
        addItem() {
            this.$parent.postJson(`${this.taskUrl+'/add'}`, {desc: this.desc, date: this.date })
                .then(data => {
                    console.log(data);
                    this.fillTasks()
                });
            this.desc = '';
            this.date = '';

        },

        fillTasks(){
            this.$parent.getJson(`${this.taskUrl}`)
                .then(data => {
                    this.tasks = [... data];
                    // console.log(data);
                });
        }
    },
    mounted(){
        this.$parent.getJson(`${this.taskUrl}`)
            .then(data => {
               this.tasks = [... data];
               // console.log(data);
            });
    },
    template: `
        <div class="news">
        <h1>Задачи</h1>    
            <p class="news-item" v-for="item of tasks" :key="item.id"> 
                ID - {{ item.id}} NAME - {{ item.description }} DATE - {{ item.date_begin}}
                <span style="cursor: pointer" @click="delItem(item.id)">Удалить</span> 
            </p>
            <br>
            <span class="new_item"> 
            <input type="text" name="description" v-model="desc">
            <input type="text" name="date" v-model="date">
            <p style="cursor: pointer" @click="addItem">Добавить</p>
            </span>
        </div>
    `
});
