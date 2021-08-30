import React, { useState } from "react";
import styles from "../../css/monitor/MonitorDashboardPanel.module.scss";
import { PropTypes } from "prop-types";
import { isEmptyArray } from "../../helpers/utils_types";
import MonitorSiteCard from "./MonitorSiteCard";
import {
	createFreqIdMap,
	createFreqTypeMap,
	createIntervalsIdMap,
	createIntervalsNameMap,
} from "../../helpers/utils_processing";

// WHITE PANEL GRID UI THAT CONTAINS PREVIEWS OF SITES

const MonitorDashboardPanel = ({
	siteMonitors = [],
	intervalTypes = [],
	frequencyOptions = [],
}) => {
	console.log("intervalTypes", intervalTypes);
	console.log("frequencyOptions", frequencyOptions);

	return (
		<div className={styles.MonitorDashboardPanel}>
			{!isEmptyArray(siteMonitors) &&
				siteMonitors.map((site, idx) => (
					<MonitorSiteCard
						key={`Site:${site?.name}-${idx}`}
						siteRecord={site}
						intervalsMap={createIntervalsIdMap(intervalTypes)}
						freqOptionsMap={createFreqIdMap(frequencyOptions)}
					/>
				))}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default MonitorDashboardPanel;

MonitorDashboardPanel.defaultProps = {};

MonitorDashboardPanel.propTypes = {};
