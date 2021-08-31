import React, { useRef, useEffect } from "react";
import styles from "../../css/shared/Dialog.module.scss";
import sprite from "../../assets/icons/modals-complete.svg";
import closeIcon from "../../assets/icons/buttons.svg";
import { PropTypes } from "prop-types";
import { useOutsideClick } from "../../utils/useOutsideClick";
import {
	DIALOG_ICONS as icons,
	red,
	orange,
	purple,
	green,
	blue,
	blueGrey,
	teal,
} from "../../helpers/utils_styles";

// CUSTOM DIALOG W/ PINNED MOBILE STYLES
// CUSTOM ICON OPTIONS: "WARN", "ERROR", "SUCCESS", "INFO"

// CUSTOM STYLES FOR THE ICON WRAPPER (ie background around icon)
const WRAP_COLORS = {
	ERROR: red[300],
	WARN: red[300],
	WARN2: red[300],
	SUCCESS: green[300],
	INFO: purple[200],
	REPORT: purple[200],
	PRINT: blueGrey[200],
	SAVE: green[300],
	CHECKMARK: purple[200],
	SIGNATURE: blue[200],
	ALARM: red[300],
	EDIT: orange[200],
	HELP: blue[200],
	CALENDAR: blueGrey[100],
	CALENDAR_DONE: green[300],
	CALENDAR_MISSED: red[300],
	USER: purple[200],
	CHART: green[200],
	SETTINGS: purple[200],
	ALERT: red[300],
	SHOW: green[200],
	IMAGES: purple[200],
	// NEW!!! ICONS
	CANCEL: red[300],
	CHART2: orange[200],
	CLOUD: purple[300],
	CLOUD_DOWNLOAD: purple[300],
	CLOUD_UPLOAD: purple[300],
	DOWNLOAD: blueGrey[300],
	UPLOAD: blueGrey[300],
	FOLDER: blueGrey[300],
	FOLDER_PERSON: blueGrey[300],
	FIRSTAID: red[200],
	DINNER: green[300],
	HELP1: blue[300],
};

// CUSTOM STYLES/FILL FOR ICON, BASED OFF ICON TYPE
const ICON_COLORS = {
	ERROR: red[700],
	WARN: red[700],
	WARN2: red[700],
	SUCCESS: green[600],
	INFO: purple[700],
	REPORT: purple[700],
	PRINT: blueGrey[700],
	SAVE: blueGrey[500],
	CHECKMARK: purple[700],
	SIGNATURE: blue[600],
	ALARM: red[700],
	EDIT: red[600],
	HELP: blue[700],
	CALENDAR: blueGrey[700],
	CALENDAR_DONE: green[600],
	CALENDAR_MISSED: red[700],
	USER: purple[700],
	CHART: teal[600],
	SETTINGS: blueGrey[700],
	ALERT: red[700],
	SHOW: purple[700],
	IMAGES: purple[700],
	// NEW!!! ICONS
	CANCEL: red[700],
	CHART2: orange[600],
	CLOUD: purple[700],
	CLOUD_DOWNLOAD: purple[700],
	CLOUD_UPLOAD: purple[700],
	DOWNLOAD: blueGrey[700],
	UPLOAD: blueGrey[700],
	FOLDER: blueGrey[700],
	FOLDER_PERSON: blueGrey[700],
	FIRSTAID: red[600],
	DINNER: green[700],
	HELP1: blue[700],
};

const Dialog = ({
	title,
	heading,
	subheading,
	text,
	closeModal,
	icon = "SUCCESS",
	children,
}) => {
	const modalRef = useRef();
	const { isOutside } = useOutsideClick(modalRef);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		if (isOutside) {
			return closeModal();
		}

		return () => {
			isMounted = false;
		};
	}, [closeModal, isOutside]);

	return (
		<aside className={styles.Dialog} ref={modalRef}>
			<section className={styles.Dialog_top}>
				<div
					className={styles.Dialog_top_iconWrapper}
					style={{ backgroundColor: WRAP_COLORS[icon] }}
				>
					<svg className={styles.Dialog_top_iconWrapper_icon}>
						<use
							xlinkHref={`${sprite}#icon-${icons[icon]}`}
							style={{ fill: ICON_COLORS[icon] }}
						></use>
					</svg>
				</div>
				<h2
					className={styles.Dialog_top_title}
					style={{ color: ICON_COLORS[icon] }}
				>
					{title}
				</h2>
				<svg className={styles.Dialog_top_closeIcon} onClick={closeModal}>
					<use xlinkHref={`${closeIcon}#icon-clearclose`}></use>
				</svg>
			</section>
			<section className={styles.Dialog_inner}>
				<h2 className={styles.Dialog_inner_heading}>{heading}</h2>
				<h6 className={styles.Dialog_inner_subheading}>{subheading}</h6>
				<p className={styles.Dialog_inner_text}>{text}</p>
			</section>
			<section className={styles.Dialog_bottom}>{children}</section>
		</aside>
	);
};

export default Dialog;

Dialog.defaultProps = {};

Dialog.propTypes = {
	title: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.string,
	text: PropTypes.string,
	closeModal: PropTypes.func.isRequired,
	children: PropTypes.any,
};
