async function exe(modelName, action, amount, res) {

    const modMan = require('../mod-man').exe();
    const models = require('../modules');

    const BaseModel = models.getModel(modelName.split('-inventory')[0]);
    const InventoryModel = models.getModel(modelName);
    const UserModel = models.getModel('user');

    const inventory = await modMan.getMod({ _id: res.id }, InventoryModel);
    const user = await modMan.getMod({ _id: res.userId }, UserModel);
    const card = await modMan.getMod({ _id: res.cardId }, BaseModel);

    if (action === 'loot') {
        inventoryIncrement(inventory, user._id, card._id, amount);
        user.save();

    } else if (action === 'disolve') {
        inventorySubstract(inventory, amount);
        for (const key in user) {
            if (key === card.onDisolve.rewardType) {
                user[key] += card.onDisolve.amount;
            }
        }
        user.save();

    } else if (action === 'craft') {
        card.onCraft.ingredients.reduce(function(acc, curr) {
            const ingredient = async() => { await modMan.getMod({ userId: user._id, cardId: curr.id }, InventoryModel) };

            if (ingredient === undefined) {
                return;
            }
            if (user[card.onCraft.cost.type] < card.onCraft.cost.amount) {
                return;
            }
            inventorySubstract(ingredient, curr.amount);
        }, 0);

        user[card.onCraft.cost.type] -= card.onCraft.cost.amount;
        user.xp += await modMan.getMod({ _id: card.onCraft.rewardId }, BaseModel).xp;

        if (user.xp > user.xpCap) {
            await require('../identity/user-man').levelUp(user, modMan);
        }

        const craftedItemInventory = await modMan.getMod({ userId: user._id, cardId: card.onCraft.rewardId }, InventoryModel);
        inventoryIncrement(craftedItemInventory, user._id, card.onCraft.rewardId, 1);
        user.save();

    } else if (action === 'sell') {
        inventoryIncrement(inventory, user._id, card_id, amount);

        for (let i = 0; i < amount; i++) {
            user.coins += card.sell;
        }

        user.save();
    }

    function inventoryIncrement(inventory, userId, cardId, amount) {
        if (!inventory) {
            inventory = new InventoryModel({ userId: userId, cardId: cardId, count: amount });
        } else {
            inventory.count++;
        }

        inventory.save();

        user.inventorySpace -= amount;
    }

    function inventorySubstract(inventory, amount) {
        if (inventory && inventory.amount > amount) {
            inventory.amount -= amount;
            inventory.save();
        }

        user.inventorySpace += amount;
    }
}

module.exports = { exe };