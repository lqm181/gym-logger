﻿# GymTrack
## Overview:
A mobile app for tracking workout sessions built with **Spring Boot** on the backend and **React Native** for the frontend.

## Motivation:
Spreadsheets or note-taking apps can be a convenient choice for tracking gym sessions, but I find them to have many limitations:
- Lack of a universal naming standard: I often find myself wondering, "How is this exercise called?" or "How is it spelled? Pullup, Pull-up, or Pull up?".
- Unit conversion: I travel back to my home country during the summer where "kg" is the standard metric. Consequently, I have to keep converting the weight to "lbs" in my head to pick the correct weight. The same issue applies when I travel back to school in the US.
- No data analytics: I would like to visualize my performance with graphs, which is not possible with a typical note app and can be tricky with spreadsheets. Available apps on the market usually offer this feature at a premium cost.

That is why this project was started. There is the problem, and I am inspired to set sail on this project to solve it and test the limits of my skills and knowledge.

## Techstack:
Here are the technologies and tools used in this project so far:
 - Backend: Java, Spring Boot, Hibernate, PostgreSQL, and IntelliJ.
 - Frontend: TypeScript, React Native, Redux, Expo Router, Expo Go, and VS Code.
 - Caching: Redis
 - Authorization Mechanism: JWT Token via Spring Security.

## How to run locally:
### Backend:
Please make sure you have installed JAVA 21 first and added it to your path.
1. Start your `PostgreSQL` server on port `5432` and your `Redis` server on port `6379`.
2. Add an `env.properties` file at the root of your backend as follows:
   ```
   DB_DATABASE=<your_postgresql_database_name>
   DB_USERNAME=<your_databse_username>
   DB_PASSWORD=<your_database_password>
   jwt.secret=<your_SHA256_secret_key>
   ```
3. Then, you can start running the project using the IntelliJ IDE.

### Frontend:
1. In the frontend folder, run the following command to install the necessary packages:
   ```
   npm install
   ```
2. Add a `.env.local` file as follows:
   ```
   EXPO_PUBLIC_BACKEND_API=<your_backend_server_root>
   ```
   For example, if you are using `localhost` with port `8080`, you could write:
   ```
   EXPO_PUBLIC_BACKEND_API=http://192.168.1.161:8080
   ```
3. Run the app and test on your desired device:
   ```
   npx expo start
   ```
   You can also use the **Expo Go** app to test the program without needing an emulator.
