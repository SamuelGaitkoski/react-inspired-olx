import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// para começarmos a configurar o redux vamos importar o createStore do redux, vamos usar o configureStore do reduxjs/toolkit, pois o createStore não é usado mais,  e do Provider da react-redux nesse arquivo, que é o primeiro arquivo que é executado.
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Reducers from './Reducers';

// criamos agora a nossa store
// passamos para o nosso configureStore os nossos reducers, que vamos puxar de Reducers, o arquivo Reducers vai ter todos os reducers que vamos precisar, mesmo que só usemos um, pois isso nos possibilita usar mais de um reducer.
const store = configureStore(Reducers);

// vamos botar o componente App dentro do nosso Provider, jogando nossa store na prop store do Provider.
// Criamos nossa store, usamos o Provider, agora temos que criar o arquivo Reducers para que nosso projeto funcione. Vamos criar o arquivo Reducers.js em src.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
// dessa forma configuramos o redux
