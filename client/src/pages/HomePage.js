import React from "react";
import styles from "../css/pages/HomePage.module.scss";
import { PropTypes } from "prop-types";
import { useForm } from "../utils/useForm";
import AddNewMonitor from "../components/monitor/AddNewMonitor";
import MonitorPreviewCard from "../components/previews/MonitorPreviewCard";

const HomePage = () => {
	const { formState, setFormState, handleChange, handleReset } = useForm({
		entryName: "",
		domain: "",
		prefix: "https://",
		interval: "",
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
	const handleRadios = (interval) => {
		setFormState({
			...formState,
			values: {
				...values,
				interval: interval,
			},
		});
	};

	return (
		<div className={styles.HomePage}>
			<header className={styles.HomePage_header}>
				<h1>Uptime Monitor (remote)</h1>
			</header>
			<div className={styles.HomePage_content}>
				<AddNewMonitor />
			</div>
			<div className={styles.HomePage_content}>
				<MonitorPreviewCard />
			</div>
		</div>
	);
};

export default HomePage;

HomePage.defaultProps = {};

HomePage.propTypes = {};
