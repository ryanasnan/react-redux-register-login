import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from '../../utils/helper';

class Alert extends Component {
	constructor(props) {
		super();
		this.state = {
			alert: {}
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let stateObj = {};

		if (nextProps.alert) {
			stateObj = { ...stateObj, alert: nextProps.alert };
		}
		return stateObj;
	}


	render() {
		// SEBENERE DI POSISI INI DIA BISA AMBIL PROPS ATAU STATE, SAMA SAJA, ASALKAN ADA REDUX ACTION REDUCER YANG MENGUBAH PROPS, YA SEBENERE PROPS SAJA GAK USAH REPOT REPOT BUAT STATE SIH, OK APPLY BESOK
		const { alert } = this.state;

		return (!isObjectEmpty(alert) &&
		<div className={`alert alert-${alert.type} text-center`}>
			{alert.message}
		</div>);
	}
}

const mapStateToProps = state => ({
	alert: state.alert
});

export default connect(mapStateToProps)(Alert);
