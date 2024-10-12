# Customer Enquiry App 
This repository contains codes for a customer enquiry app that is still in the process of building.

## Features 
- `Sveltekit` - built with technology
- `json file` i.e - `enquiry.json` to handle data
-  ### UI  - Tailwindcss and  DaisyUi components

## Code Structure
- The data from `enquiry.json` is fetched into `src/routes/api/server.js`
- The project has to main routes. - `new-enquries` & `enquiries-list`
- The homepage route is the `new-enquiry` Route or simply `/`
- `enquiries-list` - Will fetch and render the data from `src/routes/api/server.js` and will render the data in a Sidebar component.
- `enquiries-list` has a nested routes folder that needs to dynamically render the corresponding data when clicked on respective item inside the sidebar component

## Istruction to run the app :

- Download the files from this repository
- Run pnpm install
- You can run the app in localhost
