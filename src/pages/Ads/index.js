import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem";

let timer;

// Vamos montar nossa página de anúncios, que vai exibir todos os anúncios e vai ter um filtro para filtrar os anúncios.
// Nossa página vai ter uma área left, que seria o filtro, com todas as opções que temos de filtro no nosso sistema, e no lado direito vamos botar os anúncios resultados dos filtros aplicados.
const Page = () => {
    const api = useAPI();

    // Passo 1: pegar os filtros na url, quando vamos na tela inicial e selecionamos uma categoria, temos o envio de um filtro/dado na url, então para pegarmos esse dado, vamos usar o hook useLocation da biblioteca react-router-dom.
    // o useLocation trabalha com a url, então precisamos dele.
    // assim que carregarmos a página, vamos dar um alert em useLocation().search, o search do useLocation pega a query string, que é o que vem depois da interrogação (?) na url, a interrogação diz que após ela vai vir um filter/filtro. Fazendo o alert ele nos retorna ?cat=baby, ele pega a query string. Então temos que pegar isso e transformar em algo legível, para isso vamos criar um hook, e vamos usar esse hook, nosso hook vai ser o useQueryString, uma função que vai ser um hook básico.
    const useQueryString = () => {
        // nosso hook retorna new URLSearchParams, dai mandamos para ele nosso useLocation().search, e ele vai nos retornar um objeto com o qual podemos pegar cada um dos itens do nosso query string.
        return new URLSearchParams(useLocation().search);
    }
    // usamos nosso hook, botando o retorno dele em query.
    const query = useQueryString();
    // A partir de agora, se quisermos pegar o cat por exemplo, damos um query.get('cat'), dai ele pega o baby para nós por exemplo, que é o valor dentro do cat.

    // vamos declarar o useNavigate, botando na variável navigate o retorno da chamada desse hook.
    const navigate = useNavigate();

    // Passo 2: Agora temos criar as devidas states que vão salvar esses valores, dai pegamos esses valores e colocamos nas states.
    // state para o q
    // vamos pegar o valor do q, dai vamos verificar se ele não é null, se ele não for nulo pegamos o valor dele, caso contrário setamos '' para a state. Podemos fazer a condicional dentro da state para setar o valor já, ou podemos usar uma variável auxiliar para fazermos a validação na variável e setarmos o valor para ela e depois botamos ela aqui no useState. Vamos fazer na própria linha assim, dai vamos replicar isso para as outras states, para que, se tiver o valor do q, do cat e do state na query string, vamos setar eles para as states q, cat e state.
    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
    // state para o cat
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    // state para o estado (state), não é indicado chamar a state de state, mas como state é estado, prosseguimos dessa forma
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');
    // Agora temos nossas states para usarmos ela no filtro. Mas agora temos que preencher as states com os valores que vieram da query string, para isso podemos criar uma variável e depois jogar ela dentro do useState(aqui) da state, pois precisamos fazer uma condicional, ou podemos fazer a condicional dentro do useState(aqui) já.
    // Agora temos os valores dos itens que vão vir direto da url nas nossas states q, cat e state, dai usamos as state para preencher o nosso filtro no menu lateral esquerdo.

    // vamos precisar da lista dos estados, com a requisição no useEffect para buscar os estados da api. Vamos precisar do categories, que é a lista das categorias, mantendo também a requisição que busca as categorias da api. Também vamos precisar da adList, que é a lista de anúncios/ads
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    const [resultOpacity, setResultOpacity] = useState(1);
    // state loading vai indicar se está havendo algum carregamento, inicia como true, pois supoe-se que assim que a pagina é aberta, ele está carregando, então começa como true
    const [loading, setLoading] = useState(true);

    // precisamos de um state que salve para nós quantos itens temos ao total, valor total é retornado pela consulta. O adsTotal começa com 0.
    const [adsTotal, setAdsTotal] = useState(0);

    // quantidade de páginas, iniciando com 0 páginas.
    const [pageCount, setPageCount] = useState(0);

    // página atual, obviamente começa na página 1
    const [currentPage, setCurrentPage] = useState(1); 

    // Agora, primeiro, temos que fazer com que a requisição correta seja feita, e o filtro funcione, trazendo os anúncios correspondentes com o que foi filtrado. Para isso, vamos criar uma função que vai ser usada para fazer a requisição, vamos criar nossa função abaixo. Essa função getAdsList vai usar os filtros que temos, que são o q, cat e state, mais alguns filtros que vamos colocar, como paginação e etc, esses 3 filtros serão usados para fazer a consulta, e então exibimos os anúncios.
    // essa função getAdsList precisa set async.
    const getAdsList = async () => {
        // vamos botar aqui a criação da função getRecentAds, que faz a requisição para obter os anúncios, que fizemos dentro de um useEffect abaixo.
        // o sort vamos deixar fixo por enquanto, mas vamos poder mudar ele.
        // o limit sempre vai ser fixo mesmo, vai exibir sempre 9 itens, então, se tiver paginação por ter mais que 9 itens, criamos a paginação.
        // Ele faz a requisição, a busca.
        // essa função getAds, que faz a requisição, não está usando nenhum filtro, vamos fazer agora ele usar esse filtro, mandando no corpo da requisição o q, cat e state, mandando os dados do filtro, dai ele manda esses dados para a requisição, e a requisição recebe esses dados e a requisição mesmo, no back end, a api, vai fazer esse filtro para nós e nos retornar os anuncios de acordo com os filtros selecionados. Todos os filtros estão funcionando já, pois a api nos retorna os anúncios de acordo com os filtros que passamos, sejam eles no q, cat ou no state.

        // antes de fazer a requisição para buscar os anúncios, setamos o loading como true, como carregando
        setLoading(true);

        // o que não está funcionando é a própria paginação, pois precisamos enviar o resultado la no getAdsList, precisamos adicionar mais um filtro que será enviado para a requisição, que é o offset, onde vamos definir que ele vai pular tantos anuncios, para que a pagina 2 não exiba os anuncios exibidos na pagina 1, isso é baseado no limit que definimos, que é a quantidade de anuncios que queremos pegar, e na pagina atual também.
        // offset vai ser currentPage - 1, pois a quantidade de itens começa do 0, então precisamos que o currentPage comece do 0 também. dai vamos multiplicar a pagina atual pela quantidade de itens que queremos por pagina (limit), dai nesse caso, vamos ter o numero de anuncios que teremos que pular no offset, se for na pagina 1, ele vai dar um 1 - 1 = 0, multiplica isso por 2, e o offset fica como 0, não precisa pular nenhum anuncio.
        let offset = (currentPage - 1) * 2;
        // dai mandamos esse offset para a api, dai o backend vai resolver isso para nós ja que ele está recebendo o offset agora, e vai resolver isso para nós, exibindo todos os itens recebidos espalhados em todas as páginas que temos.

        const json = await api.getAds({
            sort: 'desc',
            limit: 9,
            q, 
            cat,
            state,
            offset
        });
        // e dai ele pega o retorno da requisição, que são os anúncios, e seta para a state adList.
        setAdList(json.ads);
        setResultOpacity(1);
        // quando ele recebe o retorno do total de itens que tem no BD para exibir, ele seta na state adsTotal esse valor, que é pego dando um json.total.
        setAdsTotal(json.total);
        // quando ele muda essa state adsTotal, também sabemos dai se precisamos de paginação, pois, se a quantidade de itens está menor que a quantidade total, quer dizer que temos mais itens para exibir, então temos paginação. Baseado nisso já sabemos se temos paginação. Agora precisamos saber quantas páginas vão ter essa paginação, vamos criar uma state pageCount para armazenar esse valor da quantidade de páginas.

        // após ele receber o resultado da requisição, setamos o loading como false, pois não está carregando mais
        setLoading(false);
    }

    // vamos usar um useEffect para que, toda vez que adsTotal for modificado, vamos modificar a quantidade de páginas, então vamos monitorar adsTotal.
    useEffect(() => {
        // temos que verificar se adList não for 0, pois não podemos dividir nada por 0, então, se adList.length for maior que 0, dai fazemos a conta de quantas páginas vamos ter para a paginação.
        if (adList.length > 0) {
        // toda vez que adsTotal for modificado, vamos setar a quantidade de páginas que vamos ter de paginação. Essa quantidade de páginas vai ser obtida fazendo o total de anuncios (adsTotal) divido pela quantidade de anuncios que estamos exibindo por pagina (adList.length), isso vai nos dar a quantidade de paginas. Esse numero pode ser quebrado, então sempre arredondamos para cima, pois podemos ter uma pagina que exiba só um item.
        // o Math.ceil arredonda sempre pra cima
        // a conta é adsTotal divido por adList.length (quantidade de anuncios que temos na lista)
        setPageCount (Math.ceil(adsTotal / adList.length));
        } else {
            // se adList for 0, damos um setPageCount para 0, pois se não temos nenhum anúncio, não temos paginação.
            setPageCount(0);
        }
        // isso já vai fazer termos a informação da quantidade de páginas, agora, baseado nessa informação, exibimos ou não a paginação la em baixo.
    }, [adsTotal]);

    // Agora, vamos fazer o monitoramento de quando muda a paginação, no caso, a currentPage, pois quando ele mudar, vamos executar a consulta para modificar ele.
    useEffect(() => {
        // quando currentPage for modificado
        // o carregando está aparecendo a cada vez que trocamos de pagina, sendo que ele só deveria aparecer quando não existir itens na tela, pois quando já existirem itens na tela, o carregando não tem porque aparecer
        // no mais fazemos um resultOpacity para 0.3, que é quando começamos a carregar, e depois ele ja vai obter os resultados e exibí-los.
        setResultOpacity(0.3);

        // vamos rodar a função getAdsList() para obter os anúncios, e quando fizermos isso vamos exibir o retorno da função getAdsList, para funcionar a paginação, pois até agora ele só faz a requisição, buscando a mesma coisa para cada paginação que clicamos.
        getAdsList();
    }, [currentPage]);

    // Contudo, os valores que alteramos no filtro, com o onChange e onClick, não são alterados na url, a url não é atualizada de acordo com o que é selecionado no filtro, e agora vamos fazer a alteração da url quando algo é alterado no filtro. Vamos fazer isso baseado nas 3 states que temos, que é a q, cat e state, vamos usar o useEffect para isso. O useEffect vai monitorar essas 3 states, e quando alguma delas for modificada, ele vai alterar algo, que é fazer um procedimento que muda a url.
    useEffect(() => {
        // Para fazer o procedimento que muda a url, a query string na url, vamos usar o hook useHistory da biblioteca react-router-dom. Vamos usar o history agora.
        // para mudarmos a url, podemos usar a função replace no history, dai ele muda a url sem necessariamente atualizar a tela.
        // então executamos a função replace no history, passando um objeto, dai, como queremos mudar o search, que é o que vem após o ?, dai ele altera a url sem atualizar a tela.
        // Agora vamos preencher os itens da queryString de acordo com os valores que temos nas states.
        // vamos criar um array chamado queryString, dai vamos preencher ele de acordo com os itens disponíveis.
        // let queryString = [];
        // // temos o q, então vamos preencher o q, dando um queryString.push, dai no push botamos q=${q}, para jogar para dentro da lista o elemento q com o valor q que é a state. 
        // if (q) {
        //     queryString.push(`q=${q}`);
        // }
        // // fazemos o mesmo para o cat, se tivermos cat botamos o elemento cat dentro do array, passando para ele o valor da state cat.
        // if (cat) {
        //     queryString.push(`cat=${cat}`);
        // }
        // // fazemos o mesmo para o estado (state)
        // if (state) {
        //     queryString.push(`state=${state}`);
        // }
        // ou seja, quando a tela renderizar, não vamos ter nada selecionado ou com valor, nenhuma das states com valor, logo, se as states tiverem valor, ele vai montando a query string e já exibe na url a queryString que ele vai montando, conforme mudamos o filtro, pois a cada vez que as states mudam, o useEffect ve que as states mudaram e dai ele executa tudo que está dentro dele, dai altera a queryString cada vez que mudamos as states, cada vez que mudamos algum campo do nosso filtro.
        // A url é atualizada conforme o filtro é atualizado sem necessariamente atualizar a página, useEffect fazendo isso para nós também.
        // Dessa forma nossa url sempre está atualizada.
        // Agora temos nossos 3 problemas resolvidos: Tudo que estiver na query string vai aparecer selecionado/marcado no filtro, dai quando alteramos os filtros ele altera as states, e por último, quando alterarmos o filtro, e as states consequentemente, ele altera a url também.
        // Agora nosso filtro está 100% sincronizado, e só precisamos usar as informações que temos para fazer a nossa busca e mostrar os anúncios na parte da direita dessa página.
        // Na próxima aula vamos fazer ele fazer a pesquisa dos anúncios de acordo com os filtros selecionados, para exibirmos os anúncios correspondente ao que foi filtrado.

        // isso vai criar para nós um array com as opções que temos na url.
        // Agora damos um replace no history, mudando o search do history, que é o que temos após o ?, que é o nosso filter, dai definimos nosso search agora com o que vem do queryString, dando um join no queryString, para juntar os itens que tem dentro da lista, juntando eles em uma string, separando cada elemento por um & (que é como separamos cada filter na url), dessa forma criamos uma nova query string, que terá o valor dos filters definidos pelo que é selecionado no nosso filtro, que altera nossas states q, cat e state.
        // history.replace({
        //     search: `?${queryString.join('&')}`
        // });

        // no react-router-dom v6 (versão 6), o useHistory foi substituído pelo useNavigate, então atualmente, o useNavigate é utilizado em vez do useHistory.
        // Exemplos de uso do hook useNavigate:
        // import { useNavigate } from 'react-router';
        // let navigate = useNavigate();
        // function goToHome() { navigate('/home') }
        //Redireciona o usuário pra págna anterior ou próxima no historico function prevPage() { navigate(-1) } function nextPage() { navigate(1) }
        // Substituição do hook useHistory, que não é mais utilizado, pelo hook useNavigate fazendo a mesma coisa que fizemos acima, só que usando o hook useNavigate para isso:
        //import { useLocation, useNavigate } from 'react-router-dom';
        // const Page = () => {
        // const navigate = useNavigate();
        // useEffect(() => {
        let queryString = []
        if(q){
        queryString.push(`q=${q}`)
        }

        if(cat){
        queryString.push(`cat=${cat}`)
        }

        if(state){
        queryString.push(`stateLoca=${state}`)
        }

        navigate(`?${queryString.join('&')}`, {replace:true});
        //}, [q, cat, state]);
        //}

        // esse useEffect já está monitorando a alteração nas states, que ocorre quando um filtro é alterado, logo, quando um filtro é alterado, ele muda o que precisa mudar na query string, e dai ja executa o método que faz a requisição para obter os anúncios de acordo com o filtro selecionado.      
        // Vamos precisar da requisição para obtermos os anúncios, mas vamos alterar essa requisição aqui para que ela possa enviar outros tipos de parâmetros/filtros.
        // usamos a função getAdList, que já tem dentro dela aquela função getRecentAds que criamos antes, que faz a requisição GET para a api para buscar os anúncios.
        // dai executamos a função getAdList, que cria e executa uma função que faz a requisição GET para obter os anúncios.
        // tem um detalhe muito importante que temos que observar, em sistemas, que é a quantidade de requisições. Aqui, como estamos monitorando o q por exemplo, podemos digitar algo, dai se digitamos o i ele pesquisa, o f ele pesquisa pelo titulo do anúncio, isso é interessante visualmente, mas por trás ele faz uma requisição a cada letra que digitamos do título de um anúncio, o que NÃO É LEGAL, o interessante é que esperemos o usuário finalizar de digitar, ou esperemos um tempo e dai sim buscamos, pois ai da tempo do usuário digitar. Uma das formas de fazermos isso é, quando executarmos esse useEffect, em vez de executarmos o método getAdsList diretamente, vamos criar uma variável timer, sem nenhum valor inicial, dai aqui, sempre que ele executar aqui, ele vai zerar se tiver algum timer, e vai iniciar um timer, dai ele vai esperar 1 segundo e roda, dai, se o usuário estiver digitando, imaginando que ele vai digitar mais de uma letra por segundo, dai, cada vez que ele digitar uma letra vai resetar o tempo, e, quando ele terminar de digitar, o sistema espera, dai ele executa. A mudança na url não precisa ser nessa mesma velocidade, mas a busca dos anúncios sim.
        // se existir algum timer
        if (timer) {
            // vai dar um clearTimeOut em timer, para limpar o timer
            clearTimeout(timer);
        }
        // dai em seguida, ele vai executar a função getAdsList após 2 segundos, dai ele seta o timer em 2 segundos, após os quais ele vai executar essa função getAdsList, e ele limpa o timer quando executar o useEffect novamente.
        timer = setTimeout(getAdsList, 2000);
        // ou seja, se qualquer mudança ocorrer nos filtros (q, cat e state), ele vai executar novamente esse useEffect, dai ele vai limpar o timer e setar o timer, limpar e setar, limpar e setar o timer, dai, quando ele limpar e setar o timer, e não limpar novamente, quer dizer que o usuário parou de mudar as opções de filtro, dai sim realizamos a busca/requisição.
        // quando o usuário começa a digitar na pesquisa por exemplo, ele espera 2 segundos e dai executa a função que faz a requisição.
        // ele não zerou o timer, ele fez as requisições, setou o timer, mas não zerou o timer que ele criou. Vamos pegar a declaração da variável timer (let timer), e vamos remover ela para fora do componente, pois dai o timer só vai ser criado uma vez. Dai agora, enquanto estivermos digitando, ele não faz a requisição, mas quando paramos de digitar, ele espera 2 segundos e faz a requisição, dai dessa forma ele só faz uma requisição, não muitas. Existem componentes feitos para nos auxiliar nesse processo, mas, como só precisamos de um timer para resolver isso, não tem porque usarmos um componente separado para fazer isso. Algo que podemos fazer para dizer para o usuário que estamos esperando essa execução, é criar uma state específica, que é a resultOpacity, que vai dizer a opacidade do resultado, definindo ele inicialmente como 1, dai, vamos definir essa state na list do rightSide, dando um style={{opacity: resultOpacity}}, definindo que o opacity, a opacidade dos anuncios vai ser definida pelo resultOpacity. se botarmos o resultOpacity sendo inicialmente 0.3, aparece os anuncios, mas ficam meio apagados, pois estão com opacidade 0.3. O resultOpacity começa com 1, dai toda vez que ele iniciar o timer, automaticamente vai setar a opacidade para 0.3. Dai, quando ele receber o resultado da requisição do getAdsList, ele vai dar um setResultOpacity(1), ou seja, quando tiver um resultado real, que retornou da requisição, ele mostra o resultado, caso ele ainda esteja no processo de busca, ele não mostra. Para dizer ao usuário que os anúncios que aparecem enquanto ele está digitando não são os resultado real condizente com o que ele está pesquisando/filtrando, é meio que um carregando fake. O mesmo vale para quando filtramos uma categoria ou trocamos de estado, qualquer mudança nesses 3 filtros que temos, ele mostra isso para nós.
        setResultOpacity(0.3);

        // resetaremos a página aqui, sempre que for alterado algum filtro, voltaremos para página 1, pois, caso tivermos anúncios para exibir, teremos no mínimo uma página.
        // sempre que ele fizer a busca/requisição dos anuncios, que é feita aqui, ele vai dar um setCurrentPage(1), ele vai zerar nossa página atual, voltando para a primeira página, pois sempre teremos no mínimo uma página, se tivermos algum item para exibir.
        setCurrentPage(1);
        // fazemos isso aqui, e não na criação e chamada de função da api para a requisição, que é feita na função getAdsList, pois colocando la, sempre que ele fizesse a requisição, iria voltar para a primeira página, então tipo, se clicarmos para ir para a página 2 e ele fizer a requisição, volta para a página 1, e não é isso que queremos. Dai agora está certinho.
    }, [q, cat, state]);


    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    // leftSide são nossos filtros dos anúncios
    // rightSide são nossos anúncios
    // no leftSide vamos criar um formulário com method GET. Lmebrando que, quando clicamos para filtrar os anuncios de uma categoria específica, ou quando digitamos algo no searchBox, ele manda na url as informações, então precisamos pegar essas informações da url.
    // O filtro dessa página vai ser um GET também, já quando mudamos as opções dele, ele muda na url também, não que esse formulário vai ser enviado, mas se ele for enviado por acidente, não tem problema, pois vai funcionar do mesmo jeito.
    // dentro do form do leftSide, vamos mostrar uma barra de pesquisa, que já vai ter algo se o cara já tiver pesquisado, e outros filtros para que os anuncios possam ser filtrados por eles. Em termos de filtros, podemos hoje filtrar pela procura (pegando no titulo do anuncio dai), o estado e a categoria.
    // o name q do primeiro input do form do leftSide seria a query.
    // o input do estado vai ser um select, com um option vazio e depois preenchemos os outros options com os estados que vamos pegar consultando a api.    
    // a categoria vai ser uma listagem das categorias, dai o usuário seleciona a categoria. Vamos fazer uma lista, dai vamos manipular essa lista com o React.
    // a lista dos estados estão em stateList, então só temos que usar ela e mapear cada item dela para exibir ela. Vamos pegar o item e o index de cada item no map, dai no option vamos exibir o item.name e no value o item.name também, pois é o mesmo nome no filtro, e como estamos usando o map, no elemento botamos o key e passamos para ele o index de cada item que o map percorre da lista. Agora ja temos a lista dos nossos estados para selecionar, mas não está salvando essa seleção/filtro em lugar nenhum, nem para o estado, categoria ou pesquisa.
    // Agora vamos listar as categorias também, já temos as categorias no state, categories, que é uma lista de categorias, dai vamos dar um map nessa lista e criar uma li para cada item/categoria que tiver na lista, também vamos botar uma imagem representando a categoria, pois cada categoria tem uma imagem representando ela, e vamos botar o nome da categoria também. Vamos botar uma class em cada li, que é cada item da lista, cada li.

    // Agora temos que pegar os filtros que estão vindo da url, quando filtramos os anúncios, dai temos que preencher esses campos aqui do nosso filtro com o que veio da url, e também temos que fazer que quando mudarmos o filtro, ele tem que mudar a url la em cima, não precisa recarregar a página, mas precisa mudar a url, os filtros na url, vai mudar tanto o valor do filtro, como também a url la em cima.

    // Agora botamos que o value do input de pesquisa vai ser definido pelo q, dai se digitarmos algo na barra de pesquisa da tela inicial e dermos um pesquisar, aparece o que foi digitado no campo que temos de name q.
    // Fazemos o mesmo com o campo do estado, botamos no select do Estado o value state, dai ele passa o valor do state que é passado na url, passando na url o que foi selecionado no filtro da tela inicial, para o select do estado.
    // Agora vamos fazer o mesmo para as categorias. Vamos fazer isso dentro do className de cada categoria, onde cada li, que é cada categoria tinha a class categoryItem, agora no className vamos verificar, se cat for igual a item.slug, que é o slug dessa categoria, o nome da categoria, vamos botar as duas classNames, a categoryItem e a active, para deixar a categoria selecionada na tela inicial nessa tela de ads, caso contrário, botamos só a class categoryItem, pois não foi passada categoria na tela inicial, ou a categoria passada na url, vinda da tela inicial, não é igual ao slug de nenhuma categoria, ou igual a nenhuma categoria. Agora já configuramos nosso filtro de acordo com os dados passados na url.
    // Agora, temos que fazer com que, quando clicarmos em outra categoria nesse filtro no menu lateral esquerdo, ele atualize a categoria para essa categoria que clicamos, ou se, quando mudarmos o estado, ele atualize o estado, e ele também não nos deixa digitar nada no campo de pesquisa, pois, como setamos o value dos campos, ele não nos deixa editar nada no filtro dessa página.
   
    // Já estamos pegando as coisas da url e preenchendo no nosso filtro, agora, temos que poder alterar nosso filtro, e quando alterarmos algo no filtro, essas alterações vão ter que ser alteradas na url, a url tem que ser alterada também, tudo tem que estar sincronizado certinho.
    // Para que possamos alterar o nosso filtro, vamos botar o onChange nos campos q e state, setando a state de acordo com o e.target.value. E como a categoria não é um campo, fazemos um onClick, que vai executar uma função que vai dar o setCat mandando o item.slug, para trocar a categoria selecionada na state cat.
    // Dessa forma podemos alterar nosso filtro nessa tela, mesmo inicialmente os valores dos campos serem definidos de acordo com a url.

    // Para exibirmos os resultados, é simples, pois na state adList já temos todos os anúncios, que é a lista dos itens que vão ser exibidos, então só temos que usar a state adList para exibirmos os anúncios. Já temos o componente padrão de cada anúncio, que é o AdItem, então, cada anúncio vai ser um AdItem. Dessa forma já conseguimos receber os anúncios. Já temos um método getRecentAds que faz a requisição quando a tela é renderizada, método que vamos mudar para outro método, mas que já está pegando 8 itens sorteados e estamos exibindo eles dai.

    // implementamos uma div, com class listWarning e que vai exibir o que tivermos na state warningMessage, que inicialmente vai ter dentro dela 'Carregando...', e também vamos criar a state loading que vai indicar que está havendo um carregamento, pois enquanto estiver ocorrendo um carregamento, a warningMessage vai ser 'Carrengando...', mas se não estiver carregando e não tivermos itens para exibir, exibimos em warningMessage que não temos itens para exibir. Dai vamos fazer com que a mensagem apareça ou não dependendo de quando ela precisa aparecer. Agora, se o loading estiver true, ou seja, tiver carregando, mostramos a div com class listWarning, dai quando loading não for true mais, não está mais carregando, dai ele exibe os anúncios retornados da requisição. Quando filtramos algo mas não é exibido nenhum anúncio, pois não tem anuncio com aquele dado filtrado, então temos que exibir a mensagem quando não tivermos resultado também. Nem vamos usar a state warningMessage, quando estivermos carregando, a div vai aparecer, mostrando um 'Carregando...', e quando, não estivermos carregando (loading false) e não tivermos resultados/anuncios (quando adList.length === 0), não tem anuncio nenhum para exibir, a requisição não retornou nenhum anuncio com o filtro pesquisado, dai ele exibe outra mensagem, 'Não encontramos resultados'. Agora está tudo funcionando corretamente nessa parte do carregando e do não encontramos resultados, dai agora o usuário nunca fica sem uma mensagem sobre o que está ocorrendo no sistema. Não precisamos usar o state warningMessage, só usamos o state loading.

    // Após a div com class list do rightSide, vamos criar uma div com class pagination, na qual vamos colocar nossos itens de paginação. Se nosso pageCount é 1, só temos uma página, logo, se só temos uma página, não precisamos de paginação, mas se temos 2 ou mais páginas, precisamos de mais páginas. Tendo 5 anúncios, como são exibidos 2 anúncios por página, teremos 3 páginas, sendo que a última página vai ter 1 anúncio só. Agora vamos exibir essas páginas de acordo com o número que temos no pageCount, para isso temos que fazer um for, mas não vamos fazer um for dentro da div com class pagination, vamos exibir o resultado, então vamos criar um array com as páginas, e na div pagination damos um map no pagination, dai montamos cada página, mostrando nela o número da página. Vamos criar nossa paginação aqui, que vai ser uma array.
    let pagination = [];
    // vamos preencher esse array agora, fazendo um for, for com i começando do 1. Agora temos uma array com a quantidade de itens que temos de paginação, se temos 3 páginas, vamos ter 3 elementos no array.
    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i);
    }
    // agora criamos a paginação, agora vamos deixar a paginação interessante, para depois fazermos ela funcionar.
    // vamos estilizar as classes pagination e pagItem agora, sendo o pagItem a contagemDeCadaPagina que teremos, e o pagination essa div na qual cada pagItem vai ficar, dessa forma temos uma barra de navegação entre páginas.
    // Agora temos que fazer a funcionalidade da paginação, ou seja, saber qual é a página, e fazer o click para que quando clicamos em cada página, ele vá para a página na qual estamos clicando, mas, a quantidade de páginas já está aqui, ele mostra já quantas páginas temos em cada exibição de anúncios com ou sem filtro de dados.
    // Na próxima aula vamos botar ações na nossa paginação.

    // Precisamos de uma state, que vai nos dizer qual a página que estamos atualmente, que é a state currentPage, que começa com o valor 1, que se refere a página 1, obviamente.
    // Vamos marcar com um class específico, a página atual, logo, quando o item for igual a currentPage, vamos botar a classe pagItem e a classe active, caso contrário, vamos botar somente a class pagItem, para marcar na barra de paginação a página atual, indicando que tal página é a página atual.
    // Quando clicarmos em alguma outra página, ele vai mudar nossa página atual. Então, vamos criar um click em cada página, que quando clicado, ele vai dar um setCurrentPage(item), vai botar como a pagina clicada e pagina atual.
    // Precisamos fazer uma proteção aqui também, que é, sempre que mudarmos algo no nosso filtro, ele deve resetar a quantidade de páginas, pois vai ser uma busca diferente, um retorno diferente de anuncios provavelmente.
    // O carregando não é necessário quando mudamos de página, então vamos botar que o carregando vai ser exibido quando tiver o loading e adList.length for igual a 0, logo, só vai mostrar o carregando ou o não encontramos resultados quando não tiver nenhum anuncio para ser exibido, logo, se esta carregando mostra o carregando, e se não está carregando mostra que não encontrou nada. Agora, quando clicamos para mudar de página, ele simplesmente carrega, ele não pisca a tela como um todo, ele só pisca devido a demora da requisição em retornar os dados, mas não quebra a tela como um todo.
    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input 
                            type="text"
                            name="q"
                            placeholder="O que você procura?"
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />
                        <div className="filterName">Estado:</div>
                        <select 
                            name="state" 
                            value={state}
                            onChange={e => setState(e.target.value)}
                        >
                            <option></option>
                            {stateList.map((item, index) => 
                                <option key={index} value={item.name}>{item.name}</option>
                            )}
                        </select>
                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map((item, index) => 
                                <li 
                                    key={index} 
                                    className={cat == item.slug ? 'categoryItem active' : 'categoryItem'}
                                    onClick={() => setCat(item.slug)}
                                >
                                    <img src={item.img} alt="" />
                                    <span>{item.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultados</h2>

                    {loading && adList.length === 0 &&
                        <div className="listWarning">Carregando...</div>
                    }     
                    {!loading && adList.length &&
                        <div className="listWarning">Não encontramos resultados.</div>
                    }        

                    <div className="list" style={{opacity: resultOpacity}}>
                        {adList.map((item, index) => 
                            <AdItem key={index} data={item} />
                        )}
                    </div>

                    <div className="pagination">
                        {pagination.map((item, index) => 
                            <div onClick={() => setCurrentPage(item)} className={item === currentPage ? 'pagItem active' : 'pagItem'}>{item}</div>
                        )}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;