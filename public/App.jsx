import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, hashHistory} from 'react-router';

import Apps from './views/Apps';
import AddNodeView from './views/AddNodeView';
import RemoveNodeView from './views/RemoveNodeView';

import injectTapEventPlugin from 'react-tap-event-plugin';
import Flex from '../node_modules/flexboxgrid/css/flexboxgrid.css';

injectTapEventPlugin();

class App extends React.Component{

	render(){
		return(
			<div>
			<MuiThemeProvider>
			<div>
			<Router history = {hashHistory}>
			<Route path = '/' component = {Apps}/>
			<Route path = '/add' component = {AddNodeView} />
			<Route path = '/remove' component = {RemoveNodeView} />
			</Router>
			</div>
			</MuiThemeProvider>
			</div>
			);
	}
};

ReactDOM.render(<App />,document.getElementById('container'));