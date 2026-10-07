// ============================================================
// DUNGEON ASCENSION
// MOBILE ACTION RPG VERSION
// ============================================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


// ============================================================
// UI
// ============================================================

const levelEl =
    document.getElementById("level");

const goldEl =
    document.getElementById("gold");

const hpBar =
    document.getElementById("hpBar");

const hpText =
    document.getElementById("hpText");

const xpBar =
    document.getElementById("xpBar");

const xpText =
    document.getElementById("xpText");

const attackStat =
    document.getElementById("attackStat");

const defenseStat =
    document.getElementById("defenseStat");

const enemyName =
    document.getElementById("enemyName");

const enemyHpBar =
    document.getElementById("enemyHpBar");

const enemyHpText =
    document.getElementById("enemyHpText");

const enemyLevel =
    document.getElementById("enemyLevel");

const enemyAttack =
    document.getElementById("enemyAttack");

const dungeonText =
    document.getElementById("dungeonText");

const enemyCount =
    document.getElementById("enemyCount");

const weaponName =
    document.getElementById("weaponName");

const weaponDamage =
    document.getElementById("weaponDamage");

const skillStatus =
    document.getElementById("skillStatus");

const potionCount =
    document.getElementById("potionCount");

const messageEl =
    document.getElementById("message");


// ============================================================
// BUTTONS
// ============================================================

const attackButton =
    document.getElementById(
        "attackButton"
    );

const powersButton =
    document.getElementById(
        "powersButton"
    );

const healButton =
    document.getElementById(
        "healButton"
    );

const powerStrikeButton =
    document.getElementById(
        "powerStrikeButton"
    );

const dashButton =
    document.getElementById(
        "dashButton"
    );

const fireButton =
    document.getElementById(
        "fireButton"
    );

const powerMenu =
    document.getElementById(
        "powerMenu"
    );

const powerCooldown =
    document.getElementById(
        "powerCooldown"
    );

const dashCooldown =
    document.getElementById(
        "dashCooldown"
    );

const fireCooldown =
    document.getElementById(
        "fireCooldown"
    );

const healCooldown =
    document.getElementById(
        "healCooldown"
    );


// ============================================================
// KEYBOARD
// ============================================================

const keys = {};

document.addEventListener(
    "keydown",
    event => {

        keys[
            event.key.toLowerCase()
        ] = true;


        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            basicAttack();

        }


        if (
            event.key ===
            "Shift"
        ) {

            dodge();

        }


        if (
            event.key === "1"
        ) {

            powerStrike();

        }


        if (
            event.key === "2"
        ) {

            dashAttack();

        }


        if (
            event.key === "3"
        ) {

            fireBlast();

        }


        if (
            event.key.toLowerCase()
            === "h"
        ) {

            healPlayer();

        }


        if (
            event.key.toLowerCase()
            === "r" &&
            player.dead
        ) {

            restartGame();

        }

    }
);


document.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


// ============================================================
// PLAYER
// ============================================================

const player = {

    x: 180,

    y: 300,

    width: 42,

    height: 55,

    speed: 4,

    hp: 100,

    maxHp: 100,

    level: 0,

    xp: 0,

    xpRequired: 100,

    attackPower: 10,

    defense: 5,

    gold: 0,

    dead: false,

    attacking: false,

    attackTimer: 0,

    attackAnimation:
        0,

    invincible: false,

    dodgeTimer: 0,

    basicCooldown: 0,

    powerCooldown: 0,

    dashCooldown: 0,

    fireCooldown: 0,

    healCooldown: 0,

    potions: 3,

    weapon: {

        name:
            "Wooden Sword",

        damage:
            0

    }

};


// ============================================================
// JOYSTICK
// ============================================================

const joystick =
    document.getElementById(
        "joystick"
    );

const joystickBase =
    document.getElementById(
        "joystickBase"
    );

const joystickStick =
    document.getElementById(
        "joystickStick"
    );


let joystickActive =
    false;

let joystickX = 0;

let joystickY = 0;


function joystickStart(
    event
) {

    event.preventDefault();

    joystickActive =
        true;

    updateJoystick(
        event
    );

}


function joystickMove(
    event
) {

    if (
        !joystickActive
    )
        return;

    event.preventDefault();

    updateJoystick(
        event
    );

}


function joystickEnd(
    event
) {

    event.preventDefault();

    joystickActive =
        false;

    joystickX = 0;

    joystickY = 0;


    joystickStick.style.transform =
        "translate(0px, 0px)";

}


function getTouch(
    event
) {

    if (
        event.touches &&
        event.touches.length
    ) {

        return event.touches[0];

    }

    return event;

}


function updateJoystick(
    event
) {

    const touch =
        getTouch(event);


    const rect =
        joystickBase.getBoundingClientRect();


    const centerX =
        rect.left +
        rect.width / 2;


    const centerY =
        rect.top +
        rect.height / 2;


    let dx =
        touch.clientX -
        centerX;


    let dy =
        touch.clientY -
        centerY;


    const maxDistance =
        40;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (
        distance >
        maxDistance
    ) {

        dx =
            dx /
            distance *
            maxDistance;

        dy =
            dy /
            distance *
            maxDistance;

    }


    joystickX =
        dx / maxDistance;

    joystickY =
        dy / maxDistance;


    joystickStick.style.transform =
        `translate(${dx}px, ${dy}px)`;

}


joystick.addEventListener(
    "touchstart",
    joystickStart,
    {
        passive: false
    }
);


joystick.addEventListener(
    "touchmove",
    joystickMove,
    {
        passive: false
    }
);


joystick.addEventListener(
    "touchend",
    joystickEnd,
    {
        passive: false
    }
);


// ============================================================
// BUTTON HELPER
// ============================================================

function addButtonAction(
    button,
    action
) {

    button.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            action();

        }
    );

}


// ATTACK

addButtonAction(
    attackButton,
    basicAttack
);


// POWERS MENU

addButtonAction(
    powersButton,
    () => {

        powerMenu.classList.toggle(
            "open"
        );

    }
);


// POWER STRIKE

addButtonAction(
    powerStrikeButton,
    powerStrike
);


// DASH

addButtonAction(
    dashButton,
    dashAttack
);


// FIRE

addButtonAction(
    fireButton,
    fireBlast
);


// HEAL

addButtonAction(
    healButton,
    healPlayer
);


// ============================================================
// ENEMY
// ============================================================

let enemy = null;


// ============================================================
// DUNGEON
// ============================================================

const dungeon = {

    number: 1,

    defeated: 0,

    totalEnemies: 3,

    completed: false

};


// ============================================================
// CAMERA
// ============================================================

const camera = {

    shake: 0,

    shakePower: 0

};


function screenShake(
    power = 5
) {

    camera.shake =
        12;

    camera.shakePower =
        power;

}


// ============================================================
// ENEMY TYPES
// ============================================================

