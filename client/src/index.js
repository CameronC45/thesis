import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import Client from './graphql/Client';
import store from './store';
import { ApolloProvider } from 'react-apollo';



ReactDOM.render(
           <Provider store={store}>
               <ApolloProvider client={Client}>
                   <App/>
               </ApolloProvider>
           </Provider>, 
             
    
    document.getElementById('app'));