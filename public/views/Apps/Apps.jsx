import React from 'react';

import HomeAppBar from '../../components/HomeAppBar';

class Apps extends React.Component {
	state = {
		appData:[]
	};
	render() {
		return(<div>
			<HomeAppBar />
			</div>
			);
	}
};

export default Apps;
