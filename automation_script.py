import pyautogui
import time
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
     

# print("Move your mouse to the desired position. Results will print in 3 seconds.")
# time.sleep(3) # Gives you time to switch to the target window

# Run this multiple times for each position you need
def pos():
  while True:
      x, y = pyautogui.position()
      print(f"X: {x}, Y: {y}")
      time.sleep(2)

# Provisioning
# X: 111, Y: 359
# X: 100, Y: 432

# # Name
def name():
  pyautogui.click(659, 678)
  pyautogui.write("Amtel", interval=0.1)
  pyautogui.click(900, 678)
  pyautogui.write("Amtel", interval=0.1)
  pyautogui.click(1405, 678)
  pyautogui.write("Amtel", interval=0.1)

# # Gender
def gender():
  pyautogui.click(493, 871, interval=0.1)
  pyautogui.click(493, 949, interval=0.1)


def scroll():
  pyautogui.click(493, 871, interval=0.1)
  pyautogui.scroll(-500)

def add_identity():
  # add identiy buttom
  pyautogui.click(1741, 615, interval=0.1)

  # text
  pyautogui.click(828, 342, interval=1)
  pyautogui.write(new_id, interval=0.05)
  

  # indestery
  pyautogui.click(1316, 342, interval=0.1)
  pyautogui.click(1444, 342, interval=0.1)
  

# Address
def address():
  pyautogui.click(828, 342, interval=1)
  pyautogui.write("Qardho", interval=0.05)


# select domain, zone, area
    # make sure to wait for long engoh like 5 sec or 10
# kin full name & number
    # 252716408296


## next Page 
# 1. prepaid one click 
    # wait for long like 5 fsec
# 2. attach plan
    # take care of scroll
# 3. icc id option click
# 4. MSISDN Number Series
    # make sure of the position
    # and scroll and save
# 5. IMSI*
    # ask for input before 
    # search it
    # choise it

# netxt, next




pos()
# name()
# gender()
# scroll()
# add_identity()
