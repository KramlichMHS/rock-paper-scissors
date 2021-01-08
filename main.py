you = 0
other = -1
send = -1
choose = True
waiting = False
check = False
radio.set_group(3)

def on_forever():
    global check, waiting, choose
    if choose:
        basic.show_string(currentlyOn(you))
    elif waiting:
        basic.show_string("...")
        if send != -1 and other != -1:
            waiting = False
            check = True
    elif check:
        basic.show_string(checkWin(send, other))
        check = False
        choose = True
    else:
        basic.show_string("Error")
basic.forever(on_forever)

def on_button_pressed_a():
    global you
    if you > 0:
        you -= 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global you
    if you < 2:
        you += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    global you, send, choose, waiting
    send = you
    radio.send_number(send)
    choose = False
    waiting = True
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_number(receivedNumber):
    global other
    other = receivedNumber
radio.on_received_number(on_received_number)

def currentlyOn(choice):
    if choice == 0:
        return "Rock"
    elif choice == 1:
        return "Paper"
    else:
        return "Scissors"

def checkWin(p1, p2):
    if p1 == -1 or p2 == -1:
        return "Error"
    if p1 == p2:
        return "Tie..."
    elif p1 == 0 and p2 == 2:
        return "You Win!"
    elif p1 == 1 and p2 == 0:
        return "You Win!"
    elif p1 == 2 and p2 == 1:
        return "You Win!"
    else:
        return "You Lose!"