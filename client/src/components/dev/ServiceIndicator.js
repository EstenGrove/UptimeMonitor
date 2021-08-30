import React, { useState, useEffect } from "react";
import styles from "../../css/dev/ServiceIndicator.module.scss";
import sprite from "../../assets/icons/sprite.svg";
import { PropTypes } from "prop-types";
import { checkAppServices } from "../../helpers/utils_services";

// REQUIREMENTS:
// - Confirms that complete App is 'online' & working!

const ServiceIndicator = () => {
	const [appServices, setAppServices] = useState({
		isOnline: false,
		message: null,
	});

	// checks that API is online & operable
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		const isAppOnline = async () => {
			const resp = await checkAppServices();

			if (resp.status === "Ok") {
				return setAppServices({
					isOnline: true,
					message: resp?.message,
				});
			} else {
				return setAppServices({
					isOnline: false,
					message: `❌ App services are offline!`,
				});
			}
		};

		// isAppOnline();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!appServices?.isOnline) {
		return (
			<div
				className={styles.FailedServiceIndicator}
				title={appServices?.message}
			>
				<svg className={styles.FailedServiceIndicator_icon}>
					<use xlinkHref={`${sprite}#icon-clearclose`}></use>
				</svg>
			</div>
		);
	}
	return (
		<div className={styles.ServiceIndicator} title={appServices?.message}>
			<svg className={styles.ServiceIndicator_icon}>
				<use xlinkHref={`${sprite}#icon-checkmark-outline`}></use>
			</svg>
		</div>
	);
};

export default ServiceIndicator;

ServiceIndicator.defaultProps = {};

ServiceIndicator.propTypes = {};
