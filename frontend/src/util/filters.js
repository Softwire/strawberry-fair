import { useState } from 'react'

export const useFilters = (filterList) => {
    const [filters, setFilters] = useState([])

    const addFilter = (filterName) => (
        () => {setFilters(filters.concat(filterName))}
    )

    const removeFilter = (filterName) => (
        () => {setFilters(filters.filter(name => name !== filterName))}
    )

    const clearFilters = () => {
        setFilters([])
    }

    return {
        allFilters: filterList,
        activeFilters: filters,
        addFilter: addFilter,
        removeFilter: removeFilter,
        clearFilters: clearFilters
    }
}
