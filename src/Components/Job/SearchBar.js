import { useState } from 'react'
import { useJobProvider } from '../../Providers/JobProvider'
import FilterBar from './FilterBar'
import {CiSearch} from  "react-icons/ci"
import "./SearchBar.css"

function SearchBar() {
    const {jobs, setJobs, searchResult, setSearchResult} = useJobProvider()
    const[search, setSearch] = useState("")
    
    function handleSearchBar(e) {
        const value = e.target.value
        setSearch(value)
        if(value === ""){
            setJobs(searchResult)
        }
        else {
            const filt = searchResult.filter(({title}) =>{
                const joinSearch = search.replaceAll(" ", "")
                const regex = new RegExp(joinSearch,"gi")
                let joinTitle = title.replaceAll(" ", "")
                return joinTitle.match(regex)
            } )
            setJobs(filt)
        }    
    }

    return (
        <section className="search-component" >
            <label htmlFor={search}>
                 <CiSearch size ={"28px"} color={"#41CDBC"} className="search-bar-icon" />
            <input
            className="searchbar"
            type= "text"
            value={search}
            placeholder="Search Jobs..."
            onChange={(event) => handleSearchBar(event)}
            />
            </label>
            <FilterBar />
        </section>
    );
}

export default SearchBar;