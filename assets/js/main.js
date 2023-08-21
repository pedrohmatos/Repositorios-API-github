async function buscarDados() {

    try {
        const userJson = await fetch('https://api.github.com/users/pedrohmatos');
        const user = await userJson.json();

        const repositoriosJson = await fetch(user.repos_url);
        const repositorios = await repositoriosJson.json();

        const dados = [user, repositorios];

        return dados;

    } catch (error) {
        console.log('Ocorreu um erro: ' + error);
    }


}

(async function processandoDados() {
    try {
        const dados = await buscarDados();

        const foto = dados[0].avatar_url;
        document.querySelector('.profile').style.backgroundImage = `url(${foto})`;

        const arrRepositorios = await dados[1];
        arrRepositorios.forEach((obj) => {
            criarCards(obj);
        });
        
    } catch (error) {
        console.log('Ocorreu um erro: ' + error);
    }
})();


function criarCards(obj) {
    const link = document.createElement('a');
    const cardDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const pDiv = document.createElement('p');
    const spanDiv = document.createElement('span');
    const data = document.createElement('div');

    document.querySelector('.repositories').appendChild(link);
    link.appendChild(cardDiv);
    cardDiv.appendChild(titleDiv);
    titleDiv.appendChild(pDiv);
    titleDiv.appendChild(spanDiv);
    cardDiv.appendChild(data);

    link.setAttribute('href', obj.html_url);
    link.setAttribute('target', '_blank');
    cardDiv.setAttribute('class', 'card');
    titleDiv.setAttribute('class', 'title');

    pDiv.textContent = obj.name;
    if(!obj.private) {
        spanDiv.textContent = 'public';
    }
    data.textContent = 'Last Update: ' + obj.updated_at.slice(0, 10);
}
