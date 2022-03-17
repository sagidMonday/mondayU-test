import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setCurrQuestion } from "../../redux/slice/questions.slice";
import Question from "../Question";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const QuizPage = () => {
  const questions = useSelector((state) => state.Questions.questions);
  const quizQuestions = useSelector((state) => state.Questions.quizQuestions);
  const currQuestion = useSelector((state) => state.Questions.currQuestion);
  const questionTimer = useSelector((state) => state.Quiz.quizTimer);
  const dispatch = useDispatch();

  const onTimerComplete = () => {
    dispatch(setCurrQuestion(currQuestion + 1));
  };

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
    </QuizContainer>
  );
};

export default QuizPage;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 50%;
  margin: auto;
  margin-top: 50px;
`;

const QuizTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;

const TimerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
`;
