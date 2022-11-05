import styled from "styled-components";

// agora criamos o HeaderArea aqui dentro do styled, HeaderArea que vai ser uma div, que podemos estilizar aqui dai.
// vamos aplicar uma estilização diferente nele.
// O nosso componente Header vai ser responsivo, vai aparecer de uma forma em uma tela maior, e quando está em um dispositivo menor aparece diferente, alguns itens podemos sumir, faremos todos esses ajustes.
// Nosso Header vai usar toda a largura disponível, mas vai ter um limite no espaço máximo que ele usa de conteúdo, não vai abranger o conteúdo de ponta a ponta, precisamos de um Container aqui.
// Podemos botar estilizações internas do componente, as div's dentro do componente HeaderArea por exemplo. 
// Usamos outro componente quando o componente é reutilizado outras vezes, caso contrário botamos as estilizações dos componentes dentro de um componente utilizado primeiro.
// botando o estilo dentro do HeaderArea só, aplicamos estilo a div do HeaderArea como um todo.
// margin: auto é usado para o componente ficar no meio da div/tela.
// a class container que definimos dentro do HeaderArea usamos em uma div com a class container dentro do componente HeaderArea.
// Vamos usar dentro das páginas e no Footer esse conceito do conteúdo não ocupar todo o espaço da tela.
// nossa logo vai ter um flex: 1 para pegar todo o espaço disponível.
// align-items: center; para ficar centralizado verticalmente no meio da tela.
// definimos a estilização das classes logo-1, logo-2 e logo-3, que são as devidas classes que estão dentro de logo. Definimos para as 3 classes os mesmos estilos. Definimos algo específico para a logo-1, algo específico para a logo-2 e algum estilo específico para a class logo-3.
// Como é um Link, ficou com um text-decoration, com um traço em baixo, dai vamos botar uma propriedade padrão para todos os Links (tag a), que estiverem dentro do HeaderArea, que é o text-decoration: none.
// O Link do react-router-dom se transforma em uma tag a, então para estilizar o Link botamos para estilizar o a dentro do li. Botando &:hover dentro da tag a, aplicamos um hover naquela própria tag a.
// Quando acharmos dentro do Link, que é uma tag a, Link dentro de cada li, um Link com class &.button, no caso uma tag a com class button, vamos aplicar uma estilização específica para esse Link com essa class button.


export const HeaderArea = styled.div`
    background-color: #FFF;
    height: 60px;
    border-bottom: 1px solid #CCC;
    
    .container {
        max-width: 1000px;
        margin: auto;
        display: flex;
    }

    a {
        text-decoration: none;
    }

    .logo {
        flex: 1;
        display: flex;
        align-items: center;
        height: 60px;
        
        .logo-1, logo-2, logo-3 {
            font-size: 27px;
            font-weight: bold;
        }

        .logo-1 {
            color: #FF0000;
        }

        .logo-2 {
            color: #00FF00;
        }

        .logo-3 {
            color: #0000FF;
        }
    }

    nav {
        padding-top: 10px;
        padding-bottom: 10px;
    
        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        ul {
            display: flex;
            align-items: center;
            height: 40px;
        }

        li {
            margin-left: 20px;
            margin-right: 20px;

            a, button {
                border: 0;
                background: none;
                color: #000;
                font-size: 14px;
                text-decoration: none;
                cursor: pointer;
                outline: 0;

                &:hover {
                    color: #999;
                }

                &.button {
                    background-color: #FF8100;
                    border-radius: 4px;
                    color: #FFF;
                    padding: 5px 10px;
                }

                &.button:hover {
                    background-color: #E57706;
                }
            }
        }
    }

    /* aqui vamos criar o @media, quando a tela tiver com no máximo 600px de largura, vamos fazer alterações nas propriedades que temos */
    /* height auto para remover a altura do próprio HeaderArea, então podemos só botar o height:auto, ou podemos botar & { height:auto }, indicando que o próprio item vai receber propridades. Dai com height auto ele continua acompanhando a área disponível */
    @media (max-width: 600px) {
        & {
            height: auto;
        }

        .container {
            flex-direction: column;
        }

        .logo {
            justify-content: center;
            margin: 20px 0;
        }

        nav ul {
            flex-direction: column;
            height: auto;
        }

        nav li {
            margin: 10px 20px;
        }
    }
`;
