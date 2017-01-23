import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class RemoveNode extends React.Component{

	state = {
		hostName: '',
		userName: ''
	}

	handleHostNameChange = (event) => {
		this.setState({hostName : event.target.value});
	}

	handleUserNameChange = (event) => {
		this.setState({userName : event.target.value})
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		let userInfo ={
			userName: this.state.userName,
			hostName: this.state.hostName
		}
		this.props.removeNode(userInfo);
		this.setState({userName: '', hostName: ''});
	}
	
	render() {
		return(
				<div>
				<h1 style={{marginLeft: '200px'}}>
				Enter Deatils to remove a node from the Swarm
				</h1>
				<form onSubmit = {this.handleFormSubmit}>
				<TextField
				required
				floatingLabelFixed={true}
				floatingLabelText = 'Enter Hostname'
				value = {this.state.hostName}
				onChange = {this.handleHostNameChange}
				style={{marginLeft: '300px', marginTop: '20px'}}
				/>
				<TextField
				required
				floatingLabelFixed= {true}
				floatingLabelText = 'Enter Username'
				value = {this.state.userName}
				onChange = {this.handleUserNameChange}
				style = {{marginLeft: '30px', marginTop: '20px'}}
				/>
				<RaisedButton
				label = 'Remove'
				primary = {true}
				type = 'submit'/>
				</form>
				</div>
			);
	}
}

export default RemoveNode;
