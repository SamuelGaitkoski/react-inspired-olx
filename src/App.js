import React from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import './App.css';

import { Template } from './components/MainComponents';
// botamos até o Header, pois como o arquivo do componente está como index.js, ele sempre procura o arquivo index e abre ele primeiramente.
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

import Routes from './Routes';

// Introdução e Tecnologias
// esse projeto vai ser um "clone" do olx, pois não vai ser uma réplica exata do olx, vamos criar uma versão do olx com as funcionalidades que tem la, mas com o nosso próprio layout, que vai ser um layout parecido com o do olx. Clone pois vamos fazer um site semelhante, mas não vamos fazer uma cópia exata do olx, até porque isso seria ilegal.
// Para fazer esse projeto vamos usar as tecnologias React (com várias bibliotecas junto do react), no back end podemos fazer um web service como quisermos, fazer o back end como quisermos, vamos utilizar esse back end para montar o nosso front-end, como nosso projeto vai ser feito com o React ele é um Single Page Application (SPA), que é uma página única que se modifica dependendo dos conteúdos/ações/eventos/coisas que vamos fazer durante a tela como um todo, nosso front end vai estar se comunicando a todo momento com o back end, que é onde tem o servidor, o banco de dados, as informações e etc.
// Vamos utilizar outras biblitecas no projeto conforme formos montando o mesmo, dai vamos instalando as bibliotecas que vamos necessitar.
// Vamos criar o projeto do zero até deixar ele online, vamos até o processo de deploy, onde vamos deixar o sistema online e acessível por qualquer pessoa por sua url.


// Projeto Inspiração
// essa aula é uma apresentação da inspiração do projeto o qual vamos fazer.
// o projeto feito no link: www.templates-jooomia-monster.com/joomia30/jm-iks/en/
// vamos fazer esse projeto, que é similar ao olx, mas tem modificações e melhorias que o próprio olx tem.
// não vai ser um projeto igual esse do link, vai ser parecido com ele, pois vamos utilizar recursos e formas de fazer mais didáticas, mas vamos nos inspirar nesse site.
// vai ser um projeto inspirado em termos de funcionalidade no olx, mas melhorado desse projeto do link, inspirado nesse projeto do link também em alguns termos de layout e melhorado do olx e desse projeto também.


// Aprenderemos muito sobre TS se tentarmos pegar um projeto em JS e passar para TS, e é bem tranquilo pois todo JS válido é um TS válido, então podemos só copiar o que for feito na aula, e quando o TS reclamar tentamos resolver, quem sabe até não descobrimos um bug ou outro que o professor acabou deixando passar nesse projeto por não ter um compilador checando os tipos para ele.
// esse projeto não foi feito utilizando o TypeScript pois é um projeto antigo da plataforma.


// Iniciando o Projeto
// aqui vamos começar criando nosso projeto, dando um:
// npx create-react-app nomeDoProjeto -> para criar o projeto React sem o TypeScript.
// para podermos criar o projeto usando o npx precisamos ter o node na versão 8 pelo menos instalado no nosso pc e o npm pelo menos a versão 5.2 que é a que suporta o npx.
// mkdir nomeDaPasta -> mkdir para criar uma pasta e em seguida botamos o nome da pasta que queremos criar e em seguida podemos dar um cd nomeDaPasta para entrar na pasta que recem criamos.
// vamos seguir as aulas fazendo o projeto sem typescript mesmo, para seguir as aulas que são antigas.
// no package.json podemos ver as dependencias instaladas ja no nosso projeto, como o react, react-dom e react-scripts.
// precisando de um terminal, podemos usar o terminal do vscode ou o cmd do computador, é mais simples e podemos criar outros terminais no terminal do vscode mesmo. 
// para rodar o projeto podemos dar um npm start, ou se gostarmos de usar o tarn podemos dar um yarn start, pois funciona da mesma forma.
// por padrão na criação do projeto react, em termos de estrutura do projeto ele criou o src com algumas coisas que vamos usar e outros arquivos que vamos deletar por não precisarmos usar. E ele criou o public também com nosso arquivo principal que é o index.html que é o html principal que carrega todo o começo do nosso projeto. Eventualmente vamos mexer no public botando umas pastas novas, mas vamos ir devagar.
// no src, podemos remover o import e coisas do serviceWorker, ou reportWebVitals.js, que são algumas coisas desnecessárias para nós no momento, logo.svg que ele cria por padrão ali, podemos remover o index.css, podemos remover o App.test.tsx também, o App.css vamos remover também. Como removemos o index.css, tiramos o import do index.css do index.tsx. O index.css tira as estilizações padrão do navegador, de margins, borders, etc.
// Agora vamos começar nosso projeto do zero mesmo.


