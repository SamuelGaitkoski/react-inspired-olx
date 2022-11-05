import React from "react";
import { Link } from "react-router-dom";

// Não vamos aplicar estilo nenhum aqui, só vamos informar que quando entrar nessa página, significa que a Página não foi encontrada.
// Vamos botar também um botão para voltar para a home (rota /, rota raiz).
// Criamos aqui nossa página não encontrada, que vai ser exibida quando a rota não tiver sido definida no Route, o Routes identifica isso dai, que não existe nenhum Route para aquela rota.
// Quando ele não achar nenhuma das rotas, ele abre a página não encontrada, que está no componente NotFound.

const Page = () => {
    return (
        <div>
            <h1>Página Não encontrada</h1> 

            <Link to="/">Voltar para a HOME</Link>
        </div>
    );
}

export default Page;