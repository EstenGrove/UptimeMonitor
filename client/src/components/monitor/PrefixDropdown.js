import React, { useRef, useState, useEffect } from "react";
import styles from "../../css/monitor/PrefixSelector.module.scss";
import sprite from "../../assets/icons/sprite.svg";
import { PropTypes } from "prop-types";
import { isEmptyArray, isEmptyVal } from "../../helpers/utils_types";
import { useOutsideClick } from "../../utils/useOutsideClick";

const PrefixDropdown = ({
	name,
	val,
	options = [],
	disabledOptions = [],
	closeDropdown,
	handleSelection,
}) => {
	const menuRef = useRef();
	const { isOutside } = useOutsideClick(menuRef);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (isOutside) {
			return closeDropdown();
		}

		return () => {
			isMounted = false;
		};
	}, [isOutside, closeDropdown]);

	return (
		<aside className={styles.PrefixDropdown} ref={menuRef}>
			<ul className={styles.PrefixDropdown_list}>
				{!isEmptyArray(options) &&
					options.map((option, idx) => (
						<li
							tabIndex={0}
							key={`Option-${option}-${idx}`}
							onClick={() => {
								if (disabledOptions.includes(option)) return;
								return handleSelection(name, option);
							}}
							className={
								val === option
									? styles.PrefixDropdown_list_option_selection
									: styles.PrefixDropdown_list_option
							}
						>
							<div className={styles.PrefixDropdown_list_option_prefix}>
								{option}
							</div>
							{/* SELECTED INDICATOR */}
							{val === option && (
								<div className={styles.PrefixDropdown_list_option_isSelected}>
									<svg
										className={
											styles.PrefixDropdown_list_option_isSelected_icon
										}
									>
										<use xlinkHref={`${sprite}#icon-check_circle`}></use>
									</svg>
								</div>
							)}
						</li>
					))}
			</ul>
		</aside>
	);
};

const PrefixSelector = ({
	val,
	name,
	id,
	handlePrefix,
	options = [],
	disabledOptions = [],
	isDisabled = false,
	isPrefixLocked = false,
	hideCaretIcon = false,
}) => {
	const [selection, setSelection] = useState(() => {
		if (isEmptyVal(val)) {
			return options[0];
		} else {
			return val;
		}
	});
	// show menu options
	const [showOptions, setShowOptions] = useState(false);

	const handleSelection = (name, val) => {
		setSelection(val);
		handlePrefix(name, val);
		setShowOptions(false);
	};

	return (
		<div className={styles.PrefixSelector}>
			<div
				className={styles.PrefixSelector_wrapper}
				onClick={() => {
					if (isDisabled || isPrefixLocked) {
						return;
					} else {
						return setShowOptions(true);
					}
				}}
			>
				<input
					type="text"
					name={name}
					id={id}
					value={selection}
					readOnly={true}
					className={styles.PrefixSelector_wrapper_input}
				/>
				{!hideCaretIcon && (
					<div className={styles.PrefixSelector_wrapper_iconWrapper}>
						<svg className={styles.PrefixSelector_wrapper_iconWrapper_icon}>
							<use xlinkHref={`${sprite}#icon-caret-down`}></use>
						</svg>
					</div>
				)}
			</div>

			{showOptions && (
				<PrefixDropdown
					val={val}
					name="prefix"
					options={options}
					disabledOptions={disabledOptions}
					handleSelection={handleSelection}
					closeDropdown={() => setShowOptions(false)}
				/>
			)}
		</div>
	);
};

export default PrefixSelector;

PrefixSelector.defaultProps = {};

PrefixSelector.propTypes = {
	val: PropTypes.string,
};
