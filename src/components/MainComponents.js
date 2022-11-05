// Para criarmos nossos componentes aqui, e para que eles tenham uma boa estilização, vamos usar o styled-components, instalamos essa biblioteca dando um npm install styled-components.
// importamos o styled da biblioteca styled componentes aqui dai.
import styled from "styled-components";
// e dai vamos criar os nossos componentes:
// nosso componente Template vai ser uma div
export const Template = styled.div``;

// podemos pré criar alguns componentes padrões que usamos geralmente nas páginas, como o PageContainer, o PageTitle (título da página), PageBody (corpo da página), depois estilizamos esses componentes.
export const PageContainer = styled.div`
    max-width: 1000px;
    margin: auto;
`;

export const PageTitle = styled.div`
    font-size: 27px;
`;

export const PageBody = styled.div``;

// criando um componente para exibir os erros, criando aqui no main components, que são componentes gerais do nosso projeto como um todo.
export const ErrorMessage = styled.div`
    margin: 10px 0;
    background-color: #FFCACA;
    color: #000;
    border: 2px solid #FF0000;
    padding: 10px;
`;

