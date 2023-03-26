# randl

Read and Learn a foreign language in a breeze.

A little experiment on language learning using a a few AI endpoints and trying to export bitmark content. Developed during ~24h~ 23h at the [Bitmark Hackation 2023](https://bitmark-association.org/hackathon) in Bern, Switzerland.

## Getting Started

Add an .env file with the following keys:
```
# AWS Credentials
AWS_ACCESS_KEY_ID=…
AWS_SECRET_ACCESS_KEY=…
AWS_DEFAULT_REGION=eu-central-1

# OpenAI API Config
OPENAI_ORG=…
OPENAI_API_KEY=…
```

Then you can install and start the frontend and backend with the following commands
```
pip install -r api/requirements.txt
yarn install
```

And then run both components
```
yarn server
yarn dev
```

## Add new content
There's a script for scraping news sites and doing machine translation, summarization and questionnaire generation. It either accept an RSS-URL or a single article. If you want to scrape content for multiple keywords and sources, a script in `api/scrape_list.py` will get you started.

```
yarn scrape [lang-code] [topic] [url] # will scrape and run all generation tasks
```

