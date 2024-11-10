from fastapi import FastAPI
from app.services.ocr_service import extract_text_from_pdf
from app.services.chatgpt_service import get_chatgpt_response
from fastapi.responses import FileResponse
from app.services.tts_service import text_to_speech

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the NCERT Podcaster API"}

@app.post("/process_pdf/")
async def process_pdf(file_path: str):
    text_content = extract_text_from_pdf(file_path)
    return {"text": text_content}

@app.post("/ask_chatgpt/")
async def ask_chatgpt(question: str):
    response = get_chatgpt_response(question)
    return {"response": response}

class TextRequest(BaseModel):
    text: str

@app.post("/speak/")
async def generate_speech(request: TextRequest):
    output_file = text_to_speech(request.text)
    if output_file:
        return FileResponse(output_file, media_type='audio/mpeg', filename='output.mp3')
    else:
        return {"error": "Failed to generate speech."}
