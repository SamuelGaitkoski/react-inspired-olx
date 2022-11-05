// Nesse arquivo, vamos dar um import no combineReducers, do redux, para podermos juntar todos os reducers que formos criando.
import { useReducer } from "react";
import { combineReducers } from "redux";
// importando o userReducer, que vai vir da pasta reducers que vamos criar em src, e vamos criar o arquivo userReducer.js dentro da pasta, para deixar organizado todos os reducers dentro da pasta reducers.
import userReducer from "./reducers/userReducer";

// vamos dar o export default no combineReducers ja, que é uma função que recebe os reducers que vamos criar, mandamos nela os reducers que vamos criar.
// vamos criar só um para termos ele, e se formos usar ele só precisarmos usá-lo mesmo, mas temos uma estrutura pronta para criar mais reducers se quisermos.
export default combineReducers({
    // nosso reducer vai ser o user, que vai ser o userReducer. Jogamos nosso reducer de user aqui com o nome user.
    user: userReducer
});
