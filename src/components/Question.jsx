import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setCurrQuestion } from "../redux/slice/questions.slice";

const Question = (props) => {
  const currQuestion = useSelector((state) => state.Questions.currQuestion);
  const dispatch = useDispatch();

  const onAnswerClicked = () => {
    dispatch(setCurrQuestion(currQuestion + 1));
  };
  console.log(currQuestion);
  console.log(props.question);
  return (
    <QuestionContainer>
      <QuestionText>{props.question.question}</QuestionText>
      {props.question.answers.map((answer, index) => {
        return (
          <QuestionAnswer key={index} onClick={onAnswerClicked}>
            {answer}
          </QuestionAnswer>
        );
      })}
    </QuestionContainer>
  );
};

export default Question;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  background-color: #1a1a50;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
`;

const QuestionText = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
  color: white;
`;

const QuestionAnswer = styled.button`
  height: 40px;
  width: 30%;
  margin: auto;
  font-weight: 600;
  background-color: transparent;
  border-color: #a5a5c4;
  font-size: 16px;
  border-radius: 5px;
  color: white;
  &:hover {
    .button {
      display: none;
    }
`;