const enemyTypes = [

    {

        type:
            "Goblin",

        hp:
            60,

        attack:
            8,

        defense:
            2,

        speed:
            1.4,

        color:
            "#55c95a",

        ability:
            "quick"

    },


    {

        type:
            "Orc",

        hp:
            110,

        attack:
            14,

        defense:
            5,

        speed:
            0.8,

        color:
            "#9a704c",

        ability:
            "smash"

    },


    {

        type:
            "Shadow Beast",

        hp:
            90,

        attack:
            18,

        defense:
            3,

        speed:
            1.8,

        color:
            "#7450c9",

        ability:
            "shadow"

    },


    {

        type:
            "Dark Mage",

        hp:
            75,

        attack:
            22,

        defense:
            2,

        speed:
            0.7,

        color:
            "#dc559d",

        ability:
            "magic"

    },


    {

        type:
            "Dungeon Lord",

        hp:
            350,

        attack:
            30,

        defense:
            10,

        speed:
            0.75,

        color:
            "#d72d35",

        ability:
            "boss",

        boss:
            true

    }

];


// ============================================================
// EFFECTS
// ============================================================

let particles = [];

let damageNumbers = [];

let effects = [];

let floatingOrbs = [];


// ============================================================
// UTILITY
// ============================================================

function random(
    min,
    max
) {

    return Math.random() *
        (max - min) +
        min;

}


function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


function distanceBetween(
    a,
    b
) {

    const dx =
        a.x - b.x;

    const dy =
        a.y - b.y;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


function showMessage(
    text
) {

    messageEl.textContent =
        text;

}


// ============================================================
// SPAWN ENEMY
// ============================================================

function spawnEnemy() {

    let type;


    const isBoss =
        dungeon.defeated ===
        dungeon.totalEnemies - 1;


    if (
        isBoss
    ) {

        type =
            enemyTypes[4];

    }

    else {

        const available =
            enemyTypes.slice(
                0,
                4
            );


        type =
            available[
                Math.floor(
                    Math.random() *
                    available.length
                )
            ];

    }


    const levelBonus =
        dungeon.number - 1;


    const hp =
        type.hp +
        levelBonus * 30 +
        player.level * 5;


    enemy = {

        name:
            type.type,

        type:
            type.type,

        x:
            760,

        y:
            random(
                150,
                450
            ),

        width:
            type.boss
                ? 75
                : 50,

        height:
            type.boss
                ? 85
                : 60,

        hp:
            hp,

        maxHp:
            hp,

        attackPower:
            type.attack +
            levelBonus * 4,

        defense:
            type.defense +
            Math.floor(
                levelBonus / 2
            ),

        speed:
            type.speed,

        color:
            type.color,

        ability:
            type.ability,

        boss:
            type.boss ||
            false,

        attackCooldown:
            0,

        specialCooldown:
            0,

        hitFlash:
            0,

        alive:
            true,

        stunned:
            0,

        attackAnimation:
            0,

        attackTimer:
            0,

        hurtAnimation:
            0,

        pulse:
            0

    };


    showMessage(
        enemy.boss
            ? "👑 DUNGEON LORD HAS APPEARED!"
            : `${enemy.name} appeared!`
    );


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        floatingOrbs.push({

            x:
                enemy.x +
                random(
                    -40,
                    40
                ),

            y:
                enemy.y +
                random(
                    -40,
                    40
                ),

            life:
                random(
                    30,
                    80
                ),

            speed:
                random(
                    .3,
                    1
                ),

            size:
                random(
                    2,
                    5
                )

        });

    }

}


// ============================================================
// MOVEMENT
// ============================================================

function movePlayer() {

    if (
        player.dead
    )
        return;


    let dx = 0;

    let dy = 0;


    // KEYBOARD

    if (
        keys["w"]
    )
        dy -= 1;

    if (
        keys["s"]
    )
        dy += 1;

    if (
        keys["a"]
    )
        dx -= 1;

    if (
        keys["d"]
    )
        dx += 1;


    // JOYSTICK

    if (
        Math.abs(
            joystickX
        ) > .05 ||
        Math.abs(
            joystickY
        ) > .05
    ) {

        dx =
            joystickX;

        dy =
            joystickY;

    }


    if (
        dx !== 0 ||
        dy !== 0
    ) {

        const length =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        dx /=
            length;

        dy /=
            length;


        player.x +=
            dx *
            player.speed;

        player.y +=
            dy *
            player.speed;

    }


    player.x =
        clamp(
            player.x,
            35,
            canvas.width -
            player.width -
            35
        );


    player.y =
        clamp(
            player.y,
            100,
            canvas.height -
            player.height -
            45
        );

}


// ============================================================
// BASIC ATTACK
// ============================================================

function basicAttack() {

    if (
        player.dead
    )
        return;


    if (
        player.basicCooldown >
        0
    )
        return;


    if (
        !enemy ||
        !enemy.alive
    )
        return;


    const distance =
        distanceBetween(
            player,
            enemy
        );


    if (
        distance > 125
    ) {

        showMessage(
            "❌ Enemy is too far!"
        );

        return;

    }


    player.basicCooldown =
        25;


    player.attacking =
        true;


    player.attackTimer =
        14;


    player.attackAnimation =
        1;


    let damage =
        player.attackPower +
        player.weapon.damage -
        enemy.defense;


    damage =
        Math.max(
            1,
            damage
        );


    const critical =
        Math.random() <
        .15;


    if (
        critical
    ) {

        damage *= 2;

        showMessage(
            "💥 CRITICAL HIT!"
        );

        screenShake(
            8
        );

    }


    damage =
        Math.floor(
            damage
        );


    enemy.hp -=
        damage;


    enemy.hitFlash =
        10;


    enemy.hurtAnimation =
        10;


    createDamageNumber(
        enemy.x,
        enemy.y - 45,
        damage,
        critical
    );


    createSlashEffect(
        enemy.x,
        enemy.y
    );


    createParticles(
        enemy.x,
        enemy.y,
        18
    );


    screenShake(
        critical
            ? 9
            : 4
    );


    if (
        enemy.hp <= 0
    ) {

        enemy.hp =
            0;

        defeatEnemy();

    }

}


// ============================================================
// POWER STRIKE
// ============================================================

function powerStrike() {

    if (
        player.dead
    )
        return;


    if (
        player.level <
        5
    ) {

        showMessage(
            "🔒 Power Strike unlocks at Level 5!"
        );

        return;

    }


    if (
        player.powerCooldown >
        0
    ) {

        return;

    }


    if (
        !enemy ||
        !enemy.alive
    )
        return;


    if (
        distanceBetween(
            player,
            enemy
        ) > 155
    ) {

        showMessage(
            "❌ Enemy is too far!"
        );

        return;

    }


    player.powerCooldown =
        100;


    player.attacking =
        true;

    player.attackTimer =
        25;

    player.attackAnimation =
        2;


    let damage =
        player.attackPower *
        3 +
        player.weapon.damage -
        enemy.defense;


    damage =
        Math.max(
            5,
            damage
        );


    damage =
        Math.floor(
            damage
        );


    enemy.hp -=
        damage;


    enemy.hitFlash =
        15;


    enemy.stunned =
        30;


    enemy.hurtAnimation =
        20;


    createDamageNumber(
        enemy.x,
        enemy.y - 60,
        damage,
        true
    );


    createPowerEffect(
        enemy.x,
        enemy.y
    );


    createParticles(
        enemy.x,
        enemy.y,
        40
    );


    screenShake(
        14
    );


    showMessage(
        "🔥 POWER STRIKE!"
    );


    if (
        enemy.hp <= 0
    ) {

        enemy.hp =
            0;

        defeatEnemy();

    }

}


// ============================================================
// DASH ATTACK
// ============================================================

