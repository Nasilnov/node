Vue.component('translate', {
    data(){
        return {
            rusStr: '',
            transStr: '',
            transUrl: '/api/news',
        }
    },
    methods: {
        translate() {
            this.$parent.postJson(`${API + this.transUrl}`, this.rusStr)
                .then(data => {
                    // console.log(data);
                    this.transStr = data[0].text;
                });
        }
    },
    mounted(){

    },
    template: `
        <form action="#" class="search-form">
        <h3>Переводчик</h3>
                <textarea class="search-field" v-model="rusStr" cols="50" rows="10"></textarea><br>
                <button class="btn-search" type="submit" @click="translate">
                    Перевод
                </button>
                  <p>{{ transStr }}</p>
            </form>
    `
});
