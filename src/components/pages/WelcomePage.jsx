import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions,
  setQuizQuestions,
} from "../../redux/slice/questions.slice";
import { setMaxScore } from "../../redux/slice/score.slice";
import { setQuizTimer } from "../../redux/slice/quiz.slice";

const EASY_POINTS = 5;
const MEDIUM_POINTS = 10;
const HARD_POINTS = 15;

const WelcomePage = () => {
  const questions = useSelector((state) => state.Questions.questions);
  const dispatch = useDispatch();
  const history = useHistory();

  const filterQuestions = (numberOfQues) => {
    const quizQuestions = [];
    const easyQuestions = Math.floor(numberOfQues * 0.4);
    const mediumQuestions = Math.floor(numberOfQues * 0.4);
    const hardQuestions = numberOfQues - mediumQuestions - easyQuestions;
    const maxScore =
      easyQuestions * EASY_POINTS +
      mediumQuestions * MEDIUM_POINTS +
      hardQuestions * HARD_POINTS;
    dispatch(setMaxScore(maxScore));
    quizQuestions.push(
      ...questions
        .filter((question) => question.difficulty === "easy")
        .slice(0, easyQuestions)
    );
    quizQuestions.push(
      ...questions
        .filter((question) => question.difficulty === "medium")
        .slice(0, mediumQuestions)
    );
    quizQuestions.push(
      ...questions
        .filter((question) => question.difficulty === "hard")
        .slice(0, hardQuestions)
    );
    dispatch(setQuizQuestions(quizQuestions));
  };

  const onSelectTime = (event) => {
    dispatch(setQuizTimer(event.target.value));
  };

  useEffect(() => {
    const fetchApi = () => {
      fetch("https://opentdb.com/api.php?amount=100")
        .then((response) => response.json())
        .then((data) => {
          const res = data.results.map((question) => {
            question.answers = question.incorrect_answers.concat(
              question.correct_answer
            );
            return question;
          });
          dispatch(setQuestions(res));
        });
    };
    fetchApi();
  }, []);

  useEffect(() => {
    filterQuestions(23);
  }, [questions]);

  const onStartClicked = () => {
    console.log("clicked!");
    history.push("/quiz");
  };

  return (
    <WelcomeContainer>
      <WelcomeTitle>Welcome to online quiz!</WelcomeTitle>
      <WelcomeText>
        Join us to our Quiz game and test your knowledge
      </WelcomeText>
      <SectionTitle>Choose your Question Timer</SectionTitle>
      <SelectContainer
        defaultValue={15}
        onChange={(event) => {
          onSelectTime(event);
        }}
      >
        <OptionContainer value={5}>5</OptionContainer>
        <OptionContainer value={10}>10</OptionContainer>
        <OptionContainer value={15}>15</OptionContainer>
      </SelectContainer>
      <StartButton onClick={onStartClicked}>Let's Start!</StartButton>
    </WelcomeContainer>
  );
};

export default WelcomePage;

const WelcomeContainer = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  height: 300px;
  width: 90%;
  margin: auto;
  background-color: grey;
  margin-top: 200px;
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

const SectionTitle = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  align-self: baseline;
`;

const SelectContainer = styled.select`
  width: 10%;
  align-self: baseline;
  border-radius: 5px;
  height: 30px;
`;

const OptionContainer = styled.option`
  font-size: 10px;
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
