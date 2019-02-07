import React from 'react'; 
import {render} from 'react-dom'; //отдельный метод, для отрисовки в dom
import StorePicker from './components/StorePicker';
import App from './components/App';  
import Router from './components/Router'; 
import './css/style.css'; 



render(<Router />, document.querySelector('#main')) // ему нужен json и место, куда рендерить