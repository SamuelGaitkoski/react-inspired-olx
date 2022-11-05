import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageArea, SearchArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem";

// esse arquivo index.js vai ser carregado nessa pasta Home.
// Aqui criamos um componente normal, que vai ser o componente Page.
// da página Home, podemos ir para a página sobre fazendo um link, só que quando clicamos no link da tag a, damos um f5 na página toda. Para ir da página Home para a página About sem dar F5 ou atualizar a página, podemos usar o Link, importamos ele da biblioteca react-router-dom, o Link é um componente, dai no to dizemos para qual rota vamos, dai ele vai carregar o componente daquela rota, que se a rota for /about o componente carregado vai ser o Sobre. Visualmente fazer isso com a tag a e o Link é a mesma coisa, ele cria uma tag a nos dois casos, mas usando o Link quando clicamos ele somente vai para a tela About, ele não atualiza a tela inteira, não faz outra requisição para o servidor, muda a url sem precisar carregar a página sobre e todo o restante, ele só vai para a outra página.

// Criamos um fragment para retornar só um elemento visual, um fragment, como se fosse uma div.
// No SearchArea, temos a área de busca total, e dentro dela temos uma área reduzida para o conteúdo.
// Abaixo, no PageContainer com um PageArea dentro, temos uma área reduzida para o conteúdo com a área do próprio conteúdo.
// Temos duas áreas distintas com comportamento inverso, no PageContainer com PageArea temos uma limitação do conteúdo, mas no SearchArea com PageContainer precisamos, precisamos da área completa e dentro dela a limitação do conteúdo.

// o formulário de busca do searchBox vai fazer a requisição mesmo, não vai funcionar via React, ele vai para uma outra página e etc. Isso afeta em todo o projeto. Ele vai para a página /ads, definimos no action que ele vai para a rota /ads, logo vamos criar a página ads. No select com name state vai ter a lista dos estados que o usuário vai poder selecionar, vamos buscar os estados consultando a api, para preencher eles, da mesma forma que fizemos no cadastro.
const Page = () => {
    const api = useAPI();

    // lista de estados
    const [stateList, setStateList] = useState([]);
    // lista de categorias
    const [categories, setCategories] = useState([]);
    // lista de anúncios (ads)
    const [adList, setAdList] = useState([]);

    // quando a tela for renderizada
    // o useEffect vai pegar os estados, como fizemos na tela de cadastro/register
    useEffect(() => {
        // vamos fazer a requisição para obter os estados, chamando o método GET getStates, para obter os estados e setar o que vier dessa consulta aos estados na stateList
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        // executamos o getStates dai
        getStates();
    }, []);

    // vamos fazer um useEffect para obter as categorias também, para obter elas da api e setar na tela as categorias quando a tela for renderizada.
    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    // quando a tela renderizar, ele tem que buscar e exibir os anuncios.
    // o nome do método que vai fazer a requisição a api vai set getAds, mas ele vai mandar um objeto com algumas propriedades específicas, pois esse getAds vai ser usado bastante ao longo do nosso sistema. No objeto, vamos dizer que queremos os últimos, ele já ordena pela data, mas vamos ordenar de forma decrescente, dos últimos para os primeiros, e vamos dizer até quandos ads queremos pegar, então vamos mandar o sort 'desc', o sort crescente é asc, e o limit é quantos queremos ads queremos pegar, que é 8, 2 fileiras de 4 itens para ficar legal.
    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: 8
            });
            // quando recebermos o retorno da requisição, vamos adicionar o retorno da requisição para o state da lista de ads (AdList). Os ads vem dentro do json.
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    // mapeamos a lista de estados agora, para exibir cada item da lista de estados como um option.
    // Agora mapeamos as categorias, fazendo um map e categories, onde cada categoria da lista vai ser um Link, com uma imagem e um span dentro, imagem que vai mostrar a imagem referente ao item/categoria e span que vai mostrar o nome do item/categoria, no Link, que é cada item da lista, botamos a prop key passando o index que recebemos no map também, já que estamos usando o map.
    // Ele está mandando o token em cada objeto de categoria, não tem problema isso, mas não precisa do token nessa requisição.
    // Na prop to de cada Link, vamos botar o /ads, e dai ele vai exibir /ads?cat= propriedade slug do item dai, dai ele vai para a página da sua respectiva rota, indo para a página ads buscando pela categoria que selecionamos. Logo, a listagem de todas as categorias vão ser feitas nessa página ads, a página de ads vai ser a página geral de listagem geral de todos itens que tivermos.

    // Dentro do PageArea que está dentro do PageContainer, vamos exibir os anúncios.
    // Vamos iniciar pegando os anúncios por meio de requisição GET.

    // Agora que estamos recebendo no método que faz a requisição dos anuncios (ads), vamos mapear o state AdList, que tem todos os anuncios, e para cada item da lista vamos ter um componente, que vai ter o key por causa do map. Cada anuncio vai ser um AdItem, vamos criar esse componente em components/partials, na pasta AdItem. Vamos importar esse AdItem aqui em cima.
    // O botão Ver todos vai servir para mostrar todos os anuncios (ads), sem filtro nenhum, vai para ads dai, que vai exibir todos os anuncios.
    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que você procura?" />
                            <select name="state">
                                {stateList.map((index, item) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((index, item) => (
                            <Link key={index} to={`/ads?cat=${item.slug}`} className="categoryItem">
                                <img src={item.img} alt="" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((index, item) => (
                            <AdItem key={index} data={item} />
                        ))}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>
                    <hr/>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </PageArea>
            </PageContainer>
        </>
        
    );
}

export default Page;