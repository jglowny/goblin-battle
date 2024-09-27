# Goblin arena

## Rules of the game

A simple game in which teams of goblins fight each other.

As a player, I can create as many teams as I want. A team consists of 5 goblins. When creating a team, I give it a name and generate a list of goblins with random parameters. I cannot generate a single goblin or change its parameters.

I can see a list of my teams sorted by ranking position in the number of victories.

I can see the list of goblins and their characteristics in the selected team.

Each goblin in the team has the following characteristics:
- name - a string of characters randomly generated using https://github.com/andreasonny83/unique-names-generator or a similar library
- random attack level - a number from 1 to 10
- random defense level - a number from 1 to 10

After creating more than one team, the player takes any number of rounds. The round is between 2 randomly selected teams. A round consists of 5 fights between randomly selected goblins from opposing teams. The team with more live goblins left in it wins. Ties are possible. In case of a tie, both teams get a victory point.

A single battle between goblins involves comparing the attack rate to the defense rate. A higher attack rate of the opponent than the defense means the death of the goblin. As a result of the battle, both goblins can either die or survive.

## Rules of task completion

A task is considered completed if it meets the above requirements. If something is not explicitly written in the requirements, you do not need to implement it. Of course, any idea from yourself is treated in your favor so let your imagination run wild :)

Stick to the following rules and you will definitely succeed:
- Stack: Next.js, MUI
- appearance - any, can be text only but aesthetically pleasing
- data storage - localStorage
- distribution - the result should be done on a separate branch and submitted as a pull request with the designated user @saadhre as the person doing the Review
