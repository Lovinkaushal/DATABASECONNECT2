//Get all Child
const getAllChild = async (userId, childArr, levelCount) => {
    return new Promise(async (resolve, reject) => {
        try {
            var blankUserId = [];
            let userListing = await clientModel.find({ referred_by: { $in: userId } })
            userListing.forEach((element,index) => {
                childArr.push(element._id)
                blankUserId.push(element._id)
            });
            // Level Count is Generation of Child
            if (blankUserId.length > 0 && levelCount < 7) {
                levelCount++;
                await getAllChild(blankUserId, childArr, levelCount);
            }
            resolve(childArr);
        } catch (error) {
            reject(error);
        }
    })
}