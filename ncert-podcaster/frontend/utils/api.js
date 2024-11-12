export async function transcribeAudio(audioFile) {
    const formData = new FormData();
    formData.append('file', audioFile);
  
    const response = await fetch('http://localhost:8000/transcribe/', {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    return data.transcript;
  }
  
  export async function generateSpeech(text) {
    const response = await fetch(`http://localhost:8000/speak/?text=${encodeURIComponent(text)}`, {
      method: 'POST',
    });
  
    const audioUrl = await response.json();
    return audioUrl.audio_url;
  }
  