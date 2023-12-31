# Exercise Tracker

Exercise Tracker is one of the required projects for the [Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/) certification from [FreeCodeCamp](https://www.freecodecamp.org/learn) courses. It allows you to create and track your exercises.

### Main Features:

- Create and save a user in a database.
- Record information about exercises, including a **description**, **duration** and optionally a **date**.
- Request the exercise history of a user

### Technologies Used:

- Node
- Express
- MongoDB
- Mongoose

## Getting Started

**Before you proceed**, certain requirements must be met:

```
Knowledge of MongoDB database.
Have the following technologies installed :
- Git
- Node
- pnpm
```

### Installation

```
git clone https://github.com/Puchinn/exercise-tracker--freecodecamp.git
cd exercise-tracker--freecodecamp
pnpm install

```

##### Environment Variables

Once the installation of dependencies is complete, you need to have a `.env` file in the project directory with the following variables:

- `MONGODB_URL` with the value of your **MongoDB** cluster
- `DB_NAME ` name of your database

after completing the above steps, you can run the `pnpm dev` command.

### Usage

After running the above command, if everything went well, you should see the following output in the terminal

```
connection to database sucesfull!
Server is running at port: 3000 (by default is 3000)
```

Now,just go to `http://localhost:3000/`, and you should see the following:
![image](https://github.com/Puchinn/exercise-tracker--freecodecamp/assets/102445616/91206de8-6097-4eec-8177-d982eb7cb59a)

- To create a user,just submit the **Create a New User** form with your username.

you will get the following response:

```json
{
  "username": "your username",
  "_id": "your id"
}
```

- To add an exercise, submit the **Add exercise** form with the fields `:_id`, `description`, `duration` and optionally `date`.

you will get the following response:

```json
{
  "_id": "your id",
  "username": "your username",
  "date": "Thu Dec 28 2023",
  "duration": 10,
  "description": "your description"
}
```

- Finally, you can request a log of your exercies by making a `GET` request to `http://localhost:3000/api/users/:yourID/logs`

```json
{
  "_id": "your id",
  "username": "your name",
  "count": 1,
  "log": [
    {
      "description": "your description",
      "duration": 10,
      "date": "Thu Dec 28 2023"
    }
  ]
}
```

😎 And that's it! I hope this helps you get the project up and running.
