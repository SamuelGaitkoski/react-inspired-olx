// aqui vamos importar o Cookies da bibliteca js-cookie.
import Cookies from 'js-cookie';

// Agora vamos criar os métodos que precisamos.

// método para verificar se o usuário está logado ou não. A função isLogged vai retornar true ou false. Esse é o método que verifica se o usuário está logado ou não.
export const isLogged = () => {
    // vamos pegar o token, que vai vir dos Cookies, dando um Cookie.get('token')
    let token = Cookies.get('token');

    // se o token existir retornamos true, se ele não existir retornamos false. Se token existir ou se tiver algo em token retornamos true, caso contrário retornamos false.
    return (token) ? true : false;
}

// vamos fazer a função de fazer login agora (doLogin), mandando para ela os parametros token e o rememberPassword, que é o aviso se ele vai usar o cookie que funciona ainda se fechamos o navegador, ou um cookie temporário, que funciona até fecharmos o navegador. Vamos botar o rememberPassword como false por padrão, caso não for mandando esse parametro ele vai vir como false.
export const doLogin = (token, rememberPassword = false) => {
    // se o rememberPassword estiver como true, e tivermos que setar um cookie que não expira depois que o usuário fecha o navegador, já temos Cookies aqui em cima, dai só usamos, setando o token do Cookies com o valor token, dai como é um cookie que não expira depois do usuário fechar o navegador, botamos um expires 999, dai ele demora 999 dias para lembrar
    if (rememberPassword) {
        Cookies.set('token', token, { expires:999 });
    } else {
        // caso não seja para lembrar a senha, logo, o token expira após o usuário fechar o navegador. Rodamos o mesmo comando, sem o parametro expires, logo, ele seta o valor do token para o token do Cookies, mas esse cookie token vai ficar limitado ao navegador estar aberto, quando ele fechar o navegador, ele limpa o cookie também.
        Cookies.set('token', token);
    }
}

// vamos fazer agora o processo de logout, criando a função para esse processo.
export const doLogout = () => {
    // não precisamos enviar nada, tudo que ele vai fazer vai ser remover o cookie, dando um Cookies.remove('token'), isso é o que precisamos fazer para ele remover o cookie.
    Cookies.remove('token');
}
