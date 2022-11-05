// agora vamos criar nosso reducer.
// vamos dar um export default no nosso reducer, que vai ter um state e um action. O state vai receber um valor padrão chamado de initialState, que criaremos, logo, inicialmente quando não houver valor nenhum para o state ele define os valores colocados em initialState, que vai ser o email vazio, dai usamos o email dentro do reducer.
const initialState = {
    email: ''
}

export default (state = initialState, action) => {
    // aqui botamos nossas ações para alterações dos dados do state. 
    // se a ação (action.type) for SET_EMAIL, como temos a propriedade email, vamos criar a action baseada nela.
    if(action.type === 'SET_EMAIL') {
        // dai vamos retornar uma cópia do state, alterando a propriedade email dessa cópia do state, o email dai vai ser alterado com o que vier de action.payload.email.
        return { ...state, email: action.payload.email };
    }

    // aqui retornamos o state
    return state;
}
// criamos assim o nosso reducer.


