import React from 'react';

import HomeAppBar from '../../components/HomeAppBar';
import AddNode from '../../components/AddNode';
import request from 'superagent';


class AddNodeView extends React.Component {

	handleAdd = (userInfo) => {
		console.log(userInfo);
		request
		.post('/addNode')
		.send({userInfo})
		.end(function(err, res) {
			console.log(res);
		});
	}

	render() {
		return (
				<div>
				<HomeAppBar/>
				<AddNode handleAdd = {this.handleAdd}/>
				</div>
			);	
	}
}

export default AddNodeView;