import React, { useState, useEffect } from "react";
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import { doLogin } from "../../helpers/AuthHandler";
import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents";

const Page = () => {
    const api = useAPI();

    const [name, setName] = useState('');
    // stateLoc é o estado que a pessoa que está se cadastrando mora
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // aqui vamos criar nossa lista de estados que vamos pegar consultando uma api
    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    // quando a tela for renderizada ele vai executar o useEffect, executando a função definida dentro dele, dai botamos o [] indicando que ele vai ser executado apenas uma vez, quando abrirmos a tela.
    useEffect(() => {
        // aqui fazemos nossa requisição para buscarmos os estados para o campo select para o estado.
        // O recomendado pelo próprio React para fazermos requisições dentro do useEffect, é criarmos a constante/função e usamos ela aqui dentro do useEffect mesmo.
        // Criamos o método assíncrono que vai buscar os estados (fazer a requisição do tipo GET), dai chamamos esse método para obter os dados aqui também.
        const getStates = async () => {
            // aqui pegamos nossa lista de estados
            // Vamos criar a requisição no nosso arquivo helpers/OlxAPI.js, logo, pegamos ele pelo api, que está pegando os métodos de requisições que criamos no arquivo OlxAPI.js.
            const slist = await api.getStates();
            // slist vai receber a lista dos estados.
            // dai setamos para a state stateList a lista dos estados que recebemos.
            setStateList(slist);
        }
        getStates();
    }, []);

    // quando o botão Fazer Cadastro for clicado, vai ser executada essa função handleSummit, para fazer o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        // se ocorrer algum erro, quando o usuário for clicar novamente para enviar, após ter corrigido o que foi destacado no erro, vai limpar o erro dai, somente para isso.
        setError(''); 

        // precisamos verificar se a senha digitada é a mesma senha digitada no confirmar senha
        // botamos !==, com dois iguais, pois se não o React da erro
        // se o password for diferente do confirmPassword, vamos dar um setError 'Senhas não batem'
        // essa é uma verificação preliminar, não poderíamos enviar sem essa verificação, pois a requisição não vai enviar as 2 senhas, então verificamos o que podemos verificar no front end, dai enviamos essas informações, e o back end vai refazer essa verificação com outras verificações que o back end pode fazer e o front end não, como por exemplo, se o email existe.
        if (password !== confirmPassword) {
            setError('Senhas não batem');
            // senhas não batem, então, como deu esse erro e não foi possível fazer o cadastro, liberamos os campos para serem preenchidos corretamente novamente. Pois como ele da o return aqui, ele não executa o setDisabled false definido no fim dessa função.
            setDisabled(false);
            // return para ele parar a execução do método handleSummit.
            return;
        }
        
        // vamos chamar o register agora, para cadastrar, enviar os dados de cadastro, preenchidos no formulário por requisição do tipo POST, enviando o name, email, password e o StateLoc
        const json = await api.register(name, email, password, stateLoc);

        // o retorno é parecido, se deu erro vai setar o erro para ser exibido na tela
        if (json.error) {
            setError(json.error);
        } else {
            // se não der erro
            // normalmente quando fazemos o cadastro, normalmente o login é feito automaticamente para nós, não faz muito sentido fazermos o cadastro e depois mandarmos o usuário para fazer o login, então automaticamente fazemos o login para ele.
            // Essa requisição do tipo GET definida no método assíncrono register, quando ela da certo, ela nos retorna o token mesmo, ela faz o login e nos retorna o token, então pegamos esse token e botamos no cookie, dando um doLogin com o token, não vamos botar para ele extender esse cookie, pois esse cadastro pode ter sido feito em um computador público ou algo do tipo, já que não foi ele mesmo que fez o login, foi o sistema, então botamos temporariamente o cookie no navegador, mas quando ele fechar o navegador vai deslogar do sistema automaticamente.
            doLogin(json.token);
            // Quando logarmos o usuário, mandamos ele para a página inicial
            window.location.href = '/';
        }

        setDisabled(false);
    }

    // Na página de cadastro vamos ter os campos Nome, Estado, Email, Senha, Confirmar Senha e o Botão Fazer Cadastro.
    // O estado é um select, onde vamos ter uma lista dos estados, podemos botar manualmente a lista dos estados, então os dados ficariam fixos, mas, a melhor opção seria fazermos uma requisição para pegar esses estados de uma api, dai poderíamos manipulá-los da forma que gostaríamos, que é o que vamos fazer, vamos consultar os dados de uma api referente aos estados e vamos mostrar na tela. Para isso vamos usar o useEffect para ele rodar uma função quando a tela for carregada. Importamos o useEffect do React, e criamos o useEffect.

    // no select do estado, temos um option vazio, e os outros options que temos serão cada estado recebido da lista de estados que vamos ter que terá o que foi recebido pela consulta a api dos estados. Então vamos percorrer essa lista de estados que terá o retorno da requisição e vamos criar um option para cada item dessa lista, pois cada item é um estado. Agora ele faz a requisição automaticamente quando a tela é renderizada e já preenche automaticamente também.
    return(
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
        
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled}
                                value={name} 
                                onChange={e=>setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                <option></option>
                                {stateList.map((item, index) => 
                                    <option key={index} value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disabled}
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
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled} 
                                value={confirmPassword} 
                                onChange={e=>setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;