function dashAttack() {

    if (
        player.dead
    )
        return;


    if (
        player.level <
        3
    ) {

        showMessage(
            "🔒 Dash Attack unlocks at Level 3!"
        );

        return;

    }


    if (
        player.dashCooldown >
        0
    )
        return;


    if (
        !enemy ||
        !enemy.alive
    )
        return;


    if (
        distanceBetween(
            player,
            enemy
        ) > 230
    ) {

        showMessage(
            "❌ Enemy is too far!"
        );

        return;

    }


    player.dashCooldown =
        80;


    const direction =
        enemy.x >
        player.x
            ? 1
            : -1;


    const oldX =
        player.x;


    player.x =
        enemy.x -
        direction *
        65;


    createDashTrail(
        oldX,
        player.x,
        player.y
    );


    player.attacking =
        true;

    player.attackTimer =
        15;

    player.attackAnimation =
        3;


    let damage =
        player.attackPower *
        2 +
        player.weapon.damage -
        enemy.defense;


    damage =
        Math.max(
            3,
            damage
        );


    damage =
        Math.floor(
            damage
        );


    enemy.hp -=
        damage;


    enemy.hitFlash =
        12;


    enemy.hurtAnimation =
        15;


    createDamageNumber(
        enemy.x,
        enemy.y - 45,
        damage,
        false
    );


    createDashEffect();


    createParticles(
        player.x,
        player.y,
        20
    );


    screenShake(
        8
    );


    showMessage(
        "⚡ DASH ATTACK!"
    );


    if (
        enemy.hp <= 0
    ) {

        enemy.hp =
            0;

        defeatEnemy();

    }

}


// ============================================================
// FIRE BLAST
// ============================================================

function fireBlast() {

    if (
        player.dead
    )
        return;


    if (
        player.level <
        8
    ) {

        showMessage(
            "🔒 Fire Blast unlocks at Level 8!"
        );

        return;

    }


    if (
        player.fireCooldown >
        0
    )
        return;


    if (
        !enemy ||
        !enemy.alive
    )
        return;


    if (
        distanceBetween(
            player,
            enemy
        ) > 300
    ) {

        showMessage(
            "❌ Enemy is too far!"
        );

        return;

    }


    player.fireCooldown =
        140;


    player.attacking =
        true;

    player.attackTimer =
        30;

    player.attackAnimation =
        4;


    let damage =
        player.attackPower *
        2.5 +
        player.weapon.damage -
        enemy.defense;


    damage =
        Math.max(
            8,
            damage
        );


    damage =
        Math.floor(
            damage
        );


    enemy.hp -=
        damage;


    enemy.hitFlash =
        18;


    enemy.hurtAnimation =
        20;


    createFireEffect(
        enemy.x,
        enemy.y
    );


    createDamageNumber(
        enemy.x,
        enemy.y - 70,
        damage,
        true
    );


    createParticles(
        enemy.x,
        enemy.y,
        45
    );


    screenShake(
        10
    );


    showMessage(
        "🔥 FIRE BLAST!"
    );


    if (
        enemy.hp <= 0
    ) {

        enemy.hp =
            0;

        defeatEnemy();

    }

}


// ============================================================
// HEAL
// ============================================================

function healPlayer() {

    if (
        player.dead
    )
        return;


    if (
        player.potions <= 0
    ) {

        showMessage(
            "❌ No healing potions!"
        );

        return;

    }


    if (
        player.healCooldown >
        0
    ) {

        showMessage(
            "⏳ Healing cooldown!"
        );

        return;

    }


    if (
        player.hp >=
        player.maxHp
    ) {

        showMessage(
            "❤️ HP is already full!"
        );

        return;

    }


    player.potions--;

    player.healCooldown =
        100;


    const healAmount =
        Math.floor(
            player.maxHp *
            .35
        );


    player.hp =
        Math.min(
            player.maxHp,
            player.hp +
            healAmount
        );


    createHealEffect();

    createDamageNumber(
        player.x,
        player.y - 50,
        healAmount,
        true,
        true
    );


    showMessage(
        `❤️ HEALED +${healAmount} HP`
    );

}


// ============================================================
// DODGE
// ============================================================

function dodge() {

    if (
        player.dead
    )
        return;


    if (
        player.dodgeTimer >
        0
    )
        return;


    player.dodgeTimer =
        60;


    player.invincible =
        true;


    const direction =
        keys["a"]
            ? -1
            : 1;


    const oldX =
        player.x;


    player.x +=
        direction *
        100;


    player.x =
        clamp(
            player.x,
            35,
            canvas.width -
            player.width -
            35
        );


    createDashTrail(
        oldX,
        player.x,
        player.y
    );


    createParticles(
        player.x,
        player.y,
        20
    );


    showMessage(
        "💨 DODGE!"
    );


    setTimeout(
        () => {

            player.invincible =
                false;

        },
        450
    );

}


// ============================================================
// ENEMY AI
// ============================================================

function enemyAI() {

    if (
        !enemy ||
        !enemy.alive
    )
        return;


    if (
        enemy.stunned >
        0
    ) {

        enemy.stunned--;

        return;

    }


    if (
        enemy.attackCooldown >
        0
    ) {

        enemy.attackCooldown--;

    }


    if (
        enemy.specialCooldown >
        0
    ) {

        enemy.specialCooldown--;

    }


    if (
        enemy.attackTimer >
        0
    ) {

        enemy.attackTimer--;

    }


    if (
        enemy.hurtAnimation >
        0
    ) {

        enemy.hurtAnimation--;

    }


    enemy.pulse +=
        .05;


    const distance =
        distanceBetween(
            player,
            enemy
        );


    // MOVEMENT

    if (
        distance > 85 &&
        enemy.attackTimer <= 0
    ) {

        const dx =
            player.x -
            enemy.x;

        const dy =
            player.y -
            enemy.y;


        const length =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            length > 0
        ) {

            enemy.x +=
                dx /
                length *
                enemy.speed;

            enemy.y +=
                dy /
                length *
                enemy.speed;

        }

    }


    // BASIC ATTACK

    if (
        distance <= 95 &&
        enemy.attackCooldown <= 0
    ) {

        enemyAttackPlayer();

        enemy.attackCooldown =
            enemy.boss
                ? 65
                : 90;

    }


    // SPECIAL

    if (
        enemy.specialCooldown <= 0
    ) {

        enemySpecialAttack();

    }

}


// ============================================================
// ENEMY ATTACK
// ============================================================

function enemyAttackPlayer() {

    if (
        player.invincible
    ) {

        showMessage(
            "💨 PERFECT DODGE!"
        );

        createParticles(
            player.x,
            player.y,
            15
        );

        return;

    }


    // START ENEMY ATTACK ANIMATION

    enemy.attackAnimation =
        1;

    enemy.attackTimer =
        20;


    const damage =
        Math.max(
            1,
            Math.floor(
                enemy.attackPower -
                player.defense
            )
        );


    // small delay feel

    setTimeout(
        () => {

            if (
                player.dead ||
                !enemy ||
                !enemy.alive
            )
                return;


            if (
                player.invincible
            ) {

                showMessage(
                    "💨 PERFECT DODGE!"
                );

                return;

            }


            player.hp -=
                damage;


            createDamageNumber(
                player.x,
                player.y - 45,
                damage,
                false
            );


            createParticles(
                player.x,
                player.y,
                14
            );


            screenShake(
                5
            );


            showMessage(
                `${enemy.name} attacked! -${damage} HP`
            );


            if (
                player.hp <= 0
            ) {

                player.hp = 0;

                playerDeath();

            }

        },
        150
    );

}


