import React from "react";
import styles from "../../css/monitor/MonitorIntervalPanel.module.scss";
import { PropTypes } from "prop-types";
import RadioButton from "../shared/RadioButton";

const getIntervalDesc = (vals = {}) => {
	const { interval, intervalType } = vals;
	let desc = `Website will be pinged `;

	if (intervalType === "One Time Ping") {
		desc += `once`;
		return desc;
	}

	desc += `every ${interval}`;
	return desc;
};

const MonitorIntervalPanel = ({
	vals = {},
	handleInterval,
	handleIntervalType,
}) => {
	return (
		<div className={styles.MonitorIntervalPanel}>
			<div className={styles.MonitorIntervalPanel_header}>
				<div className={styles.MonitorIntervalPanel_header_title}>Interval</div>
			</div>
			<div className={styles.MonitorIntervalPanel_types}>
				<div className={styles.MonitorIntervalPanel_types_heading}>
					Choose Whether Ping is Recurring or One-Time:
				</div>
				<RadioButton
					key={`One-Time-Ping`}
					label="One Time Ping"
					name="intervalType"
					id="One Time Ping"
					val={vals?.intervalType === "One Time Ping"}
					handleSelection={handleIntervalType}
				/>
				<RadioButton
					key={`Recurring-Ping`}
					label="Recurring Ping"
					name="intervalType"
					id="Recurring Ping"
					val={vals?.intervalType === "Recurring Ping"}
					handleSelection={handleIntervalType}
				/>
			</div>
			{vals.intervalType === "Recurring Ping" && (
				<div className={styles.MonitorIntervalPanel_options}>
					<RadioButton
						key={`15-mins`}
						label="15 mins."
						name="frequency"
						id="15 mins."
						val={vals?.frequency === "15 mins."}
						handleSelection={handleInterval}
					/>
					<RadioButton
						key={`30-mins`}
						label="30 mins."
						name="frequency"
						id="30 mins."
						val={vals?.frequency === "30 mins."}
						handleSelection={handleInterval}
					/>
					<RadioButton
						key={`60-mins`}
						label="60 mins."
						name="frequency"
						id="60 mins."
						val={vals?.frequency === "60 mins."}
						handleSelection={handleInterval}
					/>
				</div>
			)}
			<div className={styles.MonitorIntervalPanel_desc}>
				<div className={styles.MonitorIntervalPanel_desc_msg}>
					{getIntervalDesc(vals)}
				</div>
			</div>
		</div>
	);
};

export default MonitorIntervalPanel;

MonitorIntervalPanel.defaultProps = {};

MonitorIntervalPanel.propTypes = {};
