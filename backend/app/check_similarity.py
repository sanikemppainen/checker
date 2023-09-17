import spacy
import os
import spacy.cli

spacy.cli.download("en_core_web_lg")


def get_similarity(answer, aianswer):
    nlp = spacy.load("en_core_web_lg")

    given_answer = nlp(answer)
    ai_generated_answer = nlp(aianswer)

    similarity = given_answer.similarity(ai_generated_answer)
    return similarity