// ============================================================
// ENEMY SPECIAL
// ============================================================

function enemySpecialAttack() {

    if (
        !enemy ||
        !enemy.alive
    )
        return;


    const distance =
        distanceBetween(
            player,
            enemy
        );


    if (
        distance > 260
    )
        return;


    // GOBLIN

    if (
        enemy.ability ===
        "quick"
    ) {

        enemy.specialCooldown =
            150;


        enemy.attackAnimation =
            2;


        const damage =
            Math.max(
                1,
                Math.floor(
                    enemy.attackPower *
                    1.5 -
                    player.defense
                )
            );


        if (
            !player.invincible
        ) {

            player.hp -=
                damage;

        }


        createDamageNumber(
            player.x,
            player.y - 60,
            damage,
            true
        );


        createParticles(
            player.x,
            player.y,
            20
        );


        showMessage(
            "⚡ GOBLIN QUICK STRIKE!"
        );

    }


    // ORC

    else if (
        enemy.ability ===
        "smash"
    ) {

        enemy.specialCooldown =
            180;


        enemy.attackAnimation =
            3;


        if (
            distance < 140
        ) {

            const damage =
                Math.max(
                    1,
                    Math.floor(
                        enemy.attackPower *
                        2 -
                        player.defense
                    )
                );


            if (
                !player.invincible
            ) {

                player.hp -=
                    damage;

            }


            createPowerEffect(
                player.x,
                player.y
            );


            createDamageNumber(
                player.x,
                player.y - 60,
                damage,
                true
            );


            screenShake(
                12
            );


            showMessage(
                "💥 ORC GROUND SMASH!"
            );

        }

    }


    // SHADOW

    else if (
        enemy.ability ===
        "shadow"
    ) {

        enemy.specialCooldown =
            200;


        enemy.attackAnimation =
            4;


        enemy.x =
            player.x +
            random(
                -120,
                120
            );


        enemy.y =
            player.y +
            random(
                -80,
                80
            );


        enemy.x =
            clamp(
                enemy.x,
                50,
                900
            );


        enemy.y =
            clamp(
                enemy.y,
                100,
                500
            );


        createShadowTeleport(
            enemy.x,
            enemy.y
        );


        showMessage(
            "👿 SHADOW BEAST TELEPORTED!"
        );

    }


    // MAGE

    else if (
        enemy.ability ===
        "magic"
    ) {

        enemy.specialCooldown =
            180;


        enemy.attackAnimation =
            5;


        const damage =
            Math.max(
                1,
                Math.floor(
                    enemy.attackPower *
                    1.8 -
                    player.defense / 2
                )
            );


        if (
            !player.invincible
        ) {

            player.hp -=
                damage;

        }


        createFireEffect(
            player.x,
            player.y
        );


        createDamageNumber(
            player.x,
            player.y - 65,
            damage,
            true
        );


        showMessage(
            "🔮 DARK MAGE MAGIC BLAST!"
        );

    }


    // BOSS

    else if (
        enemy.ability ===
        "boss"
    ) {

        enemy.specialCooldown =
            160;


        enemy.attackAnimation =
            3;


        if (
            distance < 220
        ) {

            const damage =
                Math.max(
                    1,
                    Math.floor(
                        enemy.attackPower *
                        2 -
                        player.defense
                    )
                );


            if (
                !player.invincible
            ) {

                player.hp -=
                    damage;

            }


            createPowerEffect(
                player.x,
                player.y
            );


            createParticles(
                player.x,
                player.y,
                45
            );


            createDamageNumber(
                player.x,
                player.y - 80,
                damage,
                true
            );


            screenShake(
                15
            );


            showMessage(
                "👑 DUNGEON LORD SPECIAL ATTACK!"
            );

        }

    }


    if (
        player.hp <= 0
    ) {

        player.hp = 0;

        playerDeath();

    }

}


// ============================================================
// DEFEAT
// ============================================================

function defeatEnemy() {

    enemy.alive =
        false;


    const xpReward =
        enemy.boss
            ? 300 +
              dungeon.number *
              50
            : 50 +
              dungeon.number *
              15;


    const goldReward =
        enemy.boss
            ? 200 +
              dungeon.number *
              50
            : 20 +
              dungeon.number *
              5;


    player.xp +=
        xpReward;


    player.gold +=
        goldReward;


    createBossDeathEffect(
        enemy.x,
        enemy.y
    );


    screenShake(
        enemy.boss
            ? 18
            : 8
    );


    showMessage(
        `☠️ ${enemy.name} defeated! +${xpReward} XP +${goldReward} Gold`
    );


    checkLoot();


    dungeon.defeated++;


    levelUpCheck();


    if (
        dungeon.defeated >=
        dungeon.totalEnemies
    ) {

        dungeonComplete();

    }

    else {

        setTimeout(
            () => {

                spawnEnemy();

            },
            1200
        );

    }

}


// ============================================================
// LOOT
// ============================================================

function checkLoot() {

    const roll =
        Math.random();


    if (
        roll < .08
    ) {

        player.weapon = {

            name:
                "🔥 Inferno Blade",

            damage:
                20

        };


        showMessage(
            "🔥 LEGENDARY WEAPON!"
        );

    }

    else if (
        roll < .20
    ) {

        player.weapon = {

            name:
                "⚔️ Steel Sword",

            damage:
                10

        };


        showMessage(
            "⚔️ RARE WEAPON!"
        );

    }

    else if (
        roll < .45
    ) {

        player.potions++;


        showMessage(
            "🧪 HEALTH POTION FOUND!"
        );

    }

}


// ============================================================
// LEVEL UP
// ============================================================

function levelUpCheck() {

    while (
        player.xp >=
        player.xpRequired
    ) {

        player.xp -=
            player.xpRequired;


        player.level++;


        player.xpRequired =
            Math.floor(
                player.xpRequired *
                1.35
            );


        player.maxHp +=
            20;


        player.hp =
            player.maxHp;


        player.attackPower +=
            5;


        player.defense +=
            2;


        createLevelUpEffect();


        screenShake(
            8
        );


        showMessage(
            `🎉 LEVEL UP! LEVEL ${player.level}!`
        );

    }

}


// ============================================================
// DUNGEON COMPLETE
// ============================================================

function dungeonComplete() {

    dungeon.completed =
        true;


    const bonus =
        dungeon.number *
        100;


    player.gold +=
        bonus;


    createDungeonClearEffect();


    showMessage(
        `🏆 DUNGEON ${dungeon.number} CLEARED! +${bonus} GOLD`
    );


    setTimeout(
        () => {

            nextDungeon();

        },
        2500
    );

}


// ============================================================
// NEXT DUNGEON
// ============================================================

function nextDungeon() {

    dungeon.number++;


    dungeon.defeated =
        0;


    dungeon.completed =
        false;


    dungeon.totalEnemies =
        Math.min(
            3 +
            Math.floor(
                dungeon.number /
                2
            ),
            8
        );


    player.x =
        180;

    player.y =
        300;

    player.hp =
        player.maxHp;


    showMessage(
        `🚪 ENTERING DUNGEON ${dungeon.number}...`
    );


    setTimeout(
        () => {

            spawnEnemy();

        },
        1200
    );

}


