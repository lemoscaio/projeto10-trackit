import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../../styles/styles";
import CreateHabitContext from "./../../../contexts/CreateHabitContext";
import CreateHabit from "./CreateHabit.js";
import Habit from "./Habit.js";
import NoHabitMessage from "./NoHabitMessage.js";
import TopMessage from "./TopMessage.js";
import UserLoggedInContext from "./../../../contexts/UserLoggedInContext";

function Habits() {
    const { setUserLoggedIn } = useContext(UserLoggedInContext);
    const [habits, setHabits] = useState([]);
    const [toggleCreateTask, setToggleCreateTask] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [habitDays, setHabitDays] = useState([]);
    const [componentLoaded, setComponentLoaded] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    useEffect(() => {
        const GET_HABITS_URL =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.get(GET_HABITS_URL, config);
        promise
            .then((response) => {
                setUserLoggedIn(true);
                const { data } = response;
                setHabits(data);
            })
            .catch((error) => {
                setUserLoggedIn(false);
                navigate("../");
            });
    }, []);

    function checkHabitsList() {
        if (habits.length > 0) {
            return habits.map((habit) => {
                return (
                    <Habit
                        key={habit.id}
                        habit={habit}
                        removeHabit={(habitId) => {
                            removeHabit(habitId);
                        }}
                    />
                );
            });
        } else {
            return <NoHabitMessage />;
        }
    }

    function toggleCreateTaskContainer(value) {
        setToggleCreateTask(value);
    }

    function checkCreateHabitContainer() {
        return toggleCreateTask ? (
            <CreateHabitContext.Provider
                value={{ habitName, habitDays, setHabitName, setHabitDays }}
            >
                <CreateHabit
                    toggleCreateTaskContainer={(value) => {
                        toggleCreateTaskContainer(value);
                    }}
                    saveHabit={(habitData) => {
                        saveHabit(habitData);
                    }}
                    componentLoaded={componentLoaded}
                    setComponentLoaded={setComponentLoaded}
                />
            </CreateHabitContext.Provider>
        ) : (
            <></>
        );
    }

    function saveHabit(habitData) {
        setComponentLoaded(false);

        const CREATE_HABIT_URL =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.post(CREATE_HABIT_URL, habitData, config);
        promise
            .then((response) => {
                const { data } = response;
                habitData.id = data.id;
                toggleCreateTaskContainer(false);
                setHabits([...habits, habitData]);
            })
            .catch((error) => {
                alert("Algo deu errado");
                setComponentLoaded(true);
            });
    }

    function removeHabit(habitId) {
        const DELETE_HABIT_URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}`;
        axios.delete(DELETE_HABIT_URL, config);
        const newHabits = habits.filter((habit, index) => {
            if (habit.id === habitId) {
                return false;
            } else {
                return true;
            }
        });
        setHabits(newHabits);
    }

    const createHabitContent = checkCreateHabitContainer();
    const habitsContent = checkHabitsList();

    return (
        <>
            <S.Container>
                <TopMessage
                    toggleCreateTaskContainer={(value) => {
                        toggleCreateTaskContainer(value);
                    }}
                />
                <S.Habits>
                    {createHabitContent}
                    {habitsContent}
                </S.Habits>
            </S.Container>
        </>
    );
}

export default Habits;
