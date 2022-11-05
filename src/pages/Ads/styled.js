import styled from "styled-components";

// quando o mouse for passado em cima do categoryItem, que é cada categoria, vamos colocar o hover, para aplicar um estilo, e vamos botar o active, que é o categoryItem que tiver a class active, para marcar a categoria que estiver selecionada no filtro, para identificarmos facilmente qual a categoria está selecionada.

// botamos o .aditem com width de 33% para que cada adItem fique com largura de 33%, para que fiquem 3 adItens por linha.
export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .leftSide {
        width: 250px;
        margin-right: 10px;

        .filterName {
            font-size: 15px;
            margin: 10px 0;
        }

        input, select {
            width: 100%;
            height: 40px;
            border 2px solid #9BB83C;
            border-radius: 5px;
            outline: 0;
            font-size: 15px;
            color: #000;
            padding: 10px;
        }

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .categoryItem {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            color: #000;
            cursor: pointer;

            img {
                width: 25px;
                height: 25px;
                margin-right: 5px;
            }

            span {
                font-size: 14px;
            }
        }

        .categoryItem:hover, 
        .categoryItem.active {
            background-color: #9BB83C;
            color: #FFF;
        }
    }

    .rightSide {
        flex: 1;

        h2 {
            margin-top: 0;
            font-size: 18px;
        }

        .listWarning {
            padding: 30px;
            text-align: center;
        }

        list {
            display: flex;
            flex-wrap: wrap;

            .aditem {
                width: 33%;
            }
        }

        .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px 0;

            .pagItem {
                width: 30px;
                height: 30px;
                border: 1px solid #000;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                margin-right: 5px;
                cursor: pointer;

                &:hover {
                    border: 1px solid #999;
                }

                &.active {
                    background-color: #CCC;
                }
            }
        }
    }

    @media (max-width: 600px) {
        /* aplicando estilo no próprio PageArea por esse &, ou se não botar ele e em nenhum outro elemento, pega no PageArea também */
        /* isso: */
        /* flex-direction: column; */
        /* é a mesma coisa que isso */
        & {
            flex-direction: column;
        }

        .leftSide {
            width: auto;
            margin: 10px;
        
            ul {
                display: flex;
                flex-wrap: wrap;

                li {
                    width: 50%;
                }
            }
        }

        .rightSide {
            margin: 10px;

            .list .aditem {
                width: 50%;
            }
        }
    }
`;