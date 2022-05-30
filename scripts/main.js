import { setBalanceField } from "./functions.js";

if (!localStorage.getItem('balance_egypt')) {
    localStorage.setItem('balance_egypt', 50000)
}

if (!localStorage.getItem('cocktails_egypt')) {
    localStorage.setItem('cocktails_egypt', [])
}

setBalanceField()