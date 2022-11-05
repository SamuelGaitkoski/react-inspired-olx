import styled from "styled-components";

// SearchArea é a área de busca.
// Agora o que aplicarmos no SearchArea vai afetar todo nosso espaço da tela, que é o que queremos fazer.
// rgba ali no box-shadow pois é uma shadow (sombra) com 0.2 de transparência.

// botamos um flex-wrap: wrap; pois pode ser que ele quebre a linha, pois não deu o espaço da categoria, dai vamos quebrar a linha e botar o conteúdo abaixo, com o flex-wrap: wrap.
// Para termos 4 categoria por linha, então vamos fazer com que cada item ocupe 25% do espaço, então vamos definir o width de cada categoryItem que tivermos como sendo width: 25%, se botarmos width: 33% em cada item, iriam ser 3 itens por linha dai, jogando o 4 item para baixo e alinhando ele certinho.
// Como temos o Link no item todo, ele pega o hover no item todo, mesmo que não seja no texto, mas na imagem que passarmos o mouse, toda a área do item fica clicável.

// foi colocado um display: inline-block para poder aplicar margin ao elemento
export const SearchArea = styled.div`
    background-color: #DDD;
    border-bottom: 1px solid #CCC;
    padding: 20px 0;

    .searchBox {
        background-color: #9BB83C;
        padding: 20px 15px;
        border-radius: 5px;
        box-shadow: 1px 1px 1px 0.3px rgba(0, 0, 0, 0.2);
        display: flex;

        form {
            flex: 1;
            display: flex;

            input, select {
                height: 40px;
                border: 0;
                border-radius: 5px;
                outline: 0;
                font-size: 15px;
                color: #000;
                margin-right: 20px;
            }

            input {
                flex: 1;
                padding: 0 10px;
            }

            select {
                width: 100px;
            }

            button {
                background-color: #49AEEF;
                font-size: 15px;
                border: 0;
                border-radius: 5px;
                color: #FFF;
                height: 40px;
                padding: 0 20px;
                cursor: pointer;
            }
        }
    }

    .categoryList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        .categoryItem {
            width: 25%;
            display: flex;
            align-items: center;
            color: #000;
            text-decoration: none;
            height: 50px;
            margin-bottom: 10px;

            &:hover {
                color: #999;
            }

            img {
                width: 45px;
                height: 45px;
                margin-right: 10px;
            }
        }
    }

    @media (max-width: 600px) {
        .searchBox form {
            flex-direction: column;

            input {
                padding: 10px;
                margin-right: 0;
                margin-bottom: 10px;
            }

            select {
                width: 100%;
                margin-bottom: 10px;
            }
        }

        .categoryList .categoryItem {
            width: 50%;
            padding: 10px;
        }
    }
`;

// estilizando dentro do PageArea, que se refere a listagem dos anuncios (ads).
// Aqui em list vamos usar o aditem, que é o class de cada item, de cada AdItem, então vamos botar largura de 25% em cada aditem, para caberem 4 itens na tela.
export const PageArea = styled.div`
    h2 {
        font-size: 20px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        .aditem {
            width: 25%;
        }
    }

    .seeAllLink {
        color: #000;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        margin-top: 10px;
    }

    @media (max-width: 600px) {
        & {
            margin: 10px;
        }

        .list .aditem {
            width: 50%;
        }
    }
`;