// Geralmente quando tivermos que usar o Redux ou o ContextAPI vamos saber, fazer as coisas com ContextAPI é o mesmo que fazer as coisas na mão para atingir algo que o Redux já tem pronto, então normalmente isso vai ser uma decisão baseado na escala do que você quer fazer. Em um projeto pequeno em que você queremos adicionar muitas depêndencias podemos escolher por não usar o Redux, mas num projeto muito grande talvez o redux seja uma opção melhor. Podemos usar o Redux para tudo, já que usar o createSlice é muito mais prático do que fazer os reducers na mão, fora a facilidade de implementar middlewares o que é bem mais complidado de fazer com context, mas ai vai de gosto.


// Configurando Redux
// vamos configurar agora o redux no nosso projeto. Inicialmente não vamos usar o redux, mas podemos usar ele em algumas funcionalidades específicas se quisermos. 
// É um projeto que não necessita do uso do redux pois não vamos trocar informações entre telas, pois muita coisa vai vir do web service (api). Mas fazer da configuração do redux é bom, por exemplo para se quisermos botar o nome do usuário logado em outra tela, não vamos ter, mas se quisermos podemos usar o redux para isso. Então vamos deixar o redux configurado para usarmos ele caso precisarmos fazer alguma mudança no projeto.
// Vamos instalar as bibliotecas do redux e do react-redux: npm install redux react-redux.
// Para começarmos as configurações do redux vamos para o index.js, que é o primeiro arquivo que é executado.
// Agora que configuramos o redux e criamos nosso reducer.
// vamos criar uma estrutura bem limpa para usarmos o que quisermos aqui.
// vamos importar o connect do react-redux também, e agora vamos criar nosso componente principal, nosso aplicativo, que vamos chamar de Page, que vai receber umas props também.
// O connect é da versão antiga do Redux, onde ele utiliza HOCs (High Order Components) para compartilhar os dados (no caso injetar as states via props), hoje em dia o Redux usa hooks (que é mais estável e dá menos problemas que usando HOCs) no lugar e não recomenda mais o uso dos HOCs e do connect.
// O mapStateToProps é uma função que vai retornar um objeto, todas as propriedades que você colocar naquele objeto vão estar disponíveis no objeto props que você recebe no seu componente (basicamente você usa como se fosse uma prop normal, só que você não tem que passar elas quando for usar o componente, porque o Redux vai fazer isso para você).
// A aula sobre esse conteúdo foi removida, pois é uma forma obsoleta de fazer as coisas com Redux (embora não seja indicada pela documentação, ela ainda funciona e pode ser utilizada), então as aulas novas só abordam a forma nova que é através de hooks. 


// Configurando Router
// vamos dar a possibilidade do usuário ir de uma página para outra agora.
// Como o React é SPA, se quisermos ter 2 ou mais páginas diferentes carregando, precisamos de um Router, que é o que vamos configurar agora no nosso projeto, e é um dos passos mais importantes que temos que fazer, apesar de ser simples.
// temos que instalar a biblioteca React Router Dom para o React: npm install react-router-dom.
// Agora vamos usar essa biblioteca e configurar o Router.
// A partir de agora não precisamos mais mexer no index.js e em reducers.
// Vamos mexer a partir do nosso App agora, pois é ele que vai ter as nossas rotas.
// Vamos importar nosso BrowserRouter do React Router Dom, pois é com ele que vamos dar a possibilidade de haverem rotas.
// Vmoas botar todo nosso aplicativo dentro desse componente BrowserRouter, pois dentro dele vão ter todas as telas, e ele vai decidir quando vai aparecer cada tela. Dentro do BrowserRouter vamos botar nossa aplicação.
// Agora em src, vamos criar um arquivo chamado Routes.js.
// agora importamos nossas rotas para cá, importando o Routes do arquivo Routes.js. E usamos ele aqui dentro de BrowserRouter, para que por meio do BrowserRouter o componente principal, que é esse Page direcione para cada página que temos por meio das rotas definidas no Routes.


