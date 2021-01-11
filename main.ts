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
        checkWin(send, other)
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

function checkWin(p1: any, p2: any) {
    if (p1 == p2) {
        basic.showIcon(IconNames.Triangle, 2000)
    } else if (p1 == 0 && p2 == 2) {
        basic.showIcon(IconNames.Happy, 2000)
    } else if (p1 == 1 && p2 == 0) {
        basic.showIcon(IconNames.Happy, 2000)
    } else if (p1 == 2 && p2 == 1) {
        basic.showIcon(IconNames.Happy, 2000)
    } else {
        basic.showIcon(IconNames.Sad, 2000)
    }
    
}

