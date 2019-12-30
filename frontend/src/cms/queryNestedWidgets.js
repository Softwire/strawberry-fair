/**
 * Helper functions for use in custom widget control classes
 * They enable the values set by nested widgets to be queried
 */

/**
 * Query child widget of object widget
 * @param {Object} parentValue - value prop of widget control class OR value of a nested parent widget
 * @param {string} childName - name of child widget to be queried
 * @returns {any} - value prop of child widget if found; else null
 */
export const queryObjectChild = (parentValue, childName) => {
    if (parentValue &&
        parentValue._root &&
        parentValue._root.entries &&
        Array.isArray(parentValue._root.entries)) {

        for (const el of parentValue._root.entries) {

            if (Array.isArray(el) &&
                el.length === 2 &&
                el[0] === childName) {

                return el[1]
            }
        }
    }
    return null
}

/**
 * Query child widget of list widgets
 * @param {Object} parentValue - value prop of widget control class OR value of a nested parent widget
 * @param {string} childName - name of child widget to be queried
 * @returns {Array} - values of all instances of the child widget if found; else null
 */
export const queryListChild = (parentValue, childName) => {
    if (parentValue &&
        parentValue._tail &&
        parentValue._tail.array) {

        return parentValue._tail.array.map((el) => queryObjectChild(el, childName))
    }
    return null
}