// Estruturando Template
// Vamos mexer na estrutura do nosso projeto.
// Essas páginas Home e Sobre vão ter uma estrutura geral padrão, um cabeçalho, rodapé, que é uma estrutura geral do nosso sistema como um todo, vamos ter um template padrão para nossa aplicação.
// Na nossa página principal, no nosso App.js, temos nosso BrowserRouter, que é para o processo de roteamento da url, então, para fazemos um template, vamos fazer isso antes das rotas, botando um Template, e dentro dele vamos ter um Header, o cabeçalho do nosso site, no fim do Template vamos ter um Footer, o rodapé do nosso site, e entre o Header e o Footer vamos ter nosso Routes, que são nossas rotas. Agora temos que criar os componente Template, Header e Footer, que tem estruturas diferentes. 
// O Template faz parte de componentes padrões do sistema como um todo, então vamos no src e vamos criar a pasta components, e nela vamos ter todos os nossos componentes, dentro ele vamos criar um novo arquivo MainComponents.js, que são os componentes principais que vamos precisar, eles vão estar nesse componente MainComponents.js, isso para o nosso Template, se quisermos também podemos chamar esse arquivo de TemplateComponents.js ou algo do tipo, pois vamos ter mais que um nesse arquivo.
// Agora importamos nossos componentes aqui, pois no arquivo components/MainComponents.js tem que tipo de componentes são cada coisa, o Template é uma div por exemplo, e a estilização dele vai la no MainComponents.js também. Vamos importar somente o Template aqui, pois só vamos usar ele.
// Vamos criar agora os componentes Header e Footer, que são templates que fazem parte da página, então são COMPONENTES PARCIAIS em termos mais técnicos, então dentro da pasta components vamos criar uma nova pasta chamada partials, que são os componentes gráficos parciais, como o Header, Footer, algum botão padrão que tenhamos, o componente do anúncio por exemplo, botamos eles dentro dessa pasta. Dai criamos a pasta Header, para separarmos nela a estrutura e o estilo, não precisamos botar tudo no mesmo arquivo, então quando criamos uma pasta podemos criar um index.js (estrutura do componente) e um styled.js (estilo do componente).
// Importamos nosso componente Header aqui, para exibi-lo aqui na página principal Page.
// Agora podemos navegar da página home para a página about e o nosso Header vai sempre estar presente, toda a página vai ter um Header obrigatoriamente, pois estamos usando o Header aqui no App.js e estamos usando o Header fora das nossas rotas, o mesmo vale para o Footer.
// Importamos nosso componente Footer aqui também, e então temos o nosso Footer e o nosso Header, 2 componentes ou estruturas exibidas independente da página aberta, se é a Home ou a Sobre, o Header e o Footer sempre estarão sendo exibidos.


// Criando o App.css
// Criar o App.css, removendo o que tem dentro do App.css padrão, importar ele no nosso App.js, pois uma das funcionalidades dele é aplicar efeitos gerais na página, como remover a estilização padrão dos navegadores (margin, border, padding).
// Para usar esse arquivo importamos ele aqui, sem dar um nome para ele mesmo:
// import './App.css';
// Então aplicamos o estilo geral dessa página no App.css, que vai se aplicar a todas as páginas.


// Vamos deixar nosso site responsivo por completo também.


// Criando o Header (1 - estrutura e logo)
// vamos ajustar o nosso componente Header agora.
// O próximo passo agora é criarmos menu, que ficará dentro do HeaderArea também, se o usuário estiver logado aparece o menu, se o usuário não estiver logado vai aparecer outro menu.


// Criando o Header (2 - menu)
// Agora vamos fazer o menu no lado direito do HeaderArea ou do container do HeaderArea.
// depois faremos essa questão de, se o usuário não está logado, aparece o menu de login e o de cadastro por exemplo, e se o usuário está logado aparece o menu minha conta e o botão de sair, o botão de postar um anúncio, fazemos depois essas possibilidades vendo se o usuário está logado ou não.
// Na próxima aula vamos fazer o processo de identificação de login ou não, pois a partir disso podemos exibir um menu se o usuário estiver logado e outro menu se o usuário não estiver logado.


