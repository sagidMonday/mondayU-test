import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const Score = () => {
  const currScore = useSelector((state) => state.Score.currScore);
  const maxScore = useSelector((state) => state.Score.maxScore);
  const dispatch = useDispatch();

  return (
    <ScoreContainer>
      {currScore}/{maxScore}
    </ScoreContainer>
  );
};

export default Score;

const ScoreContainer = styled.div``;
