import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const WelcomePage = () => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchApi = () => {
      fetch(" https://opentdb.com/api.php?amount=100")
        .then((response) => response.json())
        .then((data) => setQuestions(data.results));
    };
    fetchApi();
  }, []);

  const onStartClicked = () => {
    console.log("clicked!");
    history.push("/quiz");
  };

  console.log(questions);

  return (
    <WelcomeContainer>
      <WelcomeTitle>Welcome to online quiz!</WelcomeTitle>
      <WelcomeText>
        Join us to our Quiz game and test your knowledge
      </WelcomeText>
      <StartButton onClick={onStartClicked}>Let's Start!</StartButton>
    </WelcomeContainer>
  );
};

export default WelcomePage;

const WelcomeContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px;
  flex-direction: column;
  height: 200px;
  width: 90%;
  margin: auto;
  background-color: grey;
`;

const WelcomeTitle = styled.div`
  font-size: 18px;
  text-align: center;
  letter-spacing: 0.5px;
  color: white;
`;

const WelcomeText = styled.div`
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.5px;
  color: white;
`;

const StartButton = styled.button`
  width: 30%;
  margin: auto;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.5px;
  color: white;
  background-color: blue;
`;
