const uri = `https://api.github.com/users/`;
const request = async () => {
    Promise.all([getUser(), getRepos()]).then(values => draw(values))
        .catch(error => console.log(error))
}
const getUser = async () => {
    const resp = await fetch(uri + $('#nombre').val())
    return await resp.json()
}
const getRepos = async () => {
    const resp = await fetch(`${uri}${$('#nombre').val()}/repos?page=${$('#pagina').val()}&per_page=${$('#repoPagina').val()}`)
    return await resp.json()
}

$('#btn').click(() => {
    if ($('#nombre').val() != '' && $('#repoPagina').val() != '' && $('#pagina').val() != '') {
        request()
    }
    else {
        alert('Por favor ingrese TODOS los datos');
    }

});

const draw = (data) =>{
    const perfil=data[0];
    const repos=data[1];

    let htmlp=`<div class="col-6 text-left">
    <img src="${perfil.avatar_url}" alt="">
    <ul>
    <li>
            <strong>Nombre:</strong> ${perfil.name}
        </li>
        <li>
            <strong>Usuario:</strong> ${perfil.login}
        </li>
        <li>
            <strong>Repositorisos:</strong> ${perfil.public_repos}
        </li>
        <li>
            <strong>Localidad:</strong> ${perfil.location}
        </li>
        <li>
            <strong>Tipo usuario:</strong> ${perfil.type}
    </ul>
</div>`
let htmlr=`<div class="col-6 text-left"><ul>`

    repos.forEach(repo => {
        htmlr+=`
        <li>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`
    });
    htmlr+=`</ul> </div>`
    $('#resultados').html(htmlp+htmlr);

    
}