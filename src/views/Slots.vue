<script setup>
import { computed, ref } from 'vue';
import Fighter from "../public/AOC_Icons/fighter_icon.png";
import Tank from "../public/AOC_Icons/tank_icon.png";
import Rogue from "../public/AOC_Icons/rogue_icon.png";
import Ranger from "../public/AOC_Icons/ranger_icon.png";
import Mage from "../public/AOC_Icons/mage_icon.png";
import Summoner from "../public/AOC_Icons/summoner_icon.png";
import Cleric from "../public/AOC_Icons/cleric_icon.png";
import Bard from "../public/AOC_Icons/bard_icon.png";

const rows = ref(5);
const cols = ref(6);
const featureActive = ref(false);
let winningLines = ref([]);
let featureSpins = ref(0);
let winTotal = ref(0);
let winMultiplier = ref(2);
let myBalance = ref(0);
let bonusThreshold = ref(4);
let showBonusMessage = ref(false);
const spinCost = ref(200);
let showWarningMessage = ref(false);
let warningMessage = ref("");

const payTable = ref([
    {
        symbol: Fighter,
        value: 10
    },
    {
        symbol: Tank,
        value: 80
    },
    {
        symbol: Rogue,
        value: 30
    },
    {
        symbol: Ranger,
        value: 40
    },
    {
        symbol: Mage,
        value: 20
    },
    {
        symbol: Summoner,
        value: 50
    },
    {
        symbol: Cleric,
        value: 60
    },
    {
        //wild
        symbol: Bard,
        value: 0 // should inherit the value of previous symbol
    }
])

const symbolKey = ref({
    'A': Fighter,
    'B': Tank,
    'C': Rogue,
    'D': Ranger,
    'E': Mage,
    'F': Summoner,
    'G': Cleric,
    'H': Bard
})

let reel1 = ref([
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
])

let reel2 = ref([
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
])

let reel3 = ref([
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
])

let reel4 = ref([
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
])

let reel5 = ref([
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: 'blank',
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
    {
        symbol: Tank,
        win: false
    },
])

let reels = ref([
    reel1.value,
    reel2.value,
    reel3.value,
    reel4.value,
    reel5.value
])

const featureInactiveCells = ref([
    [1, 1],
    [1, 2],
    [2, 1],
    [3, 1],
    [6, 1],
    [2, 2],
    [3, 2],
    [6, 2],
    // feature hidden right three reels
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 3],
    [2, 4],
    [2, 5],
]);

const featureActiveCells = ref([
    [1, 1],
    [1, 2],
    [6, 1],
    [6, 2]
])

const symbols = ref([
    {
        name: Tank,
        value: 80,
        weight: 1
    },
    {
        name: Rogue,
        value: 10,
        weight: 1
    },
    {
        name: Ranger,
        value: 20,
        weight: 1
    },
    {
        name: Mage,
        value: 30,
        weight: 1
    },
    {
        name: Summoner,
        value: 40,
        weight: 1
    },
    {
        name: Cleric,
        value: 50,
        weight: 1
    },
    {
        name: Bard,
        value: 0,
        weight: 2
    },
    {
        name: Fighter,
        value: 60,
        weight: 1
    },

    // Tank,
    // Rogue,
    // Ranger,
    // Mage,
    // Summoner,
    // Cleric,
    // Bard,
    // Fighter
]);

const lines = ref([
    [3, 3, 2, 2, 2],
    [3, 3, 3, 2, 2],
    [3, 3, 2, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 4, 3, 3],
    [3, 3, 4, 4, 4],
    [3, 3, 3, 4, 4],
    [4, 4, 3, 3, 3],
    [4, 4, 4, 3, 3],
    [4, 4, 3, 4, 4],
    [4, 4, 4, 4, 4],
    [4, 4, 5, 4, 4],
    [4, 4, 4, 5, 5],
    [4, 4, 5, 5, 5],
])

const featureLines = ref([
    [1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 2, 1, 1],
    [1, 1, 2, 2, 2],
    [1, 1, 1, 2, 2],
    [2, 2, 1, 1, 1],
    [2, 2, 2, 1, 1],
    [2, 2, 1, 2, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 3, 2, 2],
    [2, 2, 2, 3, 3],
    [2, 2, 3, 3, 3],
])

