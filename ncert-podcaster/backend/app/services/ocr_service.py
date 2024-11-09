from pdf2image import convert_from_path
import pytesseract

def extract_text_from_pdf(pdf_path):
    pages = convert_from_path(pdf_path, dpi=300)
    text = ""
    for page in pages:
        text += pytesseract.image_to_string(page)
    return text

# Example of usage:
if __name__ == "__main__":
    text = extract_text_from_pdf('path_to_your_pdf.pdf')
    print(text)
