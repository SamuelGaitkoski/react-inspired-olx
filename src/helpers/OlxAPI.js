import Cookies from "js-cookie";
import qs from 'qs';

// aqui criamos os métodos que quisermos.
// como estamos trabalhando com React vamos criar um hook, dai usamos esse hook em qualquer página que quisermos usar API.

// criando o BASEAPI, botando nele a url padrão da nossa api. Nosso servidor back end, a api, está rodando nessa url, nessa porta 501.
const BASEAPI = 'http://alunos.b7web.com.br:501';

// Agora vamos criar o nossa função que vai fazer a requisição para enviar arquivos por requisição para a api também.
// função que vai receber o endpoint e o body, do mesmo jeito, pois o envio é exatamente igual
const apiFetchFile = async (endpoint, body) => {
    // o processo é muito similar ao processo feito no método apiFetchPost, então vamos copiar ele e colar ele aqui.

    // como sempre vamos mandar para essa requisição para a api o formData no body, não podemos adicionar o token da forma como estávamos adicionando o mesmo, temos que dar dando o append, body.append('token', token), para que o token, com título token seja colocado dentro do body. Pois se ele não mandar o token, o notallowed ve que o usuário não está logado, dai manda o usuário para a tela de login.
    if(!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.append('token', token);
        }
    }

    // o método continua sendo do tipo POST, a requisição é do tipo POST, mas não vamos ter o headers, pois não vamos enviar em formato de json, e não vamos enviar o body dessa forma com o JSON.stringfy, vamos enviar só o próprio body, pois ele está em fData (formData)
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        body
    });
    // recebemos o resultado da requisição, pegamos ele
    const json = await res.json();

    // verificamos o notallowed, pois se der algum problema na requisição, ele vai mandar o usuário para o signin, para o login, mas se der certo o usuário vai estar logado dai, pois ele só pode postar um anúncio se estiver logado.
    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
    // dessa forma está feito nosso apiFetchFile
}