const checkLine = (line) => {
    let count = 0;
    let wildBreak = false;
    let symbol = reels.value[0][line[0]].symbol;
    if (symbol == Bard) {
        wildBreak = true;
    }
    // console.log("Checking symbol: ", symbol);
    let winningReel = null;
    if (symbol == Bard) {
        
    }
    let altSymbol = null;
    for ( let i = 0; i < line.length; i++ ) {
        
        if ( reels.value[i][line[i]].symbol === symbol || reels.value[i][line[i]].symbol === Bard || reels.value[i][line[i]].symbol === altSymbol) {
            winningReel = i;
            count++;
            if ( i + 1 < line.length ) {
                if (symbol == Bard) {
                    console.log("Symbol is Bard")
                    if (altSymbol == null && reels.value[i + 1][line[i + 1]].symbol != Bard) {
                        altSymbol = reels.value[i + 1][line[i + 1]].symbol;
                    }
                    else if (reels.value[i + 1][line[i + 1]].symbol != Bard && reels.value[i + 1][line[i + 1]].symbol != altSymbol) {
                        i = line.length;
                    }
                }
                else {
                    if (reels.value[i + 1][line[i + 1]].symbol != symbol && reels.value[i + 1][line[i + 1]].symbol != Bard) {
                        i = line.length;
                    }
                }
            }
        } else {
            i = line.length;
        }
    }
    
    if (altSymbol != null) {
        symbol = altSymbol;
    }
    if ( count > 2) {
        let win = {
            win: true,
            symbol: symbol,
            count: count,
            line: line,
            reel: winningReel
        }
        console.log("Win: ", win);
        return win;
    } else {
        let win = {
            win: false,
            symbol: symbol,
            count: count,
            line: line,
            reel: winningReel
        }
        return win;
    }
}

const randomSymbol = () => {
    return symbols.value[Math.floor(Math.random() * symbols.value.length)].name;
}


const toggleFeature = () => {
    featureActive.value = !featureActive.value;
    if (featureActive.value == true) {
        activateFeatureCells();
    } else {
        deactivateFeatureCells();
    }
}

const setFeatureReels1and2 = () => {
    let featureSymbol = randomSymbol();
    reel1.value[1]['symbol'] = featureSymbol;
    reel1.value[2]['symbol'] = featureSymbol;
    reel1.value[3]['symbol'] = featureSymbol;
    reel1.value[4]['symbol'] = featureSymbol;
    reel2.value[1]['symbol'] = featureSymbol;
    reel2.value[2]['symbol'] = featureSymbol;
    reel2.value[3]['symbol'] = featureSymbol;
    reel2.value[4]['symbol'] = featureSymbol;
}

const activateFeatureCells = () => {
    reel1.value[1]['symbol'] = randomSymbol();
    reel1.value[2]['symbol'] = randomSymbol();
    reel2.value[1]['symbol'] = randomSymbol();
    reel2.value[2]['symbol'] = randomSymbol();
    reel3.value[0]['symbol'] = randomSymbol();
    reel3.value[1]['symbol'] = randomSymbol();
    reel4.value[0]['symbol'] = randomSymbol();
    reel4.value[1]['symbol'] = randomSymbol();
    reel5.value[0]['symbol'] = randomSymbol();
    reel5.value[1]['symbol'] = randomSymbol();
}

const deactivateFeatureCells = () => {
    reel1.value[1]['symbol'] = 'blank';
    reel1.value[2]['symbol'] = 'blank';
    reel2.value[1]['symbol'] = 'blank';
    reel2.value[2]['symbol'] = 'blank';
    reel3.value[0]['symbol'] = 'blank';
    reel3.value[1]['symbol'] = 'blank';
    reel4.value[0]['symbol'] = 'blank';
    reel4.value[1]['symbol'] = 'blank';
    reel5.value[0]['symbol'] = 'blank';
    reel5.value[1]['symbol'] = 'blank';
    console.log("Deactivating feature");
    resetSymbols();
}

const checkBonus = () => {
    let bonusCount = 0;
    reels.value.forEach((reel) => {
        reel.forEach((slot) => {
            if (slot.symbol == Summoner) {
                bonusCount++;
            }
        })
    })
    console.log("Bonus Count in checkBonus: ", bonusCount);
    if (bonusCount > bonusThreshold.value) {
        return bonusCount - bonusThreshold.value;
    }
    return 0;
}

