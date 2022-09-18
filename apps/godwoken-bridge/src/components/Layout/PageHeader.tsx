import React, { useEffect, useMemo, useState } from "react";
// import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Hamburger } from "../../assets/hamburger.svg";

import styled, { keyframes } from "styled-components";
import { Popover } from "antd";
import { PopoverMenu } from "../PopoverMenu";
import { VersionSelect } from "../VersionSelect";
import { isMainnet } from "../../utils/environment";
import { matchPath, useLocation, useNavigate, useParams } from "react-router-dom";

const bgAnimation = keyframes`
0%{
  background-position: left;
}
20%{
  background-position: right;
}
50%{
  background-position: left;
}
80%{
  background-position: right;
}
100%{
  background-position: left;
}
`;

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 100px;
  height: 64px;
  margin-bottom: 24px;
  background-color: #050505;
  color: #fff;
  position: relative;

  .gradient {
    position: absolute;
    height: 5px;
    bottom: 0;
    left: 0;
    right: 0;
    /* background animation */
    background-image: linear-gradient(45deg, royalblue, navy, darkblue, #1d0436, #3c0770, #54099f);
    background-size: 400%;
    animation-name: ${bgAnimation};
    animation-duration: 8s;
    animation-iteration-count: infinite;
  }

  .logo-container {
    width: 182px;
    h1 {
      font-size: 1.1rem;
      color: #fff;
      text-align: center;
      font-weight: bold;
      line-height: 1.1px;
    }
  }
  .link-list {
    display: flex;
  }
  .right-side {
    display: flex;
    justify-content: end;
    > &:hover {
      cursor: pointer;
    }
  }
  .hamburger-menu {
    cursor: pointer;
  }
  @media (max-width: 600px) {
    padding: 16px 8px;
    .right-side {
      display: none;
    }
  }
`;

const Link = styled.span`
  height: 32px;
  line-height: 32px;
  width: 120px;
  margin: 0 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 8px;
  @media (max-width: 600px) {
    width: 100px;
    .right-side {
      display: none;
    }
  }
  &.active {
    background: #1d0436;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default function PageHeader() {
  const location = useLocation();
  const isDeposit = useMemo(() => {
    return matchPath("/:version/deposit/*", location.pathname) !== null;
  }, [location.pathname]);

  // const isWithdrawal = useMemo(() => {
  //   return matchPath("/:version/withdrawal/*", location.pathname) !== null;
  // }, [location.pathname]);

  const params = useParams();
  const navigate = useNavigate();
  function changeViewToDeposit() {
    navigate(`/${params.version}/deposit`);
  }

  // function changeViewToWithdrawal() {
  //   navigate(`/${params.version}/withdrawal`);
  // }

  const [popoverVisible, setPopoverVisible] = useState(false);
  function openPopoverMenu() {
    setPopoverVisible(true);
  }
  function closePopoverMenu() {
    setPopoverVisible(false);
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = document.querySelector(".hamburger-menu");
      if (!(e.target && e.target instanceof Element && (e.target === target || target?.contains(e.target)))) {
        closePopoverMenu();
      }
    });
  });

  return (
    <StyledPage>
      <div className="logo-container">
        <h1>The BlackCard Bridge</h1>
      </div>
      <div className="link-list">
        <Link onClick={changeViewToDeposit} className={isDeposit ? "active" : ""}>
          Deposit
        </Link>
        {/* <Link onClick={changeViewToWithdrawal} className={isWithdrawal ? "active" : ""}>
          Withdrawal
        </Link> */}
      </div>
      <div className="right-side">
        <VersionSelect></VersionSelect>
        {!isMainnet && (
          <Popover
            content={() => <PopoverMenu handleClick={closePopoverMenu}></PopoverMenu>}
            trigger="click"
            overlayClassName="popover-menu"
            visible={popoverVisible}
            placement="bottomLeft"
          >
            <Hamburger className="hamburger-menu" onClick={openPopoverMenu}></Hamburger>
          </Popover>
        )}
      </div>
      <div className="gradient"></div>
    </StyledPage>
  );
}
