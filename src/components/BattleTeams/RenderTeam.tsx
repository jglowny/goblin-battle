import type { Team, Goblin } from "../../types/type";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

type PropsRenderTeam = {
  selectTeam: Team[];
};

export const RenderTeam = ({ selectTeam }: PropsRenderTeam) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box sx={{ display: "flex" }}>
        {selectTeam.length > 1 &&
          selectTeam.map((item, index) => (
            <div key={`${item}-${index}`}>
              <p>Name: {item.name}</p>
              <ol style={{ listStylePosition: "inside", margin: "20px" }}>
                {item.team.map((goblin: Goblin) => (
                  <li key={goblin.name}>
                    {goblin.name} A-{goblin.attack} D-{goblin.defense}
                  </li>
                ))}
              </ol>
            </div>
          ))}
      </Box>
    </Grid>
  );
};
