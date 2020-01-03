/* LAYOUT CONTROL CONSTANTS */

/** Min height difference ratio between the shortest and tallest inner column (to minimise white space) - must be a num between 0 and 1 */
const minInnerColHeightDiffRatio = 0.6
/** Min Bulma height of an inner column - must be an int between 1 and 6 */
const minInnerColWidth = 4


/* IMAGE HANDLING FUNCTIONS */

/** Returns 3-dimensional array representing Bulma column structure of ScrapbookImages component */
export const generateScrapbookImageMap = (images) => {
    // In CMS preview, aspect ratios are ignored
    if (isPreview(images)) {
        const imageMap = mapImagesToColumns(images)
        return assignInnerColWidths(imageMap, true)
    }

    const imageList = sortByAspect(images)
    let imageMap = mapImagesToColumns(imageList)
    imageMap = equaliseOuterColAspects(imageMap)
    imageMap = regulariseInnerColAspects(imageMap)
    return assignInnerColWidths(imageMap)
}

const isPreview = (images) => !(images[0].childImageSharp)

const sortByAspect = (imageList) => imageList.sort((a, b) => getAspect(a) - getAspect(b))

/** Returns a randomised map of images */
const mapImagesToColumns = (imageList) => {
    
    // Chosen to ensure aspects are evenly balanced
    const possibleCombinations = [
        [ [[0], [2, 5]], [[1], [3, 4]] ],
        [ [[0], [3, 4]], [[1], [2, 5]] ],
        [ [[0], [3, 5]], [[1], [2, 4]] ]
    ]

    const combination = possibleCombinations[getRandInt(3)]
    const permutation = deepShuffle(combination)

    return permutation.map((outerColImgIndexes) => {
        return outerColImgIndexes.map((innerColImgIndexes) => {
            
            const imagesToRender = innerColImgIndexes.map((i) => imageList[i])
            
            // Randomly determine whether to render 1 or 2 images in innerCol where necessary
            if (innerColImgIndexes.length === 2 && Math.random() < 0.5) {
                imagesToRender.pop()
            }

            return imagesToRender
        })
    })
}

/**
 * Adjusts aspects so that, if all inner columns had the same height, both outer columns would be of equal width.
 * This step is taken to ensure column heights are evenly distributed.
*/
const equaliseOuterColAspects = (imageMap) => {
    const left = imageMap[0]
    const right = imageMap[1]
    
    const lSum = getOuterColAspectSum(imageMap[0])
    const rSum = getOuterColAspectSum(imageMap[1])

    const lAdjust = getOuterColAdjustmentRatio(lSum, rSum)
    const rAdjust = getOuterColAdjustmentRatio(rSum, lSum)

    adjustOuterColAspects(left, lAdjust)
    adjustOuterColAspects(right, rAdjust)

    return imageMap
}

/** Adjusts aspects of innerCols so that the rules set by Layout Control Constants can be satisfied */
const regulariseInnerColAspects = (imageMap) => {
    imageMap.forEach((outerColMap) => {
        const left = outerColMap[0]
        const right = outerColMap[1]

        const leftIsTaller = (getInnerColAspect(left) > getInnerColAspect(right))

        const tall = leftIsTaller ? left : right
        const short = leftIsTaller ? right : left

        const worstRatio = getWorstCaseHeightRatio(tall, short)

        if (worstRatio < minInnerColHeightDiffRatio) {
            const requiredChangeFactor = minInnerColHeightDiffRatio / currRatio
            adjustInnerColAspects(tall, Math.sqrt(requiredChangeFactor))
            adjustInnerColAspects(short, (1 / Math.sqrt(requiredChangeFactor)))
        }
    })
    return imageMap
}

const assignInnerColWidths = (imageMap, isPreview=false) => {
    return imageMap.map((outerColMap) => {
        const validLeftWidths = getValidLeftWidths(outerColMap, isPreview)
        const leftWidth = getRandEl(validLeftWidths)

        const left = { width: `is-${leftWidth}`, images: outerColMap[0] }
        const right = { width: `is-${12 - leftWidth}`, images: outerColMap[1] }

        return [ left, right ]
    })
}

const getAspect = (image) => image.childImageSharp.fluid.aspectRatio

const setAspect = (image, value) => {
    image.childImageSharp.fluid.aspectRatio = value
}

/** Returns the combined aspect ratio of two images stacked on top of each other */
const getStackedAspect = (imgA, imgB) => (getAspect(imgA) * getAspect(imgB)) / (getAspect(imgA) + getAspect(imgB))

const getInnerColAspect = (innerColMap) => (innerColMap.length === 1 ? getAspect(innerColMap[0]) : getStackedAspect(innerColMap[0], innerColMap[1]))

const getOuterColAspectSum = (outerColMap) => outerColMap.reduce(((acc, curr) => acc + getInnerColAspect(curr)), 0)

/** Calculates a proportionate adjustment ratio for outer col aspects */
const getOuterColAdjustmentRatio = (self, other) => (self + other) / (2 * self)

/** Adjusts all aspects within an outer col by a ratio r */
const adjustOuterColAspects = (outerColMap, r) => {
    outerColMap.forEach((innerColMap) => adjustInnerColAspects(innerColMap, r))
}

/** Adjusts all aspects within an inner col by a ratio r */
const adjustInnerColAspects = (innerColMap, r) => {
    innerColMap.forEach((img) => {
        setAspect(img, getAspect(img) * r)
    })
}

const getInnerColHeight = (innerColMap, width) => width / getInnerColAspect(innerColMap)

/** Calculates height ratio between two inner columns, given a width for the left column */
const calculateHeightRatio = (outerColMap, lWidth) => {
    const ratio = getInnerColHeight(outerColMap[0], lWidth) / getInnerColHeight(outerColMap[1], (12 - lWidth))

    if (ratio > 1) {
        return 1 / ratio
    }
    return ratio
}

/** Calculates worst case height ratio between two innerCols, which can be checked against the minInnerColHeightDiffRatio constraint */
const getWorstCaseHeightRatio = (tall, short) =>  (2 * getInnerColAspect(short)) / getInnerColAspect(tall)

const isLeftWidthValid = (outerColMap, lWidth) => {
    return calculateHeightRatio(outerColMap, lWidth) >= minInnerColHeightDiffRatio
}

const getPossibleWidths = () => {
    const minWidth = minInnerColWidth
    const maxWidth = 12 - minWidth
    return Array.from(new Array(maxWidth - minWidth + 1), (_, i) => i + minWidth)
}

/** Returns list of valid bulma widths for left innerCol of an outerCol */
const getValidLeftWidths = (outerColMap, isPreview=false) => {
    if (isPreview) {
        return getPossibleWidths()
    }
    else {
        return getPossibleWidths().filter((lWidth) => isLeftWidthValid(outerColMap, lWidth))
    }
}


/* RANDOMISATION FUNCTIONS */

/** Returns 0 <= randInt < max */
const getRandInt = (max) => Math.floor(Math.random() * max)

const getRandEl = (arr) => arr[getRandInt(arr.length)]

export const shuffle = (arr) => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = getRandInt(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

const deepShuffle = (arr) => {
    if (Array.isArray(arr[0])) {
        const shuffled = arr.map((nestedArr) => deepShuffle(nestedArr))
        return shuffle(shuffled)
    }
    else {
        return shuffle(arr)
    }
}