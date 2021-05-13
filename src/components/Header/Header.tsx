import { AnchorButton, Navbar } from "@blueprintjs/core";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Header.module.css";

export const Header = (): JSX.Element => {
	const location = useLocation();

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

	return (
		<Navbar>
			<Navbar.Group>
				<Navbar.Heading className={styles.headerText}>
					politicccs
				</Navbar.Heading>
				<Navbar.Divider />
				<Navbar.Heading>{currentLocation}</Navbar.Heading>
			</Navbar.Group>

			<Navbar.Group align="right">
				<Navbar.Divider />
				<AnchorButton href="/electorates" icon="globe">
					Electorates
				</AnchorButton>
				<AnchorButton href="/correlations" icon="regression-chart">
					Correlations
				</AnchorButton>
			</Navbar.Group>
		</Navbar>
	);
};
