import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';

class HomeAppBar extends React.Component {

	state = {
		open: false
	}

	handleToggle = () => {
		this.setState({open: !this.state.open});
	}

	render() {
		return(
			<div>
			<AppBar
			title="AnsibleUI"
			iconClassNameRight="muidocs-icon-navigation-expand-more"
			onLeftIconButtonTouchTap={this.handleToggle}
			/>
			<Drawer
			docked = {false}
			open = {this.state.open}
			onRequestChange = {() => {this.setState({open: false})}}>
			<Avatar
			size = {230}
			style= {{marginLeft: '10px', marginTop: '15px'}}>
			NG </Avatar>
			<Link to ='/add'>
				<MenuItem>Add a Node</MenuItem>
			</Link>
			<Link to ='/remove'>
			<MenuItem>Remove a Node</MenuItem>
			</Link>
			</Drawer>
			</div>
			);
	}
};

export default HomeAppBar;