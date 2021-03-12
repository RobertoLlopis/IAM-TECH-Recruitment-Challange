# Translation list API Consumption

Recruitment´s challange solution for [IAM Technologies](https://www.iamtech.tech/).

You can find the deployed App in vercel:

**APP -> https://iam-tech-recruitment-challange.vercel.app/**

Task was to create a Next.js app to consume a Graphql API from AWS Amplify. With translated texts comming from the API application handles state and show texts convinienty.

State is managed from a isomorphic Redux store provided by next-redux-wrapper HOC.

## Summary

- [Getting Started](#getting-started)
- [How it works](#how-it-works)
- [API](#api)
- [Default language](#default-language)
- [Styles](#styles)
- [Packages used](#packages-used)
- [Authors](#authors)

## Getting Started

You will need to have `Yarn` and `Node.js` installed in your system in order to fetch and install packages required.

### Installing

Clone the repo locally

    git clone https://github.com/RobertoLlopis/IAM-TECH-Recruitment-Challange

And

    yarn install

then feel free to run

    yarn dev

And open `http://localhost:3000/` to start interacting with the app.

# How it works

---- In the server

When users request for a page, in server side is computed the page with a Redux store.

App in server will look to the cache (provided by memory-cache package) and if it is no instance of texts it will fetch translation´s API.

With this server side state storaged next renders the client.

---- In the client

Next-redux-wrapper hydrates the replicated Redux store in the client. This store will be accessible by components and pages in normal react-redux flow.

After components have mounted pages check for the [best default language](#default-language) and render the texts.

Redux actions are connected to the footer with an onChange call to update language in the global state.

## API

API is an AWS Amplify api-sync instance. Which is connected to .env.example´s API_URL and other configuration keys.

API gives you an array of objects with this structure:

    [
    {
    tag: 'textTag',
    valueLang: {
        es: 'valueInSpanish',
        en: 'valueInEnglish'
        }
    },
    ]

This array will serve the list of tags you define in AWS Amplify API.

This data is pulled out by this Query:

    {
        listTranslations {
          tag
          valueLang {
                        en
                        es
          }
        }
    }

You can dynamically change it to retrieve less or more info. Graphql magic.

## Default language

In order to select default language it follows next hierarchy:

1. Check if user has a selection stored in localStorage
2. Check default´s browser language
3. English

## Styles

Styles are supported by styled-component package and added in each component´s definition.

## Packages used

Besides default `create-next-app` ones.

- `aws-amplify`
- `memory-cache`
- `next-redux-wrapper`
- `react-redux`
- `redux`
- `redux-devtools-extension`
- `redux-thunk`
- `sass`
- `styled-components`

Dev:

- `babel-plugin-styled-components`
- `redux-logger`

# Author

- **Roberto Llopis** -> [LinkedIn](https://www.linkedin.com/in/robertollopis/)
