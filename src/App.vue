<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1><!--alerta de mensagem abaixo..,v-for para gera varias mensagens array -->
		<b-alert show dismissible v-for="mensagem in mensagens"
			:key="mensagem.texto"
			:variant="mensagem.tipo">{{ mensagem.texto }}</b-alert><!--show: para mostrar,dismissible:um x para fecha o alerta-->
		<b-card>
			<b-form-group label="Nome:"><!--inputs digitaveis de  nome e usuario q possui no return-->
				<b-form-input type="text" size="lg"
					v-model="usuario.nome"
					placeholder="Informe o Nome"></b-form-input>
			</b-form-group>
			<b-form-group label="E-mail:">
				<b-form-input type="email" size="lg"
					v-model="usuario.email"
					placeholder="Informe o E-mail"></b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="salvar"
				size="lg" variant="primary">Salvar</b-button><!--botão de salvar os dados usando o metodo post-->
			<b-button @click="obterUsuarios"
				size="lg" variant="success"
				class="ml-2">Obter Usuários</b-button><!--obter usuario usuando o metodo get-->
		</b-card>
		<hr>
		<b-list-group><!--mostrar a lista de dados com o metodo get-->
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id"><!--faz um v-for in nos dados com usuario:objto e id de cada usuario colocando na tela com get,:key="id" id em si-->
				<strong>Nome: </strong> {{ usuario.nome }}<br><!--interpola os dados-->
				<strong>E-mail: </strong> {{ usuario.email }}<br>
				<strong>ID: </strong> {{ id }}<br><!--id é a propria key id hash aleatorio unico,,{{ usuario.id }}=para pegar o hash aleatorio unico de usuario e colocar no browser-->
				<b-button variant="warning" size="lg"
					@click="carregar(id)">Carregar</b-button><!--seta o carregar metodo com id q esta inicial nulo-->
				<b-button variant="danger" size="lg" class="ml-2"
					@click="excluir(id)">Excluir</b-button><!--botão de excluir da lista com id q tbm excluido-->
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
//import axios from 'axios' //caso seja necessario o uso do axios localmente
export default {
	data() {
		return {//returns de data
			mensagens: [],//começa vazio
			usuarios: [],
			id: null, //id nulo inicial
			usuario: {//dentro de usuario possui informaçoes iniciais
				nome: '',
				email: ''
			}
		}
	},
	methods: {
		limpar() {//função metodo limpar serve para atualização dos dados
			this.usuario.nome = '' //limpa o que esta no input
			this.usuario.email = ''
			this.id = null //limpa os campos da lista de id especificos
			this.mensagens = [] //mensagens inicia vazio.. do return para um metodo..
		},
		carregar(id) {// botão carregar no formulario os dados da lista
			this.id = id //apartir do id
			this.usuario = { ...this.usuarios[id] } //em usuario inclui o id especifico para mostrar no formulario nome e email
		},
		excluir(id) {//metodo botão de excluir
			this.$http.delete(`/usuarios/${id}`)//chama o metodo delete para deletar usuario id especifico
				.then(() => this.limpar())//dai assim then para logo em seguida limpar o formulario tipo atualizar pra forma correta
				.catch(err => {//catch:serve para tratar erros
					this.limpar()
					this.mensagens.push({
						texto: 'Problema para excluir!', //mensagem de erro
						tipo: 'danger' //tipo de mensagem fica vermelho
					})
				})
		},
		salvar() { console.log(this.usuario)//mostra no console observe que vai imprimir os dados
			const metodo = this.id ? 'patch' : 'post' //const se tiver metodo this.id setado ou recebido faz o patch.. se  não faz o post
			const finalUrl = this.id ? `/${this.id}.json` : '.json' //se final url tiver setado o final sera this.id.json se for patch
			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario)//metodo const contatena final url de this.usuario se for post
				.then(_ => {//then vai receber a resposta, _ ou ():mesmo de vazio sem parametro,then para logo em seguida limpar o formulario tipo atualizar pra forma correta com mais um cadastro realizado
					this.limpar() //limpar metodo inclue no then de post para apenas atualizar depois de feito
					this.mensagens.push({//mensagem faz push
						texto: 'Operação realizada com sucesso!',//aviso q foi um sucesso.., mensagem.texto interpolado no alert
						tipo: 'success' //tipo de mensagem cor verde
					})
				})
				//this.$http.post('usuario.json',this.usuario)//metodo post salvar os dados outra forma no backend 
				//.then(_ => {
				//	this.usuario.nome = "" //inserção dos dados salvos inisiar vazio,, vai salvar desta forma tbm
				//	this.usuario.email = ""
		},
		obterUsuarios() {//metodo do botão de mostrar os usuarios no list
			this.$http.get('usuarios.json').then(res => {//faz o get para mostrar os dados na tela.. $http é a referencia q faz a conexão com o axios com a url do backend
				this.usuarios = res.data //res:resposta do then de data, data: vem o json dados que vai obter em requisição
				console.log(res.data) //para entender o que vem no console
				//axios('https://curso-vue-e7de3.firebaseio.com/').then(res => {//import axios localmente pode fazer get desta forma e colocando a url base para funcionar
			}
			//rhis.$http.default.headers.common['Authorization'] = 'abc123' //ou tbm pode colocar direto no metodo o token de authorização para saber q é valido
			)
		}
	}
	// created() { //usando metodo created.. OBS: apenas para mostrar q esta globalmente..
	// 	this.$http.post('usuarios.json', { //retorna uma instancia do axios de forma global usando post um dado endpoint no caso esta em json
	// 		nome: 'Maria', //2 objetos a ser mandados enviado ao backend banco de dados
	// 		email: 'maria_maria@gmail.com'
	// 	}).then(res => console.log(res))// coloca then pois axios é aver com promisse
	// }//
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>




<!--OBS:sem necessidade de importar o axios globalmente para uso quando ...
 axios.defaults.baseURL = 'https://curso-vue-e7de3.firebaseio.com/' //defini a url base para usar do banco de dados

-->