// ============================================================
// DEATH
// ============================================================

function playerDeath() {

    player.dead =
        true;


    player.hp =
        0;


    createPlayerDeathEffect();


    screenShake(
        15
    );


    showMessage(
        "💀 YOU DIED! PRESS R TO RESTART."
    );

}


// ============================================================
// RESTART
// ============================================================

function restartGame() {

    player.x =
        180;

    player.y =
        300;

    player.hp =
        100;

    player.maxHp =
        100;

    player.level =
        0;

    player.xp =
        0;

    player.xpRequired =
        100;

    player.attackPower =
        10;

    player.defense =
        5;

    player.gold =
        0;

    player.dead =
        false;

    player.potions =
        3;


    player.weapon = {

        name:
            "Wooden Sword",

        damage:
            0

    };


    dungeon.number =
        1;

    dungeon.defeated =
        0;

    dungeon.totalEnemies =
        3;

    dungeon.completed =
        false;


    particles = [];

    effects = [];

    damageNumbers = [];


    spawnEnemy();


    showMessage(
        "⚔️ NEW ADVENTURE STARTED!"
    );

}


// ============================================================
// PARTICLES
// ============================================================

function createParticles(
    x,
    y,
    amount
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x: x,

            y: y,

            vx:
                random(
                    -4,
                    4
                ),

            vy:
                random(
                    -4,
                    4
                ),

            life:
                random(
                    20,
                    50
                ),

            size:
                random(
                    2,
                    6
                )

        });

    }

}


function updateParticles() {

    particles.forEach(
        p => {

            p.x +=
                p.vx;

            p.y +=
                p.vy;

            p.vy +=
                .08;

            p.life--;

        }
    );


    particles =
        particles.filter(
            p =>
                p.life > 0
        );

}


function drawParticles() {

    particles.forEach(
        p => {

            ctx.globalAlpha =
                p.life / 50;


            ctx.fillStyle =
                "#ffffff";


            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }
    );


    ctx.globalAlpha =
        1;

}


// ============================================================
// DAMAGE NUMBERS
// ============================================================

function createDamageNumber(
    x,
    y,
    damage,
    critical,
    heal = false
) {

    damageNumbers.push({

        x: x,

        y: y,

        damage: damage,

        critical:
            critical,

        heal:
            heal,

        life:
            50

    });

}


function updateDamageNumbers() {

    damageNumbers.forEach(
        d => {

            d.y -=
                1;

            d.life--;

        }
    );


    damageNumbers =
        damageNumbers.filter(
            d =>
                d.life > 0
        );

}


function drawDamageNumbers() {

    damageNumbers.forEach(
        d => {

            ctx.globalAlpha =
                d.life / 50;


            ctx.textAlign =
                "center";


            ctx.font =
                d.critical
                    ? "bold 25px Arial"
                    : "bold 18px Arial";


            ctx.fillStyle =
                d.heal
                    ? "#55ff91"
                    : d.critical
                        ? "#ffd000"
                        : "#ffffff";


            ctx.shadowColor =
                "#000000";

            ctx.shadowBlur =
                5;


            ctx.fillText(
                d.heal
                    ? `+${d.damage}`
                    : `-${d.damage}`,
                d.x,
                d.y
            );


            ctx.shadowBlur =
                0;

        }
    );


    ctx.globalAlpha =
        1;


    ctx.textAlign =
        "left";

}


// ============================================================
// EFFECTS
// ============================================================

function createSlashEffect(
    x,
    y
) {

    effects.push({

        type:
            "slash",

        x: x,

        y: y,

        life:
            18,

        size:
            30

    });

}


function createPowerEffect(
    x,
    y
) {

    effects.push({

        type:
            "power",

        x: x,

        y: y,

        life:
            35,

        size:
            20

    });

}


function createDashEffect() {

    effects.push({

        type:
            "dash",

        x:
            player.x,

        y:
            player.y,

        life:
            25,

        size:
            45

    });

}


function createFireEffect(
    x,
    y
) {

    effects.push({

        type:
            "fire",

        x: x,

        y: y,

        life:
            40,

        size:
            20

    });

}


function createDashTrail(
    x1,
    x2,
    y
) {

    effects.push({

        type:
            "trail",

        x1:
            x1,

        x2:
            x2,

        y:
            y,

        life:
            20

    });

}


function createShadowTeleport(
    x,
    y
) {

    effects.push({

        type:
            "shadow",

        x: x,

        y: y,

        life:
            35,

        size:
            15

    });

}


function createBossDeathEffect(
    x,
    y
) {

    effects.push({

        type:
            "bossDeath",

        x: x,

        y: y,

        life:
            80,

        size:
            20

    });

}


function createLevelUpEffect() {

    effects.push({

        type:
            "level",

        x:
            player.x,

        y:
            player.y,

        life:
            70,

        size:
            20

    });

}


function createDungeonClearEffect() {

    effects.push({

        type:
            "clear",

        x:
            canvas.width / 2,

        y:
            canvas.height / 2,

        life:
            100,

        size:
            20

    });

}


function createPlayerDeathEffect() {

    effects.push({

        type:
            "death",

        x:
            player.x,

        y:
            player.y,

        life:
            80,

        size:
            20

    });

}


function createHealEffect() {

    effects.push({

        type:
            "heal",

        x:
            player.x,

        y:
            player.y,

        life:
            60,

        size:
            15

    });

}


// ============================================================
// EFFECT UPDATE
// ============================================================

function updateEffects() {

    effects.forEach(
        effect => {

            effect.life--;

            effect.size +=
                1.5;

        }
    );


    effects =
        effects.filter(
            e =>
                e.life > 0
        );

}


// ============================================================
// DRAW EFFECTS
// ============================================================

