from pypdf import PdfReader
r = PdfReader("CasamentoPleno_OCR.pdf")
with open("CasamentoPleno_OCR.txt","w",encoding="utf-8") as f:
    for i,p in enumerate(r.pages, start=1):
        f.write(f"\n\n===== PAGINA {i} =====\n")
        f.write((p.extract_text() or "").strip())
