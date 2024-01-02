# Request Header Parser

Request Header Parser is one of the required projects for the [Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/) certification from [FreeCodeCamp](https://www.freecodecamp.org/learn) courses.

### Technologies Used:

- Node
- Express

### Usage

Paste a url in the `URL` input and click the `POST URL` button.

And you will get a response in JSON format with the `short_url` and `original_url` properties.

Then just enter the `[url project]/api/shorturl/:short_url` endpoint.

#### Example

`https://www.freecodecamp.org/learn  POST URL`

will return :

```json
{
  "original_url": "https://www.freecodecamp.org/learn",
  "short_url": 1
}
```

then just go to the address :
`https://boilerplate-project-urlshortener.sayagoo823.repl.co/api/shorturl/2` and it will take you to the official free code camp website.
