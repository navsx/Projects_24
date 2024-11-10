import openai

openai.api_key = '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'

def get_chatgpt_response(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"ChatGPT API error: {e}")
        return "Error fetching response."
