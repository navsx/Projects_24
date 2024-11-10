from gtts import gTTS
import os

def text_to_speech(text, language='en', output_file='output.mp3'):
    try:
        tts = gTTS(text=text, lang=language)
        tts.save(output_file)
        # Optionally, play the audio
        os.system(f"start {output_file}")  # Use 'open' for macOS or 'xdg-open' for Linux
        return output_file
    except Exception as e:
        print(f"Error in text-to-speech conversion: {e}")
        return None

# Usage example
# text_to_speech("Hello, this is a test message.")