const play = () => {
    if (myBalance.value < spinCost.value) {
        showWarningMessage.value = true;
        warningMessage.value = "You don't have enough money to play!";
        return;
    }
    if (showBonusMessage){
        showBonusMessage.value = false;
    }
    console.log("Playing");
    resetSymbols();
    reels.value.forEach((reel) => {
        reel.forEach((slot, index) => {
            if (slot.symbol != 'blank') {
                reel[index]['symbol'] = randomSymbol();
            }
        })
    })

    if (featureActive.value) {
        setFeatureReels1and2();
    }

    let wins = [];
    lines.value.forEach((line) => {
        let checkWin = checkLine(line);
        if (checkWin.win) {
            wins.push(checkWin);
        }
    })
    if (featureActive.value){
        featureLines.value.forEach((line) => {
            let checkWin = checkLine(line);
            if (checkWin.win) {
                wins.push(checkWin);
            }
        })  
    }
    winTotal.value = getWinTotal(wins);
    console.log("Wins: ", wins);
    setWinningLines(wins);
    if (!featureActive.value) {
        
        myBalance.value -= spinCost.value;
        let bonus = checkBonus();
        console.log("Bonus: ", bonus)
        if (bonus > 0) {
            featureSpins.value += 4 * bonus;
            toggleFeature();
            showBonusMessage.value = true;
            return;
        }
    }
    if (featureActive.value) {
        featureSpins.value--;
        if (featureSpins.value == 0) {
            toggleFeature();
        }
    }
}

const getWinTotal = (wins) => {
    let total = 0;
    wins.forEach((win) => {
        let symbolValue = payTable.value.find((pay) => pay.symbol == win.symbol).value;
        let winTotal = symbolValue;
        if (win.count > 3){
            for (let i = 0; i < win.count - 3; i++){
                winTotal += winTotal * winMultiplier.value;
            }
        } 
        total += winTotal;
    })
    myBalance.value += total;
    return total;
}

const setWinningLines = (wins) => {
    wins.forEach((win) => {
        let line = win.line;
        for ( let i = 0; i < win.count; i++ ) {
            reels.value[i][line[i]].win = true;
        }
    })
}

const resetSymbols = () => {
    reels.value.forEach((reel) => {
        reel.forEach((slot, index) => {
            slot.win = false;
        })
    })
}

const refill = () => {
    myBalance.value = 1000;
    showWarningMessage.value = false;
}

const toggleShowBonusMessage = () => {
    showBonusMessage.value = !showBonusMessage.value;
}
</script>

<style scoped>
.slot {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.slot-game {
    border: 2px solid gray;
    border-radius: 40px;
}
.cell {
    position: relative;
    width: 100px;
    min-height: 100px;
    border: 1px solid gray;
    display: inline-block;
    /* background-color: rgb(60, 0, 0); */
    transition: color 1s ease-in-out, background-color 1s ease-in-out;
    /* margin: 5px; */
}

.hidden-cell {
    pointer-events: none;
    color: transparent;
    background-color: transparent;
    border: none;
}

.winner::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: inset 0 0 30px var(--primary-color);
    /* background-color: rgba(255, 255, 255, .5); */
}

.slot-symbol {
    height: 100%;
    width: 100%;
    opacity: 1;
    transition: opacity 1s ease-in-out;
}

.hide-img {
    opacity: 0;
}

.slot-gui {
    /* border: 1px solid red; */
    height: 100%;
    max-height: 460px;
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.reels {
    transform: translateY(-50%);
    transition: transform 1s ease-in-out;
}

.slot-gui::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    max-height: 100px;
    /* background-color: black; */
    transition: max-height 1s ease-in-out;
    z-index: 100;
}
.slot-gui::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    /* height: 100%;
    max-height: 100px; */
    /* background-color: black; */
    transition: max-height 1s ease-in-out;
    z-index: 100;
}
.feature-active {
    height: 660px;
    max-height: 660px;
}
.feature-active::before {
    max-height: 0%;
}

.feature-active::after {
    max-height: 17%;
}

.feature-active .reels {
    transform: translateY(0);
}

.wild::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /* box-shadow: inset 0 0 30px var(--primary-color); */
    background-color: rgba(255, 217, 0, 0.2);
}

