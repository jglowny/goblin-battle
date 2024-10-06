"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import type { Teams, Goblin } from "../../types/type";
import getRandomValue from "../../utils/GetRandomValue";
type Props = {
  teams: Teams;
  addNewTeam: unknown | any | unknown[];
};

const TEXT_MESSAGES = {
  IS_REQUIRED: "Error, name team is required.",
  IS_EXIST: "Error, this name time is exist.",
  SUCCESS: "A successful team has been created.",
};

export const CreateTeam = ({ teams, addNewTeam }: Props) => {
  const [nameValueInput, setNameValueInput] = useState<string>("");
  const [countTeam, setCountTeam] = useState<number>(0);
  const [messageText, setMessageText] = useState<string>(" ");
  const generateGoblin = (): Goblin => {
    return {
      name: uniqueNamesGenerator({ dictionaries: [names] }),
      attack: getRandomValue(1, 10),
      defense: getRandomValue(1, 10),
    };
  };

  const createTeamGoblin = () => {
    return Array.from({ length: 5 }, () => generateGoblin());
  };

  const handleAddTeam = () => {
    const newTeams = {
      id: countTeam,
      position: countTeam,
      name: nameValueInput.toLowerCase(),
      team: createTeamGoblin(),
      battle: 0,
      victories: 0,
      lost: 0,
      points: 0,
    };

    const fieldValidate = () => {
      if (!nameValueInput) {
        return setMessageText(TEXT_MESSAGES.IS_REQUIRED);
      }
      if (checkName() === true) {
        return setMessageText(TEXT_MESSAGES.IS_EXIST);
      }
      setMessageText(TEXT_MESSAGES.SUCCESS);
      addNewTeam([...teams, newTeams]);
      setNameValueInput("");
      setCountTeam((prev) => prev + 1);
    };

    fieldValidate();
  };

  const checkName = (): boolean => {
    const check = teams.filter(
      (item) => item.name.toLowerCase() === nameValueInput.toLowerCase()
    );
    return check.length > 0 ? true : false;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleAddTeam();
  };

  return (
    <Box
      sx={{
        minHeight: "200px",
        maxHeight: "420px",
        marginBlock: "20px",
        p: "20px",
        border: 1,
        height: "auto",
      }}
    >
      <h3>Add our team</h3>
      <Box
        component="form"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBlock: "20px",
        }}
      >
        <TextField
          id="team-name"
          label="write name your team"
          variant="outlined"
          value={nameValueInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNameValueInput(event.target.value);
          }}
        />

        <Button color="primary" type="submit" variant="outlined">
          +
        </Button>
      </Box>
      {teams.length > 0 && countTeam > 0 && (
        <>
          <p>Name: {teams[teams.length - 1].name}</p>
          <p>Team</p>
          <ol style={{ listStylePosition: "inside", margin: "20px" }}>
            {teams[teams.length - 1].team.map((el) => (
              <li key={`team${el.name}`}>
                {el.name} ({el.attack}, {el.defense})
              </li>
            ))}
          </ol>
        </>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <p>{messageText}</p>
      </Box>
    </Box>
  );
};
