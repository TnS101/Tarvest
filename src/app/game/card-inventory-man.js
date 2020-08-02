async function exe(action, entity) {

    const modMan = require('../mod-man');
    const models = require('../modules');

    const CardModel = models.getModel('card');
    const CardInventoryModel = models.getModel('card-inventory');
    const UserModel = models.getModel('user');

    const user = await modMan.getMod({ _id: entity.userId }, UserModel);
    const card = await modMan.getMod({ _id: entity.cardId }, CardModel);

    if (action === 'loot') {
        inventoryIncrement(entity, user._id, card._id, 1);

    } else if (action === 'disolve') {
        inventorySubstract(entity, 1);
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
            inventory.save();
        } else {
            inventory.count--;
            inventory.save();
        }

        user.inventorySpace -= count;
        user.save();
    }

    function inventorySubstract(inventory, count) {
        if (inventory.count > count) {
            inventory.count -= count;
            inventory.save();
        } else {
            return;
        }

        user.inventorySpace += count;
        user.save();
    }
}

module.exports = exe;