// Criando o Header (3 - authHandler)
// Agora vamos fazer a funcionalidade para saber se o usuário está logado ou não. Nosso processo de login funciona da seguinte forma: O usuário digita seu email e senha, faz uma requisição ao web service (api), a api retorna se está certo ou errado, faz o processo de login e nos retorna um token, que vamos armazenar para que todas as requisições que mandemos a partir de agora, vamos enviar junto esse token que vai identificar que o usuário está logado, podemos armazenar esse token de muitas formas possíveis, uma das formas é por cookie, podemos armzenar no local storage também, no redux se quisermos um login temporário e de muitas outras formas. Mas no nosso projeto vamos usar no cookie para identificar essa questão de expiração e etc. Para fazermos esse procedimento vamos instalar uma dependência chamada js-cookie, pois com ela podemos facilmente criar, remover, setar vários cookies, ela facilita nossa vida, essa biblioteca é feita para front end, ela não teria como ser usada no back end, no back end usamos outras bibliotecas para setar cookie.
// instalamos essa bibliteca dando um: npm install js-cookie
// Vamos criar outra pasta em src, chamada helpers (ajudadores), dentro dessa pasta criamos um arquivo authHandler.js, que vai ser responsável pelo processo de autenticação, vai ser ele que vai verificar se o usuário está logado, vai deslogar o usuário, vai logar o usuário, o authHandler.js vai lidar com tudo isso que indica autenticação.


// Página 404
// Como estamos usando a biblioteca react-router-dom na v6, fazemos a rota de NotFound, para que quando a rota digitada na url do navegador não for nenhuma das rotas que definimos aqui, abre o componente da rota *, que é o componente NotFound.
// <Route exact path="*" element={<NotFound />}
// Vamos fazer uma página simples e fácil, que é a página 404 (página não encontrada)


// Login (1 - estrutura)
// vamos criar o nosso login, criando uma rota para o login e a página de login, que será a SignIn.


// Vamos agora para a parte de funcionamento, para a parte mais técnica da página de login.


// Login (2 - estrutura)
// Nessa aula vamos ligar nossos campos a states, fazer todo o processo técnico para que essa estrutura da página de login e formulário funcione como processo de login.


// Login (3 - funcionalidade)
// nessa aula vamos completar o processo de login na tela, em termos de funcionalidade da tela de login. Vamos sincronizar os states que criamos na tela de login com os campos dessa tela de login.


// Pré-API
// Na próxima aula vamos configurar as requisições a API que faremos, dai vamos começar a trabalhar com o web service, dai como eu não fiz o curso de back end em nodeJS, vamos acessar uma api: http://alunos.b7web.com.br:501, acessando essa url na porta 501. Na aula o professor vai rodar o projeto na url http://localhost:3001, pois ele tem o servidor/back end rodando na máquina dele, caso queiramos usar um back end online, usamos naquela primeira url informada, acessando os items por meio do nosso próprio usuário, dai criamos o nosso próprio usuário e usamos ele. Se tivermos nosso próprio back end, usamos na porta que quisermos mesmo. Para conferirmos que aquela url está funcionando, aquela rota para a api está rodando, damos um: http://alunos.b7web.com.br:501/ping, dai se ele estiver funcionando ele vai retornar um resultado em json com o resultado pong, ping pong para dizer que essa url/api está funcionando.


// Configurando a API
// Agora vamos criar as configurações da nossa api, para ela poder fazer consultas ao web service normalmente.
// nosso login está pronto, podemos tentar logar pelo email: suporte@b7web.com.br e senha: 12345, dai fazemos a requisição se der certo o login ou não, se der algum problema ele vai nos retornar ele, ou se der certo vamos logar, dai vamos automaticamente para a página inicial, e agora no nosso header temos o Minha Conta, o Sair e o Poste um anúncio, dai se atualizarmos a tela continuamos logado, pois ele está com o cookie token salvo, fizemos o processo de login, recebemos o token e adicionamos o token no cookie e está funcionando tudo.
// Agora fizemos o processo de login todo.
// Agora vamos fazer o processo de logout, para podermos voltar e fazer o processo de cadastro dai, para termos como acessar o cadastro dai.


