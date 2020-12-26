# Def Hacks Learn - CS Outreach Learning Platform

[![Firebase-CD Actions Status](https://github.com/Def-Hacks-CS-Outreach/def-hacks-learn/workflows/Firebase-CD/badge.svg)](https://github.com/Def-Hacks-CS-Outreach/def-hacks-learn/actions)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/afd7d8ad160c426280810c7b80749ca9)](https://www.codacy.com/gh/alphaX86/def-hacks-learn/dashboard?utm_source=github.com&utm_medium=referral&utm_content=alphaX86/def-hacks-learn&utm_campaign=Badge_Grade)

## Instructions

To install on your local machine

- `git clone REPO_URL`
- `cd def-hacks-learn`
- `npm install`

# To start making actual changes

If you are not added as a contributor to the repository, you will not be able to make actual
changes because you are missing the environment variables. Therefore, once you are done
installing all the dependencies, to start out making actual changes that interacts with
firebase, create a .env file in the root directory.

- if using linux or have bash installed, inside your terminal
  -- touch .env
- if running windows machine, inside command prompt (cmd)
  -- echo > .env

Next, ask for environment variables from the project lead and drop it in the .env file. You
can now start making your changes to the deployed site.

# Before pushing code or submitting a PR

To run linting and tell you what is wrong with your code

- npm run lint

To format all the code based on prettier and linting configuration

- npm run format

# File structure

Most files are configuration related on the root folder. The public folder includes the static files
to be served for hosting, but pre-build process. All components, styles, pages can be found inside the
src folder.

## Quick Map

- def-hacks-learn/
  - public/
    - index.html
    - favicon.ico
    - assets/
      - images/
  - src/
    - components/
      - authscreens/
      - common/
      - firebase/
    - styles/
    - pages/
    - App.js
    - Index.js
- package.json
- README.md

`! Please enable eslint and prettier extension in your local code editor to ensure code format rules.`

This is the test for pull request only
