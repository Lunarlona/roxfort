import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime

# Hitelesítés
SERVICE_ACCOUNT_FILE = ".secrets/credentials.json"
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
client = gspread.authorize(credentials)

# Táblázat megnyitása
spreadsheet_id = "1x3Xf50VQPCbNu1SVfVRDjh-5pu9pMg5u8bLNtaHXIRI"
spreadsheet = client.open_by_key(spreadsheet_id)
worksheet = spreadsheet.sheet1

# Játékév beállítása
jatekev = datetime.now().year - 20
ma_datum = datetime.now().date().replace(year=jatekev)

# Adatok beolvasása
all_data = worksheet.get_all_values()

# HTML kimenet
birthday_lines = []

for row in all_data[1:]:
    name = row[0]
    birthdate_str = row[1].strip()
    is_active = row[2].strip().lower() == "true"

    if not is_active or not birthdate_str:
        continue

    try:
        birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d").date()
        age_in_game = jatekev - birthdate.year
        birthdate_in_game = birthdate.replace(year=jatekev)
    except ValueError:
        continue

    if birthdate_in_game == ma_datum:
        birthday_lines.append(f"<li>{name} – {age_in_game}. születésnap</li>")

# HTML fájl generálása
html_output = "<ul>\n"
html_output += "\n".join(birthday_lines) if birthday_lines else "<li>Ma nincs születésnapos</li>"
html_output += "\n</ul>"

with open("birthday_widget.html", "w", encoding="utf-8") as f:
    f.write(html_output)
