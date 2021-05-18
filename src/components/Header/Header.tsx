import { AnchorButton, Classes, Navbar } from "@blueprintjs/core";
import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./Header.module.css";

export const Header = (): JSX.Element => {
	const location = useLocation();
	const history = useHistory();

	const currentLocation = useMemo(() => {
		const parts = location.pathname.split("/");
		const path = parts[parts.length - 1];

		switch (path) {
			case "electorates":
				return "Electorates";
			default:
				return "Home";
		}
	}, [location.pathname]);

	const onClick = useCallback(() => {
		history.push("/");
	}, [history]);

	return (
		<Navbar>
			<Navbar.Group>
				<AnchorButton href="/" className={Classes.MINIMAL}>
						<Navbar.Heading className={styles.headerText} onClick={onClick}>
							politicccs
						</Navbar.Heading>
				</AnchorButton>
				<Navbar.Divider />
				<Navbar.Heading>{currentLocation}</Navbar.Heading>
			</Navbar.Group>

			<Navbar.Group align="right">
				<Navbar.Divider />
				<AnchorButton
					href="/electorates"
					icon="globe"
					className={Classes.MINIMAL}
				>
					Electorates
				</AnchorButton>
				<AnchorButton
					href="/correlations"
					icon="regression-chart"
					className={Classes.MINIMAL}
				>
					Correlations
				</AnchorButton>
				<AnchorButton
					href="/general"
					icon="timeline-bar-chart"
					className={Classes.MINIMAL}
				>
					General Comparisons
				</AnchorButton>
			</Navbar.Group>
		</Navbar>
	);
};
