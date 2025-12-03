; auto_ready.ahk
;  - Ctrl+Alt+S : liga/desliga automação
;  - Ctrl+Alt+R : grava posição do mouse (usa clique antes do envio)
;  - Ctrl+Alt+C : limpa posição do mouse (desativa clique)
;  - Ctrl+Alt+X : sai do script
; Configurações:
Interval := 10000            ; intervalo em ms (10s)
SendDeleteSpace := true      ; true = envia Delete + Space
SendEnterAfterDelete := true ; true = envia Enter logo após (ajuste se não quiser Enter)
UseClick := false
ClickX := 0
ClickY := 0
Toggle := false

^!s::  ; Ctrl+Alt+S - toggle on/off
    Toggle := !Toggle
    if (Toggle) {
        SetTimer, DoAction, % Interval
        TrayTip, AutoReady, Automação LIGADA (Ctrl+Alt+S para parar), 2
    } else {
        SetTimer, DoAction, Off
        TrayTip, AutoReady, Automação DESLIGADA, 2
    }
return

^!r::  ; Ctrl+Alt+R - gravar posição do mouse
    MouseGetPos, ClickX, ClickY
    UseClick := true
    ToolTip, Posição gravada: %ClickX% , %ClickY%`nClique ATIVADO
    Sleep, 1500
    ToolTip
return

^!c::  ; Ctrl+Alt+C - limpar posição do mouse
    UseClick := false
    ClickX := 0
    ClickY := 0
    ToolTip, Clique DESATIVADO
    Sleep, 800
    ToolTip
return

DoAction:
    ; se gravou posição, clica lá (útil para botão "Ready")
    if (UseClick) {
        ; opcional: trazer a janela pra frente (comente se não quiser)
        ; WinActivate, A
        Click, %ClickX%, %ClickY%
        Sleep, 150
    }
    if (SendDeleteSpace) {
        Send, {Del}{Space}
        Sleep, 50
    }
    if (SendEnterAfterDelete) {
        Send, {Enter}
    }
return

^!x::ExitApp  ; Ctrl+Alt+X - sai do script
