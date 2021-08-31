import React from "react";
import styles from "../../css/previews/MonitorPreviewCard.module.scss";
import sprite from "../../assets/icons/sprite.svg";
import { PropTypes } from "prop-types";
import {
	green,
	red,
	getTimeClass,
	getTimeStyles,
} from "../../helpers/utils_styles";
import { addEllipsis } from "../../helpers/utils_processing";

// REQUIREMENTS:
// - Quick Preview:
//    - Shows 'Entry Name'
//    - Shows site's URL
//    - Shows response time
//    - Shows status via:
//      - Successful: Checkmark icon
//      - Failure: Cross icon

const customCSS = {};
// icon types
const success = `check_circle`;
const failure = `clearclose`;

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
				<use xlinkHref={`${sprite}#icon-${failure}`}></use>
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

const successCSS = {
	borderLeft: `7px solid ${green[500]}`,
};
const failureCSS = {
	borderLeft: `7px solid ${red[600]}`,
};

// sample model
const monitorModel = {
	siteName: `Amazon Retail`, // alias for site monitor entry
	siteURL: `https://amazon.com/shop`, // site's url
	wasSuccessful: false, // whether status was '200'
	responseTime: 180, // milliseconds
};

const MonitorPreviewCard = ({
	siteMonitor = { ...monitorModel },
	goToSite,
}) => {
	const { wasSuccessful, siteName, siteURL, responseTime } = siteMonitor;

	return (
		<div
			className={styles.MonitorPreviewCard}
			style={wasSuccessful ? successCSS : failureCSS}
			onClick={goToSite}
		>
			<div className={styles.MonitorPreviewCard_site}>
				<div className={styles.MonitorPreviewCard_site_status}>
					{wasSuccessful && <SuccessIcon />}
					{!wasSuccessful && <ErrorIcon />}
				</div>

				<div className={styles.MonitorPreviewCard_site_about}>
					<div
						className={styles.MonitorPreviewCard_site_about_name}
						title={siteName}
					>
						{addEllipsis(siteName, 40)}
					</div>
					<div
						className={styles.MonitorPreviewCard_site_about_url}
						title={siteURL}
					>
						{addEllipsis(siteURL, 40)}
					</div>
				</div>
			</div>
			<div className={styles.MonitorPreviewCard_stats}>
				<div className={styles.MonitorPreviewCard_stats_label}>
					Response Time
				</div>
				<ResponseTime responseTime={responseTime} />
			</div>
		</div>
	);
};

export default MonitorPreviewCard;
export { ResponseTime, SuccessIcon, ErrorIcon };

MonitorPreviewCard.defaultProps = {};

MonitorPreviewCard.propTypes = {};
