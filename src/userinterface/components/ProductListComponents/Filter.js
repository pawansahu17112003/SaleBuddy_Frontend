import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Divider from '@mui/material/Divider';

export default function Filter({ onClose, filterData }) {
    const theme = useTheme();
    const md = useMediaQuery('(max-width:1200px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [openSection, setOpenSection] = useState(filterData?.[0]?.key || null);
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }, [matches]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const toggleSection = (sectionName) => {
        setOpenSection((prev) => (prev === sectionName ? null : sectionName));
    };

    const handleCheckboxChange = (sectionKey, itemIndex) => {
        setCheckedItems(prev => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                [itemIndex]: !prev[sectionKey]?.[itemIndex]
            }
        }));
    };

    const isItemChecked = (sectionKey, itemIndex) => {
        return checkedItems[sectionKey]?.[itemIndex] || false;
    };

    const sections = filterData;

    return (
        <>
            {!matches && (
                <div onClick={handleBackdropClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)', fontFamily: '"Raleway", sans-serif', zIndex: 1400 }}>
                    <div style={{ width: 460, height: '100%', display: 'flex', flexDirection: 'column', background: 'white', boxShadow: '-2px 0 8px rgba(0,0,0,0.2)', padding: '20px', boxSizing: 'border-box', overflowY: 'auto', zIndex: 1300 }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                            <div style={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: 50, alignItems: 'center', position: 'sticky', top: '-2.9%', background: 'white', zIndex: 1000, paddingBottom: 10, borderBottom: '2px solid #95a5a6' }}>
                                    <div style={{ fontSize: 30, fontWeight: 600 }}>All Filters</div>
                                    <div onClick={onClose} style={{ cursor: 'pointer', fontSize: 40, fontWeight: 600 }}><CloseIcon /></div>
                                </div>
                                {sections.map((section) => (
                                    <div key={section.key} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                                        <div onClick={() => toggleSection(section.key)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: 20, fontWeight: '500', height: 50 }} >
                                            {section.title}
                                            {openSection === section.key ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </div>
                                        {openSection === section.key && (
                                            <div style={{ width: '100%' }}>
                                                {section.data.map((item, index) => (
                                                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Checkbox
                                                            style={{ color: ' #12daa8' }}
                                                            checked={isItemChecked(section.key, index)}
                                                            onChange={() => handleCheckboxChange(section.key, index)}
                                                        />
                                                        <span style={{ fontSize: 18 }}>
                                                            {section.key === 'price' ? `₹${item}` : item}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <Divider style={{ width: '100%', marginTop: 7, marginBottom: 7, border: '1px solid #95a5a6' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', bottom: '-2.8%', background: 'white', zIndex: 1100, position: 'sticky', marginTop: 'auto', }}>
                            <div style={{ display: 'flex', width: '94%', justifyContent: 'space-evenly', height: 60 }}>
                                <div style={{ width: '47%', height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600, background: '#393939', color: 'white', borderRadius: 5, cursor: 'pointer' }}>CLEAR ALL</div>
                                <div style={{ width: '47%', height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600, background: '#12daa8', color: 'black', borderRadius: 5, cursor: 'pointer' }}>APPLY</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {matches && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: '"Raleway", sans-serif', zIndex: 1300, backgroundColor: '#f9f9f9', }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: 'white', borderBottom: '1px solid #95a5a6', flexShrink: 0, }} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', height: 60, alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 1400, userSelect: 'none', }}>
                            <div style={{ fontSize: 25, fontWeight: 600 }}>All Filters</div>
                            <div onClick={onClose} style={{ cursor: 'pointer', fontSize: 40, fontWeight: 600 }}>
                                <CloseIcon />
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', height: 'auto', overflow: 'hidden', }}>
                        <div style={{ width: '40%', background: '#393939', padding: 12, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflowY: 'auto', scrollbarWidth: 'none', }}>
                            {sections.map((section) => (
                                <div key={section.key} onClick={() => toggleSection(section.key)} style={{ cursor: 'pointer', minHeight: 60, color: openSection === section.key ? '#393939' : '#ffffff', backgroundColor: openSection === section.key ? '#ffffff' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, padding: '0 12px', fontWeight: 550, fontSize: 18, userSelect: 'none', overflow: 'hidden', textAlign: 'center', boxShadow: openSection === section.key ? '0 0 10px rgba(0,0,0,0.15)' : 'none', }} >
                                    {section.title}
                                </div>
                            ))}
                        </div>
                        <div style={{ width: '60%', background: '#fff', padding: 16, boxSizing: 'border-box', overflowY: 'auto', }}>
                            {openSection && sections.find((s) => s.key === openSection) ? (
                                sections.find((s) => s.key === openSection).data.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', padding: '8px 0', userSelect: 'none', alignItems: 'center', }}>
                                        <Checkbox
                                            style={{ color: '#12daa8' }}
                                            checked={isItemChecked(openSection, index)}
                                            onChange={() => handleCheckboxChange(openSection, index)}
                                        />
                                        <span style={{ fontSize: 18 }}>
                                            {openSection === 'price' ? `₹${item}` : item}
                                        </span>
                                    </div>
                                ))
                            ) : (<div style={{ textAlign: 'center', color: '#999', fontStyle: 'italic', marginTop: 20, }}></div>
                            )}
                        </div>
                    </div>

                    <div style={{ padding: '10px 0', background: 'white', borderTop: '1px solid #ccc', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <div style={{ display: 'flex', width: '94%', justifyContent: 'space-evenly', }}>
                            <div style={{ height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 600, background: '#393939', color: 'white', borderRadius: 5, cursor: 'pointer', userSelect: 'none', width: '40%' }} >
                                CLEAR
                            </div>
                            <div style={{ height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 600, background: '#12daa8', color: 'black', borderRadius: 5, cursor: 'pointer', userSelect: 'none', width: '40%' }}>
                                APPLY
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}