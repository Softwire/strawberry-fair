/* LAYOUT CONTROL CONSTANTS */

/** Min height difference ratio between the shortest and tallest inner column (to minimise white space) - must be a num between 0 and 1 */
const minInnerColHeightDiffRatio = 0.6
const minOuterColHeightDiffRatio = 0.8
/** Min Bulma height of an inner column - must be an int between 1 and 6 */
const minInnerColWidth = 4


/* IMAGE HANDLING FUNCTIONS */

/** Returns 3-dimensional array representing Bulma column structure of ScrapbookImages component */
export const generateScrapbookImageMap = (images, isPreview) => {
    // In CMS preview, aspect ratios are ignored and images are not stacked
    if (isPreview) {
        const imageMap = mapImagesToColumns(images, true)
        return setColumnWidths(imageMap, true)
    }
    const imageList = sortByAspect(images)
    let imageMap = mapImagesToColumns(imageList)
    return setColumnWidths(imageMap)
}

const sortByAspect = (imageList) => imageList.sort((a, b) => getAspect(a) - getAspect(b))

/** Returns a randomised map of images */
const mapImagesToColumns = (imageList, isPreview=false) => {
    if (!imageList || imageList.length === 0) {
        throw new Error("No images passed to generateScrapbookImageMap()")
    }
    if (imageList.length !== 6) {
        throw new Error("Wrong number of images passed to generateScrapbookImageMap(): must receive exactly 6 images")
    }

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
            if (innerColImgIndexes.length === 2 && (isPreview || Math.random() < 0.5)) {
                imagesToRender.pop()
            }

            return imagesToRender
        })
    })
}

const setColumnWidths = (imageMap, isPreview=false) => {
    const innerColAspects = imageMap.map(outer => outer.map(inner => getInnerColAspect(inner)))

    const adjustStartingWidths = widthPair => {
        switch (getRandInt(3)) {
            case 1:
                widthPair[0]++
                widthPair[1]--
                break;
            case 2:
                widthPair[0]--
                widthPair[1]++
                break;
            default:
                break;
        }
    }

    // Initial bulma column width estimates - these may be adjusted
    const outerColWidths = [6, 6]
    const innerColWidths = [[6, 6], [6, 6]]

    // Randomise them a little to begin
    adjustStartingWidths(outerColWidths)
    adjustStartingWidths(innerColWidths[0])
    adjustStartingWidths(innerColWidths[1])

    // max number of loop iterations expected. 
    // This guards against an infinite loop cause by incorrect setting of the height limit ratios
    // this should never happen, but we guard against it anyway
    let loopCounter = 18

    // iteratively adjust column heights.
    // For CMS previews we have no aspect ratio information so skip this step.
    while(!isPreview && loopCounter-- > 0) {
        const heights = relativeHeights(innerColAspects, innerColWidths, outerColWidths)

        // balance the left inner column heights
        if (heights[0][0] / heights[0][1] < minInnerColHeightDiffRatio && innerColWidths[0][1] > minInnerColWidth) {
            innerColWidths[0][0]++
            innerColWidths[0][1]--
            continue
        }
        if (heights[0][1] / heights[0][0] < minInnerColHeightDiffRatio && innerColWidths[0][0] > minInnerColWidth) {
            innerColWidths[0][0]--
            innerColWidths[0][1]++
            continue
        }

        // balance the right inner column heights
        if (heights[1][0] / heights[1][1] < minInnerColHeightDiffRatio && innerColWidths[1][1] > minInnerColWidth) {
            innerColWidths[1][0]++
            innerColWidths[1][1]--
            continue
        }
        if (heights[1][1] / heights[1][0] < minInnerColHeightDiffRatio && innerColWidths[1][0] > minInnerColWidth) {
            innerColWidths[1][0]--
            innerColWidths[1][1]++
            continue
        }

        // balance the outer column heights based on max innner column heights
        const leftMax = Math.max(...heights[0])
        const rightMax = Math.max(...heights[1])
        if (leftMax / rightMax < minOuterColHeightDiffRatio && outerColWidths[1] > minInnerColWidth) {
            outerColWidths[0]++
            outerColWidths[1]--
            continue
        }
        if (leftMax / rightMax > 1 / minOuterColHeightDiffRatio && outerColWidths[0] > minInnerColWidth) {
            outerColWidths[0]--
            outerColWidths[1]++
            continue
        }

        // at this point column widths have been adjusted
        // to approximately balance column height
        break;
    }

    return imageMap.map((outer, i) => {
        return { 
            width: `is-${outerColWidths[i]}`, 
            images: outer.map((inner, j) => {
                return { width: `is-${innerColWidths[i][j]}`, images: inner }
            })
        }
    })
}

const relativeHeights = (columnAspects, innerColWidths, outerColWidths) => {
    return columnAspects.map((outer, i) => outer.map((inner, j) => outerColWidths[i] * innerColWidths[i][j] / inner))
}

const getAspect = (image) => image.src.childImageSharp.fluid.aspectRatio

/** Returns the combined aspect ratio of two images stacked on top of each other */
const getStackedAspect = (imgA, imgB) => (getAspect(imgA) * getAspect(imgB)) / (getAspect(imgA) + getAspect(imgB))

const getInnerColAspect = (innerColMap) => (innerColMap.length === 1 ? getAspect(innerColMap[0]) : getStackedAspect(innerColMap[0], innerColMap[1]))

/* RANDOMISATION FUNCTIONS */

/** Returns 0 <= randInt < max */
const getRandInt = (max) => Math.floor(Math.random() * max)

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