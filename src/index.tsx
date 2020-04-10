import React from 'react';
import ReactDOM from 'react-dom';
import App from 'base/components/App';

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept(['base/components/App'], () => {
    renderApp();
  });
}

renderApp();
