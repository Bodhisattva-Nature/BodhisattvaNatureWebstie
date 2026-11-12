#!/usr/bin/env python3
"""Build the 8-slide venue proposal deck on the Foundation's own template."""
import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
MEDIA = os.path.join(HERE, "pptx", "ppt", "media")
OUT = os.path.join(HERE, "..", "deliverables")
os.makedirs(OUT, exist_ok=True)

GREEN = RGBColor(0x77, 0x87, 0x49)
INK = RGBColor(0x3F, 0x3B, 0x2E)
INK_SOFT = RGBColor(0x5A, 0x55, 0x44)
RULE = RGBColor(0xC9, 0xCF, 0xB4)
CREAM = RGBColor(0xF7, 0xF7, 0xF5)

HEAD_FONT = "Georgia"
BODY_FONT = "Arial"

W, H = 10.0, 5.625


def bg(prs, slide, image="image18.jpg"):
    slide.shapes.add_picture(os.path.join(MEDIA, image), 0, 0, Inches(W), Inches(H))


def tb(slide, x, y, w, h, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    tf.auto_size = None
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.paragraphs[0].alignment = align
    return tf


def write(tf, text, size=12.5, color=INK, font=BODY_FONT, bold=False, italic=False,
          space_before=0, space_after=0, line=1.18, first=True, align=None, caps=False):
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    if align is not None:
        p.alignment = align
    p.space_before = Pt(space_before)
    p.space_after = Pt(space_after)
    p.line_spacing = line
    r = p.add_run()
    r.text = text.upper() if caps else text
    f = r.font
    f.name = font
    f.size = Pt(size)
    f.bold = bold
    f.italic = italic
    f.color.rgb = color
    return p


def rule(slide, x, y, w, color=RULE, weight=0.9):
    ln = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x + w), Inches(y))
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    return ln


def photo(slide, name, x, y, w, h, border=GREEN):
    """Place a photo cropped to fill the box exactly, with a hairline border."""
    src = os.path.join(MEDIA, name)
    im = Image.open(src).convert("RGB")
    iw, ih = im.size
    target = w / h
    have = iw / ih
    if have > target:                      # too wide: crop sides
        nw = int(ih * target)
        left = (iw - nw) // 2
        im = im.crop((left, 0, left + nw, ih))
    elif have < target:                    # too tall: crop top/bottom
        nh = int(iw / target)
        top = (ih - nh) // 2
        im = im.crop((0, top, iw, top + nh))
    im = im.resize((int(w * 200), int(h * 200)), Image.LANCZOS)
    tmp = os.path.join(HERE, f"_crop_{os.path.splitext(name)[0]}_{int(w*100)}x{int(h*100)}.jpg")
    im.save(tmp, "JPEG", quality=86, optimize=True)
    pic = slide.shapes.add_picture(tmp, Inches(x), Inches(y), Inches(w), Inches(h))
    pic.line.color.rgb = border
    pic.line.width = Pt(0.75)
    return pic


def notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text


def head(prs, eyebrow, title, sub=None):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    bg(prs, s)
    tf = tb(s, 0.78, 0.55, 8.5, 0.3)
    write(tf, eyebrow, size=9.5, color=GREEN, caps=True, bold=True)
    tf2 = tb(s, 0.78, 0.86, 7.6, 1.2)
    write(tf2, title, size=26, color=GREEN, font=HEAD_FONT, line=1.06)
    if sub:
        tf3 = tb(s, 0.78, 1.78, 7.6, 0.6)
        write(tf3, sub, size=12.5, color=INK_SOFT, line=1.25)
    return s


prs = Presentation()
prs.slide_width = Inches(W)
prs.slide_height = Inches(H)

# ----------------------------------------------------------------- S1
s = prs.slides.add_slide(prs.slide_layouts[6])
bg(prs, s)
tf = tb(s, 0.78, 0.95, 3.3, 0.3)
write(tf, "A proposal", size=9.5, color=GREEN, caps=True, bold=True)

tf = tb(s, 0.78, 1.30, 4.0, 2.0)
write(tf, "Tai Chi &\nMeditation for\n[Venue]'s\nCommunity", size=31, color=GREEN, font=HEAD_FONT, line=1.04)

