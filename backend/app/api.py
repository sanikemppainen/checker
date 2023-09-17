from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.openAIAPIcalls import get_ai_answer
from app.check_similarity import get_similarity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
question_and_answers = []


@app.get("/data")
async def get_data() -> dict:
    return {"data": question_and_answers}


@app.post("/data")
async def add_data(question_and_answer: dict) -> dict:
    aianswer = get_ai_answer(question_and_answer["question"])
    similarity = get_similarity(question_and_answer["answer"], aianswer)
    returnable_dict = {
        "question": question_and_answer["question"],
        "answer": question_and_answer["answer"],
        "aianswer": aianswer,
        "similarity": similarity,
        "id": len(question_and_answers) + 1,
    }
    question_and_answers.append(returnable_dict)
    return {"data": {"data added."}}


@app.delete("/data/{id}", tags=["data"])
async def delete_data(id: int) -> dict:
    for data in question_and_answers:
        if int(data["id"]) == id:
            question_and_answers.remove(data)
            return {"data": f"data with id {id} has been removed."}

    return {"data": f"data with id {id} not found."}
