// aqui é o arquivo de rotas, aqui é onde vamos definir todas as telas que vamos usar, e botar suas devidas rotas para podermos acessar essas telas por meio das suas rotas.
// como vamos usar componentes, importamos o React da biblioteca react.
import React from "react";
// também vamos importar o Switch e o Route da react-router-dom.
// import { Switch } from 'react-router-dom';
// Como na versão 6 do react-router-dom, o Switch foi trocado pelo Routes, vamos importar o Routes, não o switch, e usar o path e o element.
import { Routes } from 'react-router-dom';

import RouteHandler from './components/RouteHandler';

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import NotFound from './pages/NotFound';

// agora vamos criar e exportar por padrão nosso componente principal
export default () => {
    return (
        // no return vamos botar um Switch, dentro do Switch vamos botar nossas rotas, botando Route exact path (rota) que será acessada. Quando a rota /, que é a raiz do nosso sistema, for acessada, vai ir para o componente Home dai. Quando a rota /sobre for acessada, vai ir para o componente Sobre. Quando o / for acessado, vai abrir o componente Home, e quando a rota /sobre ou /about na url for acessada, vamos abrir o componente Sobre, isso nos da a possibilidade de irmos de uma tela para a outra. Algumas telas no nosso sistema só vai ser acessíveis se o usuário tiver logado, se o usuário não estiver logado vamos mandar ele para uma outra tela. Agora temos que criar esses dois componente, que são a tela Home e a tela Sobre, vamos importar essas telas já, que vão vir da pasta pages, em erc. Sobre é About, só está em inglês. 
        // <Switch>
        //     <Route exact path="/">
        //         <Home />
        //     </Route>
        //     <Route exact path="/about">
        //         <About />
        //     </Route>
        // </Switch>
        // como estamos usando o react-router-dom na v6, fica assim:
        // Quando o Routes identificar que a rota digitada na url não se encaixa com as rotas que definimos abaixo, ele vai ir para a rota *, que vai carregar a página NotFound, de página não encontrada.
        // vamos criar em pages a pasta da página NotFound.
        // <Routes>
        //     <Route path="/" element={<Home />} />
        //     <Route path="/about" element={<About />} />
        //     <Route path="/signin" element={<SignIn />} />
        //     <Route path="/signup" element={<SignUp />} />
        //     <Route path="/ad:id" element={<AdPage />} />
        //     <Route path="*" element={<NotFound />} />
        // </Routes>

        // Para fazermos rotas privadas
        // Agora vamos usar o nosso componente réplica do Route em components/RouteHandler.js.
        // Não vamos mais usar o Route, vamos até tirar ele daqui, e vamos importar aqui nosso componente réplica do Route aqui.
        // Agora vamos substituir todos os locais que usam o Route pelo nosso componente RouteHandler. Agora todo mundo está usando nosso próprio componente, e tudo continua funcionando normalmente, sem problema nenhum.
        // Agora vamos começar a colocar nossos próprios parametros/definições para as rotas privadas.
        // Vamos criar a rota privada do /post-an-ad, dai fazemos log out, e queremos fazer com que não possamos entrar nessa pagina de postar um anuncio sem estarmos logado. Então vamos botar uma prop private e queremos que a rota seja privada a partir desse momento, então a rota só vai poder ser acessada por um usuário logado, o que não está ocorrendo no momento, para isso vamos ter que ajustar nosso RouteHandler.js.
        <Routes>
            <RouteHandler path="/" element={<Home />} />
            <RouteHandler path="/about" element={<About />} />
            <RouteHandler path="/signin" element={<SignIn />} />
            <RouteHandler path="/signup" element={<SignUp />} />
            <RouteHandler path="/ad:id" element={<AdPage />} />
            <RouteHandler path="/ads" element={<Ads />} />
            <RouteHandler private path="/post-an-ad" element={<AddAd />} />
            <RouteHandler path="*" element={<NotFound />} />
        </Routes>
    );
}