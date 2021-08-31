import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../../css/monitor/MonitorSiteCard.module.scss";
import sprite from "../../assets/icons/uptime.svg";
import sprite2 from "../../assets/icons/sprite.svg";
import { PropTypes } from "prop-types";
import { addEllipsis } from "../../helpers/utils_processing";
import { isEmptyObj, isEmptyVal } from "../../helpers/utils_types";
import { useOutsideClick } from "../../utils/useOutsideClick";
import { useKeyboardShortcut } from "../../utils/useKeyboardShortcut";
import {
	red,
	yellow,
	getTimeClass,
	getTimeStyles,
} from "../../helpers/utils_styles";
import { getFormattedStatusBySite } from "../../helpers/utils_monitor";
// components

// REQUIREMENTS:
// - Shows a single site's current state and meta info
// - Might need to fetch the historical data for each card, when selected

// icon types
const success = `check_circle`;
const failure = `clearclose`;

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

const SuccessIcon = () => {
	return (
		<div className={styles.SuccessIcon}>
			<svg className={styles.SuccessIcon_icon}>
				<use xlinkHref={`${sprite}#icon-${success}`}></use>
			</svg>
		</div>
	);
};
const ErrorIcon = () => {
	return (
		<div className={styles.ErrorIcon}>
			<svg className={styles.ErrorIcon_icon}>
				<use xlinkHref={`${sprite2}#icon-${failure}`}></use>
			</svg>
		</div>
	);
};
const ResponseTime = ({ responseTime }) => {
	console.log("timeClass", getTimeClass(responseTime));

	return (
		<div className={styles.ResponseTime}>
			<div
				className={styles.ResponseTime_value}
				style={getTimeStyles(responseTime)}
			>
				{responseTime} ms{" "}
				{
					<b className={styles.ResponseTime_value_label}>
						({getTimeClass(responseTime)})
					</b>
				}
			</div>
		</div>
	);
};

const SiteStatus = ({ site = {}, currentStatus = {} }) => {
	const { wasSuccessful, responseTime = 180 } = currentStatus;

	return (
		<div className={styles.SiteStatus}>
			<div className={styles.SiteStatus_wrapper}>
				{wasSuccessful && <SuccessIcon />}
				{!wasSuccessful && <ErrorIcon />}
				<ResponseTime responseTime={responseTime} />
			</div>
		</div>
	);
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

const SiteActionsMenu = ({
	siteRecord = {},
	currentStatus = {},
	intervalTypesMap = {},
	frequencyTypesMap = {},
	closeMenu,
	visitSite,
	viewSiteMonitor,
	editSiteMonitor,
	enableSiteMonitor,
	disableSiteMonitor,
	deleteSiteMonitor,
}) => {
	const menuRef = useRef();
	const { isOutside } = useOutsideClick(menuRef);
	const wasEscaped = useKeyboardShortcut(["Escape"]);
	// site record info
	const { isActive } = siteRecord;

	// close menu when clicking outside or 'escaping'
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (isOutside || wasEscaped) {
			closeMenu();
		}

		return () => {
			isMounted = false;
		};
	}, [isOutside, wasEscaped, closeMenu]);

	return (
		<aside className={styles.SiteActionsMenu} ref={menuRef}>
			<div className={styles.SiteActionsMenu_top}>
				<svg
					className={styles.SiteActionsMenu_top_closeIcon}
					onClick={closeMenu}
				>
					<use xlinkHref={`${sprite2}#icon-clearclose`}></use>
				</svg>
			</div>
			<ul className={styles.SiteActionsMenu_list}>
				<li
					className={styles.SiteActionsMenu_list_item}
					onClick={viewSiteMonitor}
				>
					<NavLink
						to={{
							pathname: "/details",
							state: {
								currentStatus,
								intervalTypesMap,
								frequencyTypesMap,
								siteMonitor: siteRecord,
							},
						}}
					>
						View Details
					</NavLink>
				</li>
				<li
					className={styles.SiteActionsMenu_list_item}
					onClick={editSiteMonitor}
				>
					<span className={styles.SiteActionsMenu_list_item_text}>
						Edit Info
					</span>
				</li>
				<li className={styles.SiteActionsMenu_list_item} onClick={visitSite}>
					<span className={styles.SiteActionsMenu_list_item_text}>
						Visit Site
					</span>
				</li>
				<li
					className={styles.SiteActionsMenu_list_item}
					onClick={isActive ? disableSiteMonitor() : enableSiteMonitor()}
				>
					<span
						className={styles.SiteActionsMenu_list_item_text}
						style={{ color: yellow[600] }}
					>
						{isActive ? "Disable Monitor" : "Enable Monitor"}
					</span>
				</li>
				<li
					className={styles.SiteActionsMenu_list_item}
					onClick={deleteSiteMonitor}
				>
					<span
						className={styles.SiteActionsMenu_list_item_text}
						style={{ color: red[700] }}
					>
						Delete Site
					</span>
				</li>
			</ul>
		</aside>
	);
};

