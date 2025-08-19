import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Dropdown({ data, title, isOpen, onToggle, selectedItems = [], onItemSelect, onClearAll }) {
    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const maxVisibleItems = 8;
    const itemHeight = 40;

    return (<>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 35, background: '#373737', borderRadius: 10, margin: '0.2%' }}>
                <button onClick={onToggle} style={{ display: 'flex', width: 'auto', alignItems: 'center', justifyContent: 'space-evenly', marginLeft: 10, height: '70%', outline: 'none', background: '#393939', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', }}>
                    <div style={{ width: '80%', marginRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{title}</div> <div style={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><KeyboardArrowDownIcon style={{ fontSize: '100%' }} /></div>
                </button>
            </div>
            {isOpen && !md && (
                <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 5, marginTop: '1%', maxHeight: maxVisibleItems * itemHeight, overflowY: data.length > maxVisibleItems ? 'auto' : 'visible', scrollbarColor: 'rgb(115, 115, 115) transparent', scrollbarWidth: 'thin', backgroundColor: '#373737' }}>
                    {data.map((item) => (
                        <div key={item} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 170 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '99%', height: 40, background: '#373737', color: '#fff', fontSize: '100%' }}>
                                <div style={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <Checkbox
                                        {...label}
                                        checked={selectedItems.includes(item)}
                                        onChange={() => onItemSelect && onItemSelect(item)}
                                        style={{ color: '#12daa8' }}
                                    />
                                </div>
                                <div style={{ width: '80%', display: 'flex', alignItems: 'center', }}>{item}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
        {isOpen && md && (<>
            <div onClick={(e) => {
                if (e.target === e.currentTarget) { onToggle() }
            }} style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)', fontFamily: '"Raleway", sans-serif', zIndex: 1500 }}>
                <div style={{ width: '100%', maxHeight: 400, minHeight: 350, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', background: 'white', boxShadow: '-2px 0 8px rgba(0,0,0,0.2)', bottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <div style={{ width: '90%', height: '93%', }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: 50, alignItems: 'center', zIndex: 1000, borderBottom: '2px solid #95a5a6', position: 'sticky' }}>
                            <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
                            <div style={{ cursor: 'pointer', fontSize: 40, fontWeight: 600 }}><CloseIcon onClick={onToggle} /></div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', overflowY: 'auto', maxHeight: 260, }}>
                            {data.map((item, index) => (
                                <div key={index} style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '8px 0', boxSizing: 'border-box', color: '#393939', }} >
                                    <div style={{ width: '20%', display: 'flex', justifyContent: 'center', }}>
                                        <Checkbox
                                            {...label}
                                            checked={selectedItems.includes(item)}
                                            onChange={() => onItemSelect && onItemSelect(item)}
                                            style={{ color: '#12daa8' }}
                                        />
                                    </div>
                                    <div style={{ width: '80%', fontSize: '100%', }}>
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', bottom: 0, background: 'white', zIndex: 1100, position: 'sticky', marginTop: 'auto', }}>
                        <div style={{ display: 'flex', width: '94%', justifyContent: 'space-evenly', height: 80, alignItems: 'center' }}>
                            <div onClick={onClearAll} style={{ width: '37%', height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 600, background: '#393939', color: 'white', borderRadius: 5, cursor: 'pointer' }}>CLEAR ALL</div>
                            <div style={{ width: '37%', height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 600, background: '#12daa8', color: 'black', borderRadius: 5, cursor: 'pointer' }}>APPLY</div>
                        </div>
                    </div>
                </div>

            </div>

        </>)}
    </>);
}
