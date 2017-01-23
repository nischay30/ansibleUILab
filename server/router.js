const Router = require('express').Router();
const fs = require('fs');
const spawn = require('child_process').spawn;
const async = require('async');

Router.use(require('body-parser').json());

Router.post('/addNode', function(req, res) {
	let file = fs.readFileSync('./server/Ansible-Learning/hosts/hosts','utf-8');
	let lines = file.split('\n');
	let userInfo = req.body.userInfo;

	let lineToBeInserted = '';
	lineToBeInserted  = lineToBeInserted + userInfo.name + ' ' + ' ansible_host=' + userInfo.ip;
	lineToBeInserted = lineToBeInserted + ' swarm_iface=' + userInfo.network + ' ansible_user=';
	lineToBeInserted = lineToBeInserted + userInfo.name + ' node_name=' + userInfo.name;
	lineToBeInserted = lineToBeInserted + ' ansible_sudo_pass=' +userInfo.password; 
	lines.splice(0, 0, lineToBeInserted);
	
	if(userInfo.value === 'worker') {
		lines.splice(lines.indexOf('[docker-workers]') + 1, 0, userInfo.name);
	}
	else {
		lines.splice(lines.indexOf('[docker-masters]') + 1, 0, userInfo.name);
	}
	let newFile = lines.join('\n');

	fs.writeFileSync('./server/Ansible-Learning/hosts/hosts', newFile, 'utf-8');

	const addNode = spawn('ansible-playbook', ['-i', 'hosts', 'main.yml','-vvv'], {cwd: './server/Ansible-Learning'})
	addNode.on('close', function () {
		console.log('done');
	});


    addNode.stderr.on('data', (data) => {
      let output = `${data}`;
      console.log(output);
  });
});

Router.post('/removeNode', function(req, res) {
	let file = fs.readFileSync('./server/Ansible-Learning/hosts/hosts','utf-8');
	let lines = file.split('\n');
	async.series([
		function(callback) {
			lines.splice(lines.indexOf('[remove]') + 1, 0, userInfo.name);
			fs.writeFileSync('./server/Ansible-Learning/hosts/hosts', newFile, 'utf-8');
			callback(null);
		}, function(callback) {
			const leaveSwarm = spawn('ansible-playbook', ['-i', 'hosts', 'main1.yml'], {cwd: './server/Ansible-Learning'});
			leaveSwarm.on('close', function() {
				callback(null);
			});
		}, function(callback) {
			lines.splice(lines.indexOf('[remove]' + 1), 1);
			lines.splice(lines.indexOf(req.body.userInfo.userName), 1);
		}, function(callback) {
			for(let index = 0 ; index< lines.length ; index = index  + 1) {
				if(lines[index].includes(req.body.userInfo.userName)) {
					lines.splice(index, 1);
					break;
				}
			}
			callback(null);
		}, function(callback) {
			let newFile = lines.join('\n');
			fs.writeFileSync('./server/Ansible-Learning/hosts/hosts', newFile, 'utf-8');
			callback(null);
		}, function(callback) {
			const demoteNode = spawn('docker', ['node', 'demote', req.body.userInfo.hostName], {cwd: './server'});
			demoteNode.on('close', function() {
				callback(null);
			});
		}, function (callback) {
			const removeNode = spawn('docker', ['node', 'rm', req.body.userInfo.hostName], {cwd: './server'});
			removeNode.on('close', function() {
				console.log('removed');
				callback(null);
			});
		}], function(err, results) {
			console.log('hey fully done');
		});
});
module.exports = Router;
