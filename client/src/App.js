import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.scss";
import Main from "./components/Main";
import HomePage from "./pages/HomePage";
import MonitorPage from "./pages/MonitorPage";
import ServiceIndicator from "./components/dev/ServiceIndicator";
import { getAllSiteMonitors, getIntervalDeps } from "./helpers/utils_monitor";
import { isEmptyArray } from "./helpers/utils_types";
import SiteMonitorDetailsPage from "./pages/SiteMonitorDetailsPage";

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<div className="App">
				<Main>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/monitor" component={MonitorPage} />
						<Route path="/details" component={SiteMonitorDetailsPage} />
					</Switch>
				</Main>

				<ServiceIndicator />
			</div>
		</Router>
	);
}

export default App;
