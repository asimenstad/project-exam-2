# Holidaze

[![Netlify Status](https://api.netlify.com/api/v1/badges/9a965a71-6831-427e-9a84-c2b1b4361a70/deploy-status)](https://app.netlify.com/sites/dazzling-stardust-7c87a0/deploys) [![Automated E2E Testing](https://github.com/asimenstad/project-exam-2/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/asimenstad/project-exam-2/actions/workflows/e2e-test.yml)

[Hosted demo](https://dazzling-stardust-7c87a0.netlify.app/)

## Description 

Holidaze is an accommodation booking site. The site has a customer-facing side where you can create a user and book holidays at a venue, and view their upcoming bookings. There is also an admin-facing side where users can create and manage venues. 

## Built with

- [Vite + React](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/en/main/start/overview)
- [Mui](https://mui.com/material-ui/getting-started/overview/)
- [Formik](https://formik.org/docs/overview)
- [React-date-range](https://www.npmjs.com/package/react-date-range?activeTab=readme)
- [Date-fns](https://date-fns.org/v2.30.0/docs/Getting-Started)


## Installation

### Initialize git

    git init

### Install npm

    npm i
    
### Open Vite dev server

    npm run dev
    

##  End-to-end testing

The e2e tests are created with Cypress to test the following features:
- A user can register
- A user can login
- A user can search for a specific venue
- A registered venue manager can create a venue

### To run 
    npm run test
