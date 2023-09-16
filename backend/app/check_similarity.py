import spacy


def get_similarity(answer, aianswer):
    nlp = spacy.load("fi_core_news_lg")
    given_answer = nlp(answer)
    ai_generated_answer = nlp(aianswer)

    similarity = given_answer.similarity(ai_generated_answer)
    return similarity
