import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default ({ mainLoading }) => {
	const isMainLoading = mainLoading !== undefined ? mainLoading : false;

	const style =  {
		position: 'fixed',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)'
	}
	return (
		<Fragment>
			<div style={ isMainLoading ? style : {}}>
				<img
					src={spinner}
					style={{ width: '200px', margin: 'auto', display: 'block' }}
					alt='Loading...'
				/>
			</div>
		</Fragment>
	);
};