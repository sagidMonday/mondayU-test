import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrQuestion,
  setQuestions,
  setQuizQuestions,
} from "../../redux/slice/questions.slice";
import { setMaxScore, setCurrScore } from "../../redux/slice/score.slice";
import {
  setQuizTimer,
  setQuizNumOfQuestions,
} from "../../redux/slice/quiz.slice";
import { EASY_POINTS, HARD_POINTS, MEDIUM_POINTS } from "../../constants";
import { shuffle, stringParser } from "../../common/helper-functions";

const welcomeMessage = "Welcome to online quiz!";
const introText = "Join us to our Quiz game and test your knowledge";

const WelcomePage = () => {
  const questions = useSelector((state) => state.Questions.questions);
  const numOfQuestions = useSelector((state) => state.Quiz.quizNumOfQuestions);
  const dispatch = useDispatch();
  const history = useHistory();

  const filterQuestions = (numberOfQues) => {
    const quizQuestions = [];
    let easyQuestions = Math.floor(numberOfQues * 0.4);
    let mediumQuestions = Math.floor(numberOfQues * 0.4);
    let hardQuestions = numberOfQues - mediumQuestions - easyQuestions;
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
    dispatch(setQuizTimer(parseInt(event.target.value)));
  };

  const onStartClicked = () => {
    console.log("clicked!");
    history.push("/quiz");
  };

  const onSelectNumOfQuestion = (event) => {
    debugger;
    dispatch(setQuizNumOfQuestions(parseInt(event.target.value)));
  };

  const clearStore = () => {
    dispatch(setMaxScore(0));
    dispatch(setCurrQuestion(0));
    dispatch(setCurrScore(0));
    dispatch(setQuizNumOfQuestions(20));
    dispatch(setQuizTimer(15));
  };

  useEffect(() => {
    const fetchApi = () => {
      fetch("https://opentdb.com/api.php?amount=100")
        .then((response) => response.json())
        .then((data) => {
          const res = data.results.map((question) => {
            question.question = stringParser(question.question);
            let questionBeforeShuffle = question.incorrect_answers
              .concat(question.correct_answer)
              .map((question) => {
                return stringParser(question);
              });
            question.answers = shuffle(questionBeforeShuffle);
            return question;
          });
          dispatch(setQuestions(res));
        });
    };
    clearStore();
    fetchApi();
  }, []);

  useEffect(() => {
    filterQuestions(numOfQuestions);
  }, [questions, numOfQuestions]);

  return (
    <PageContainer>
      <WelcomeTitle>{welcomeMessage}</WelcomeTitle>
      <WelcomeContainer>
        <WelcomeText>{introText}</WelcomeText>
        <SetTimerSection>
          <SectionTitle>Choose your Question Timer</SectionTitle>
          <SelectContainer
            defaultValue={15}
            onChange={(event) => {
              onSelectTime(event);
            }}
          >
            <OptionContainer value={10}>10</OptionContainer>
            <OptionContainer value={15}>15</OptionContainer>
            <OptionContainer value={20}>20</OptionContainer>
          </SelectContainer>
        </SetTimerSection>
        <SetNumOfQuestion>
          <SectionTitle>Choose number of questions in quiz</SectionTitle>
          <SelectContainer
            defaultValue={20}
            onChange={(event) => {
              onSelectNumOfQuestion(event);
            }}
          >
            <OptionContainer value={10}>10</OptionContainer>
            <OptionContainer value={15}>15</OptionContainer>
            <OptionContainer value={20}>20</OptionContainer>
          </SelectContainer>
        </SetNumOfQuestion>
        <StartButton onClick={onStartClicked}>Let's Start!</StartButton>
      </WelcomeContainer>
    </PageContainer>
  );
};

export default WelcomePage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  margin-top: 50px;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  border-radius: 5px;
  width: 100%;
  margin: auto;
  background-color: #175e17;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
`;

const WelcomeTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.5px;
  color: black;
  margin-bottom: 20px;
`;

const WelcomeText = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
  color: white;
`;

const SetNumOfQuestion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
`;

const SetTimerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  width: 80%;
  margin: auto;
  color: white;
  align-self: baseline;
`;

const SelectContainer = styled.select`
  width: 10%;
  border-radius: 5px;
  height: 30px;
`;

const OptionContainer = styled.option`
  font-size: 10px;
`;

const StartButton = styled.button`
  height: 40px;
  width: 30%;
  margin: auto;
  font-weight: 600;
  background-color: white;
  border-color: black;
  font-size: 16px;
  border-radius: 5px;
  color: black;
`;
