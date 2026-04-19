#!/usr/bin/env python3
import os
import sys
import fitz
import pytesseract
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

PDF_PATH = os.path.join(PROJECT_ROOT, "textbooks/课程标准2022/义务教育数学课程标准2022.pdf")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "textbooks/课程标准2022")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "result_ocr.md")

os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"正在处理 PDF: {PDF_PATH}")
print(f"输出目录: {OUTPUT_DIR}")

doc = fitz.open(PDF_PATH)
total_pages = len(doc)
print(f"共 {total_pages} 页")

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write("# 义务教育数学课程标准 2022\n\n")
    f.write("> 使用 Tesseract OCR 自动识别\n\n")
    
    for page_num in range(total_pages):
        page = doc[page_num]
        print(f"正在处理第 {page_num + 1}/{total_pages} 页...", end='\r')
        
        mat = fitz.Matrix(2, 2)
        pix = page.get_pixmap(matrix=mat)
        
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        
        text = pytesseract.image_to_string(img, lang='chi_sim')
        
        f.write(f"\n\n---\n\n## 第 {page_num + 1} 页\n\n")
        f.write(text.strip())
        f.write("\n")

doc.close()
print(f"\n处理完成！输出文件: {OUTPUT_FILE}")
print(f"文件大小: {os.path.getsize(OUTPUT_FILE) / 1024:.1f} KB")
