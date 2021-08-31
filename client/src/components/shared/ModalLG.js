import React, { useRef, useEffect } from "react";
import styles from "../../css/shared/ModalLG.module.scss";
import sprite from "../../assets/icons/buttons.svg";
import { PropTypes } from "prop-types";
import { useOutsideClick } from "../../utils/useOutsideClick";
import { useLockBodyScroll } from "../../utils/useLockBodyScroll";
import { useKeyboardShortcut } from "../../utils/useKeyboardShortcut";

const ModalLG = ({ title, closeModal, children }) => {
	const largeModalRef = useRef();
	const { isOutside } = useOutsideClick(largeModalRef);
	const userEscaped = useKeyboardShortcut(["Escape"]);
	useLockBodyScroll();

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		if (isOutside || userEscaped) {
			return closeModal();
		}
		return () => {
			isMounted = false;
		};
	}, [isOutside, closeModal, userEscaped]);

	return (
		<aside className={styles.ModalLG} ref={largeModalRef}>
			<section className={styles.ModalLG_top}>
				<h4 className={styles.ModalLG_top_title}>{title}</h4>
				<svg className={styles.ModalLG_top_icon} onClick={closeModal}>
					<use xlinkHref={`${sprite}#icon-clearclose`}></use>
				</svg>
			</section>
			<section className={styles.ModalLG_main}>{children}</section>
		</aside>
	);
};

export default ModalLG;

ModalLG.propTypes = {
	title: PropTypes.string,
	closeModal: PropTypes.func,
	children: PropTypes.element,
};
