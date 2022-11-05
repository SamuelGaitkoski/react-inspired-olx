import React from "react";
import { Link } from "react-router-dom";

// HeaderArea vai ser o nome do componente que vamos pegar do styled, importamos a estilização e o componente HeaderArea criado em styled. Dai usamos o componente aqui.
import { HeaderArea } from './styled';

// importando o método isLogged, que está no arquivo AuthHandler.js na pasta helpers.
import { isLogged, doLogout } from "../../../helpers/AuthHandler";

// Quando for clicado nesse Link vai para a rota raiz, rota /, podemos botar uma imagem dentro do Link também, ou outra coisa. Vamos botar aqui 3 letras, dai vamos pintar uma letra de cada cor.
// O nav é o espaço de navegação, os menus, com um ul, que tem li's, que tem um Link dentro de cada li.
// Criamos os tipos de botões que temos no "tipo 1" do menu, mas só vai aparecer o botão de Poste um anúncio quando o usuário estiver logado, pois um anúncio pode ser postado apenas quando o usuário estiver logado, caso contrário vai aparecer os outros botões de Login e Cadastrar.
// Em termos gerais nosso Header está pronto.

// Precisamos identificar se o usuário está logado ou não pois vamos exibir um menu se ele estiver logado e outro menu se ele não estiver logado. Para isso verificamos se o usuário tem determinado cookie no pc dele, ou o cookie token no pc dele, pois é no cookie token que vamos armazenar o nosso hash, se o usuário tem o cookie token ele está logado então exibimos um determinado menu, se ele não tem o cookie token ele não está logado então exibimos outros menus.
// Se o usuário estiver com o cookie inválido ou um cookie resetado, não tem problema, pois vamos fazer outras requisições ao servidor, só temos como saber se um cookie está valido ou não quando acessamos o servidor, o servidor vai nos dizer se o cookie está inválido, dai fazemos algum outro procedimento.
// Não tem sentido toda vez que abrimos a página, fazermos uma consulta para abrir o Header para verificar algo, logo, para isso confiamos que o cookie funciona e exibimos determinado menu dependendo dessa informação, e na página Inicial, vamos carregar os anúncios, para isso precisamos consultar o servidor, e quando consultarmos enviamos o token que está salvo, e dai o servidor vai nos dizer se o token está inválido, dai vamos ter essa informação, então não precisamos fazer uma consulta inicialmente para saber se o token está válido, pois vamos fazer outras consultas que vão nos dizer se o token está válido ou não.
// Vamos importar a função isLogged, que diz se o usuário está logado ou não, função que está em AuthHandler.js na pasta helpers.

const Header = () => {
    // se quisermos podemos, aqui no componente,  armazenar em uma variável o isLogged(), armazenando em uma váriavel a informação que o método vai retornar, dai executamos a função isLogged() e na variável logged vai ter true ou false, o return da função.
    let logged = isLogged();

    // usamo o logged quando quisermos dai. Se o usuário estiver logado, vamos exibir alguns menus, se o usuário não estiver logado exibimos outros menus.
    // Quando recarregarmos o navegador na página, como não estamos logado, vai aparecer o botão Login e Cadastrar no menu, se estivermos logado vai aparecer o botão Minha Conta, o botão Sair e o botão Poste um anúncio.
    // Se botarmos a variável logged como true, dai fingimos que estamos logado, dai ele aparece outros botões no menu.
    // O próprio OLX original bota o botão de Poste um anúncio, mas quando o usuário não está logado, o link dele vai para login, faremos isso aqui, para exibir o botão Poste o anúncio quando o usuário não está logado, dai o usuário faz o login e depois disso ele pode postar um anúncio. Quando estivermos logado os botões do menu mudam dai.

    // Vamos tirar o Link para o botão de Sair, pois não precisamos do Link, mas precisamos de um botão, de algo clicável. Então vamos fazer essa alteração.
    // Quando o botão de Sair for clicado, vamos executar a função handleLogout.
    const handleLogout = () => {
        // São duas ações que serão feitas aqui, tirar o cookie do token, e depois redirecionar a página, dai não vai ter mais cookie e não vai estar mais logado.
        // Para lidar com o Cookie ou alterá-lo, só fazemos isso em um local, que é no AuthHandler, então vamos lá. Agora importamos a função que vai remover o Cookie, do AuthHandler.js.
        // Dai executamos a função doLogout aqui dentro, para remover o cookie. Dai o usuário não vai estar mais logado.
        doLogout();
        // agora redirecionamos o usuário para a página inicial.
        window.location.href = '/';
        // O React Router tem uma propriedade de redirect, mas ela da um redirect no virtual DOM, e não queremos isso, queremos que a página seja realmente recarregada, pois tudo vai mudar na página, baseado no usuário estar logado ou não. Então, é mais seguro, quando fizermos o logout, redirecionarmos a página, para a página inicial nesse caso (rota /), pois o header vai mudar também, dai precisamos recarregar a página também. Como já estávamos na página inicial ele muda só o header quando desloga, mas se estivéssemos em outra página, ele iria deslogar e iria para a página inicial do mesmo jeito.
    }

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-1">O</span>
                        <span className="logo-2">L</span>
                        <span className="logo-3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged && 
                            <>
                                <li>
                                    <Link to="/my-account">Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to="/post-an-ad" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged && 
                            <>
                                <li>
                                    <Link to="/signin">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to="/signin" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;