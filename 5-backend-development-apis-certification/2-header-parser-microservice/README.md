# Request Header Parser

Request Header Parser is one of the required projects for the [Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/) certification from [FreeCodeCamp](https://www.freecodecamp.org/learn) courses.

### Main Features:

- Give information about the request.
- Gives your `ipaddress`, `language` and `software`.

### Technologies Used:

- Node
- Express

### Usage

Just go to endpoint `[url project]/api/whoami`

#### Example

`https://boilerplate-project-headerparser.sayagoo823.repl.co/api/whoami`

will return data about you browser:

```json
{
  "ipaddress": "::ffff:159.20.14.100",
  "language": "en-US,en;q=0.5",
  "software": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
}
```
