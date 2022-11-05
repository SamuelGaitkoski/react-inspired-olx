import React from "react";
import { Link } from "react-router-dom";
import { Item } from './styled';

// nesse componente vamos receber props, que vai ser pelo menos o data nesse componente.
// Cada AdItem vai ter um Link dentro, e quando o anuncio for clicado ele vai mandar para /ad/idDoItem
// Vamos precisar formatar o preço.
// No nosso JSON que recebemos da requisição dos ads do tipo GET, ele vem com o id do produto, imagem padrão do produto, preço, preço negociável, título. Ele mostra o preço (price) do produto, mas, se o produto tiver como priceNegotiable true, preço negocíavel, não vamos exibir esse preço, vamos dizer que o preço é negociável, então temos que verificar o priceNegotiable, se ele for true botamos que o preço do produto é negociável, se ele for false botamos o preço do produto efetivamente.
export default (props) => {
    // vamos criar uma variável chamada price que vai ser exibida no espaço do preço do produto
    let price = '';
    // se priceNegotiable for true, logo, o preço é negociável
    if (props.data.priceNegotiable) {
        // price vai ser preço negociável
        price = 'Preço Negociável';
    } else {
        // caso contrário, priceNegotiable é false, tem algum preço no produto, dai vamos exibir esse preço
        price = `R$ ${props.data.price}`;
    }

    return (
        <Item className="aditem">
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    <img src={props.data.image} alt="" />
                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">{price}</div>
            </Link>
        </Item>
    )
}