// Logout
// Agora vamos fazer o processo de logout, antes de mexermos no cadastro.
// Já temos o botão de Sair, e esse é um link diferente, pois não precisamos de uma página para fazer o logout, só precisamos de uma ação.
// Não precisamos dizer para o servidor que fizemos logout, só apagamos o cookie e redirecionamos a página.
// Vamos para o nosso partial/Header/index.js agora.


// Agora vamos lidar com a página de cadastro.


// Cadastro (1 - estrutura)
// Agora vamos fazer o processo de cadastro, então vamos criar nossa rota e nossa página/componente, por meio da pasta SignUp em pages.


// Cadastro (2 - funcionalidade)
// Vamos fazer o processo de cadastro funcionar agora, pois já temos os campos e states, já temos o processo do disabled e do error, de exibição do erro de requisição também.
// Cadastro foi feito e está executando corretamente agora.


// Home (1 - searchBox)
// Vamos focar na página inicial agora, independentemente do usuário estar logado ou não, pois a página inicial vai ser sempre a mesma.
// Vamos focar na parte da busca inicialmente.


// Fizemos a caixa de pesquisa. Na próxima aula vamos lidar com a listagem das categorias.


// Home (2 - Categoria)
// Vamos fazer a listagem das categorias, e também vamos fazer os states dos campos da área de pesquisa.
// Agora finalizamos a área de searchBox e a área da listagem de categorias criada também, ambas estão finalizadas e funcionando.


// Agora vamos trabalhar na listagem dos items da página principal.


// Home (3 - Anúncios Recentes)
// Vamos fazer a exibição dos anúncios, agora vamos usar componentes reutilizáveis, que vamos usar nessa página e em outras páginas.


// Home (4 - AdItem)
// Nessa aula vamos focar no AdItem, que é o item de cada anuncio, é cada anúncio.
// Então vamos no AdItem, trabalhar nesse componente.


// AdPage (1 - FakeLoading)
// Vamos criar a página do próprio produto de cada anúncio.


// AdPage (2 - FakeLoading)


// AdPage (3 - Requisição)
// Agora vamos fazer a requisição para pegar as informações do anúncio e exibir essas informações na tela.


// AdPage (4 - Slideshow)
// Nessa aula vamos botar um slideshow, para aparecer todas as imagens do anuncio, junto com as animações e para que possamos passar as imagens para visualizar todas.
// Para fazer isso tem um componente chamado react-slideshow-image, que foi feito para isso e é muito interessante e fácil de implementar, então damos um npm install react-slideshow-image primeiro.
// Agora podemos utilizar o react-slideshow-image.


// Agora que todas as informações da esquerda estão ajustadas e funcionando corretamente, vamos exibir as informações da direita do nosso produto/anuncio.


// AdPage (5 - Info Direita)
// Agora vamos exibir as informações da direita da nossa página de cada anuncio.


// Temos agora no lado direito as informação de preço do anuncio, informações do vendedor e se o botão Fale com o vendedor for clicado ele vai mandar um email para o email do vendedor, que criou aquele anuncio.


// Agora vamos colocar os outros anuncios daquele mesmo vendedor do anuncio, quando tivermos eles.


// AdPage (6 - BreadCrumb)
// Agora vamos botar as outras ofertas/anuncios do vendedor, caso houverem, e também vamos botar o BreadCrumb acima do anúncio.


// Rota Privada
// Agora vamos configurar algumas rotas, que só podem estar acessíveis caso o usuário esteja logado, por exemplo, a rota Minha Conta, a rota Poste um anúncio, o usuário tem que estar logado para poder acessar algumas rotas. O menu só aparece quando estamos logados, mas se o usuário copiar a url e passar para uma pessoa que não está logada, ela vai acessar que conta?? Já que não tem nenhuma conta logada no navegador dela?? A página dos anúncios e outras, são páginas públicas, que não precisamos estar logados para acessar elas. 
// Para isso precisamos ir nas rotas, no Routes.js. O react-router por padrão não tem uma forma de especificarmos que se está logado acesso e se está logado não acessa. Mas podemos criar um componente que tem essa possibilidade. Vamos criar um arquivo RouteHandler.js em components, que vai usar internamente o componente Route, mas vai substituir o funcionamento do componente Route, pois vai ter um funcionamento diferente do componente Route que temos em Routes.js.


