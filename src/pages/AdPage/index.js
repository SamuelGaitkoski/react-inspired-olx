import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { PageArea, Fake, OthersArea, BreadCrumb } from './styled';
import useAPI from '../../helpers/OlxAPI';

import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem";

// Cada anuncio entra na rota /ad/idDoAnuncio, temos que pegar esse valor, que está na url, que é o id do anúncio que está sendo enviado para a página, para isso vamos importar o hook useParams do react-router-dom, dai pegamos o id do useParams, id que botamos que é o parametro passado na rota do anuncio.
const Page = () => {
    const api = useAPI();
    const { id } = useParams();

    // agora temos que pegar as informações desse produto/anuncio e exibir na tela.
    // O que vamos exibir nessa pagina depende da requisição, então vamos mostrar algo ao usuário indicando que está ocorrendo um carregamento. A página carregou, mas temos que fazer uma requisição ao web service (api) para pegar as informaçentão que vamos exibir. Normalmente, quando temos uma situação dessa, que o Facebook, Instagram, Twitter, todos os sistemas grandes mostram hoje em dia, que é mostrar uma área fake até que as informações reais sejam retornadas da requisição a api, vamos fazer isso.
    // Vamos criar uma state chamada loading, que vai começar como true, a página já carrega sabendo que está carregando. 
    const [loading, setLoading] = useState(true);
    // Vamos criar também a state que vai armazenar as informações do anúncio, que serão retornadas pela requisição.
    const [adInfo, setAdInfo] = useState({});
    // Vamos fazer primeiro essa parte dos carregamentos fakes.

    // Agora precisamos adicionar as informações fake. Vamos criar um componente chamado Fake, que vai ser uma div, e vai ter seu estilo. Vamos importar esse componente aqui. No adName (nome do anúncio), quando tiver carregando, o loading tiver true, ele vai exibir o componente Fake. Vamos botar no adDescription (descrição do anúncio) um fake também, quando estiver carregando. Para o componente Fake ficar com altura diferente na descrição, para não ficar o mesmo tamanho, para isso vamos passar uma prop height no componente, passando o valor que queremos. A imagem (adImage) quando tiver com loading vai ter height de 300px.
    // Agora, quando a página estiver carregando, que é quando loading está true, vamos ver a página marcada para as informações que vão ser exibidas, dai quando parar de carregar essas definições do fake loading saem e entram as informações corretas retornadas da requisição.

    // Vamos puxar as informações, fazendo a requisição que vai ser executada quando a tela for renderizada, então vamos fazer o método que vai executar a requisição e vamos chamá-lo também dentro do useEffect.
    // pegamos o id do anúncio da url, então vamos passá-lo para a requisição para buscar as informações do anúncio com id que passamos.
    // o método getInfo vai receber um id, para buscar as informações do anúncio que possui o id que passamos.
    // Nessa página do anúncio, deve mostrar outros anúncios, então o ideal é mostrar outros anúncios do mesmo vendedor, então podemos pegar as informações do anúncio clicado já com essas outras informações, mas temos que escolher se queremos buscar essas outras informações. Vamos criar um segundo parametro em getAd onde mandamos true, se quisermos mais informações, ou false, se quisermos as informações somente daquele anuncio, ou se não mandarmos esse parametro só queremos as informações daquele anuncio também.
    useEffect(() => {
        const getInfo = async (id) => {
            // vai reenviar o parametro id que ele recebeu para o nosso método da api que vai fazer a requisição GET do anúncio.
            const json = await api.getAd(id, true);
            // uma vez que ele pegou as informações do anuncio, setamos para a state AdInfo as informações do anuncio que recebemos da requisição, que estão no json.
            setAdInfo(json);

            // dando console para ver o que ele retornou da requisição GET
            console.log(json);

            // quando ele pega as informações do anúncio, ele pode dar um setLoading false, pois quando ele pegar as informações retornadas da requisição GET, ele ja vai exibir elas devido a elas estarem no AdInfo, então ja vai automaticamente tirar o loading e tirar todos os fake loading.
            setLoading(false);
        }
        getInfo(id);
    }, []);

    // Criando a função formatDate para formatar a data que pegamos da requisição que pega os dados do anuncio. A função recebe uma data e vai formatar essa data.
    const formatDate = (date) => {
        // vamos transformar a data em uma nova instancia de Date, usando a class Date.
        let cDate = new Date(date);
        // Agora vamos pegar o dia, mes e ano e exibimos normalmente, mas o mesmo temos que exibir o nome do mesmo, então, para isso vamos criar o nome dos meses em um array.
        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        // Agora vamos pegar os dias da data que passamos, que agora está no cDate, dando um cDate.getDate()
        let cDay = cDate.getDate();
        // pegamos o mes da data dando um cDate.getMonth()
        let cMonth = cDate.getMonth();
        // para pegar o ano damos um cDate.getFullYear()
        let cYear = cDate.getFullYear();

        // o getMonth do JavaScript começa do 0, e o primeiro item do array, que é janeiro, está na posição 0 do array também, então ele vai exibir o mês por extenso dai.
        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

    // após obtermos as informações do anuncio, vamos exibir essas informações que já estão em AdInfo.
    // Se existir adInfo.title, um titulo na state adInfo, exibimos o titulo do anuncio. Abaixo do titulo vamos botar quando o anuncio foi criado. Se existir um dateCreated dentro do adInfo, vamos exibir a data de criação do anuncio. Vamos precisar formatar a data do anuncio que recebemos da requisição, para isso vamos criar uma função formatDate que vai receber uma data e formatar ela. Formatamos agora, usando a função que criamos para formatar uma data.
    // A descrição (adDescription) é um texto, então nem vamos verificar se ela existe dentro do adInfo, se ela existir botamos ela, se ela não existir ele não vai botar nada.
    // Vamos botar as visualizações do anuncio também, que vem de adInfo.views, então verificamos se tem view dando um adInfo.views, verificamos pois vamos exibir essas informações dentro de um elemento html small. Dai, cada vez que recarregamos a tela, ele faz a requisição das informações para um anuncio, ele incrementa uma visualização, cada vez que atualizamos a página ele conta como uma nova visualização.
    // Temos a exibição das informações do anuncio agora, para a imagem do anuncio, vamos usar um componente para botar um slideshow para exibir as fotos do componente.

    // no adImage vamos inserir nossa imagem. Já temos o adInfoImages que é um array com todas as imagens que temos nesse anúncio específico.
    // Para usarmos o componente Slide da biblioteca react-slideshow-image vamos importá-lo la em cima. Agora botamos esse componente Slide dentro do adImage que é onde vamos exibir as imagens do anuncio.
    // se tivermos as imagens dentro do adInfo para exibir, vamos usar o componente Slide, e dentro dele montamos nosso slide, dando um map no adInfo.images, dai dentro do map pegamos cada img da lista de imagens e o index do map, que é o index de cada item dentro da lista. Para cada imagem que tivermos dentro de adInfo.images, vamos criar uma div com class each-slide (cada slide), botamos o key na div, passando o index do map, e dentro da div botamos uma img, onde botamos nossa imagem. Para alinhar o slideshow, vamos na estilização e vamos alinhar esse slideshow, indo em adImage.

    // quando não tivermos carregando (loading), vamos verificar as informações do priceNegotiable e price do anuncio. Quando tivermos o priceNegotiable, botamos o box como Preço Negociável, quando priceNegotiable não existir/for true e quando o price existir, botamos uma div com className price, dai botamos o preço, que vamos estilizar por meio da class price na div na qual o preço está sendo exibido.
    // Vamos botar um botão entre um box e outro para o usuário mandar um email para o vender, pois assim como no olx, não compramos no olx, contatamos o vendedor do produto, antigamente era mandado um email, hoje existe um sistema de chat, que é um chat interno que foi criado. Aqui vamos trabalhar primordialmente com o email.
    // Agora vamos exibir mais informações do próprio usuário, que estão em userInfo.
    // vamos botar a verificação do loading e exibição da informação do fake loading do ultimo box do lado direito fora do box, dai se tivermos userInfo dentro do adInfo, vamos botar um fragment, dai vamos botar o link (tag a, não é o Link do React Router pois ele vai mandar para fora do site, para o email por exemplo) e o box. target="_blank" serve para o link da tag a ser aberto em outra guia do navegador, dai o site não é fechado e é aberto um outro site em cima do nosso site. No href do link com tag a, vamos botar um mailto pegando o email de adInfo.userInfo.email, que é o email do vendedor que anunciou aquele produto.
    // No último box do lado direito, vamos exibir o nome da pessoa que criou o anuncio, o email dessa pessoa e o estado da pessoa que criou o anuncio.

    // Se tivermos o adInfo.others, que são os outros anuncios/ofertas do vendedor, vamos exibir esses outros anuncios, dando um map em others, e para cada um desses anuncios, como temos um componente, que é o AdItem que já faz isso, vamos exibir cada um desses anuncio em um AdItem dai. Só temos que importar o AdItem, que vem de components/partials/AdItem. Vamos usar essa parte do outros anuncios fora do PageArea, e dentro do componente OthersArea que criamos.
    // Vamos criar nosso BreadCrumb agora, em cima de PageArea, vamos criar então nosso componente BreadCrumb, que existe muito nos sistemas, que da um mapeamento de onde entramos até chegarmos naquele anuncio, por exemplo: Você está aqui: Home -> Todas Categorias -> Carros -> Carro 3. Ele mostra um guia que exibe por quais paginas percorremos até chegar no anuncio que estamos. Vamos botar uma referência a Home, dai vamos botar o estado que o usuário está, a categoria do anuncio e por fim o nome do anuncio, então vamos botar adInfo.title. Se ele não acha nada no adInfo.stateName ele não exibe, mas no adInfo.category.name, como category é um objeto, ele da erro se não acha o name, logo, temos que verificar se o adInfo.category existe, pois dai o BreadCrumb vai aparecer, se o category existir/estiver preenchido, logo, antes de exibir o name dentro do objeto category, temos que verificar se o category existe primeiro. Agora temos que fazer os links do BreadCrumb, o Home já está linkado, mas o state (estado) não, o state vai vir para /ads?state={adInfo.stateName}, vai ir para os anuncios daquele estado, filtrando pelos anuncios do estado. A categoria vai ir para /ads?state=${adInfo}&cat=${adInfo.category.slug}, filtrando pelo estado (state) e pela categoria (pela propriedade slug da categoria no caso), filtrando pelos anuncios do estado e de uma categoria específica. Se quisermos só filtrar pela categoria vamos na página de anúncio e selecionamos para pegar os anuncios por categoria. Agora nosso BreadCrumb está funcionando corretamente, exibindo também os outros anúncios do vendedor caso eles existirem.
    // A página do anúncio está completa agora, com todas as informações que podem ser usadas e com carregamento instantâneo, mostrando o fake loading inicialmente e depois mostrando as informações do anúncio clicado.
    return(
        <PageContainer>
            {adInfo.category &&
                <BreadCrumb>
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to="/">{adInfo.stateName}</Link>
                    /
                    <Link to="/">{adInfo.category.name}</Link>
                    / {adInfo.title}
                </BreadCrumb>
            }
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, index) => 
                                        <div key={index} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated && 
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100} />}
                                {adInfo.description}
                                <hr/>
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box box--padding">
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable &&
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price && 
                            <div className="price">
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        }
                    </div>
                    {loading && <Fake height={20} />}
                    {adInfo.userInfo && 
                        <>
                            <a href={`mailto: ${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink">Fale com o vendedor</a>
                            <div className="createdBy box box--padding">
                                Criado por: 
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    }
                </div>
            </PageArea>
            <OthersArea>
                {adInfo.others && 
                    <>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className="list">
                            {adInfo.others.map((item, index) => 
                                <AdItem key={index} data={item} />
                            )}
                        </div>
                    </>
                }
            </OthersArea>
        </PageContainer>
    );
}

export default Page;