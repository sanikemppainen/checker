# checker

User inputs a question and an answer and the app shows a similarity of that answer to an AI generated answer for the same question.

Frontend is built on react and managed by yarn, backend runs on FastAPI, python and uses openAI's API with gpt-3.5-turbo as model to ask the question and then compares the given answer by the user to the openAI's answer using spaCy.
