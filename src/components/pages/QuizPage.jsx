import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrQuestion,
  setQuizQuestions,
} from "../../redux/slice/questions.slice";
import Question from "../Question";
import Score from "../Score";
import { setMaxScore } from "../../redux/slice/score.slice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const QuizPage = () => {
  const questions = useSelector((state) => state.Questions.questions);
  const quizQuestions = useSelector((state) => state.Questions.quizQuestions);
  const questionTimer = useSelector((state) => state.Quiz.quizTimer);
  const currQuestion = useSelector((state) => state.Questions.currQuestion);
  const dispatch = useDispatch();

  const onTimerComplete = () => {
    dispatch(setCurrQuestion(currQuestion + 1));
  };

  useEffect(() => {}, []);

  return (
    <QuizContainer>
      <QuizTitle>Question {currQuestion + 1}</QuizTitle>
      <TimerContainer>
        <CountdownCircleTimer
          key={currQuestion}
          isPlaying
          size={50}
          duration={questionTimer}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={onTimerComplete}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </TimerContainer>
      {questions && (
        <Question question={quizQuestions[currQuestion]}></Question>
      )}
      <Score></Score>
    </QuizContainer>
  );
};

export default QuizPage;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: 10px;
  width: 80%;
`;

const QuizTitle = styled.h1`
  font-size: 30px;
  text-align: center;
`;

const TimerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
`;
