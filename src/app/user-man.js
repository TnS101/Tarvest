const User = require('./modules').getModel('user');

export function login() {

}

export function logout() {

}

export function register() {

}

export async function levelUp(user, modMan) {
    await modMan.updateMod(user, [{ key: 'level', val: user.level + 1 }, { key: 'xp', val: 0 }, { key: 'xpCap', val: user.xpCap + user.xpCap * 0.15 }, { key: 'coins', val: user.coins + 12 * user.level + 8 * user.level }, { key: 'gems', val: user.gems + 10 }]);
}