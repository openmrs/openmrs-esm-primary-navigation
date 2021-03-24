import React from "react";
import UserAvatarFilledAlt20 from "@carbon/icons-react/es/user--avatar--filled--alt/20";
import UserMenuPanel from "../navbar-header-panels/user-menu-panel.component";
import SideMenuPanel from "../navbar-header-panels/side-menu-panel.component";
import Logo from "../logo/logo.component";
import { navigate, ExtensionSlot } from "@openmrs/esm-framework";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import Close20 from "@carbon/icons-react/lib/close/20";
import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel
} from "carbon-components-react/es/components/UIShell";
import { LoggedInUser, UserSession } from "../../types";
import styles from "./navbar.scss";

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

  const [display, setDisplay] = React.useState(false);
  const [switcher, setSwitcher] = React.useState(false);
  const [closer, setCloser] = React.useState(false);

  const handleSwitcherClick = () => {
    setDisplay(true);
    setSwitcher(true);
    setCloser(true);
  };

  const handleCloseClick = () => {
    setDisplay(false);
    setSwitcher(false);
    setCloser(false);
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
                <ExtensionSlot extensionSlotName="top-nav-actions-slot" />
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
                  aria-label="Add"
                  aria-labelledby="Add Button"
                  name="AddNavButton"
                  style={{ display: switcher ? "none" : "block" }}
                  onClick={handleSwitcherClick}
                >
                  <AppSwitcher20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Add"
                  aria-labelledby="Add Button"
                  name="AddNavButton"
                  style={{
                    display: closer ? "block" : "none",
                    backgroundColor: "#004144"
                  }}
                  onClick={handleCloseClick}
                >
                  <Close20 />
                </HeaderGlobalAction>
                <HeaderPanel
                  aria-label="Header Panel"
                  style={{
                    display: display ? "block" : "none",
                    height: "12rem",
                    overFlow: "Hidden"
                  }}
                  expanded
                ></HeaderPanel>
                -
              </HeaderGlobalBar>
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
