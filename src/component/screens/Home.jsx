import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "../assets/css/style.css";
import { increment } from "../context/actions";
import AnimeLoader from "./Includes/AnimeLoader";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const quistion = useSelector((state) => state.quistion);
    const point = useSelector((state) => state.point);
    const dispatch = useDispatch();
    const [num, setNum] = useState(0);
    const [wrong, setWrong] = useState("");
    const [correct, setCorrect] = useState("");
    const [clicked, setClicked] = useState(false);
    const current = quistion[num];
    const handleAnswer = (item) => {
        if (item == current.correct) {
            dispatch(increment());
            setCorrect(item);
            setTimeout(() => {
                setCorrect("");
                setNum(num + 1);
                setWrong("");
            }, 1000);
        } else {
            setWrong(item);
            setCorrect(current.correct);
            setClicked(true);
            setTimeout(() => {
                setNum(num + 1);
                setWrong("");
            }, 1000);
        }
    };

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [loading]);

    return (
        <div>
            {loading ? (
                <MainContainer>
                    <AnimeLoader />
                </MainContainer>
            ) : (
                <MainContainer>
                    <PointContainer>
                        <Point>Point : {point}</Point>
                    </PointContainer>
                    <TopContainer>
                        <QuestionContainer>
                            <Question>{current.quistion}</Question>
                        </QuestionContainer>
                    </TopContainer>
                    <BottomContainer>
                        <Opions>
                            {current.answers.map((item) => (
                                <OptionList
                                    onClick={() => handleAnswer(item)}
                                    type={clicked}
                                    className={
                                        wrong == item
                                            ? "active"
                                            : correct == item
                                            ? "correct"
                                            : ""
                                    }
                                >
                                    {item}
                                </OptionList>
                            ))}
                        </Opions>
                    </BottomContainer>
                </MainContainer>
            )}
        </div>
    );
};

export default Home;

const MainContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: purple;
    padding-bottom: 20px;
`;
const TopContainer = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const QuestionContainer = styled.div`
    width: 50%;
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Question = styled.h4`
    font-size: 30px;
    font-weight: 600;
    color: #fff;
`;
const BottomContainer = styled.div`
    width: 100%;
    height: 30vh;
    /* background: violet; */
`;
const Opions = styled.ul`
    display: flex;
    align-items: center;
    /* margin-top: 20px; */
`;
const OptionList = styled.li`
    width: 23.3%;
    height: 30vh;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightblue;
    margin-left: 20px;
    &:hover {
        transform: scale(1.1);
        transition: 0.4s ease;
    }
    &.active {
        background: red;
    }
    &.correct {
        background: green;
    }
`;
const PointContainer = styled.ul``;
const Point = styled.li`
    color: #fff;
    padding-top: 20px;
    font-size: 40px;
    text-align: center;
    font-weight: 700;
`;
