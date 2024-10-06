import type { Team } from "../../types/type";
import Grid from "@mui/material/Grid2";

type RenderScoreProps = {
  selectTeam: Team[];
  score: {
    battles: number;
    winsTeamA: number;
    winsTeamB: number;
    draws: number;
  };
};

export const RenderScore = ({ selectTeam, score }: RenderScoreProps) => {
  return (
    <>
      {selectTeam && selectTeam.length > 1 && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <p>{`Battles - ${score.battles}`}</p>
            <p>{`Draws - ${score.draws}`}</p>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <p>{`Wins ${selectTeam[0].name} - ${score.winsTeamA}`}</p>
            <p>{`Wins ${selectTeam[1].name} - ${score.winsTeamB}`}</p>
          </Grid>
        </>
      )}
    </>
  );
};
