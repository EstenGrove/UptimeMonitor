import React, { useState, useEffect } from "react";
import styles from "../css/pages/SiteMonitorDetailsPage.module.scss";
import { PropTypes } from "prop-types";

const SiteMonitorDetailsPage = ({ history }) => {
	const { state } = history?.location;
	const { siteMonitor, currentStatus, intervalTypesMap, frequencyTypesMap } =
		state;
	const [historicalData, setHistoricalData] = useState([]);

	console.group("Details Page");
	console.log("intervalTypesMap", intervalTypesMap);
	console.log("frequencyTypesMap", frequencyTypesMap);
	console.groupEnd();

	// fetches ALL historical data...
	// ...processes it for data-viz usage
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		// fetch historical data for 'site'

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.SiteMonitorDetailsPage}>
			<header className={styles.SiteMonitorDetailsPage_header}>
				<h2 className={styles.SiteMonitorDetailsPage_header_title}>
					Site Details: <b>{siteMonitor?.siteName}</b>
				</h2>
			</header>
			<div className={styles.SiteMonitorDetailsPage_main}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default SiteMonitorDetailsPage;

SiteMonitorDetailsPage.defaultProps = {};

SiteMonitorDetailsPage.propTypes = {
	history: PropTypes.object,
};
