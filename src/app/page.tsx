"use client";
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
import useLocalStorage from "@/hooks/useLocalStorage";
import { CreateTeam } from "../components/CreateTeam";
import dynamic from "next/dynamic";
import { BattleTeams } from "@/components/BattleTeams";
import type { Team, Teams } from "./../types/type";
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
  const addNewTeam = (data: Team[]) => {
    setValue(data);
    setTeams(data);
  };

  const updateStats = (
    teams: Teams,
    winTeamName: unknown,
    looseTeamName: unknown,
    type: string
  ): any => {
    const newTeams: Teams = [...teams];
    const winTeam: any = newTeams.find((team) => team.name === winTeamName);
    const looseTeam: any = newTeams.find((team) => team.name === looseTeamName);
    if (type === "teamA") {
      winTeam.battle = winTeam.battle + 1;
      winTeam.victories = winTeam.victories + 1;
      looseTeam.battle = looseTeam.battle + 1;
      looseTeam.lost = looseTeam.lost + 1;
      setTeams(newTeams);
      setValue(teams);
      return;
    }
    if (type === "teamB") {
      winTeam.battle = winTeam.battle + 1;
      winTeam.lost = winTeam.lost + 1;
      looseTeam.battle = looseTeam.battle + 1;
      looseTeam.victories = looseTeam.victories + 1;
      setTeams(newTeams);
      setValue(teams);
      return;
    }
    if (type === "draw") {
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
          {/* <Box
            component="div"
            sx={{ color: "white", bgcolor: "#000", height: "100vh" }}
          >
            <CreateTeam teams={teams} addNewTeam={addNewTeam} />
            {teams.length > 1 && (
              <BattleTeams teams={teams} updateStats={updateStats} />
            )}
            {teams && teams?.length > 0 && <NoSSR data={teams}></NoSSR>}
          </Box> */}
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
