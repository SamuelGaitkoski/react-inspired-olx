import styled from "styled-components";

// para usar a prop height passada com valor no componente Fake, criamos uma função que vai receber o props, que são as props passadas para o componente, dai pegamos a prop height dando props.height, ou, se não tiver sido passada a prop height, definimos como padrão 20px para a altura (height).
export const Fake = styled.div`
    background-color: #DDD;
    height: ${props => props.height || 20}px;
`;

// a div de class leftSide vai ter flex 1, para ocupar todo o espaço disponível, pois a div de class rightSide vai ter tamanho fixo, então o leftSide vai se adaptar ao espaço disponível.

// dentro de adImage vamos alinhas o slideshow. Como as imagens do nosso anuncio são quadradas, mesmo se o usuário mandar a imagem se ser quadrada, o sistema vai cortar a imagem para deixar ela quadrada, esse é o padrão definido. Em adImage vamos definir uma largura e altura padrão para cada imagem, que é o tamanho de um celular. O margin-right que colocamos é para o espaçamento de 20px entre uma foto e outra. Dai vamos aplicar estilo para a class each-slide img, que é cada imagem que temos na lista, que vai ter um display flex, align items center, justify content center, background side cover e altura de 320px. Agora definimos a área específica na qual as fotos vão aparecer, agora novas fotos aparecem ao lado direito, dai as fotos vão passando, automaticamente e podemos passar as fotos conforme queremos, que é padrão do componente Slide da biblioteca react-slideshow-image. Jogamos as próximas fotos para o lado direito da nossa tela para que todas as imagens do anuncio sejam exibidas em sequência.
export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .box {
        background-color: #FFF;
        border-radius: 5px;
        box-shadow: 0px 0px 4px #999;
        margin-bottom: 20px;
    }

    .box--padding {
        padding: 10px;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;

        .box {
            display: flex;
        }

        .adImage {
            width: 320px;
            height: 320px;
            margin-right: 20px;

            .each-slide img {
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                height: 320px;
            }
        }

        .adInfo {
            flex: 1;

            .adName {
                margin-bottom: 20px;

                h2 {
                    margin: 0;
                    margin-top: 20px;
                }

                small {
                    color: #999;
                }
            }

            .adDescription {

                small {
                    color: #999;
                }
            }
        }
    }

    .rightSide {
        width: 250px;

        .price span {
            color: #0000FF;
            display: block:
            font-size: 27px;
            font-weight: bold;
        }

        .contactSellerLink {
            background-color: #0000FF;
            color: #FFF;
            height: 30px;
            border-radius: 5px;
            box-shadow: 0px 0px 4px #999;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            margin-bottom: 20px;
        }

        .createdBy strong {
            display: block;
        }

        .createdBy small {
            display: block;
            color: #999;
            margin-top: 10px;
        }
    }

    @media (max-width: 600px) {
        & {
            flex-direction: column;
        }

        .leftSide {
            & {
                margin: 0;
            }

            .box {
                width: 320px;
                flex-direction: column;
                /* margin auto para vir para o meio da tela o conteúdo que está dentro do box  */
                margin: auto;
            }

            .adInfo {
                padding: 10px;
            }
        }

        .rightSide {
            /* width auto é como um width 100% */
            width: auto;
            margin-top: 20px;

            .box {
                width: 320px;
                /* margin auto para ficar no meio */
                margin: auto;
            }

            .contactSellerLink {
                width: 320px;
                margin: 20px auto;
            }
        }
    }
`;

// seção das outras ofertas do vendedor
export const OthersArea = styled.div`
    h2 {
        font-size: 20px;
    }

    .list {
        display: flex;
        /* flex-wrap: wrap para que, quando não der para ir um anuncio ao lado do ultimo, ele quebra o mesmo para a linha de baixo */
        flex-wrap: wrap;

        .aditem {
            width: 25%;
        }
    }

    @media (max-width: 600px) {
        /* alterando o estilo do próprio OthersArea */
        & {
            margin: 10px;
        }

        .list .aditem {
            width: 50%;
        }
    }
`;

// link a vai ser um display inline-block, para podermos dar um margin nele.
export const BreadCrumb = styled.div`
    font-size: 13px;
    margin-top: 20px;

    a {
        display: inline-block;
        margin: 0px 5px;
        text-decoration: underline;
        color: #000;
    }

    @media (max-width: 600px) {
        & {
            margin: 20px;
        }
    }
`;