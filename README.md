# Task Management App
## _Steps to run_
```sh
git clone https://github.com/JuanOssa1/Todo-App.git
npm i
npm run dev
```
## _Or access it remotely from this link_
https://todo-app-ten-delta-70.vercel.app/
## Backend
https://github.com/JuanOssa1/todo-app-services

The architecture used was a hybrid between feature-driven and type-based, meaning the structure is partly defined by features and partly by types. The idea behind this is that when a developer comes in to work on the project, they can quickly understand what it is about without having to navigate too much. At the same time, a type-based structure is maintained, making it easy to work with from a development perspective as well.

## Key Technical Decisions

There is no perfect architecture or solution — all have their pros and cons. In this project, the priority was scalability.

- **Framework:** React — I have experience with it, it is well documented, and it simplifies many tasks that would be tedious in Vanilla JS. I also used TypeScript, which greatly aids development and scalability.
- **State management:** Redux — it offers excellent performance and centralizes the application state, avoiding prop drilling. It may be slightly overkill, but as mentioned, the goal was to prioritize scalability.
- **Form management:** While I considered Redux for its flexibility and Formik for its simplicity, I ultimately went with React Hook Forms, as it was flexible enough and allowed a reasonably straightforward integration with MUI. It is also scalable, as it is a library well known for its performance.
- **Styling:** I chose the MUI library — on one hand, I am familiar with it from previous experience, and on the other, it is well-supported by Google. It has the minor drawback that most of its styles are handled inline, which might initially seem like a bad practice, but that is simply how it is designed to work. It also has a great advantage: it is natively accessible.
- **Navigation:** I chose React Router — easy to implement, scalable, not much more to add here.
- **Persistence:** NodeJS, Express, Grahpql, Postgres

## Opportunities for Improvement

- Improve file imports by using index files.
- Complete error handling and surface errors to the user when necessary — currently they are only logged to the console, so the next step is integrating them into the UI.
- Implement pagination/lazy loading — the idea is to build infinite scroll pagination, where a `loadMore()` function is triggered when the user reaches the bottom of the page.
- Continue developing new features.