rule(s, 0.78, 3.72, 1.1, GREEN, 1.2)
tf = tb(s, 0.78, 3.92, 3.5, 1.0)
write(tf, "A free, one-hour introductory session of gentle movement and guided "
         "meditation, designed for your members.", size=11.5, color=INK_SOFT, line=1.3)

tf = tb(s, 0.78, 5.02, 4.0, 0.3)
write(tf, "Bodhisattva Nature Foundation  ·  [Month] 2027", size=9, color=GREEN)

photo(s, "image6.jpg", 5.30, 0.62, 3.95, 4.28)
notes(s, "Open with the ask in one line: we would like to run a free one-hour Tai Chi and "
         "meditation session here, and see whether it works for your members. Keep this "
         "slide up while you introduce yourself. Swap [Venue] and [Month] before sending.")

# ----------------------------------------------------------------- S2
s = head(prs, "Community benefits", "A welcoming program for your community",
         "Designed for people who would not normally join a fitness class.")
rule(s, 0.78, 2.42, 8.4)

cols = [
    ("Who it is for",
     "Older adults, absolute beginners, and anyone who wants gentle movement without a gym. "
     "Seated options at every stage, so nobody has to get down on a mat."),
    ("What they gain",
     "Better balance and mobility, a simple practice for stress, and an hour that is quiet, "
     "social and unhurried. No competition and no performance."),
    ("Why it suits your program",
     "Drop-in friendly: no equipment, no experience, no registration friction. A meeting room "
     "or reading room is enough. We bring everything else."),
]
for i, (h, body) in enumerate(cols):
    x = 0.78 + i * 2.88
    t = tb(s, x, 2.62, 2.55, 2.2)
    write(t, h, size=13, color=GREEN, font=HEAD_FONT, space_after=6)
    write(t, body, size=10.5, color=INK_SOFT, line=1.3, first=False)
rule(s, 0.78, 4.42, 8.4)
tf = tb(s, 0.78, 4.58, 8.4, 0.5)
write(tf, "Nobody has to commit to a term, and nobody has to stand — a chair is always "
          "an option.", size=10,
      color=INK_SOFT, italic=True)

notes(s, "Answer the venue's real question: who is going to show up, and will they be a "
         "problem? Emphasise beginners and seated options. If they run adult programming, "
         "say this sits alongside it rather than competing with it.")

# ----------------------------------------------------------------- S3
s = head(prs, "The foundation", "Meet Bodhisattva Nature Foundation")
rule(s, 0.78, 1.92, 8.4)

tf = tb(s, 0.78, 2.10, 4.55, 1.3)
write(tf, "We share the Buddha's teaching on wisdom and compassion through free classes, "
          "retreats and community service in New York. Everything we offer is free of charge.",
      size=12, color=INK, line=1.32)

tf = tb(s, 0.78, 3.62, 4.55, 0.9)
write(tf, "Founded by Venerable Zhenjue. The teaching draws on Tibetan and Chinese Buddhist "
          "practice, and reaches communities in Canada, the United States, Australia, Japan, "
          "Singapore, Thailand and Malaysia.", size=10, color=INK_SOFT, line=1.3)

tf = tb(s, 5.72, 2.10, 3.55, 0.3)
write(tf, "Who you will meet", size=9.5, color=GREEN, caps=True, bold=True)

people = [
    ("[Lead instructor]", "Tai Chi and meditation teacher, [x] years practising. Has taught at "
                          "[venue names]."),
    ("[Assistant instructor]", "Supports the room, checks in with anyone who needs a hand."),
    ("[Programme coordinator]", "Your single point of contact for scheduling and logistics."),
]
y = 2.44
for name, desc in people:
    t = tb(s, 5.72, y, 3.55, 0.85)
    write(t, name, size=11, color=GREEN, font=HEAD_FONT, space_after=3)
    write(t, desc, size=9.5, color=INK_SOFT, line=1.25, first=False)
    y += 0.95
notes(s, "Two sentences on the mission, then people. A venue says yes to a person, not to an "
         "organisation. Name the coordinator here and make clear that person answers email. "
         "Fill in the instructor names and backgrounds before sending.")

# ----------------------------------------------------------------- S4
s = head(prs, "Session format", "What a 60-minute session looks like")
rule(s, 0.78, 1.72, 8.4)