function drawEffects() {

    effects.forEach(
        effect => {

            const alpha =
                effect.life /
                80;


            ctx.globalAlpha =
                alpha;


            // SLASH

            if (
                effect.type ===
                "slash"
            ) {

                ctx.strokeStyle =
                    "#ffffff";

                ctx.shadowColor =
                    "#61d8ff";

                ctx.shadowBlur =
                    20;

                ctx.lineWidth =
                    8;


                ctx.beginPath();


                ctx.arc(
                    effect.x,
                    effect.y,
                    effect.size,
                    -.8,
                    .8
                );


                ctx.stroke();


                ctx.shadowBlur =
                    0;

            }


            // POWER

            else if (
                effect.type ===
                "power"
            ) {

                ctx.strokeStyle =
                    "#ff9d00";

                ctx.shadowColor =
                    "#ff6500";

                ctx.shadowBlur =
                    30;

                ctx.lineWidth =
                    8;


                ctx.beginPath();


                ctx.arc(
                    effect.x,
                    effect.y,
                    effect.size,
                    0,
                    Math.PI * 2
                );


                ctx.stroke();


                ctx.shadowBlur =
                    0;

            }


            // DASH

            else if (
                effect.type ===
                "dash"
            ) {

                ctx.strokeStyle =
                    "#54e8ff";

                ctx.shadowColor =
                    "#00bfff";

                ctx.shadowBlur =
                    25;

                ctx.lineWidth =
                    7;


                ctx.beginPath();


                ctx.moveTo(
                    effect.x - 60,
                    effect.y
                );


                ctx.lineTo(
                    effect.x + 60,
                    effect.y
                );


                ctx.stroke();


                ctx.shadowBlur =
                    0;

            }


            // FIRE

            else if (
                effect.type ===
                "fire"
            ) {

                const gradient =
                    ctx.createRadialGradient(
                        effect.x,
                        effect.y,
                        2,
                        effect.x,
                        effect.y,
                        effect.size
                    );


                gradient.addColorStop(
                    0,
                    "#fff7a0"
                );


                gradient.addColorStop(
                    .3,
                    "#ffbd22"
                );


                gradient.addColorStop(
                    .7,
                    "#ff5a00"
                );


                gradient.addColorStop(
                    1,
                    "rgba(255,0,0,0)"
                );


                ctx.fillStyle =
                    gradient;


                ctx.beginPath();


                ctx.arc(
                    effect.x,
                    effect.y,
                    effect.size,
                    0,
                    Math.PI * 2
                );


                ctx.fill();

            }


            // TRAIL

            else if (
                effect.type ===
                "trail"
            ) {

                ctx.strokeStyle =
                    "#5be8ff";

                ctx.lineWidth =
                    5;


                ctx.beginPath();


                ctx.moveTo(
                    effect.x1,
                    effect.y
                );


                ctx.lineTo(
                    effect.x2,
                    effect.y
                );


                ctx.stroke();

            }


            // SHADOW

            else if (
                effect.type ===
                "shadow"
            ) {

                ctx.fillStyle =
                    "#8a48ff";

                ctx.shadowColor =
                    "#8a48ff";

                ctx.shadowBlur =
                    30;


                ctx.beginPath();


                ctx.arc(
                    effect.x,
                    effect.y,
                    effect.size,
                    0,
                    Math.PI * 2
                );


                ctx.fill();


                ctx.shadowBlur =
                    0;

            }


            // LEVEL

            else if (
                effect.type ===
                "level"
            ) {

                ctx.strokeStyle =
                    "#62d9ff";

                ctx.shadowColor =
                    "#00aaff";

                ctx.shadowBlur =
                    30;

                ctx.lineWidth =
                    6;


                ctx.beginPath();


                ctx.arc(
                    effect.x,
                    effect.y,
                    effect.size,
                    0,
                    Math.PI * 2
                );


                ctx.stroke();


                ctx.shadowBlur =
                    0;

            }


            // HEAL

            else if (
                effect.type ===
                "heal"
            ) {

                ctx.strokeStyle =
                    "#55ff91";

                ctx.shadowColor =
                    "#00ff77";

                ctx.shadowBlur =
                    25;

                ctx.lineWidth =
                    7;


                ctx.beginPath();


                ctx.arc(
                    effect.x,
                    effect.y,
                    effect.size,
                    0,
                    Math.PI * 2
                );


                ctx.stroke();


                ctx.shadowBlur =
                    0;

            }


            // BOSS DEATH

            else if (
                effect.type ===
                "bossDeath"
            ) {

                ctx.strokeStyle =
                    "#ff3333";

                ctx.shadowColor =
                    "#ff0000";

                ctx.shadowBlur =
                    30;

                ctx.lineWidth =
                    10;


                ctx.beginPath();


                ctx.arc(
                    effect.x,
                    effect.y,
                    effect.size,
                    0,
                    Math.PI * 2
                );


                ctx.stroke();


                ctx.shadowBlur =
                    0;

            }


            // DEATH

            else if (
                effect.type ===
                "death"
            ) {

                ctx.strokeStyle =
                    "#ff3333";

                ctx.lineWidth =
                    8;


                ctx.beginPath();


                ctx.arc(
                    effect.x,
                    effect.y,
                    effect.size,
                    0,
                    Math.PI * 2
                );


                ctx.stroke();

            }

        }
    );


    ctx.globalAlpha =
        1;

}


// ============================================================
// DUNGEON
// ============================================================

function drawDungeon() {

    ctx.fillStyle =
        "#080c13";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const gradient =
        ctx.createLinearGradient(
            0,
            60,
            0,
            canvas.height
        );


    gradient.addColorStop(
        0,
        "#151d2b"
    );


    gradient.addColorStop(
        1,
        "#080b12"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        60,
        canvas.width,
        canvas.height
    );


    for (
        let x = 0;
        x < canvas.width;
        x += 50
    ) {

        for (
            let y = 60;
            y < canvas.height;
            y += 50
        ) {

            ctx.strokeStyle =
                "rgba(70,85,110,.18)";


            ctx.strokeRect(
                x,
                y,
                50,
                50
            );

        }

    }


    ctx.fillStyle =
        "#202c40";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        60
    );


    ctx.fillStyle =
        "#151e2c";


    ctx.fillRect(
        0,
        canvas.height - 30,
        canvas.width,
        30
    );


    drawTorch(
        70,
        75
    );


    drawTorch(
        930,
        75
    );


    drawTorch(
        70,
        530
    );


    drawTorch(
        930,
        530
    );


    ctx.fillStyle =
        "#7387a8";


    ctx.font =
        "bold 18px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(
        `DUNGEON ${dungeon.number}`,
        canvas.width / 2,
        38
    );


    ctx.textAlign =
        "left";

}


