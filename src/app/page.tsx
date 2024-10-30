"use client";
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CreateTeam } from "../components/CreateTeam";
import dynamic from "next/dynamic";
import { BattleTeams } from "@/components/BattleTeams";
import type { Team, UpdateStatsFunction } from "./../types/type";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
const NoSSR = dynamic(
  () => import("../components/ClassificationTable/ClassificationTable"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [, setValue] = useLocalStorage("teams", []);
  const [teams, setTeams] = useState<Team[]>([]);
  const addNewTeam = (data: Team[]): void => {
    setValue(data);
    setTeams(data);
  };

  const updateStats: UpdateStatsFunction = (
    updateTeams,
    updateWinTeam,
    updateLooseTeamName,
    updateType
  ) => {
    const newTeams = [...updateTeams];
    const winTeam: Team | null =
      newTeams.find((team) => team.name === updateWinTeam) || null;
    const looseTeam: Team | null =
      newTeams.find((team) => team.name === updateLooseTeamName) || null;
    if (updateType === "teamA" && winTeam && looseTeam) {
      winTeam.battle = winTeam.battle + 1;
      winTeam.victories = winTeam.victories + 1;
      looseTeam.battle = looseTeam.battle + 1;
      looseTeam.lost = looseTeam.lost + 1;
      setTeams(newTeams);
      setValue(teams);
      return;
    }
    if (updateType === "teamB" && winTeam && looseTeam) {
      winTeam.battle = winTeam.battle + 1;
      winTeam.lost = winTeam.lost + 1;
      looseTeam.battle = looseTeam.battle + 1;
      looseTeam.victories = looseTeam.victories + 1;
      setTeams(newTeams);
      setValue(teams);
      return;
    }
    if (updateType === "draw" && winTeam && looseTeam) {
      winTeam.battle = winTeam.battle + 1;
      winTeam.victories = winTeam.victories + 1;
      looseTeam.battle = looseTeam.battle + 1;
      looseTeam.victories = looseTeam.victories + 1;
      setTeams(newTeams);
      setValue(teams);
      return;
    }
  };

  useEffect(() => {
    // Get the value from local storage if it exists
    const value = localStorage.getItem("teams");

    if (typeof value === "string") {
      setTeams(JSON.parse(value));
    }
  }, []);

  return (
    <>
      <CssBaseline>
        <Container maxWidth="xl" sx={{ p: "20px" }}>
          <h1>Goblin Battle </h1>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <CreateTeam teams={teams} addNewTeam={addNewTeam} />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                {teams.length > 1 && (
                  <BattleTeams teams={teams} updateStats={updateStats} />
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                {teams && teams?.length > 0 && <NoSSR data={teams}></NoSSR>}
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Box sx={{ flexGrow: 1 }}></Box>
      </CssBaseline>
    </>
  );
}
