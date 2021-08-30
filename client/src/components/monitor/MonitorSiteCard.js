import React, { useState, useEffect } from "react";
import styles from "../../css/monitor/MonitorSiteCard.module.scss";
import { PropTypes } from "prop-types";
import { addEllipsis } from "../../helpers/utils_processing";
import { isEmptyVal } from "../../helpers/utils_types";

// REQUIREMENTS:
// - Shows a single site's current state and meta info
// - Might need to fetch the historical data for each card, when selected

const getFreqTypeVal = (freqID, freqMap) => {
	const type = freqMap?.[freqID]?.frequencyType ?? "";

	if (!type || isEmptyVal(type)) return `Once`;

	return `${type} mins.`;
};
// get text for 'Recheck' (ie interval type: 'One Time' 'Recurring')
const getIntervalTypeVal = (intervalID, intervalsMap) => {
	const record = intervalsMap?.[intervalID];
	const { name } = record;

	return name;
};

// whether 'intervalType' is 'One Time' or 'Recurring'
const getRecheckValue = (intervalID, intervalsMap) => {
	const record = intervalsMap?.[intervalID];
	const { name } = record;

	return name === "One Time" ? "No" : "Yes";
};

// whether to notify for failures (ie contact_enabled column in table)
const getNotifyInfo = (isContactEnabled) => {
	if (isContactEnabled) {
		return "Yes";
	} else {
		return "No";
	}
};

const SiteCardSetting = ({ label, value, copyHandler }) => {
	return (
		<div className={styles.SiteCardSetting}>
			<span className={styles.SiteCardSetting_label}>{label}</span>
			{"  "}
			<span className={styles.SiteCardSetting_value} onClick={copyHandler}>
				{value}
			</span>
		</div>
	);
};

const MonitorSiteCard = ({
	siteRecord = {},
	intervalsMap = {},
	freqOptionsMap = {},
}) => {
	const [wasCopied, setWasCopied] = useState(false);

	const {
		siteName,
		siteUrl,
		desc,
		intervalID,
		frequencyID,
		siteID,
		startDate,
		endDate,
		contactEmail,
		isContactEnabled,
		isActive,
	} = siteRecord;

	console.group(`Site Card: ${siteName}`);
	console.log("siteRecord:", siteRecord);
	console.log("intervalsMap:", intervalsMap);
	console.log("freqOptionsMap:", freqOptionsMap);
	console.groupEnd();

	const copyText = (text) => {
		if (window.navigator.clipboard) {
			window.navigator.clipboard.writeText(text);
			return setWasCopied(true);
		} else {
			return setWasCopied(false);
		}
	};

	// resets 'wasCopied' state after copying
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		let copyID;
		if (wasCopied) {
			copyID = setTimeout(() => {
				setWasCopied(false);
			}, 3000);
		}

		return () => {
			isMounted = false;
			clearTimeout(copyID);
		};
	}, [wasCopied]);

	return (
		<div className={styles.MonitorSiteCard}>
			<section className={styles.MonitorSiteCard_header}>
				<h4 className={styles.MonitorSiteCard_header_name} title={siteName}>
					{addEllipsis(siteName, 45)}
				</h4>
				<div className={styles.MonitorSiteCard_header_url}>
					{addEllipsis(siteUrl, 35)}
				</div>
			</section>
			<section className={styles.MonitorSiteCard_currentStatus}>
				{/*  */}
				{/*  */}
			</section>
			{/* SETTINGS OF SITE MONITOR */}
			<section className={styles.MonitorSiteCard_settings}>
				<SiteCardSetting label="Type:" value="HTTP" />
				<SiteCardSetting
					label="Interval:"
					value={getIntervalTypeVal(intervalID, intervalsMap)}
				/>
				<SiteCardSetting
					label="Frequency:"
					value={getFreqTypeVal(frequencyID, freqOptionsMap)}
				/>
				<SiteCardSetting
					label="Recheck:"
					value={getRecheckValue(intervalID, intervalsMap)}
				/>
				<SiteCardSetting
					label="Email:"
					value={!wasCopied ? contactEmail : "Copied!"}
					copyHandler={() => copyText(contactEmail)}
				/>
				<SiteCardSetting
					label="Notify:"
					value={getNotifyInfo(isContactEnabled)}
				/>
			</section>
		</div>
	);
};

export default MonitorSiteCard;

MonitorSiteCard.defaultProps = {};

MonitorSiteCard.propTypes = {};
