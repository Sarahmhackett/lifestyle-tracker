from scoring_matrix import scores   

# Function to get the age band for an age, using the tuples in scores matrix
def get_age_band(age):
    for (low, high), _ in scores.items():
        if low <= age <= high:
            return (low, high)
    return None