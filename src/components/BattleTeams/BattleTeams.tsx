import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { Team, Teams, UpdateStatsFunction } from "../../types/type";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { RenderTeam, RenderResult, RenderScore } from "../BattleTeams/";
import {
  randomTeam,
  getRandomGoblin,
  fightGoblinVsGoblin,
} from "../../utils/processBattle";

type Props = {
  teams: Teams;
  updateStats: UpdateStatsFunction;
};

const initialValue = {
  battles: 0,
  winsTeamA: 0,
  winsTeamB: 0,
  draws: 0,
};

export const BattleTeams = ({ teams, updateStats }: Props) => {
  const [selectTeam, setSelectTeam] = useState<Team[]>([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(initialValue);
  const [round, setRound] = useState<string[]>([]);
  const [resultsTeamA, setResultsTeamA] = useState(0);
  const [resultsTeamB, setResultsTeamB] = useState(0);
  const [disabledButtonBattle, setDisabledButtonBattle] = useState(true);
  const resetStat = () => {
    setRound([]);
    setScore(initialValue);
    setResultsTeamA(0);
    setResultsTeamB(0);
    setMessage("");
  };

  const getRandomTeam = (teams: Teams): void => {
    resetStat();
    const teamA = randomTeam(teams);
    let teamB = randomTeam(teams);

    while (teamA === teamB) {
      teamB = randomTeam(teams);
    }
    setSelectTeam([teamA, teamB]);
    setDisabledButtonBattle(false);
  };

  const startBattle = (selectTeam: Teams): void => {
    playRound(selectTeam);
  };

  const playRound = (selectTeam: Team[]) => {
    const [teamA, teamB] = selectTeam;
    let aliveA = 0;
    let aliveB = 0;
    const _teamA: string[] = []; //temporary array
    const _teamB: string[] = []; //temporary array
    const _round: string[] = [];
    for (let i = 0; i < 5; i++) {
      let goblinA = getRandomGoblin(teamA);
      let goblinB = getRandomGoblin(teamB);
      while (_teamA.includes(goblinA.name)) {
        goblinA = getRandomGoblin(teamA);
      }
      while (_teamB.includes(goblinB.name)) {
        goblinB = getRandomGoblin(teamB);
      }

      _teamA.push(goblinA.name);
      _teamB.push(goblinB.name);
      _round.push(
        `${goblinA.name} (${goblinA.attack}-${goblinA.defense}) vs  ${goblinB.name} (${goblinB.attack}-${goblinB.defense})`
      );
      const result = fightGoblinVsGoblin(goblinA, goblinB);

      if (result.goblinAAlive) {
        aliveA++;
      }
      if (result.goblinBAlive) {
        aliveB++;
      }
    }

    setRound(_round);
    setScore({ ...score, battles: score.battles + 1 });
    setResultsTeamA(aliveA);
    setResultsTeamB(aliveB);
    if (aliveA > aliveB) {
      setScore({
        ...score,
        winsTeamA: score.winsTeamA + 1,
        battles: score.battles + 1,
      });
      updateStats(teams, teamA.name, teamB.name, "teamA");
      return setMessage(`${teamA.name} wins!`);
    } else if (aliveB > aliveA) {
      updateStats(teams, teamA.name, teamB.name, "teamB");

      setScore({
        ...score,
        winsTeamB: score.winsTeamB + 1,
        battles: score.battles + 1,
      });

      return setMessage(`${teamB.name} wins!`);
    } else {
      updateStats(teams, teamA.name, teamB.name, "draw");

      setScore({
        ...score,
        winsTeamA: score.winsTeamA + 1,
        winsTeamB: score.winsTeamB + 1,
        battles: score.battles + 1,
        draws: score.draws + 1,
      });

      return setMessage("It's a tie!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "200px",
        marginBlock: "20px",
        p: "20px",
        border: 1,
        height: "auto",
      }}
    >
      <h3>Battle</h3>
      <Grid container spacing={{ xs: 1, md: 4 }}>
        <RenderTeam selectTeam={selectTeam} />
        <RenderResult round={round} />
        <RenderScore selectTeam={selectTeam} score={score} />
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {message && <>{`${message} ${resultsTeamA}:${resultsTeamB}`}</>}
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button onClick={() => getRandomTeam(teams)} variant="outlined">
            Random Team
          </Button>
          <Button
            disabled={disabledButtonBattle}
            onClick={() => startBattle(selectTeam)}
            variant="outlined"
          >
            Start Battle
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
