import React from "react";
import { PropTypes } from "prop-types";
import styles from "../../css/shared/RadioButton.module.scss";
import { purple } from "../../helpers/utils_styles";

/**
 * RadioButton component that supports radio groups or single instances:
 * - For radio groups:
 *    - Use the 'handleSelection' handler
 *    - Make sure all radios have the same 'name' attribute
 *    - Make sure each radio has a unique 'id'
 *      - The 'id' is the target value for each individual radio in the group
 */

const labelCSS = {
	color: purple[700],
};

const RadioButton = ({
	label,
	name,
	id,
	val,
	handleSelection,
	handleRadio,
}) => {
	return (
		<section className={styles.RadioButton}>
			<input
				type="radio"
				name={name}
				id={id}
				checked={val}
				onChange={handleRadio} // handles non-group radio events
				onClick={!handleSelection ? null : () => handleSelection(id)} // handles group events
				className={styles.RadioButton_radio}
			/>
			<label
				htmlFor={id}
				className={styles.RadioButton_label}
				style={id === val ? labelCSS : {}}
				tabIndex={1}
			>
				{label}
			</label>
		</section>
	);
};

export default RadioButton;

RadioButton.defaultProps = {};
RadioButton.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	val: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
	handleSelection: PropTypes.func, // used for radio button groups
	handleRadio: PropTypes.func, // used for single radio buttons
};