// requisição do tipo PUT, para editar por meio da API um valor já existente no BD
async function apiFetchPut(endpoint, body) {
    if (!body.token) {
      let token = Cookies.get('token');
      if (token) {
        body.token = token;
      }
    }
  
    const res = await fetch(BASEAPI + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
  
    if (data.notallowed) {
      window.location.href = '/signin';
      return;
    }
    return data;
}

// criando a função que vai fazer a requisição via POST. O body é o corpo da requisição em si, o que estamos enviando via POST.
const apiFetchPost = async (endpoint, body) => {
    // antes da própria requisição, como o token é enviado em toda requisição, vamos fazer com que esse processo seja automático, para quando formos fazer qualquer requisição, ele vai mandar junto, se tiver, o token, não precisamos mandar o token ali na requisição de login que usamos essa função apiFetchPost, ele já manda o token automaticamente.
    // se o body.token não existe, não estamos mandando nenhum token.
    if(!body.token) {
        // então pegamos o token que está no Cookie, importando o Cookies da biblioteca js-cookie.
        let token = Cookies.get('token');
        // pegamos o cookie token, agora vamos verificar se ele existe, está preenchido, etc.
        // se existe algum cookie token.
        if (token) {
            // ele adiciona em body.token o token
            body.token = token;
        }
        // Agora, em toda requisição que fizermos, ele verifica se não estamos mandando já em cookie, se não tivermos ele pega o cookie token do cookie, dai não precisamos nos preocupar em mandar um cookie token ou não, ele já faz isso automaticamente. Também não precisamos nos preocupar se o usuário tem permissão para fazer login, se ele está logado ou não, se ele está tentando acessar algo que precisa de login. Não tem problema, o próprio web service vai lidar com isso e nos retornar a resposta disso, dai se o cara não tiver permissão vai retornar isso no json.notallowed, que é quando ele retorna na resposta da requisição que o usuário não tem permissão para algo, dai mandamos o usuário para a tela de login. Em toda requisição é automaticamente enviado o token, então não temos que nos preocupar com isso mais, para as requisições do tipo POST.
    }
    
    // o fetch que usamos é do próprio JavaScript.
    // Nosso endpoint precede uma base, o endpoint não é uma url, precisamos ter nossa base mais nosso endpoint.
    // dai configurarmos o restante da nossa requisição, botamos o method POST, botamos o headers, e dentro dele o Accept application/json, e no Content Type botamos application/json, dai mandamos nosso body, que vai ter JSON.stringify, mandando o body, que é o objeto que vamos mandar, JSON.stringify converte o body que vai ser um objeto que vamos mandar para JSON.
    // fizemos a requisição POST usando o fetch normal do JavaScript.
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    // agora pegamos a resposta da requisição, pelo res, dai damos um .json() na resposta, para transformarmos ela para json, pois a resposta sempre tem que vir em json.
    const json = await res.json();

    // vamos fazer essa parte de verificarmos se o usuário está logado aqui. Quando recebemos a resposta do JSON, tem um item que ele vai retornar toda a vez que o usuário não tem autorização para fazer o que ele está tentando fazer. Se json.notallowed, o usuário não pode fazer isso aqui, não está logado.
    if (json.notallowed) {
        // vai mandar o usuário para a tela de login dai
        window.location.href = '/signin';
        // return para ele finalizar a execução
        return;
    }
    // se não entrar nesse if, vai retornar o json aqui, retornando o retorno da requisição aqui.

    // dai retornarmos essa resposta, que é o próprio json dai.
    return json;
}

// vamos fazer o mesmo que fizemos para as requisições do tipo POST acima, vamos fazer um método padrão para as requisições do tipo GET, para quando precisarmos usar.
// como em uma requisição do tipo GET, nem sempre precisamos mandar algum valor, vamos deixar o body opcional, dai se não mandarmos nada nesse parametro ele vira um array vazio.
const apiFetchGet = async (endpoint, body = []) => {
    // ele adiciona o token do mesmo jeito que o método apiFetchPost que criamos acima.
    if(!body.token) {
        let token = Cookies.get('token');

        if (token) {
            body.token = token;
        }
    }
    
    // nas requisições do tipo GET, não mandamos um corpo (body), mandamos na própria url as informações, então vamos tirar tudo, dai vamos criar a requisição certinha, com template string, botando a url para a requisição, que vai ser BASEAPI + endpoint, dai vamos transformar nosso body em query string, para fazermos isso vamos usar a biblioteca/dependencia qs, dando um npm install qs inicialmente, qs de query string, dai importamos aqui a biblioteca qs aqui em cima. Dai usamos ela aqui como qs.stringify(body), mandamos nosso body, dessa forma ele vai receber um objeto, que é o nosso body, dai vai transformar ele em query string, dai adicionamos isso na nossa url depois da interrogação(?), pois é dessa forma que isso é feito. Dessa forma está feito nossa requisição do tipo GET, o restante só mantemos como está.
    // usando o VSCode, podemos minimizar os métodos, para vermos na tela somente nossas requisições que faremos no objeto OlxAPI.
    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}

// vamos criar esse objeto OlxAPI
const OlxAPI = {
    // esse método vai ter as funções das requisições que vamos precisar.

    // A primeira função que vamos precisar é o login, que recebe o email e a senha.
    login: async (email, password) => {
        // fazer consulta a API (web service).
        // para fazer a consulta ao web service, vamos fazer uma consulta do tipo POST, em algumas consultas usamos o GET, em outras POST, então vamos fazer uma função padrão para utilizarmos em qualquer requisição que fizermos.
        // para usarmos o await a funçãoa da requisição precisa ter o async.
        // vamos executar uma função chamada apiFetchPost, mandando nela o endpoint, mandando o endpoint (rota) para fazer o login, dai um objeto com as informações que vamos mandar para fazer a requisição do tipo POST, email e senha nesse caso.
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        // dai retornamos o resultado, que é o json.
        return json;
        // em termos de consulta está aqui a nossa consulta. Para fazer o login a consulta a api vai ser o endpoint /user/signin, mandando as informações via POST.

        // vai retornar para nós o resultado, um json que seria o resultado.
        // podemos mandar um erro aqui, dentro de error no objeto.
        // return {};
    },

    // esse é o método assíncrono que vai fazer a requisição via POST de cadastro, que vai mandar para a API os dados do envio do cadastro do usuário. Esse método vai receber o name, email, password e stateLoc.
    register: async (name, email, password, stateLoc) => {
        // Agora vai fazer a requisição
        // É uma requisição do tipo POST, login e register são requisições do tipo POST
        // o segundo parametro que mandamos na função apiFetchPost é o body, o corpo da requisição via POST, o que estamos mandando pela requisição via POST. Como o campo name tem o mesmo nome que o parametro name, não precisamos fazer name: name, o JavaScript ve que é o mesmo nome, dai botamos só name e ele entende que é name: name que estamos definindo.
        // stateLoc é o nome do parametro, e da state do campo na tela de cadastro (register), mas vamos botar como state, de estado, enviando o stateLoc, que é o estado do usuário que está se cadastrando.
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state: stateLoc}
        );
        // retornamos o json de retorno da requisição, que vai vir com erro ou com o token
        return json;
        // Assim finalizamos a requisição via POST do processo de cadastro/registro/register.
        // Quando preenchemos todos os dados, pois eles estão todos como required, logo, é obrigatório o preenchimento de todos os campos, e clicamos no botão Fazer Cadastro, ele vai fazer a requisição, se abrirmos no F12 e em network/rede, veremos que o json de retorno vai vir com o error ou com o token e tudo mais.
    },

    getStates: async () => {
        // ele vai fazer uma requisição do tipo GET para /states, para obter os estados dai.
        const json = await apiFetchGet(
            '/states'
        );
        // retorna para nós o resultado
        // vai retornar um objeto e dentro desse objeto, em states, vamos ter nossos estados dai
        return json.states;
    },

    // criando o método GET getCategories aqui, fazendo essa requisição estruturalmente bem similar ao getStates
    getStates: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    // criando o getAds. Vamos receber o objeto em options (opções).
    // Como o options vai ser um objeto, mandamos ele mesmo para a requisição GET, mandando ele como body dai
    // Mandamos no options de que forma que queremos fazer a filtragem
    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        // dai damos um return no json de retorno
        return json;
    },

    // vamos criar o getAd, o método que faz a requisição dos dados de um anuncio somente.
    // o método getAd vai receber um id, que é o id do anuncio, e o otherAds, que por padrão vai receber false.
    // a requisição vai ser feita para o endpoint /ad/item, que vai filtrar pelo id passado e pelo otherAds, que são os outros anuncios do mesmo vendedor.
    // ele manda o otherAds como true ou false, e a api vai se encarregar de retornar ou não outros anuncios daquele mesmo vendedor.
    getAd: async (id, otherAds = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other: otherAds}
        );
        // retornando o json, que são as informações que a requisição vai nos retornar, para podermos pegar as informações quando esse requisição for chamada.
        return json;
    },

    // Agora criamos a requisição para a api, para enviar as informações preenchidas do anúncio por POST para a api. 
    // Requisição que vai receber o fData
    addAd: async (fData) => {
        // Aqui vamos fazer uma requisição POST, mas que funciona de forma diferente do nosso apiFetchPost, então vamos ter que criar um apiFetchFile, que é quando queremos enviar arquivos também.
        // vamos preparar a requisição aqui.
        // Vamos passar para o método apiFetchFile, que vai fazer a requisição para enviar arquivos também, mandando o endpoint /ad/add, dai vamos mandar fData, do mesmo jeito.
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        // Aqui vamos retornar o resultado da requisição, que é o json
        return json;
        // Agora está feito nosso apiFetchFile, então sempre que precisarmos enviar um arquivos também, usamos esse método apiFetchFile que faz a requisição para a api, que usamos aqui nessa requisição para adicionar um anúncio.
    },

    updateAd: async (formData, idAd) => {
        const response = await apiFetchFile(
          `/ad/${idAd}`,
          formData
        );
        return response;
    },

    updateUser: async (name, email, state, password) => {
        const response = await apiFetchPut(
          '/user/me',
          { name, email, state, password }
        );
        return response;
    }
}

// vamos exportar essa função, esse hook.
// como estamos executando isso como uma função, dando um useAPI(), que é como um OlxAPI(), no export vamos executar uma função que vai retornar esse objeto OlxAPI. Criamos uma função que vai nos retornar esse objeto OlxAPI
export default () => OlxAPI;