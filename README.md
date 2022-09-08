# CSV to JSON converter

## Using this application

### Requirements

Node 16.x

### Preparing & running the application

 - Add your input CSV to the `input` folder, and ensure it is named `input.csv` and is comma-seperated
 - Ensure the config is correct in `/input/config.json`
    - For every column you want to output as a JSON property, there must be a mapping configured
    - `source` is the (case-sensitive) CSV column name
    - `target` is the output JSON property name
    - See below for a config example
 - Run with `npm run start` (or `node index.js`)

### Config example

#### Source CSV columns

First name,Last name,Company,Address line 1,Address line 2,City,Country,Postcode

#### Target JSON schema

```[json]
[
  {
    "firstName": "A",
    "surname": "B",
    "postcode": "AB1 2CD"
  },
  ...
]
```

#### config.json

```[json]
[
  {
    "source": "First name",
    "target": "firstName"
  },
  {
    "source": "Last name",
    "target": "surname"
  },
  {
    "source": "Postcode",
    "target": "postcode"
  },
]
```
