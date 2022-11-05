import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { isLogged } from "../helpers/AuthHandler";

// criamos nosso componente.
// no nosso componente vamos receber o children e o routeProps, também conhecido como rest, então ele pega a children separadamente, e pega o rest que seriam as outras propriedades.
// o componente vai receber um objeto com children e o rest, que é uma cópia das props enviadas no componente pelo jeito.
export default ({ children, ...rest }) => {

    const navigate = useNavigate();

    // aqui vamos dar um return em um componente que vai ser o próprio Route do react-router-dom.
    // Aqui retornamos nosso próprio Route, com nosso próprio rest, as props que passarmos la fora, vão ser replicadas aqui dentro.
    // Aqui botamos também uma propriedade chamada render no Route, passando uma função que coloca o children.
    // Criamos aqui uma réplica do Route, um componente próprio que replica, que usa internamente o próprio Route.
    // Salvamos esse componente, e vamos usar ele no Routes.js agora.

    // Para que quando nosso componente RouteHandler receber uma prop private, a rota fique privada, e somente os usuário que estiverem logado no sistema vão poder acessá-la, vamos ter que importar aqui nosso AuthHandler.js, que é onde é verificado se o usuário está logado ou não.
    // Vamos criar então uma variável para usar o isLogged nela, a variável logged diz se estamos logado ou não.
    let logged = isLogged();
    // Dai vamos criar uma outra variável que vai dizer se estamos autorizado ou não, pois uma coisa é estarmos logado, outra coisa é estarmos autorizado, pois podemos estar logado mas aquela página é publica, então tanto faz eu estar logado ou não, qualquer pessoa pode acessar, então vamos estar autorizado. Mas se uma página é privada e não estamos logado, não estamos autorizado, caso contrário, se a página não é privada e estamos ou não logados, isso não importa, vamos estar autorizado.
    // authorized vai verificar se o rest.private, rest é o resto das props que mandamos para o componente, então dentro do rest temos as props private, exact, path, então estamos usando a prop private. Se essa prop for true, se ela foi passada no componente, e o usuário não está logado, ou seja, tela é privada mas o usuário não está logado, não estamos autorizado, caso contrário, estamos autorizados (se a tela não for privada estamos autorizados já, independentemente se o usuário está logado ou não, etc). Fizemos aqui essa verificação, que é a única que temos que fazer, é a única condição que importa, se a página é privada e nção estamos logado, não estamos autorizados, caso contrário, qualquer outra situação, estamos autorizados a acessar as telas.
    let authorized = (rest.private && !logged) ? false : true;

    // Agora, vamos renderizar a tela, ou fazer um redirect baseado nessa informação, agora não vamos botar o children no render somente, vamos fazer uma condição. Caso estejamos autorizados, jogamos o children, caso contrário vamos ter que fazer o redirect, componente que vamos puxar da biblioteca react-router-dom, vamos mandar o usuário para a página de login por exemplo. Dai damos um redirect para a página de login (/signin), pois o usuário não está autorizado a acessar aquela página. Children é o element do componente Route, e RouteHandler também, se o usuário está autorizado, passa o element definido no componente/rota, que vai ser o PostAnAd por exemplo, mas se o mesmo não for autorizado a entrar naquela página, pois é uma rota privada e ele não está logado, manda para a página de login dai, isso funciona dai mesmo se o pegar uma url com rota privada e não estivermos logado, nem entra na rota /post-an-ad por exemplo, nem entra na página, voltamos para login, pois a própria rota vai fazer a verificação e vai ver que não estamos autorizado. 
    // Dessa forma criamos nosso próprio componente que nos possibilita vir aqui e colocar um private, e a rota fica privada automaticamente.
    return (
        <Route 
            {...rest}
            render={() => 
                authorized ? children :  navigate("/signin")
            }
        />
    );
}