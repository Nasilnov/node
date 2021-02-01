const API = 'http://localhost:3000';

const app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },

        postJson(url, req){
            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    req : req
                }),
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
    },


    mounted() {
        console.log(this);
    }
});

