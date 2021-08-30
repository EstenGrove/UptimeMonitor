import React, { useState, useEffect } from "react";
import styles from "../css/pages/MonitorPage.module.scss";
import sprite from "../assets/icons/uptime.svg";
import { PropTypes } from "prop-types";
import { getAllSiteMonitors, getIntervalDeps } from "../helpers/utils_monitor";
import {
	formatSiteMonitor,
	normaliseTableData,
} from "../helpers/utils_processing";
import MonitorDashboardPanel from "../components/monitor/MonitorDashboardPanel";

const MonitorPage = () => {
	const [showNewSiteModal, setShowNewSiteModal] = useState(false);
	const [siteMonitors, setSiteMonitors] = useState([]);
	const [recurringOptions, setRecurringOptions] = useState({
		intervals: [],
		frequencies: [],
	});

	const initAddNewMonitor = () => {
		setShowNewSiteModal(true);
	};

	// fetches deps
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		const getDeps = async () => {
			const { intervalTypes, frequencyTypes } = await getIntervalDeps();
			const sites = await getAllSiteMonitors();

			const sitesFormatted = normaliseTableData(sites, formatSiteMonitor);

			setRecurringOptions({
				intervals: intervalTypes,
				frequencies: frequencyTypes,
			});
			setSiteMonitors(sitesFormatted);
		};

		getDeps();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.MonitorPage}>
			<header className={styles.MonitorPage_header}>
				<button
					type="button"
					onClick={initAddNewMonitor}
					className={styles.MonitorPage_header_addNew}
				>
					<svg className={styles.MonitorPage_header_addNew_icon}>
						<use xlinkHref={`${sprite}#icon-add`}></use>
					</svg>
					<span>Add New</span>
				</button>
				<h2 className={styles.MonitorPage_header_title}>
					Uptime Monitors{" "}
					<b>
						({siteMonitors?.length}/{siteMonitors?.length})
					</b>
				</h2>
			</header>
			<main className={styles.MonitorPage_main}>
				<MonitorDashboardPanel
					siteMonitors={siteMonitors}
					intervalTypes={recurringOptions?.intervals}
					frequencyOptions={recurringOptions?.frequencies}
				/>
			</main>
		</div>
	);
};

export default MonitorPage;

MonitorPage.defaultProps = {};

MonitorPage.propTypes = {};
