import Wrapper from "../assets/wrappers/BigSidebar";
import { useAppContext } from "../context/appContext";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
function BigSidebar() {
    const {showSidebar ,toggleSidebar} = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <div toggleSidebar={toggleSidebar} />
          <div>
            <NavLinks/>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSidebar;
