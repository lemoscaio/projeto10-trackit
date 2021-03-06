import React, { useContext } from "react";
import * as S from "../styles/styles";
import PercentageHabitsDoneContext from "../contexts/PercentageHabitsDoneContext";
import { buildStyles } from "react-circular-progressbar";

function Footer() {
    const { percentage } = useContext(PercentageHabitsDoneContext);

    return (
        <S.Footer>
            <S.FooterAltLink to="/habits">
                <S.FooterLinkWrapper>
                    <p>Hábitos</p>
                </S.FooterLinkWrapper>
            </S.FooterAltLink>
            <S.FooterLink to="/today">
                <S.TodayButton>
                    <S.CenteredCircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent",
                            pathTransition: "stroke-dashoffset 0.5s ease 0s",
                        })}
                    />
                    <p>Hoje</p>
                </S.TodayButton>
            </S.FooterLink>
            <S.FooterAltLink to="/history">
                <S.FooterLinkWrapper>
                    <p>Histórico</p>
                </S.FooterLinkWrapper>
            </S.FooterAltLink>
        </S.Footer>
    );
}

export default Footer;
