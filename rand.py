import random
import string

def generate_random_id():
    """
    Generates a 10-character ID using capital letters and digits.
    The character pool is defined simply using the 'string' module.
    
    Returns:
        str: A 10-character string (e.g., "5X93M0R7A1").
    """
    # Define the pool of characters as a single string (simpler than a list)
    ID_CHARACTERS = string.ascii_uppercase + string.digits
    
    # Generate the 10-character string in one concise line
    random_id = "".join(random.choice(ID_CHARACTERS) for _ in range(10))
    
    return random_id

# Example of how to call the function:
new_id = generate_random_id()