const MonitorSiteCard = ({
	history,
	siteRecord = {},
	intervalsMap = {},
	freqOptionsMap = {},
}) => {
	const [wasCopied, setWasCopied] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [currentStatus, setCurrentStatus] = useState({});

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

	// open website in new tab
	const visitSite = (siteUrl) => {
		console.log(`Redirecting to ${siteUrl}...`);
		window.open(siteUrl);
	};
	// go to site monitor details page
	const viewSiteMonitor = (siteRecord) => {
		console.log(`Opening ${siteRecord?.siteName} details page...`);
		// go to full page view for site
	};
	// edit site monitor entry
	const editSiteMonitor = (site) => {
		console.log(`Editing site...`);
	};
	// disable site monitoring
	const disableSiteMonitor = (site) => {
		console.log(`Disabling site...`);
	};
	// enable site monitoring
	const enableSiteMonitor = (site) => {
		console.log(`Enabling site...`);
	};
	// delete site monitor entry
	const deleteSiteMonitor = (site) => {
		console.log(`Deleting site monitor...`);
	};
	// copy text (site's url)
	const copyText = (text) => {
		if (window.navigator.clipboard) {
			window.navigator.clipboard.writeText(text);
			return setWasCopied(true);
		} else {
			return setWasCopied(false);
		}
	};
	// fetch current site's status record
	const getSiteStatus = async () => {
		const { siteID } = siteRecord;
		const status = await getFormattedStatusBySite(siteID);

		if (!isEmptyObj(status)) {
			return setCurrentStatus(status);
		} else {
			return;
		}
	};

	// fetches 'sites status record onMount
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		getSiteStatus();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<div className={styles.MonitorSiteCard_header_titles}>
					<h4
						className={styles.MonitorSiteCard_header_titles_name}
						title={siteName}
					>
						{addEllipsis(siteName, 45)}
					</h4>
					<div className={styles.MonitorSiteCard_header_titles_url}>
						{addEllipsis(siteUrl, 35)}
					</div>
				</div>
				<div className={styles.MonitorSiteCard_header_actions}>
					<svg
						className={styles.MonitorSiteCard_header_actions_icon}
						onClick={() => setShowMenu(true)}
					>
						<use xlinkHref={`${sprite}#icon-menu1`}></use>
					</svg>
					{showMenu && (
						<SiteActionsMenu
							siteRecord={siteRecord}
							currentStatus={currentStatus}
							intervalTypesMap={intervalsMap}
							frequencyTypesMap={freqOptionsMap}
							closeMenu={() => setShowMenu(false)}
							visitSite={() => visitSite(siteUrl)}
							viewSiteMonitor={() => viewSiteMonitor(siteRecord)}
							editSiteMonitor={() => editSiteMonitor(siteName)}
							disableSiteMonitor={() => disableSiteMonitor(siteName)}
							enableSiteMonitor={() => enableSiteMonitor(siteName)}
							deleteSiteMonitor={() => deleteSiteMonitor(siteName)}
						/>
					)}
				</div>
			</section>
			{/* CURRENT STATUS INFO */}
			<section className={styles.MonitorSiteCard_currentStatus}>
				<SiteStatus site={siteRecord} currentStatus={currentStatus} />
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
