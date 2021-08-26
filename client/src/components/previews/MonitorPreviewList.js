import React from "react";
import styles from "../../css/previews/MonitorPreviewList.module.scss";
import { PropTypes } from "prop-types";
import { isEmptyArray } from "../../helpers/utils_types";
import { withRouter } from "react-router-dom";
import MonitorPreviewCard from "./MonitorPreviewCard";

const MonitorPreviewList = ({ history, sitesToMonitor = [] }) => {
	const goToSiteView = (site) => {
		history.push(site.siteURL);
	};

	return (
		<div className={styles.MonitorPreviewList}>
			<div className={styles.MonitorPreviewList_list}>
				{!isEmptyArray(sitesToMonitor) &&
					sitesToMonitor.map((site, idx) => (
						<MonitorPreviewCard
							key={`Site:${site.siteName}`}
							site={site}
							goToSiteView={() => goToSiteView(site)}
						/>
					))}
			</div>
		</div>
	);
};

export default withRouter(MonitorPreviewList);

MonitorPreviewList.defaultProps = {};

MonitorPreviewList.propTypes = {};
