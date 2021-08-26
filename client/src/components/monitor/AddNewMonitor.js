import React from "react";
import styles from "../../css/monitor/AddNewMonitor.module.scss";
import { PropTypes } from "prop-types";
import { useForm } from "../../utils/useForm";
// components
import DomainInput from "./DomainInput";
import RadioButton from "../shared/RadioButton";
import TextInput from "../shared/TextInput";
import MonitorIntervalPanel from "./MonitorIntervalPanel";

// REQUIREMENTS:
// - Field to add a URL/domain

const AddNewMonitor = () => {
	const { formState, setFormState, handleChange, handleReset } = useForm({
		entryName: "",
		domain: "",
		prefix: "https://",
		intervalType: "", // recurring or one time
		interval: "", // frequency (if 'recurring')
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
	// handle's radio buttons
	const handleInterval = (interval) => {
		setFormState({
			...formState,
			values: {
				...values,
				interval: interval,
			},
		});
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
						name="entryName"
						id="entryName"
						label="Site Name:"
						val={values.entryName}
						handleChange={handleChange}
					/>
				</div>
				<div className={styles.AddNewMonitor_siteInfo_url}>
					<DomainInput
						vals={values}
						name="domain"
						id="domain"
						handleChange={handleChange}
						handlePrefix={handlePrefix}
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
		</div>
	);
};

export default AddNewMonitor;

AddNewMonitor.defaultProps = {};

AddNewMonitor.propTypes = {};