steps = [
    ("0–5", "Welcome", "Arrival, chairs or mats, a short orientation for anyone new."),
    ("5–35", "Tai Chi & mindful movement", "Standing and seated forms, taught slowly, with "
                                             "modifications throughout."),
    ("35–50", "Guided meditation", "Sitting or lying down. A short talk, then a guided practice."),
    ("50–60", "Questions & close", "Open questions, a takeaway practice, and time to talk."),
]
x = 0.78
width = 2.05
for i, (t, name, desc) in enumerate(steps):
    xt = x + i * (width + 0.07)
    tf = tb(s, xt, 1.95, width, 0.3)
    write(tf, t + " min", size=10, color=GREEN, bold=True)
    tf = tb(s, xt, 2.24, width, 0.5)
    write(tf, name, size=12.5, color=GREEN, font=HEAD_FONT, line=1.1)
    tf = tb(s, xt, 2.86, width, 1.1)
    write(tf, desc, size=9.5, color=INK_SOFT, line=1.25)

# timeline rule with markers
rule(s, 0.78, 4.12, 8.4, RULE, 1.0)
for i in range(4):
    cx = x + i * (width + 0.07) + 0.08
    dot = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(cx - 0.05), Inches(4.06), Inches(0.12), Inches(0.12))
    dot.fill.solid(); dot.fill.fore_color.rgb = GREEN
    dot.line.fill.background()
    dot.shadow.inherit = False

tf = tb(s, 0.78, 4.42, 8.4, 0.6)
write(tf, "Seated option at every stage. No mat, no special clothing, no experience required — "
          "participants can take the whole hour in a chair.", size=10.5, color=INK_SOFT, line=1.3)
notes(s, "This is the slide that decides it. A venue needs to picture the hour. Walk through "
         "the four blocks slowly, then say the seated line out loud: it removes the biggest "
         "worry a library has about an exercise class.")

# ----------------------------------------------------------------- S5
s = head(prs, "Previous programs", "Our experience\nin New York City")
rule(s, 0.78, 2.02, 5.05)

items = [
    ("Stavros Niarchos Foundation Library",
     "A month-long Mindful Tai Chi program in the SNFL, delivered with New York Public Library. "
     "[Date] · [Attendance] participants."),
    ("Washington Square Park",
     "Free daily mindful practice, 3:00–8:00 PM, open to all backgrounds. Roughly 500 people "
     "reached this year."),
    ("Community partners",
     "CPC Nan Shan Older Adult Center, St. Peter's Church, Lenox Hill Neighborhood House, and "
     "the YMCA of Greater New York."),
]
y = 2.20
for name, desc in items:
    t = tb(s, 0.78, y, 4.9, 1.0)
    write(t, name, size=11.5, color=GREEN, font=HEAD_FONT, space_after=3)
    write(t, desc, size=9.5, color=INK_SOFT, line=1.25, first=False)
    y += 1.02
photo(s, "image10.jpg", 6.16, 0.98, 3.09, 3.86)
notes(s, "The SNFL program is the whole argument: a library, a month, a room, and people came. "
         "Have the date and a confirmed attendance number ready before you present — 'about a "
         "month' invites doubt. The photo is from an indoor session.")

# ----------------------------------------------------------------- S6
s = head(prs, "Hosting", "What it takes to host a session")
rule(s, 0.78, 1.72, 8.4)

tf = tb(s, 0.78, 1.92, 3.95, 0.3)
write(tf, "We provide", size=10, color=GREEN, caps=True, bold=True)
ours = [
    "Instructor and assistant for every session",
    "Full session plan and teaching materials",
    "Promotion copy, photos and flyer design",
    "Registration and reminder emails, if you prefer",
    "A short debrief after the pilot",
]
y = 2.24
for item in ours:
    t = tb(s, 0.92, y, 3.8, 0.3)
    write(t, "·  " + item, size=10.5, color=INK_SOFT, line=1.2)
    y += 0.42

tf = tb(s, 5.15, 1.92, 4.1, 0.3)
write(tf, "We ask the venue for", size=10, color=GREEN, caps=True, bold=True)
theirs = [
    "A room for 20–30 people, 90 minutes booked (60 + set-up)",
    "Chairs, and floor space if a mat option is possible",
    "Step-free access, or a note if the room has stairs",
    "A staff contact for the day",
    "A way to share the session with your members",
]
y = 2.24
for item in theirs:
    t = tb(s, 5.29, y, 3.95, 0.3)
    write(t, "·  " + item, size=10.5, color=INK_SOFT, line=1.2)
    y += 0.42

