from datetime import datetime

def calculate_age(born_str):
    born = datetime.strptime(born_str, "%d-%m-%Y")
    today = datetime.today()
    age = today.year - born.year - ((today.month, today.day) < (born.month, born.day))
    return age