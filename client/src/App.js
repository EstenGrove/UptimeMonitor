import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.scss";
import Main from "./components/Main";
import HomePage from "./pages/HomePage";
import MonitorPage from "./pages/MonitorPage";

export const history = createBrowserHistory();

const targetURL = "http://localhost:8080/api";
// const targetURL = 'http://127.0.0.1:8080'

function App() {
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		const testFetch = async (url) => {
			try {
				const req = await fetch(url);
				// const res = await req?.text();
				const res = await req?.json();

				console.log(`Resp:`, req);
				console.log(`Response:`, res);

				return res;
			} catch (err) {
				console.log(`❌ Ooops! Error Occurred:`, err);
				return err;
			}
		};
		testFetch(targetURL);

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router history={history}>
			<div className="App">
				<Main>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/monitor" component={MonitorPage} />
					</Switch>
				</Main>
			</div>
		</Router>
	);
}

export default App;