rule(s, 0.78, 4.62, 8.4)
tf = tb(s, 0.78, 4.78, 8.4, 0.45)
write(tf, "Registration and promotion can sit with either side — we will follow however your "
          "programs usually run.", size=10, color=INK_SOFT, italic=True)
notes(s, "Be explicit: venues fear hidden work. The room and a way to reach members are the "
         "only real asks. Everything else is ours. If they push on cost, the answer is that "
         "the session is free to participants.")

# ----------------------------------------------------------------- S7
s = head(prs, "The pilot", "A pilot designed for [Venue]")
rule(s, 0.78, 1.72, 8.4)

facts = [
    ("Duration", "4 weekly sessions\n[Month – Month 2027]"),
    ("Audience", "Adults, beginners welcome\nSeated option available"),
    ("Group size", "20–30 participants\nWe can cap it lower"),
    ("Cost", "Free to participants\nNo fee to the venue"),
]
for i, (label, value) in enumerate(facts):
    x = 0.78 + (i % 2) * 4.3
    y = 1.95 + (i // 2) * 1.05
    t = tb(s, x, y, 4.0, 0.9)
    write(t, label, size=9, color=GREEN, caps=True, bold=True, space_after=2)
    write(t, value, size=12, color=INK, line=1.25, first=False)

tf = tb(s, 0.78, 4.02, 8.4, 0.3)
write(tf, "Two scheduling options", size=9, color=GREEN, caps=True, bold=True)

for i, (tag, when) in enumerate([("Option A", "[Weekday], [date], 6:00–7:00 pm"),
                                 ("Option B", "[Weekday], [date], 10:00–11:00 am")]):
    x = 0.78 + i * 4.3
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(4.28), Inches(3.95), Inches(0.62))
    box.fill.solid(); box.fill.fore_color.rgb = CREAM
    box.line.color.rgb = RULE; box.line.width = Pt(0.75)
    box.shadow.inherit = False
    box.shadow.inherit = False
    t = tb(s, x + 0.16, 4.40, 3.7, 0.4)
    write(t, tag, size=8.5, color=GREEN, caps=True, bold=True, space_after=1)
    write(t, when, size=11, color=INK, first=False)

tf = tb(s, 0.78, 5.06, 8.4, 0.3)
write(tf, "Four sessions is long enough to see whether it works for your members.",
      size=10, color=INK_SOFT, italic=True)
notes(s, "Make the ask small and reversible: four weeks, two dates to choose from. Confirm "
         "whether the session is free to participants before this goes out — the slide says "
         "free, so the terms must be settled.")

# ----------------------------------------------------------------- S8
s = prs.slides.add_slide(prs.slide_layouts[6])
bg(prs, s)
tf = tb(s, 0.78, 0.92, 8.0, 0.3)
write(tf, "The invitation", size=9.5, color=GREEN, caps=True, bold=True)

tf = tb(s, 0.78, 1.26, 8.2, 1.1)
write(tf, "Let’s schedule an introductory session", size=30, color=GREEN, font=HEAD_FONT, line=1.05)

rule(s, 0.78, 2.46, 1.1, GREEN, 1.2)

tf = tb(s, 0.78, 2.66, 4.55, 1.1)
write(tf, "A 20-minute conversation to confirm room availability, a date, and your approval "
          "process. We can hold the first session within [three weeks] of your answer.",
      size=12, color=INK, line=1.32)

tf = tb(s, 0.78, 3.96, 4.4, 1.2)
write(tf, "peace@bodhinature.com", size=13, color=GREEN, font=HEAD_FONT, space_after=4)
write(tf, "+1 587 890 8888  ·  bodhinature.com", size=10.5, color=INK_SOFT, first=False)
write(tf, "Local liaison: Josina Rodrigues, volunteer", size=10, color=INK_SOFT,
      italic=True, first=False, space_before=8)

photo(s, "image7.jpg", 6.10, 3.06, 3.15, 2.02)
notes(s, "End on the conversation, not on the deck. Propose a specific week for the call. "
         "Leave this slide up while people ask questions.")

prs.save(os.path.join(OUT, "Bodhisattva Venue Proposal.pptx"))
print("saved", os.path.join(OUT, "Bodhisattva Venue Proposal.pptx"))
