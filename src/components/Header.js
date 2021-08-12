import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
const Header = () => {
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const dispatch = useDispatch();
  const history = useHistory();
  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user;
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      history.push("/home");
    });
  };
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/");
    });
  };
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/home");
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            {/* eslint-disable-next-line */}
            <a>
              <img src="/images/home-icon.svg" alt="home-icon" />
              <span>Home</span>
            </a>
            {/* eslint-disable-next-line */}
            <a>
              <img src="/images/search-icon.svg" alt="search icon" />
              <span>search</span>
            </a>
            {/* eslint-disable-next-line */}
            <a>
              <img src="/images/watchlist-icon.svg" alt="watch-list icon" />
              <span>watchlist</span>
            </a>
            {/* eslint-disable-next-line */}
            <a>
              <img src="/images/original-icon.svg" alt="home-icon" />
              <span>originals</span>
            </a>
            {/* eslint-disable-next-line */}
            <a>
              <img src="/images/movie-icon.svg" alt="home-icon" />
              <span>movies</span>
            </a>
            {/* eslint-disable-next-line */}
            <a>
              <img src="/images/series-icon.svg" alt="home-icon" />
              <span>series</span>
            </a>
          </NavMenu>
          <UserImg src={userPhoto} onClick={signOut} />
        </>
      )}
    </Nav>
  );
};

export default Header;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.6);
  transition: all 250ms;
  cursor: pointer;

  &:hover {
    color: rgb(0, 0, 0);
    background: #f9f9f9;
    border-color: transparent;
  }
`;
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
  @media screen and (max-width: 700px) {
    justify-content: space-between;
  }
`;
const Logo = styled.img`
  width: 80px;
`;
const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: none;
  }
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    text-transform: uppercase;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &:hover {
      span::after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;
const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;
