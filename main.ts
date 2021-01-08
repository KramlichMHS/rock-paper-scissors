let you = 0
let other = -1
let send = -1
let choose = true
let waiting = false
let check = false
radio.setGroup(3)
basic.forever(function on_forever() {
    
    if (choose) {
        currentlyOn(you)
    } else if (waiting) {
        basic.showString("..")
        if (send != -1 && other != -1) {
            waiting = false
            check = true
        }
        
    } else if (check) {
        basic.showString(checkWin(send, other))
        check = false
        choose = true
        send = -1
        other = -1
    } else {
        basic.showString("Error")
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (you > 0) {
        you -= 1
    } else {
        you = 2
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (you < 2) {
        you += 1
    } else {
        you = 0
    }
    
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    send = you
    radio.sendNumber(send)
    choose = false
    if (other == -1) {
        waiting = true
    } else {
        check = true
    }
    
})
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    other = receivedNumber
})
function currentlyOn(choice: number) {
    if (choice == 0) {
        basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
    } else if (choice == 1) {
        basic.showLeds(`
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
        `)
    } else {
        basic.showLeds(`
        # # . . #
        # # . # .
        . . # . .
        # # . # .
        # # . . #
        `)
    }
    
}

function checkWin(p1: any, p2: any): string {
    if (p1 == -1 || p2 == -1) {
        return "Error"
    }
    
    if (p1 == p2) {
        return "Tie..."
    } else if (p1 == 0 && p2 == 2) {
        return "You Win!"
    } else if (p1 == 1 && p2 == 0) {
        return "You Win!"
    } else if (p1 == 2 && p2 == 1) {
        return "You Win!"
    } else {
        return "You Lose!"
    }
    
}

