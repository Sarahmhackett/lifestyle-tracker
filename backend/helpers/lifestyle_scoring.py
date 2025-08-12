from helpers.age_banding import get_age_band
from scoring_matrix import scores

def calculate_lifestyle_score(age, drink, smoke, exercise):
    band = get_age_band(age)
    if not band:
        return 0  

    scoring = scores[band]

    score = 0

    score += scoring["q1"]["yes"] if drink else scoring["q1"]["no"]

    score += scoring["q2"]["yes"] if smoke else scoring["q2"]["no"]

    score += scoring["q3"]["no"] if not exercise else scoring["q3"]["yes"]

    return score