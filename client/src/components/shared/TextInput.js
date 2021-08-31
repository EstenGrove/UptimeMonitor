import React from "react";
import styles from "../../css/shared/TextInput.module.scss";
import { PropTypes } from "prop-types";

const TextInput = ({
	label,
	name,
	id,
	val,
	handleChange,
	isDisabled = false,
	readOnly = false,
	placeholder,
	customStyles = {},
}) => {
	return (
		<div className={styles.TextInput}>
			<label htmlFor={id} className={styles.TextInput_label}>
				{label}
			</label>
			<div className={styles.TextInput_wrapper}>
				<input
					type="text"
					name={name}
					id={id}
					value={val}
					onChange={handleChange}
					disabled={isDisabled}
					readOnly={readOnly}
					className={styles.TextInput_wrapper_input}
					style={customStyles}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default TextInput;

TextInput.defaultProps = {};

TextInput.propTypes = {};
