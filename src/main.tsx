import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import Store from './assets/Redux/Store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<>
		<Provider store={Store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
	</>
);
