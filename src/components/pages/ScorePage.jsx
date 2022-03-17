import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  BAD_SCORE_MESSAGES,
  GOOD_SCORE_MESSAGES,
  PERFECT_SCORE_MESSAGES,
  PERFECT_SCORE,
  LOWER_THRESHOLD,
  goodJobGif,
  trophyGif,
  tryAgainGif,
} from "../../constants";
import { useHistory } from "react-router-dom";

const Score = () => {
  const [displayMessage, setDisplayMessage] = useState("");
  const [displayGif, setDisplayGif] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const score = useSelector((state) => state.Score.currScore);
  const maxScore = useSelector((state) => state.Score.maxScore);

  const history = useHistory();

  const generateMessage = () => {
    const finalScoreNew = Math.round((score / maxScore) * PERFECT_SCORE);
    setFinalScore(finalScoreNew);
    if (finalScoreNew === PERFECT_SCORE) {
      setDisplayMessage(PERFECT_SCORE_MESSAGES);
      setDisplayGif(trophyGif);
    } else if (finalScoreNew > LOWER_THRESHOLD) {
      setDisplayMessage(GOOD_SCORE_MESSAGES);
      setDisplayGif(goodJobGif);
    } else {
      setDisplayMessage(BAD_SCORE_MESSAGES);
      setDisplayGif(tryAgainGif);
    }
  };

  const onTryAgainClicked = () => {
    history.push("/");
  };

  useEffect(() => {
    generateMessage();
  }, []);

  return (
    <PageContainer>
      <ScoreContainer>
        <MotivationMessage>{displayMessage}</MotivationMessage>
        <ScoreMessage>Your score is {finalScore} out of 100</ScoreMessage>
        <TryAgainButton onClick={onTryAgainClicked}>Try Again!</TryAgainButton>
      </ScoreContainer>
      <GifContainer>
        <GifImage src={displayGif}></GifImage>
      </GifContainer>
    </PageContainer>
  );
};

export default Score;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 50%;
  height: 200px;
  margin: auto;
  margin-bottom: 30px;
  background-color: #963535;
  border-radius: 7px;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
`;

const MotivationMessage = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: white;
`;

const ScoreMessage = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: white;
`;

const GifContainer = styled.div``;

const GifImage = styled.img``;

const TryAgainButton = styled.button`
  height: 40px;
  width: 30%;
  margin-top: 30px;
  font-weight: 600;
  background-color: white;
  border-color: black;
  font-size: 16px;
  border-radius: 5px;
  color: black;
`;