.bonus::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /* box-shadow: inset 0 0 30px var(--primary-color); */
    background-color: rgba(0, 255, 0, 0.2);
}

.spin-win{
    z-index: 1000;
}

.bonus-win-modal {
    border: 3px solid red;
    width: 80%;
    background-color: black;
    color: white;
    font-size: 20px;
    font-weight: bolder;
}

.win-total {
    border: 2px solid red;
    border-radius: 30px;
    padding: 5px 30px;
}

.warning-message {
    z-index: 1000;
}

.rules {
    border: 2px solid gray;
    border-radius: 40px;
    height: fit-content;
}
</style>

<template>
    <div class="goa-container uk-padding separate-reels-test slot">
        <h1>Slots</h1>
        <div class="uk-flex">

            <div class="rules uk-padding uk-margin-right">
                <h3 class="uk-text-center">Rules</h3>
                <div class="bonus-rules uk-flex uk-flex-column uk-margin-bottom">
                    <h4>Bonus</h4>
                    <div class="uk-flex uk-flex-middle">
                        <div class="cell uk-margin-right">
                            <div class="slot-symbol bonus uk-background-cover" :data-src="Summoner" uk-img></div>
                        </div>
                        <span class="uk-text-lead uk-margin-right text-primary"> X 5</span>
                        <span class="uk-text-lead text-primary"> triggers the bonus.</span>
                    </div>
                    <span class="uk-text-center uk-padding-small">( Bonus increased per additional symbol. )</span>
                </div>
                <div class="wild-rules">
                    <h4>Wilds</h4>
                    <div class="uk-flex uk-flex-middle">
                        <div class="cell uk-margin-right">
                            <div class="slot-symbol wild uk-background-cover" :data-src="Bard" uk-img></div>
                        </div>
                        <span class="uk-text-lead text-primary"> is wild.</span>
                    </div>
                </div>
            </div>
            <div class="slot-game uk-flex uk-flex-column uk-flex-middle">
                <div class="uk-position-relative slot-gui uk-flex uk-margin-bottom uk-padding" :class="{'feature-active': featureActive}">
                    <div class="spin-win uk-position-top-left uk-text-center uk-margin-top uk-margin-large-left">
                        <h3 class="uk-margin-remove-top">Win Total: </h3>
                        <span class="win-total text-primary">${{ winTotal }}</span>
                    </div>
                    <div v-for="reel in reels" class="reels uk-flex uk-flex-column">
                        <div v-for="slot in reel" class="cell" 
                        :class="{'hidden-cell' : slot.symbol == 'blank',
                                    'winner': slot.win == true,
                                    'wild': slot.symbol == Bard,
                                    'bonus': slot.symbol == Summoner}">
                            <div :class="{'hide-img' : slot.symbol == 'blank'}" class="slot-symbol uk-background-cover" :data-src="slot.symbol" uk-img></div>
                        </div>
                    </div>
                    <div v-if="showBonusMessage" class="bonus-win-modal goa-container uk-position-center uk-flex uk-flex-column uk-text-center">
                        <button class="goa-button uk-padding-small uk-padding-remove-vertical uk-position-top-right uk-margin-small-right uk-margin-small-top" @click="toggleShowBonusMessage">X</button>
                        <h4 class="text-primary uk-margin-small-top">BONUS AWARDED !</h4>
                        <span>You've won {{ featureSpins }} free spins!</span>
                        <span>Click Play below to Start</span>
                    </div>
                </div>
                <div class="uk-padding uk-padding-remove-top">
                    <h3 v-if="featureActive" class="uk-margin-small-top">Feature Spins: {{ featureSpins }}</h3>
                    <div v-if="showWarningMessage" class="warning-message goa-container uk-position-center uk-flex uk-flex-column uk-text-center">
                        <h4>Warning!</h4>
                        <p>{{ warningMessage }}</p>
                        <button class="goa-button uk-margin-small" @click="refill">Refill My Account</button>
                    </div>
                    <div class="uk-flex">
                        <span class="uk-margin-right">Balance: ${{ myBalance }}</span>
                        <button @click="play" class="goa-button">Play (${{ spinCost }})</button>
                        <!-- <button @click="toggleFeature" class="goa-button">Toggle Feature</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>