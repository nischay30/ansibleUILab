import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AddNode extends React.Component {

	state = {
		ip: '',
		name: '',
		network: '',
		value: 'worker',
		password: ''
	}

	handleIPChange = (event) => {
		this.setState({ip: event.target.value});
	}

	handleNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	handleNetworkChange = (event) => {
		this.setState({network: event.target.value});
	}

	handleChange = (event, index, value) => {
		this.setState({value: value});
	}

	handlePassword = (event) => {
		this.setState({password: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let nodeInfo = {
			ip: this.state.ip,
			name: this.state.name,
			network: this.state.network,
			value: this.state.value,
			password: this.state.password
		}
		this.setState({ip: '', name: '', network: '', password: ''});
		this.props.handleAdd(nodeInfo);
	}

	render () {
		return(
			<div>
			<h1 style={{marginLeft: '300px'}}>
			Enter System Details to Add System into Swarm
			</h1>
			<form onSubmit ={this.handleSubmit}>
			<TextField
			style = {{marginLeft: '350px', marginTop: '20px'}}
			value = {this.state.ip}
			onChange = {this.handleIPChange}
			floatingLabelText = 'Systems ip'
			floatingLabelFixed = {true}
			required
			/>
			<TextField
			style = {{marginLeft: '10px', marginTop: '20px'}}
			value = {this.state.name}
			onChange = {this.handleNameChange}
			floatingLabelText = 'System Name'
			floatingLabelFixed = {true}
			required
			/>
			<TextField
			style = {{marginLeft: '10px', marginTop: '20px'}}
			value = {this.state.network}
			onChange = {this.handleNetworkChange}
			floatingLabelText = 'Network Interface Name'
			floatingLabelFixed = {true}
			required
			/>
			<TextField
			style = {{marginLeft: '10px', marginTop: '20px'}}
			value = {this.state.password}
			onChange = {this.handlePassword}
			floatingLabelText = 'Enter Sudo Password'
			floatingLabelFixed = {true}
			required
			/>
			
			<SelectField
			value={this.state.value}
			onChange={this.handleChange}
			maxHeight={200}
			>
			<MenuItem value='worker' key={1} primaryText='Worker' />
			<MenuItem value='manager' key={2} primaryText='Manager' />
			</SelectField>
			<RaisedButton
			type='submit' 
			primary = {true}
			label ='Add'
			/>
			</form>
			</div>
			);
	}
}

export default AddNode;