// Agora que podemos definir nossas rotas privadas, vamos criar o componente para postar um anúncio, que é a página para adicionar um anúncio ao sistema.


// AddAd (1 - estrutura)
// Nessa aula vamos fazer o processo de adicionar um novo anúncio, criando a página AddAd, que pode ser acessada pela rota /post-an-ad que é uma rota privada, que pode ser acessada somente se o usuário estiver logado.


// AddAd (2 - estrutura)
// Agora vamos pegar as categorias para exibirmos elas no select da categoria da página de inclusão de um anúncio.


// AddAd (3 - funcionalidade)
// Nessa aula vamos fazer nosso handleSummit, vamos lidar com o envio dos dados do nosso formulário de inclusão de um anúncio.


// Nossa página e processo de inclusão de anúncio está funcionando corretamente agora!!


// Ads (1 - estrutura)
// Vamos fazer a página que podemos filtrar e visualizar todos os anúncios. Quando digitamos algo ou selecionamos algo para filtrar os anúncios, ele vai para a mesma página, que é a página de visualização de tudo ou que filtra algo. Nessa página vamos criar um filtro geral para filtrar nossos anúncios, vamos criar a paginação e vários outros recursos nessa página.
// A página de ver todos os anúncios é a /ads. 
// Vamos começar criando essa página, depois vamos criar o filtros e tudo mais. Criamos a pasta Ads da página de anúncios em pages.


// Ads (2 - leftSide)
// Nessa aula vamos terminar de estilizar o menu lateral do lado esquerdo, e vamos fazer ele guardar as informações, para depois usarmos as informações na requisição do filtro do anúncios.


// Ads (3 - leftSide)
// Nessa aula vamos continuar nosso processo no filtro.


// Ads (4 - Pesquisa)
// Agora vamos fazer as buscas dos anúncios realmente acontecerem.
// Passo 1: Vamos fazer exibir os resultados, os anúncios, depois vamos fazer com que o filtro funcione, e que ao alterar o filtro ele altere os anúncios de acordo com os filtros.


// O próximo passo é botarmos um carregando ou um sem resultados encontrados.


// Ads (5 - Carregando)
// Agora vamos fazer 2 mensagens que devem aparecer na página Ads, que é a mensagem de carregando, que vai aparecer quando abrirmos a tela Ads, pois o que acontece é que a tela Ads, quando renderizada, acaba ficando um tempo sem anúncios aguardando a requisição ser feita e exibir os anúncios. E também faremos a mensagem de não achou nenhum resultado/anúncio.


// Agora vamos fazer a nossa paginação da tela Ads, pois se tivermos 1000 anuncios, precisamos exibir eles mas não tudo de uma vez, em uma página, para isso vamos criar a paginação, para poder dividir uma certa quantidade de anuncios em cada página.


// Ads (6 - Paginação)
// Nessa aula vamos fazer a paginação da tela Ads. Como temos poucos anuncios, vamos fazer com que peguemos menos itens, dai exibindo menos itens por pagina, vamos ter como ter paginação, pois hoje, como botamos 9 itens por pagina, nunca poderemos ter paginação, botando o limit como 2, para pegarmos 2 itens, ele só vai exibir 2 itens, mas tem mais para exibir, então nesse caso vamos fazer o processo de paginação. Os anuncios resultado da consulta a api, ele também nos retorna o total de itens daquela consulta, dai se não tivermos nenhum filtro ele vai pegar todos os anuncios do nosso BD, nesse caso ele mostra 2 mas tem mais que 2 anuncios, e ele vem com essa informação também, ele manda um total também, indicando quantos anuncios tem no total, apesar de ter vindo só 2. Dessa forma conseguimos saber tudo, se precisamos de paginação, quantas paginas vamos ter de paginação, e todas as outras informações a partir disso. Vamos começar a criar esse procedimento agora.


// Ads (7 - Paginação)
// Nessa aula vamos fazer nossa paginação funcionar, primeiro, precisamos saber em que página estamos.


// Rodapé
// Vamos fazer o nosso rodapé.


