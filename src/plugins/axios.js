import Vue from 'vue' //vue padrão
import axios from 'axios'//importa o axios para uso

// axios.defaults.baseURL = 'https://curso-vue-e7de3.firebaseio.com/' //defini a url base para usar do banco de dados de forma global
// axios.defaults.headers.common['Authorization'] = 'abc123' //isso é se voce logou recebe um token de login e senha, usando o axios para isso, caso global se não..
// axios.defaults.headers.get['Accepts'] = 'application/json' //ou colocar restrissoes em que diz q só aceita aplicaçoes do tipo json, isso se for global

Vue.use({//cria um objeto..
    install(Vue) {// objeto install com vue como param
        // Vue.prototype.$http = axios //esta linha esta de forma global o http dados
        Vue.prototype.$http = axios.create({//prototipe faz a conexão vue com $http q aponta para o axios
            baseURL: 'https://curso-vue-e7de3.firebaseio.com/', //mexendo especificamente em uma instancia http, para manter em uma especifica instancia
            headers: {//get{ "Authorization": "abc123"} //caso queria apenas em um metodo especifico
                "Authorization": "abc123" //caso queria implementar o tipo de authorização em uma instancia de forma global ou seja post get..
            }
        })

        Vue.prototype.$http.interceptors.request.use(config => {//criar interceptors:para interceptar as resposta do backend de uma forma global,coloca o que quiser como config
            console.log(config.method)//apenas mostra no console qual methodo é
            // if(config.method == 'post') {//se o methodo for post troca para put na hora de salvar dados mas é confuso e não util
            //     config.method = 'put'
            // }
            return config //mostra qual foi o methodo usado no console na hora de clicar nos botoes, pode ser util na hora que quiser saber
        }, error => Promise.reject(error))//em caso de erro

        Vue.prototype.$http.interceptors.response.use(res => {//interceptors de resposta agora
            // const array = [] //array vazio
            // for(let chave in res.data) { //for in percorre pela chave..
            //     array.push({ id: chave, ...res.data[chave] })//faz push de id,...res.data[chave]=significa todos os registros obtidos de nome e email do app.vue salvos no back em um array
            // }

            // res.data = array //resposta.data recebe um array,, resumindo aqui vai mostrar o indice do array no id interpolado 0,1,2..
            return res //restorna resposta para manter o fluxo
        }, error => Promise.reject(error))
    }
})






//data=seria como a representação dos dados post salvos 