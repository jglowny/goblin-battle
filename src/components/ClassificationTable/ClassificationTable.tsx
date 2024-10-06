import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { Team } from "../../types/type";
import Box from "@mui/material/Box";

type Props = {
  data: Team[];
};

export const ClassificationTable = ({ data }: Props) => {
  const sortData = data.sort((a, b) => b.victories - a.victories);
  return (
    <Box sx={{ marginBlock: "20px", p: "20px", border: 1 }}>
      <h3>Classification</h3>
      <TableContainer
        sx={{
          width: "100%",
          overflow: "auto",
          height: "350px",
        }}
      >
        <Table
          sx={{
            backgroundColor: "#000",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <abbr title="Position">#</abbr>
              </TableCell>
              <TableCell>Name </TableCell>
              <TableCell>Team </TableCell>
              <TableCell align="right">Battles</TableCell>
              <TableCell align="right">Loose</TableCell>
              <TableCell align="right">victories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData.map((row: Team, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.team.map((el) => (
                    <span key={el.name}>{`${el.name}, `}</span>
                  ))}
                </TableCell>

                <TableCell align="right">{row.battle}</TableCell>
                <TableCell align="right">{row.lost}</TableCell>
                <TableCell align="right">{row.victories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassificationTable;
