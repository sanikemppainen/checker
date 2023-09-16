import openai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.environ["API_KEY"]
openai.api_key = api_key


def get_ai_answer(question):
    length = len(question)
    messages = [
        {
            "role": "user",
            "content": f"""As a student's answer generator, Generate answer that a computer science student may give from the question provided to you. Your response should be less than or equal to {length} words. only answer with code snippets' \n""",
        },
    ]

    messages.append({"role": "user", "content": f"{question}"})
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    reply = completion.choices[0].message.content
    return reply
