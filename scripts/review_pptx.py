from pptx import Presentation
from pptx.util import Emu
import sys

path = sys.argv[1]
prs = Presentation(path)
print("slides:", len(prs.slides))
print("size:", round(prs.slide_width/914400, 2), "x", round(prs.slide_height/914400, 2), "in",
      f"({round(prs.slide_width/914400*2.54,1)} x {round(prs.slide_height/914400*2.54,1)} cm)")
print("aspect:", round(prs.slide_width/prs.slide_height, 3))
print()
for i, s in enumerate(prs.slides, 1):
    kinds = {}
    texts = []
    for sh in s.shapes:
        kinds[sh.shape_type] = kinds.get(sh.shape_type, 0) + 1
        if sh.has_text_frame:
            t = " / ".join(p.text.strip() for p in sh.text_frame.paragraphs if p.text.strip())
            if t:
                texts.append(t)
    pics = sum(1 for sh in s.shapes if sh.shape_type == 13)
    print(f"--- slide {i}: shapes={len(s.shapes)} pictures={pics} layout={s.slide_layout.name}")
    for t in texts[:8]:
        print("    ", t[:160])
    if s.has_notes_slide and s.notes_slide.notes_text_frame.text.strip():
        print("    [notes]", s.notes_slide.notes_text_frame.text.strip()[:120].replace("\n"," "))