// Exercício (Minha Conta)
// Nessa aula, temos um exercício, que é montar o Minha Conta, então teremos que montar essa tela, que tem que ter 2 áreas distintas. Uma área para visualizarmos e alterarmos as informações do próprio usuário que está logado, e uma área para visualizarmos os nossos anúncios, dai, quando visualizamos os nossos anúncios, vamos poder alterar esses anúncios também. Podemos botar nessa tela primeiro as informações do usuário, e abaixo os anúncios daquele usuário, dai quando exibirmos os anúncios do usuário, podemos botar um botão editar em cada anúncio, dai quando o usuário clicar no botão editar ele pode abrir um modal acima da tela, com as informações daquele anúncio específico, e dai alteramos aquele anúncio específico, dai quando salvarmos, ele salva aquele anúncio específico, isso é uma dica de uma forma que podemos fazer a tela e etc. 
// Os recursos que vamos precisar para isso:
// Qual api precisamos para pegar essas informações todas e qual api usamos para alterar essas informações todas:
// Requisição do tipo GET para /user/me mandando o token, conseguimos todas as informações do usuário que precisamos, vindo também as informações dos anúncios do usuário. Essa rota da api/web service vamos usar para pegar as informações, retornando todas as informações do usuário e dos anúncios do usuário.
// Dai, para alterar as informações do usuário temos a rota da api /user/me, mesmo endpoint que usamos para obter todas as informações do usuário, só que requisitando por PUT, mandando os dados token, name, emaio, state, password, requisição PUT. Dai mandamos as informações, token, name, email, state, password, dai o próprio web service vai fazer todas as verificações, e se der tudo certo ele retorna sem nenhum tipo de erro.
// Para alterarmos informações do anúncio temos a requisição POST para a rota da api /ad/<id> mandando o token, status, title, category, price, priceNegotiable, description, images e img[]. Aqui podemos enviar arquivos, que é o img[], então a requisição foi definida do tipo POST, mas poderia ser do tipo PUT também, sendo o /ad/id do anúncio que vamos alterar, dai mandamos as informações que queremos alterar, entre elas o que o web service vai aceitar é o status (anuncio ativo ou inativo), não deletamos um anúncio, só inativamos ele, dai podemos mudar o titulo, categoria, preço, preço negociável, descrição, se deletamos alguma imagem, mandamos o novo array de imagens (images), e ele vai alterar essas imagens, e o img[], que é a mesma coisa que usamos para adicionar uma nova imagem quando estamos adicionando um anúncio, dai mandamos o img[], que pode ser um array com várias imagens, que ele vai adicionar essas imagens enviadas as imagens que já temos. images tem a lista de imagens que queremos que fiquem no anúncio, e o img[] são as novas imagens que vamos enviar (o arquivo dessas novas imagens que vamos enviar), então ele vai receber, tratar o img[] e juntar com as imagens que estão em images.
// São só esses 3 web services que vamos precisar nessa tela para fazer a exibição e a alteração das informações do usuário, e a alteração das informações de cada anúncio que quisermos alterar. 
// Esse exercício é mais extenso, mas é muito bom para treinar o que ja sabemos.


// Responsividade (1 - Home)
// Nessa aula vamos tratar da responsividade do nosso site.
// A responsividade em aplicações feitas no React é feita componente a componente, então vamos agora, de componente em componente fazendo o procedimento da responsividade.
// Agora nosso Header e a página Home está responsiva, vamos agora para as outras páginas.


// Responsividade (2 - Ad)
// Vamos responsivizar as outras páginas do nosso projeto.


// Agora vamos estilizar a tela de filtro dos anúncios, que é onde também podemos ver todos os anúncios que temos


// Responsividade (3 - Ads)
// Agora vamos deixar responsiva nossa tela dos Ads, que é nossa tela de busca e exibição dos anúncios com filtros ou não.
// Vamos fazer a responsividade na tela de login também, dai vamos aplicar um efeito para essa responsividade se aplicar ao login, cadastrar e postar um anúncio também, vamos repetir um estilo que vai servir para todas essas telas dai.
// Agora nosso site todo está responsivo.


