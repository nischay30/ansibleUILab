import React from 'react';

import HomeAppBar from '../../components/HomeAppBar';
import RemoveNode from '../../components/RemoveNode';

import request from 'superagent';

class RemoveNodeView extends React.Component {

	handleRemoveNode = (userInfo) => {
		console.log(userInfo);
		request
		.post('/removeNode')
		.send({userInfo: userInfo})
		.end(function(err, res) {
			console.log(res);
		});
	}
	render() {
		return(
			<div>
			<HomeAppBar />
			<RemoveNode removeNode = {this.handleRemoveNode}/>
			</div>
			);
	}
}

export default RemoveNodeView;
