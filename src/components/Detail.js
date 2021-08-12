import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import db from "../firebase";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [trailer, setTrailer] = useState("");
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailer) {
      setTrailer("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailer(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMovie(doc.data());
        } else {
        }
      });
    // eslint-disable-next-line
  }, [id]);
  return (
    <Container>
      <Background>
        <img src={movie.backgroundImg} alt="#" />
      </Background>
      <ImageTitle>
        <img src={movie.titleImg} alt="#" />
      </ImageTitle>
      <Controls>
        <PlayBtn>
          <img src="/images/play-icon-black.png" alt="#" />
          <span>Play</span>
        </PlayBtn>
        <TrailerBtn onClick={handleClick(movie)}>
          <img src="/images/play-icon-white.png" alt="#" />
          <span>Trailer</span>
        </TrailerBtn>
        <AddBtn>
          <span>+</span>
        </AddBtn>
        <GroupBtn>
          <img src="/images/group-icon.png" alt="#" />
        </GroupBtn>
      </Controls>
      <SubTitle>{movie.subTitle}</SubTitle>
      {trailer && <Youtube videoId={trailer} opts={opts} /> }
      <Description>{movie.description}</Description>
    </Container>
  );
};

export default Detail;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
`;
const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
  max-width: 900px;

  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
`;
const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageTitle = styled.div`
  height: 30vh;
  width: 35vw;
  min-height: 170px;
  min-width: 200px;
  padding: 20px 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Controls = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PlayBtn = styled.button`
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
  height: 56px;
  background-color: rgb(249, 249, 249);
  border: none;
  padding: 0 24px;
  letter-spacing: 1.8px;
  margin-right: 22px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: rgb(198, 198, 198);
  }
`;

const TrailerBtn = styled(PlayBtn)`
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  text-transform: uppercase;
`;

const AddBtn = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid white;
  cursor: pointer;
  margin-right: 16px;
  span {
    font-size: 30px;
    color: #fff;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const GroupBtn = styled(AddBtn)`
  background: rgb(0, 0, 0);
`;
