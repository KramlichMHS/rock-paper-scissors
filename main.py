you = 0
other = -1
send = -1
choose = True
waiting = False
check = False
radio.set_group(3)

def on_forever():
    global check, waiting, choose, send, other
    if choose:
        currentlyOn(you)
    elif waiting:
        basic.show_string("..")
        if send != -1 and other != -1:
            waiting = False
            check = True
    elif check:
        checkWin(send, other)
        check = False
        choose = True
        send = -1
        other = -1
    else:
        basic.show_string("Error")
basic.forever(on_forever)

def on_button_pressed_a():
    global you
    if you > 0:
        you -= 1
    else:
        you = 2
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global you
    if you < 2:
        you += 1
    else:
        you = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    global you, send, choose, waiting, check
    send = you
    radio.send_number(send)
    choose = False
    if other == -1:
        waiting = True
    else:
        check = True
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_number(receivedNumber):
    global other
    other = receivedNumber
radio.on_received_number(on_received_number)

def currentlyOn(choice):
    if choice == 0:
        basic.show_leds("""
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        """)
    elif choice == 1:
        basic.show_leds("""
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
        """)
    else:
        basic.show_leds("""
        # # . . #
        # # . # .
        . . # . .
        # # . # .
        # # . . #
        """)

def checkWin(p1, p2):
    if p1 == p2:
        basic.show_icon(IconNames.TRIANGLE,2000)
    elif p1 == 0 and p2 == 2:
        basic.show_icon(IconNames.HAPPY,2000)
    elif p1 == 1 and p2 == 0:
        basic.show_icon(IconNames.HAPPY,2000)
    elif p1 == 2 and p2 == 1:
        basic.show_icon(IconNames.HAPPY,2000)
    else:
        basic.show_icon(IconNames.SAD,2000)
