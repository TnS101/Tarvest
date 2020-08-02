const modMan = require('../mod-man');
const models = require('../modules');

const CardModel = models.getModel('card');
const CardInventoryModel = models.getModel('card-inventory');
const UserModel = models.getModel('user');

async function exe(action, cardId, userId) {

    const user = await modMan.getMod({ _id: userId }, UserModel);
    const card = await modMan.getMod({ _id: cardId }, CardModel);
    const inventory = await modMan.getMod({ userId: userId, cardId: cardId }, CardInventoryModel);

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
            const ingredient = await modMan.getMod({ userId: user._id, cardId: curr.id }, CardInventoryModel);

            if (ingredient === undefined) {
                invalid();
            }
            if (user[card.onCraft.cost.type] < card.onCraft.cost.amount) {
                invalid();
            }
            inventorySubstract(ingredient, curr.amount);
        }, 0);

        user[card.onCraft.cost.type] -= card.onCraft.cost.amount;
        user.xp += await modMan.getMod({ _id: card.onCraft.rewardId }, CardModel).xp;

        if (user.xp > user.xpCap) {
            import { levelUp } from '../identity/user-man.js'
            await levelUp(user, modMan);
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
        } else if (inventory.count == count) {
            CardInventoryModel.findOneAndDelete({ userId: user.Id, cardId: card.Id });
        } else {
            invalid();
        }

        user.inventorySpace += count;
        user.save();
    }

    function invalid() {
        throw new Error('Invalid Action!');
    }
}

module.exports = exe;