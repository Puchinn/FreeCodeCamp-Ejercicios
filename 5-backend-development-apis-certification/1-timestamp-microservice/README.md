# Timestamp Microservice

Timestamp Microservice is one of the required projects for the [Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/) certification from [FreeCodeCamp](https://www.freecodecamp.org/learn) courses.

### Main Features:

- Pass data through **URL parameters**.
- Give you the **Unix Time Stamp**.
- And gives you the **UTC** time.

**Info:**
The **unix time stamp** is a way to track time as a running total of seconds. This count starts at the Unix Epoch on January 1st, 1970 at UTC. Therefore, the unix time stamp is merely the number of seconds between a particular date and the Unix Epoch.

### Technologies Used:

- Node
- Express

### Usage

All you have to do is pass a valid data to the following endpoint:

`[project url]/api/:data`.

The **data** can be a date in `YYY-MM-DD` format or a `number` representing seconds.

#### Example

Passing the following date `2024-01-01` to  
`https://boilerplate-project-timestamp.sayagoo823.repl.co/api/`

like

`https://boilerplate-project-timestamp.sayagoo823.repl.co/api/2024-01-01`

will return the following response:

```json
{
  "unix": 1704067200000,
  "utc": "Mon, 01 Jan 2024 00:00:00 GMT"
}
```
