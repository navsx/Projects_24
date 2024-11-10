from vosk import Model, KaldiRecognizer
import wave
import json
import os

def setup_vosk_model(model_path='../models/vosk-model-small-en-in-0.4'):
    if not os.path.exists(model_path):
        raise Exception(f"Please download the model from \
        'https://alphacephei.com/vosk/models' and unpack as '{model_path}'")
    return Model(model_path)

def transcribe_audio(audio_file_path, model):
    with wave.open(audio_file_path, "rb") as wf:
        if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
            raise ValueError('Audio file must be WAV format mono PCM.')
        
        rec = KaldiRecognizer(model, wf.getframerate())
        transcript = ""

        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                result = rec.Result()
                transcript += json.loads(result)["text"]
        
        final_result = json.loads(rec.FinalResult())
        transcript += final_result["text"]
    return transcript

# Usage example
# model = setup_vosk_model()
# print(transcribe_audio("path_to_audio.wav", model))
