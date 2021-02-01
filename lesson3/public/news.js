Vue.component('news', {
    data(){
        return {
            news: [],
            newsUrl: '/api/news',
            req: 'news'
        }
    },
    methods: {
    },
    mounted(){
        this.$parent.getJson(`${API + this.newsUrl}`, 'news')
            .then(data => {
               this.news = [... data];
            });
    },
    template: `
        <div class="news">
        <h1>Новости</h1>    
            <p class="news-item" v-for="item of news">
                {{item}} 
            </p>
        </div>
    `
});
