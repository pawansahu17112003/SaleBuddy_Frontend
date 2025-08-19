import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function SearchBar({search,setSearch,text,setText}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)')

   
    setSearch(text)
    const navigate = useNavigate()
    const handleSearch = (e) => {
        if (e.key == 'Enter') {
            navigate(`/productlist/${text}`)
        }
    }

    return (
        <div style={{ marginBottom: 5, width: matches ? '90%' : '50%', display: 'flex', alignItems: 'center', justifyContent: matches ? 'center' : '' }}>
            <div style={{ width: matches ? '100%' : "70%", height: matches ? 40 : 45, background: 'white', display: 'flex', alignItems: 'center', justifyContent: "space-evenly", border: '1px solid black', borderRadius: 5, marginLeft: matches ? 0 : '8%', marginTop: 5 }}>
                <input onChange={(e) => setText(e.target.value)} onKeyDown={handleSearch} type='text' placeholder='What are you looking for?' style={{ outline: 'none', width: '85%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0px solid transparent',fontSize:'95%' }} />
                <SearchIcon onClick={()=>{navigate(`/productlist/${text}`);setText('')}}/>
            </div>
        </div>
    )
}