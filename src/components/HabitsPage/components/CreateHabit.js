import React, { useState, useEffect, useContext } from "react";
import CreateHabitContext from "./../../../contexts/CreateHabitContext"
import * as S from "../../../styles/styles";

function CreateHabit({ toggleCreateTaskContainer, saveHabit }) {
    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

    const { habitName, setHabitName } = useContext(CreateHabitContext);
    const { habitDays, setHabitDays } = useContext(CreateHabitContext);

    const buttonsDaysOfWeek = daysOfWeek.map((day, dayIndex) => {
        if (!habitDays.includes(dayIndex)) {
            return (
                <S.DayButton
                    onClick={() => {
                        if (!habitDays.includes(dayIndex)) {
                            habitDays.push(dayIndex);
                        } else {
                            habitDays.sort();
                            habitDays.splice(
                                habitDays.indexOf(dayIndex),
                                1
                            );
                        }
                        habitDays.sort();
                        setHabitDays([...habitDays]);
                    }}
                >
                    {day}
                </S.DayButton>
            );
        }
        return (
            <S.DayButtonOn
                onClick={() => {
                    if (!habitDays.includes(dayIndex)) {
                        habitDays.push(dayIndex);
                    } else {
                        habitDays.sort();
                        habitDays.splice(habitDays.indexOf(dayIndex), 1);
                    }
                    habitDays.sort();
                    setHabitDays([...habitDays]);
                }}
            >
                {day}
            </S.DayButtonOn>
        );
    });

    function handleSaveHabit() {
        saveHabit({ name: habitName, days: habitDays });
        setHabitName("");
        setHabitDays([]);
        toggleCreateTaskContainer(false);
    }

    return (
        <S.CreateHabit>
            <S.Input
                value={habitName}
                onChange={(event) => setHabitName(event.target.value)}
                type="text"
                placeholder="nome do hábito"
            />
            <div>{buttonsDaysOfWeek}</div>
            <S.AddHabitButtons>
                <S.CancelButton
                    onClick={() => toggleCreateTaskContainer(false)}
                >
                    Cancelar
                </S.CancelButton>
                <S.DefaultButton onClick={handleSaveHabit}>
                    Salvar
                </S.DefaultButton>
            </S.AddHabitButtons>
        </S.CreateHabit>
    );
}

export default CreateHabit;