function drawTorch(
    x,
    y
) {

    ctx.fillStyle =
        "#704323";


    ctx.fillRect(
        x - 4,
        y,
        8,
        28
    );


    const glow =
        ctx.createRadialGradient(
            x,
            y - 5,
            2,
            x,
            y - 5,
            55
        );


    glow.addColorStop(
        0,
        "rgba(255,180,40,.3)"
    );


    glow.addColorStop(
        1,
        "rgba(255,100,0,0)"
    );


    ctx.fillStyle =
        glow;


    ctx.beginPath();


    ctx.arc(
        x,
        y - 5,
        55,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.fillStyle =
        "#ff8a00";


    ctx.beginPath();


    ctx.arc(
        x,
        y - 6,
        10 +
        Math.sin(
            Date.now() / 100
        ) * 2,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.fillStyle =
        "#ffe58a";


    ctx.beginPath();


    ctx.arc(
        x,
        y - 7,
        4,
        0,
        Math.PI * 2
    );


    ctx.fill();

}


// ============================================================
// PLAYER DRAW
// ============================================================

function drawPlayer() {

    if (
        player.dead
    ) {

        ctx.globalAlpha =
            .3;

    }


    if (
        player.invincible
    ) {

        ctx.globalAlpha =
            .55;

    }


    let animationOffset =
        Math.sin(
            Date.now() / 120
        ) * 2;


    let px =
        player.x;


    let py =
        player.y +
        animationOffset;


    // ATTACK ANIMATION

    if (
        player.attacking
    ) {

        if (
            player.attackAnimation
            === 1
        ) {

            px +=
                6;

        }

        else if (
            player.attackAnimation
            === 2
        ) {

            px +=
                12;

        }

        else if (
            player.attackAnimation
            === 3
        ) {

            px +=
                15;

        }

        else if (
            player.attackAnimation
            === 4
        ) {

            py -=
                5;

        }

    }


    // SHADOW

    ctx.fillStyle =
        "rgba(0,0,0,.45)";


    ctx.beginPath();


    ctx.ellipse(
        px + 21,
        py + 57,
        28,
        9,
        0,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // BODY

    ctx.fillStyle =
        "#276ed1";


    ctx.fillRect(
        px + 5,
        py + 20,
        32,
        32
    );


    // CAPE

    ctx.fillStyle =
        "#152b55";


    ctx.beginPath();


    ctx.moveTo(
        px + 5,
        py + 24
    );


    ctx.lineTo(
        px - 2,
        py + 55
    );


    ctx.lineTo(
        px + 35,
        py + 55
    );


    ctx.lineTo(
        px + 36,
        py + 24
    );


    ctx.fill();


    // HEAD

    ctx.fillStyle =
        "#f1b58b";


    ctx.beginPath();


    ctx.arc(
        px + 21,
        py + 14,
        14,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // HAIR

    ctx.fillStyle =
        "#0b0d12";


    ctx.beginPath();


    ctx.arc(
        px + 21,
        py + 9,
        14,
        Math.PI,
        Math.PI * 2
    );


    ctx.fill();


    // EYES

    ctx.fillStyle =
        "#60d9ff";


    ctx.shadowColor =
        "#00cfff";

    ctx.shadowBlur =
        8;


    ctx.fillRect(
        px + 15,
        py + 14,
        4,
        3
    );


    ctx.fillRect(
        px + 25,
        py + 14,
        4,
        3
    );


    ctx.shadowBlur =
        0;


    drawWeapon(
        px,
        py
    );


    ctx.globalAlpha =
        1;

}


// ============================================================
// WEAPON + ATTACK ANIMATION
// ============================================================

function drawWeapon(
    px,
    py
) {

    let angle =
        .35;


    if (
        player.attacking
    ) {

        const progress =
            1 -
            player.attackTimer /
            30;


        angle =
            -.9 +
            progress *
            2.0;

    }


    ctx.save();


    ctx.translate(
        px + 36,
        py + 32
    );


    ctx.rotate(
        angle
    );


    let bladeColor =
        "#dce7f5";


    if (
        player.weapon.name
            .includes(
                "Steel"
            )
    ) {

        bladeColor =
            "#8bd6ff";

    }


    if (
        player.weapon.name
            .includes(
                "Inferno"
            )
    ) {

        bladeColor =
            "#ff7b00";


        ctx.shadowColor =
            "#ff3300";

        ctx.shadowBlur =
            20;

    }


    ctx.fillStyle =
        bladeColor;


    ctx.beginPath();


    ctx.moveTo(
        0,
        -4
    );


    ctx.lineTo(
        48,
        -3
    );


    ctx.lineTo(
        53,
        0
    );


    ctx.lineTo(
        48,
        3
    );


    ctx.lineTo(
        0,
        4
    );


    ctx.fill();


    ctx.fillStyle =
        "#80502b";


    ctx.fillRect(
        -10,
        -5,
        11,
        10
    );


    ctx.restore();


    ctx.shadowBlur =
        0;

}


// ============================================================
// ENEMY DRAW
// ============================================================

function drawEnemy() {

    if (
        !enemy ||
        !enemy.alive
    )
        return;


    let ex =
        enemy.x;


    let ey =
        enemy.y;


    // ENEMY ATTACK MOVEMENT

    if (
        enemy.attackTimer >
        0
    ) {

        if (
            enemy.attackAnimation
            === 1
        ) {

            ex -=
                12;

        }

        else if (
            enemy.attackAnimation
            === 2
        ) {

            ex +=
                18;

        }

        else if (
            enemy.attackAnimation
            === 3
        ) {

            ey +=
                10;

        }

        else if (
            enemy.attackAnimation
            === 5
        ) {

            ey -=
                8;

        }

    }


    // HURT

    if (
        enemy.hurtAnimation >
        0
    ) {

        ex +=
            Math.sin(
                enemy.hurtAnimation *
                2
            ) *
            4;

    }


    const bob =
        Math.sin(
            Date.now() / 170
        ) * 2;


    ey +=
        bob;


    if (
        enemy.hitFlash >
        0
    ) {

        ctx.globalAlpha =
            .45;

    }


    // SHADOW

    ctx.fillStyle =
        "rgba(0,0,0,.5)";


    ctx.beginPath();


    ctx.ellipse(
        ex,
        ey + enemy.height,
        enemy.width * .55,
        10,
        0,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // BOSS AURA

    if (
        enemy.boss
    ) {

        const aura =
            ctx.createRadialGradient(
                ex,
                ey + 30,
                10,
                ex,
                ey + 30,
                90
            );


        aura.addColorStop(
            0,
            "rgba(255,0,0,.3)"
        );


        aura.addColorStop(
            1,
            "rgba(255,0,0,0)"
        );


        ctx.fillStyle =
            aura;


        ctx.beginPath();


        ctx.arc(
            ex,
            ey + 30,
            90,
            0,
            Math.PI * 2
        );


        ctx.fill();

    }


    // BODY

    const bodyGradient =
        ctx.createLinearGradient(
            ex,
            ey,
            ex,
            ey +
            enemy.height
        );


    bodyGradient.addColorStop(
        0,
        enemy.color
    );


    bodyGradient.addColorStop(
        1,
        "#151820"
    );


    ctx.fillStyle =
        bodyGradient;


    ctx.fillRect(
        ex -
        enemy.width / 2,
        ey,
        enemy.width,
        enemy.height
    );


    // HEAD

    ctx.fillStyle =
        enemy.color;


    ctx.beginPath();


    ctx.arc(
        ex,
        ey,
        enemy.boss
            ? 30
            : 23,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // EYES

    ctx.fillStyle =
        "#ff2222";


    ctx.shadowColor =
        "#ff0000";

    ctx.shadowBlur =
        12;


    ctx.beginPath();


    ctx.arc(
        ex - 8,
        ey - 3,
        4,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.arc(
        ex + 8,
        ey - 3,
        4,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.shadowBlur =
        0;


    // GOBLIN / BOSS HORNS

    if (
        enemy.type ===
        "Goblin" ||
        enemy.boss
    ) {

        ctx.fillStyle =
            "#e8e0d2";


        ctx.beginPath();


        ctx.moveTo(
            ex - 15,
            ey - 15
        );


        ctx.lineTo(
            ex - 27,
            ey - 42
        );


        ctx.lineTo(
            ex - 6,
            ey - 22
        );


        ctx.fill();


        ctx.beginPath();


        ctx.moveTo(
            ex + 15,
            ey - 15
        );


        ctx.lineTo(
            ex + 27,
            ey - 42
        );


        ctx.lineTo(
            ex + 6,
            ey - 22
        );


        ctx.fill();

    }


    // MAGE STAFF

    if (
        enemy.type ===
        "Dark Mage"
    ) {

        ctx.strokeStyle =
            "#a966ff";

        ctx.shadowColor =
            "#8a40ff";

        ctx.shadowBlur =
            15;

        ctx.lineWidth =
            5;


        ctx.beginPath();


        ctx.moveTo(
            ex + 28,
            ey + 10
        );


        ctx.lineTo(
            ex + 28,
            ey + 65
        );


        ctx.stroke();


        ctx.fillStyle =
            "#d86cff";


        ctx.beginPath();


        ctx.arc(
            ex + 28,
            ey + 4,
            8,
            0,
            Math.PI * 2
        );


        ctx.fill();


        ctx.shadowBlur =
            0;

    }


    // BOSS CROWN

    if (
        enemy.boss
    ) {

        ctx.fillStyle =
            "#ffd84a";


        ctx.shadowColor =
            "#ffb000";

        ctx.shadowBlur =
            15;


        ctx.beginPath();


        ctx.moveTo(
            ex - 25,
            ey - 30
        );


        ctx.lineTo(
            ex - 18,
            ey - 48
        );


        ctx.lineTo(
            ex - 5,
            ey - 35
        );


        ctx.lineTo(
            ex,
            ey - 52
        );


        ctx.lineTo(
            ex + 8,
            ey - 35
        );


        ctx.lineTo(
            ex + 22,
            ey - 48
        );


        ctx.lineTo(
            ex + 27,
            ey - 30
        );


        ctx.closePath();


        ctx.fill();


        ctx.shadowBlur =
            0;

    }


    // ENEMY ATTACK WEAPON

    if (
        enemy.type ===
        "Orc" ||
        enemy.boss
    ) {

        let attackAngle =
            .5;


        if (
            enemy.attackTimer >
            0
        ) {

            attackAngle =
                -1.2;

        }


        ctx.save();


        ctx.translate(
            ex + 25,
            ey + 30
        );


        ctx.rotate(
            attackAngle
        );


        ctx.fillStyle =
            "#bfc8d5";


        ctx.fillRect(
            0,
            -5,
            42,
            10
        );


        ctx.fillStyle =
            "#80502b";


        ctx.fillRect(
            -8,
            -5,
            10,
            10
        );


        ctx.restore();

    }


    // HEALTH BAR

    const barWidth =
        enemy.boss
            ? 140
            : 85;


    ctx.fillStyle =
        "#171b22";


    ctx.fillRect(
        ex -
        barWidth / 2,
        ey - 58,
        barWidth,
        8
    );


    ctx.fillStyle =
        enemy.boss
            ? "#ff3030"
            : "#34df79";


    ctx.fillRect(
        ex -
        barWidth / 2,
        ey - 58,
        barWidth *
        Math.max(
            0,
            enemy.hp /
            enemy.maxHp
        ),
        8
    );


    ctx.globalAlpha =
        1;

}


// ============================================================
// FLOATING ORBS
// ============================================================

function updateFloatingOrbs() {

    floatingOrbs.forEach(
        orb => {

            orb.y -=
                orb.speed;

            orb.life--;

        }
    );


    floatingOrbs =
        floatingOrbs.filter(
            orb =>
                orb.life > 0
        );

}


function drawFloatingOrbs() {

    floatingOrbs.forEach(
        orb => {

            ctx.globalAlpha =
                orb.life /
                80;


            ctx.fillStyle =
                "#a56cff";


            ctx.shadowColor =
                "#8a4cff";

            ctx.shadowBlur =
                10;


            ctx.beginPath();


            ctx.arc(
                orb.x,
                orb.y,
                orb.size,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }
    );


    ctx.shadowBlur =
        0;

    ctx.globalAlpha =
        1;

}


// ============================================================
// UPDATE
// ============================================================

function update() {

    if (
        !player.dead
    ) {

        movePlayer();

        enemyAI();

    }


    if (
        player.dodgeTimer >
        0
    )
        player.dodgeTimer--;


    if (
        player.basicCooldown >
        0
    )
        player.basicCooldown--;


    if (
        player.powerCooldown >
        0
    )
        player.powerCooldown--;


    if (
        player.dashCooldown >
        0
    )
        player.dashCooldown--;


    if (
        player.fireCooldown >
        0
    )
        player.fireCooldown--;


    if (
        player.healCooldown >
        0
    )
        player.healCooldown--;


    if (
        player.attackTimer >
        0
    ) {

        player.attackTimer--;

    }

    else {

        player.attacking =
            false;

        player.attackAnimation =
            0;

    }


    if (
        enemy &&
        enemy.hitFlash >
        0
    ) {

        enemy.hitFlash--;

    }


    updateParticles();

    updateDamageNumbers();

    updateEffects();

    updateFloatingOrbs();

    updateUI();

}


// ============================================================
// CAMERA
// ============================================================

function beginCamera() {

    if (
        camera.shake >
        0
    ) {

        const x =
            random(
                -camera.shakePower,
                camera.shakePower
            );


        const y =
            random(
                -camera.shakePower,
                camera.shakePower
            );


        ctx.translate(
            x,
            y
        );


        camera.shake--;

    }

}


// ============================================================
// DRAW
// ============================================================

function draw() {

    ctx.save();


    beginCamera();


    drawDungeon();

    drawFloatingOrbs();

    drawEffects();

    drawParticles();

    drawPlayer();

    drawEnemy();

    drawDamageNumbers();


    ctx.restore();

}


// ============================================================
// UI
// ============================================================

function updateUI() {

    levelEl.textContent =
        player.level;


    goldEl.textContent =
        player.gold;


    hpText.textContent =
        `${Math.floor(player.hp)} / ${player.maxHp}`;


    hpBar.style.width =
        `${Math.max(
            0,
            player.hp /
            player.maxHp *
            100
        )}%`;


    xpText.textContent =
        `${player.xp} / ${player.xpRequired}`;


    xpBar.style.width =
        `${Math.min(
            100,
            player.xp /
            player.xpRequired *
            100
        )}%`;


    attackStat.textContent =
        player.attackPower +
        player.weapon.damage;


    defenseStat.textContent =
        player.defense;


    weaponName.textContent =
        player.weapon.name;


    weaponDamage.textContent =
        `+${player.weapon.damage}`;


    dungeonText.textContent =
        `Dungeon ${dungeon.number}`;


    enemyCount.textContent =
        `${dungeon.defeated} / ${dungeon.totalEnemies}`;


    potionCount.textContent =
        player.potions;


    if (
        enemy
    ) {

        enemyName.textContent =
            enemy.boss
                ? `👑 ${enemy.name}`
                : enemy.name;


        enemyHpText.textContent =
            `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;


        enemyHpBar.style.width =
            `${Math.max(
                0,
                enemy.hp /
                enemy.maxHp *
                100
            )}%`;


        enemyLevel.textContent =
            dungeon.number;


        enemyAttack.textContent =
            enemy.attackPower;

    }


    // SKILL STATUS

    if (
        player.level <
        3
    ) {

        skillStatus.textContent =
            "Dash 🔒 Lv3";

    }

    else if (
        player.level <
        5
    ) {

        skillStatus.textContent =
            "Dash ✓ | Power 🔒";

    }

    else if (
        player.level <
        8
    ) {

        skillStatus.textContent =
            "Dash ✓ | Power ✓ | Fire 🔒";

    }

    else {

        skillStatus.textContent =
            "🔥 ALL SKILLS";

    }


    // COOLDOWNS

    powerCooldown.textContent =
        cooldownText(
            player.powerCooldown
        );


    dashCooldown.textContent =
        cooldownText(
            player.dashCooldown
        );


    fireCooldown.textContent =
        cooldownText(
            player.fireCooldown
        );


    healCooldown.textContent =
        cooldownText(
            player.healCooldown
        );

}


function cooldownText(
    value
) {

    if (
        value <= 0
    ) {

        return "READY";

    }


    return (
        value /
        60
    ).toFixed(1) + "s";

}


// ============================================================
// GAME LOOP
// ============================================================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}


// ============================================================
// START
// ============================================================

spawnEnemy();

updateUI();

gameLoop();


console.log(
    "Dungeon Ascension Mobile Combat loaded!"
);