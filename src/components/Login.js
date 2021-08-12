import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <CTA>
        <CTALogoOne src="/images/cta-logo-one.svg" />
        <SignUp>Get All there</SignUp>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eos
          natus quae. Architecto, nobis nesciunt. Unde nostrum voluptatibus,
          error voluptas iste rem, molestiae possimus nemo, reiciendis neque
          obcaecati. Tempora, dignissimos.
        </Description>
        <CTALogoTwo src="/images/cta-logo-two.png" />
      </CTA>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  display: flex;
  align-items: top;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("/images/login-background.jpg") center center / cover
      no-repeat fixed;
    z-index: -1;
  }
`;
const CTA = styled.div`
  max-width: 650px;
  padding: 80px 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;


  @media screen and (max-width: 700px){
    margin-top: 100px;
  }
`;

const CTALogoOne = styled.img``;
const CTALogoTwo = styled.img`
    width: 90%;
`;

const SignUp = styled.a`
  text-transform: uppercase;
  width: 100%;
  background: #0063e5;
  font-weight: bold;
  padding: 17px 0;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 12px;
  transition: all 250ms;
  letter-spacing: 1.5px;

  &:hover {
    background: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 11px;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.5;
`;
