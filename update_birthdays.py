import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
import json
import os

# GitHub Secretből írt JSON fájl (ha nem létezik, létrehozzuk)
if "GOOGLE_CREDENTIALS" in os.environ:
    creds_path = "/tmp/credentials.json"
    with open(creds_path, "w") as f:
        f.write(os.environ["GOOGLE_CREDENTIALS"])
else:
    creds_path = ".secrets/credentials.json"

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(creds_path, scopes=SCOPES)
client = gspread.authorize(credentials)

spreadsheet_id = "1x3Xf50VQPCbNu1SVfVRDjh-5pu9pMg5u8bLNtaHXIRI"
worksheet = client.open_by_key(spreadsheet_id).sheet1

jatekev = datetime.now().year - 20
ma_datum = datetime.now().date().replace(year=jatekev)

rows = worksheet.get_all_values()
birthday_lines = []

for row in rows[1:]:
    name = row[0]
    birthdate_str = row[1].strip()
    is_active = row[2].strip().lower() == "true"

    if not is_active or not birthdate_str:
        continue

    try:
        birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d").date()
        age = jatekev - birthdate.year
        birthday_date = birthdate.replace(year=jatekev)
    except ValueError:
        continue

    if birthday_date == ma_datum:
        birthday_lines.append(f"<li>{name} – {age}. születésnap</li>")

html_output = "<ul>\n"
html_output += "\n".join(birthday_lines) if birthday_lines else "<li>Ma nincs születésnapos</li>"
html_output += "\n</ul>"

with open("birthday_widget.html", "w", encoding="utf-8") as f:
    f.write(html_output)
