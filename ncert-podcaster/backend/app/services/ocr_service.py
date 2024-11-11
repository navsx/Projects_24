from pdf2image import convert_from_path
import pytesseract
import os

def extract_text_from_pdf(pdf_path):
    try:
        pages = convert_from_path(pdf_path, 500)
        text_content = ""
        for page in pages:
            text = pytesseract.image_to_string(page)
            text_content += text
        return text_content
    except Exception as e:
        print(f"Error processing file {pdf_path}: {e}")
        return ""

# Example of usage:
#if __name__ == "__main__":
#    text = extract_text_from_pdf('D:\Data\2024\Projects_24\ncert-podcaster\data\raw_textbooks\Flamingo.pdf')
#    print(text)

