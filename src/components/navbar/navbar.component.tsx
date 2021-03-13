import React from "react";
import UserAvatarFilledAlt20 from "@carbon/icons-react/es/user--avatar--filled--alt/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import UserMenuPanel from "../navbar-header-panels/user-menu-panel.component";
import SideMenuPanel from "../navbar-header-panels/side-menu-panel.component";
import SourceFiles from "../urls/sourceFiles";
import Logo from "../logo/logo.component";
import { navigate } from "@openmrs/esm-framework";
import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider
} from "carbon-components-react/es/components/UIShell";
import { LoggedInUser, UserSession } from "../../types";
import styles from "./navbar.scss";
import { getCurrentSession } from "../../root.resource";

const HeaderLink: any = HeaderName;

export interface NavbarProps {
  user: LoggedInUser;
  allowedLocales: Array<string>;
  onLogout(): void;
  session: UserSession;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  allowedLocales,
  session
}) => {
  const headerRef = React.useRef(null);
  const [activeHeaderPanel, setActiveHeaderPanel] = React.useState<string>(
    null
  );
  const isActivePanel = (panelName: string) => {
    return activeHeaderPanel == panelName;
  };

  const togglePanel = (panelName: string) => {
    panelName === activeHeaderPanel
      ? setActiveHeaderPanel(null)
      : setActiveHeaderPanel(panelName);
  };

  const hidePanel = () => {
    setActiveHeaderPanel(null);
  };

  const handleClickOutside = event => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      hidePanel();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={headerRef} className={styles.navbar}>
      {session && (
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="OpenMRS">
              <HeaderMenuButton
                aria-label="Open menu"
                isCollapsible
                onClick={() => togglePanel("sideMenu")}
                isActive={isActivePanel("sideMenu")}
              />
              <HeaderLink
                prefix=""
                onClick={() => {
                  navigate({ to: "${openmrsSpaBase}/home" });
                  hidePanel();
                }}
              >
                <Logo />
              </HeaderLink>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="Users"
                  aria-labelledby="Users Avatar Icon"
                  name="Users"
                  isActive={isActivePanel("userMenu")}
                  onClick={() => togglePanel("userMenu")}
                >
                  <UserAvatarFilledAlt20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Panel"
                  aria-labelledby="Panel Icon"
                  name="Panel"
                  isCollapsible
                  onClick={onClickSideNavExpand}
                  isActive={isSideNavExpanded}
                >
                  <AppSwitcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <HeaderPanel aria-label="Header Panel" expanded>
                <Switcher aria-label="Switcher Container">
                  <SwitcherItem
                    aria-label="Clinical Dashboard"
                    href={SourceFiles.clinical}
                  >
                    Clinical Dashboard
                  </SwitcherItem>
                  <SwitcherDivider />
                  <SwitcherItem
                    href={SourceFiles.patients}
                    aria-label="Patients"
                  >
                    Patients
                  </SwitcherItem>
                  <SwitcherItem
                    href={SourceFiles.schedule}
                    aria-label="Schedule"
                  >
                    Schedule
                  </SwitcherItem>
                  <SwitcherItem href={SourceFiles.reports} aria-label="Reports">
                    Reports
                  </SwitcherItem>
                </Switcher>
              </HeaderPanel>
              <SideMenuPanel expanded={isActivePanel("sideMenu")} />
              <UserMenuPanel
                user={user}
                session={session}
                expanded={isActivePanel("userMenu")}
                allowedLocales={allowedLocales}
                onLogout={onLogout}
              />
            </Header>
          )}
        />
      )}
    </div>
  );
};

export default Navbar;
