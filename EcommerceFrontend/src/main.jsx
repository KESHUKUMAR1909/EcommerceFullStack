import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';
import { positions, transitions } from 'react-alert';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'; // ✅ Add this!

// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_CENTER,
//   transition: transitions.SCALE,
// };

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      {/* <AlertProvider template={AlertTemplate} {...options}> */}
        <App />
      {/* </AlertProvider> */}
    </Provider>

);