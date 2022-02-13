# Food Ordering App with MERN stack 
## Design and analysis of software systems
***
- How to run the code?
- cd to the directory where docker-compose file is located,then run:
- >docker-compose up
- To stop the containers :
- >docker-compose down

- Docker containers
    - Seperate containers are made for backend and frontend
    - nginx is used to route/proxy the server i.e, route between the frontend and backend
    - volumes are mounted in backend and frontend containers for accesing and files like images.
    - A docker compose file is made to compose and combine all the containers
- PORTS used:
    - nginx 80
    - docker-compose 8000
    - frontend (by default) 3000
    - backend 4000

-  Modules used:
    - bcryptjs
    - body-parser
    - cors
    - express
    - mongoose
    - multer
    - supervisor

***
2021121005
P Shiridi kumar
