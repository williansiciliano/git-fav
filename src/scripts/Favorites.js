import { GithubUser } from "./GithubUser.js"

//*** classe que terá a estrutura e lógica dos dados ***
export class Favorites {
	constructor(root){
		this.root = document.querySelector(root) // root = div '#app'
		this.load()
	}

	// carregamento dos dados
	load() {
		this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
	}

	//salvar usuários no LocalStorage
	save() {
		localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
	}

	//adição de usuários
	async add(username) {
		try {
			const userExists = this.entries.find(entry => entry.login === username)

			console.log(userExists)

			if(userExists) {
				throw new Error('Usuário já cadastrado')
			}
			
			const user = await GithubUser.search(username)

			if(user.login === undefined) {
				throw new Error('Usuário não encontrado!')
			}

			this.entries = [user, ...this.entries]
			this.update()
			this.save()

		} catch(error){
			alert(error.message)
		}
	}

	// remoção de usuários
	delete(user) {
		const filteredEntries = this.entries
		.filter(entry => {
			return entry.login !== user.login
		}) 

		this.entries = filteredEntries
		this.update()
		this.save()
	}
}

//*** classe que cria a visualização dos elementos e eventos do HTML ***
export class FavoritesView extends Favorites {
	constructor(root){
		super(root)

		//props
		this.tbody = this.root.querySelector('table tbody');
		
		//methods
		this.update()
		this.onadd()
		
	}

	//Passa o valor do input no argumento 'value' para o parâmetro em 'async add(username)'
	onadd() {
		const addButton = this.root.querySelector('#div-search #btn-fav')
		addButton.onclick = () => {
			const { value } = this.root.querySelector('#div-search #input-search')

			this.add(value)
		}
	}

	//função chamada sempre que alterarmos algo na tabela
update() {
	this.removeAllTr();

	if (this.entries.length === 0) {
		this.root.querySelector('#div-no-fav').classList.remove('hide');
	} else {
		this.root.querySelector('#div-no-fav').classList.add('hide');
	}

	this.entries.forEach(user => {
		const row = this.createRow();
		row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
		row.querySelector('.user a').href = `https://github.com/${user.login}`;
		row.querySelector('.user a p').textContent = user.name;
		row.querySelector('.user a span').textContent = user.login;
		row.querySelector('.repositories').textContent = user.public_repos;
		row.querySelector('.followers').textContent = user.followers;
		row.querySelector('.remove').onclick = () => {
			const isOK = confirm('Tem certeza que deseja remover este usuário?');

			if (isOK) {
				this.delete(user);
			}
		};

		this.tbody.append(row);
	});
}


	removeAllTr() {
		const tbody = this.root.querySelector('table tbody')

		tbody.querySelectorAll('tr')
			.forEach((tr) => {
				tr.remove()
			})
	}

	createRow() {
		const tr = document.createElement('tr')

		tr.innerHTML = `
			<td class="user">
				<div id="user-flex-container">
					<img src="https://github.com/maykbrito.png" alt="Imagem de maykbrito">
					<a rel="noopener" href="https://github.com/maykbrito" target="_blank">
						<p>Mayk Brito</p>
						<span>/maykbrito</span>
					</a>
				</div>
			</td>
			<td class="repositories">
				76
			</td>
			<td class="followers">
				9589
			</td>
			<td>
				<a class="remove">Remover</a>
			</td>
		`

		return tr
	}

}

