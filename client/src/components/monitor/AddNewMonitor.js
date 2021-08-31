import React, { useEffect, useRef } from "react";
import styles from "../../css/monitor/AddNewMonitor.module.scss";
import { PropTypes } from "prop-types";
import { useForm } from "../../utils/useForm";
import { useOutsideClick } from "../../utils/useOutsideClick";
import { useKeyboardShortcut } from "../../utils/useKeyboardShortcut";
// components
import DomainInput from "./DomainInput";
import RadioButton from "../shared/RadioButton";
import TextInput from "../shared/TextInput";
import MonitorIntervalPanel from "./MonitorIntervalPanel";
import ButtonSM from "../shared/ButtonSM";
import { purple, red } from "../../helpers/utils_styles";
import { isEmptyVal } from "../../helpers/utils_types";

// REQUIREMENTS:
// - Field to add a URL/domain

const customCSS = {
	cancel: {
		padding: ".5rem 1.6rem",
		fontSize: "1.6rem",
		backgroundColor: "transparent",
		color: red[700],
		marginRight: "1rem",
	},
	save: {
		padding: ".6rem 1.6rem",
		fontSize: "1.6rem",
		backgroundColor: purple[700],
		color: "#ffffff",
	},
	domain: {
		backgroundColor: "#eaecef",
	},
};

const enableBtn = (vals) => {
	const { newSiteName, domain, intervalType, interval } = vals;

	const isEmpty =
		isEmptyVal(newSiteName) || isEmptyVal(domain) || isEmptyVal(intervalType);

	return !isEmpty;
};

const AddNewMonitor = ({
	intervalTypes = [],
	frequencyOptions = [],
	addNewSite,
	closeModal,
}) => {
	// form values
	const { formState, setFormState, handleChange, handleReset } = useForm({
		newSiteName: "",
		domain: "",
		prefix: "https://",
		intervalType: "", // recurring or one time
		frequency: "", // frequency (if 'recurring')
	});
	const { values } = formState;

	// handles 'prefix' custom dropdown selections
	const handlePrefix = (name, val) => {
		setFormState({
			...formState,
			values: {
				...values,
				[name]: val,
			},
		});
	};
	const handleIntervalType = (type) => {
		setFormState({
			...formState,
			values: {
				...values,
				intervalType: type,
			},
		});
	};
	// handle's radio buttons ('frequency')
	const handleInterval = (interval) => {
		setFormState({
			...formState,
			values: {
				...values,
				frequency: interval,
			},
		});
	};

	const cancelSiteHandler = (e) => {
		handleReset(e);
		closeModal();
	};

	return (
		<div className={styles.AddNewMonitor}>
			<header className={styles.AddNewMonitor_header}>
				<h4 className={styles.AddNewMonitor_header_title}>
					Add a Site to Track
				</h4>
			</header>
			<section className={styles.AddNewMonitor_siteInfo}>
				<div className={styles.AddNewMonitor_siteInfo_heading}>Site Info:</div>
				<div className={styles.AddNewMonitor_siteInfo_domain}>
					<TextInput
						name="newSiteName"
						id="newSiteName"
						label="Site Name:"
						val={values.newSiteName}
						handleChange={handleChange}
						placeholder="Enter alias for website..."
						customStyles={customCSS.domain}
					/>
				</div>
				<div className={styles.AddNewMonitor_siteInfo_url}>
					<DomainInput
						vals={values}
						name="domain"
						id="domain"
						handleChange={handleChange}
						handlePrefix={handlePrefix}
						placeholder="Enter website..."
						customStyles={customCSS.domain}
					/>
				</div>
			</section>
			<section className={styles.AddNewMonitor_siteInfo}>
				<MonitorIntervalPanel
					vals={values}
					handleIntervalType={handleIntervalType}
					handleInterval={handleInterval}
				/>
			</section>
			<section className={styles.AddNewMonitor_actions}>
				<ButtonSM
					customStyles={customCSS.cancel}
					handleClick={cancelSiteHandler}
				>
					<span>Cancel</span>
				</ButtonSM>
				<ButtonSM
					isDisabled={!enableBtn(values)}
					customStyles={customCSS.save}
					handleClick={addNewSite}
				>
					<span>Save New Site</span>
				</ButtonSM>
			</section>
		</div>
	);
};

export default AddNewMonitor;

AddNewMonitor.defaultProps = {};

AddNewMonitor.propTypes = {};