// Deploy
// Nessa aula vamos trabalhar com o deploy, vamos pegar nosso sistema e vamos gerar nele uma versão para subir em um servidor, e após isso vamos testar ele funcionando.
// Vamos rodar um comando que vai gerar a versão desse projeto.
// Vamos na pasta public, o ideal é substituir os arquivos favicon.ico, logo192.png e logo512png, que estão todos citados no arquivos manifest.json, que serve mais para pwa, podemos manter isso ou tirar. Dai vamos alterar o short_name e name do manifest para Olx. Vamos abrir o arquivo index.html, dai em content botamos a descrição do nosso site. Podemos tirar os comentários existente. Mudamos o title do html para o título que vai aparecer sempre no nosso site.
// Então vamos no terminal do vscode e rodamos o comando npm run build, que vai pegar todo nosso código, juntar tudo isso e vai gerar uma versão estática do nosso site, uma versão a qual podemos pegar ela e jogar em um servidor por exemplo. Agora que ele gerou, apareceu a pasta build, que tem todos os arquivos do nosso sistema juntos, todos os códigos criamos estão juntos nesse build.
// Agora, o professor criou uma url, um domínio. Dai vamos no FTP, que está conectado nesse servidor, dai podemos ver as pastas do servidor no FTP, dai vamos na pasta build, abrimos ela, copiamos todos os arquivos que estão dentro dela e botamos para a pasta do servidor, dai depois que tudo for enviado, atualizamos e ele vai abrir nosso site funcionando. O site do professor não está com http pois ele não instalou certificado e nada mais, mas nosso site está funcionando direitinho.
// Agora fizemos o deploy da nossa aplicação para qualquer servidor que quisermos usar.
// Recaptulando o processo de deploy, vamos no projeto e arrumamos os arquivos do projeto, damos um npm run build, ele vai gerar os arquivos estáticos do nosso projeto em build, pegamos esses arquivos e jogamos em um servidor. Simples, fácil e tranquilo de fazer esse processo.
// Agora botamos no ar nosso sistema.
// Caso queiramos subir no mesmo servidor tanto o Back End quanto o Front End, queremos subir em um servidor dedicado que suporta um back end em node, ou temos um back end em php, e queremos subir junto, se for um apache, vai ter a pasta www ou a pasta public html, dai jogamos esses arquivos da pasta build la. Caso tenhamos um servidor em node, e queiramos subir nosso back end em node junto com os arquivos do nosso projeto react, vamos no servidor do node e criamos uma pasta publica, dai botamos os arquivos do build nessa pasta pública, e quando o cara acessar a raiz, vamos criar uma rota no servidor, quando for acessada qualquer url que não seja da nossa api, ele vai diretamente para essa pasta pública e vai rodar o arquivo index por exemplo, dai conseguimos juntar os dois e rodar normalmente. Se nosso Back End for em node temos que ter conhecimento para fazer isso, se for em php, com apache, também temos que ter conhecimento em apache para fazermos isso.
// nesse caso, estamos usando uma api externa, que está hospedada em outro servidor, então não tem problema nenhum, conseguimos usar ela no nosso site.


const Page = (props) => {
  return (
    <BrowserRouter>
      <Template>
        <Header />

        <Routes />

        <Footer />
      </Template>
    </BrowserRouter>
  );
}

// vamos criar os maps do próprio connect também
const mapStateToProps = (state) => {
  // agora damos um return com os itens que queremos
  return {
    // se quisermos o reducer de usuário inteiro, damos um user: state.user, basicamente ele vai criar uma prop dentro do nosso componente Page com o userReducer inteiro, que vai ter só o email nesse caso.
    user: state.user
  }
}

// vamos criar o mapDispatchToProps aqui, que recebe o dispatch, e cria as funções aqui. Por enquanto não vamos criar as funções. Agora nosso componente Page está criado, juntamente com o connect básico dele.
const mapDispatchToProps = (dispatch) => {
  return {

  };
}

// damos um export default usando o connect, mandando nele nossa função mapStateToProps, e vamos criar o mapDispatchToProps, que também podemos chamar de mapDispatch/mapFunctions, mandando no connect o nosso Page também.
export default connect(mapStateToProps, mapDispatchToProps)(Page);
// Agora nosso projeto está funcionando com sucesso, com o redux configurado com sucesso no index.js e no App.js também.
