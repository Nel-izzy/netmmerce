import { TextField, debounce } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { useState } from "react"
import { setProductParams } from "./catalogSlice"




const ProductSearch = () => {
    const { productParams } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm)

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000)

    return (
        <TextField
            variant="outlined"
            fullWidth
            label="Search Products"
            value={searchTerm || ''}
            onChange={
                (event: any) => {
                    setSearchTerm(event.target.value)
                    debouncedSearch(event)
                }
            }
        />
    )
}

export default ProductSearch