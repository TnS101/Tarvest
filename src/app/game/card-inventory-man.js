async function exe(action, res) {

    const modMan = require('../mod-man').exe();
    const models = require('../modules');

    const CardModel = models.getModel('card');
    const CardInventoryModel = models.getModel('card-inventory');
    const UserModel = models.getModel('user');

    const inventory = await modMan.getMod({ _id: res.id }, CardInventoryModel);
    const user = await modMan.getMod({ _id: res.userId }, UserModel);
    const card = await modMan.getMod({ _id: res.cardId }, CardModel);

    if (action === 'loot') {
        inventoryIncrement(inventory, user._id, card._id, 1);

    } else if (action === 'disolve') {
        inventorySubstract(inventory, 1);
        for (const key in user) {
            if (user.hasOwnProperty(card.onDisolve.rewardType)) {
                user[key] += card.onDisolve.amount;
            }
        }

    } else if (action === 'craft') {
        card.onCraft.ingredients.reduce(function(acc, curr) {
            const ingredient = async() => { await modMan.getMod({ userId: user._id, cardId: curr.id }, CardInventoryModel) };

            if (ingredient === undefined) {
                return;
            }
            if (user[card.onCraft.cost.type] < card.onCraft.cost.amount) {
                return;
            }
            inventorySubstract(ingredient, curr.amount);
        }, 0);

        user[card.onCraft.cost.type] -= card.onCraft.cost.amount;
        user.xp += await modMan.getMod({ _id: card.onCraft.rewardId }, CardModel).xp;

        if (user.xp > user.xpCap) {
            await require('../identity/user-man').levelUp(user, modMan);
        }

        const craftedItemInventory = await modMan.getMod({ userId: user._id, cardId: card.onCraft.rewardId }, CardInventoryModel);
        inventoryIncrement(craftedItemInventory, user._id, card.onCraft.rewardId, 1);
    }

    function inventoryIncrement(inventory, userId, cardId, count) {
        if (!inventory) {
            inventory = new CardInventoryModel({ userId: userId, cardId: cardId, count: count });
        } else {
            inventory.count++;
        }

        inventory.save();

        user.inventorySpace -= count;
        user.save();
    }

    function inventorySubstract(inventory, count) {
        if (inventory && inventory.count > count) {
            inventory.count -= count;
            inventory.save();
        }

        user.inventorySpace += count;
        user.save();
    }
}

module.exports = { exe };