const modMan = require('../mod-man');
const models = require('../modules');

const CardModel = models.getModel('card');
const CardInventoryModel = models.getModel('card-inventory');
const UserModel = models.getModel('user');

async function exe(action, cardId, userId) {
    let result = null;

    const user = await modMan.getMod({ _id: userId }, UserModel);
    const card = await modMan.getMod({ _id: cardId }, CardModel);
    const inventory = await modMan.getMod({ userId: userId, cardId: cardId }, CardInventoryModel);

    if (action === 'loot') {
        if (!inventory) {
            inventory = new CardInventoryModel({ userId: userId, cardId: cardId, count: 1 });
            inventory.save();
        } else {
            inventory.count--;
            inventory.save();
        }
        user.inventorySpace--;
        user.save();
    } else if (action === 'disolve') {
        inventorySubstract(1);
        for (const key in user) {
            if (user.hasOwnProperty(card.onDisolve.rewardType)) {
                user[key] += card.onDisolve.amount;
            }
        }
    } else if (action === 'craft') {

    }

    function inventorySubstract(count) {
        if (inventory.count > count) {
            inventory.count -= count;
            inventory.save();
        } else if (inventory.count == count) {
            CardInventoryModel.findOneAndDelete({ userId: user.Id, cardId: card.Id });
        } else {
            throw new Error('Invalid Action!');
        }

        user.inventorySpace += count;
        user.save();
    }

    return result;
}

module.exports = exe;