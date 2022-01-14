import React from 'react';//React es una biblioteca de JavaScript para crear interfaces de usuario.
import ReactDOM from 'react-dom';//Este paquete sirve como punto de entrada al DOM y a los renderizadores del servidor para React. Está destinado a combinarse con el paquete React genérico, que se envía como react to npm.
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';//La librería react-router-dom es muy útil y ponente para realizar navegación entre componentes, los cuáles a través de hooks fáciles de usuar, podemos implementar diversas formas de navegación entre componentes, enviando valores como parámetros o estados.



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>{/*nos da una url mas prolija */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//React Router es una biblioteca de enrutamiento del lado del servidor y del cliente con todas las funciones para React, una biblioteca de JavaScript para crear interfaces de usuario. React Router se ejecuta en cualquier lugar donde se ejecute React; en la web, en el servidor con node.js y en React Native.