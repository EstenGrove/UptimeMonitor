import React from "react";
import styles from "../../css/monitor/DomainInput.module.scss";
import { PropTypes } from "prop-types";
import PrefixSelector from "./PrefixDropdown";

const DomainInput = ({
	vals = {},
	name,
	id,
	handlePrefix,
	handleChange,
	placeholder,
	isDisabled = false,
	isPrefixDisabled = false,
	isPrefixLocked = false,
	prefixOpts = [`https://`, `http://`, `file://`, `chrome://`],
}) => {
	return (
		<div className={styles.DomainInput}>
			<div className={styles.DomainInput_prefix}>
				<PrefixSelector
					name="prefix"
					id="prefix"
					val={vals.prefix}
					options={prefixOpts}
					handlePrefix={handlePrefix}
					isDisabled={isPrefixDisabled}
					isPrefixLocked={isPrefixLocked}
				/>
			</div>
			<div className={styles.DomainInput_domain}>
				<input
					type="text"
					name={name}
					id={id}
					value={vals[name]}
					className={styles.DomainInput_domain_input}
					onChange={handleChange}
					disabled={isDisabled}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default DomainInput;

DomainInput.defaultProps = {};

DomainInput.propTypes = {};
