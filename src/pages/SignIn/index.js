// como vamos estilizar essa página, criamos um arquivo styles.js junto com o index.js, que é o arquivo no qual criaremos esse componente SignIn, que é nossa página de login.
import React, { useState } from "react";
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import { doLogin } from "../../helpers/AuthHandler";

import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents";

// dentro do return do jsx, vamos botar o componente PageContainer, que vai fazer com que o conteúdo da página fique alinhado no meio da página, usaremos esse mesmo PageContainer em todas as páginas, ele vem do MainComponents.js. Agora importamos o PageContainer do arquivo MainComponents.js que está na pasta components. Pegaremos o PageTitle também, que é o título da página.
// No form, vamos ter um botão de lembrar senha, pois se o mesmo não for marcado, vamos usar um cookie que deixa de existir/some quando o usuário fechar o navegador, como uma sessão.


const Page = () => {
    // agora criamos uma variável que vai chamar a função OlxAPI. Agora pegamos o objeto das requisições em formato de hook, chamando ele como uma função.
    const api = useAPI();

    // vamos criar as devidas states para associarmos com os nossos campos. Para isso temos que importar o hook useState.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    // vamos fazer um processo de loading também, que normalmente é chamado de disabled, começando como false, dai setamos o disabled em todos os inputs, setando o disabled de cada input para receber o que vier da nossa state disabled, botamos ele até no botão disabeld. Pois quando clicarmos no botão Fazer login, ele troca o disabled para true, então todos os campos que temos ficam desabilitados, não conseguimos escrever ou clicar neles, evitando demais bugs com isso enquanto a requisição está acontencendo. Então, quando clicamos no botão de Fazer Login, ele desabilita os campos até fazer o processo de login (disabled == true) e voltam para habilitados quando quisermos.
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    // quando o formulário for enviado, não seja enviado, pois precisamos tratar os campos dele, então botamos uma prop onSubmit no form, que vai executar uma função handleSubmit quando o botão Fazer Login for clicado. Para previnir que o formulário seja enviado, recebemos o evento pelo e, e damos um e.preventDefault, pois dai ele não faz nada após clicarmos no botão Fazer Login. Quando for clicado no botão Fazer Login ou der enter em algum dos campos, pois dai o formulário vai ser enviado (Executar a função handleSummit), com o preventDefault previnimos o comportamento padrão, ou seja, não enviamos o formulário. 
    // nosso handleSummit tem que ser async
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Dai desabilitamos todos os campos setando o disabled para true.
        setDisabled(true);
        // se ocorrer algum erro, quando o usuário for clicar novamente para enviar, após ter corrigido o que foi destacado no erro, vai limpar o erro dai, somente para isso.
        setError('');

        // dai consultando o webservice (api) agora, dai não consultamos ele aqui, para ficar mais organizado e possibilitar para que nosso projeto possa trabalhar com vários tipos de back ends distintos, vamos criar um objeto específico para as requisições, dai na nossa aplicação não vamos fazer nenhum tipo de requisição, pois elas vão ser feitas nesse arquivo, dai só vamos chamar os métodos desse objeto, só precisamos fazer alterações nesse objeto dai, caso necessário. Vamos criar o arquivo OlxAPI.js em helpers.
        // Aqui importamos, o que vamos chamar de useAPI, que é o hook/objeto que vem de OlxAPI.js.
        // aqui fazemos a consulta de login dai.
        // chamamos o método login de api, passando nossos states email e senha (password)
        const json = await api.login(email, password);

        // agora vamos verificar se deu tudo certo. Se o json deu algum erro, se ele está preenchido/exista, vamos setar algum tipo de erro, para isso vamos criar uma state responsável pelos erros
        // se tem algum erro
        if (json.error) {
            // vamos dar um setError, setando o erro do json para o state error dai, pois em json.error vai ter o erro em si.
            setError(json.error);
        } else {
            // caso não tenha dado nenhum erro, veio o nosso token, dai vamos executar a função de login, que está no authHandler. Então importamos essa função aqui em cima, e usamos ela aqui, mandando o json.token, que vai vir no json da resposta da requisição, se não der nenhum erro, e mandamos o nosso rememberPassword da state.
            // então ele vai fazer o login. Esse processo é quando ele vai salvar o cookie basicamente.
            doLogin(json.token, rememberPassword);
            // depois dele salvar o cookie (fazer o login), vamos dar uma atualizada geral na página, mandando para a página inicial, dai ele vai recarregar a página logado já, dai damos um window.location.href mandando a rota / que é a raiz do nosso projeto.
            window.location.href = '/';
        }

        // depois da requisição damos um setDisabled false, para ele liberar os campos para preenchimento novamente, caso a requisição de errado por exemplo.
        setDisabled(false);
    }

    // agora vamos vincular nossas states com nossos campos, botando no value de cada campo sua state, e botando o onChange, onde no mesmo vamos executar uma função, recebendo o evento, dai damos o set da state, passando para a função do set o que vem do evento, que é o que foi digitado no campo, mudando o valor da state para o que está digitado/definido nos campos.

    // se tivermos algum erro (error) no retorno das requisições que fizermos aqui, vamos exibir o componente ErrorMessage, exibindo dentro desse componente nosso erro.

    // Para fazermos o mínimo de validação possível, para que o formulário não possa ser enviado sem nada ser digitado, podemos ir em cada campo e botar um required, no email e senha no caso, essa é uma das formas, mas sempre é possível ir no inspecionar e alterar o html, removendo o required dai. De qualquer forma vamos fazer essa verificação dos campos no servidor, e se vier sem algo, vamos retornar no servidor esse erro e o usuário vai saber pois o erro vai aparecer aqui, dai fazemos essa verificação inicial para deixar o preenchimento dos campos obrigatório.
    return(
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
        
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                                type="email" disabled={disabled}
                                value={email} 
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled} 
                                value={password} 
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div className="area--input">
                            <input
                                type="checkbox"
                                disabled={disabled} 
                                checked={rememberPassword} 
                                onChange={e=>setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;