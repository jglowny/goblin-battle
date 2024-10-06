import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

type PropsRenderResult = {
  round: string[];
};

export const RenderResult = ({ round }: PropsRenderResult) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box>
        <p>Results:</p>
        <ol style={{ listStylePosition: "inside", margin: "20px" }}>
          {round &&
            round.map((el, index) => (
              <li key={`round-${index}`}>
                Round {index + 1} - {el}
              </li>
            ))}
        </ol>
      </Box>
    </Grid>
  );
};
