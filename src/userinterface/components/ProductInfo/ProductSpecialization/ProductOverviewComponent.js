import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'
import { Button } from '@mui/material';

export default function ProductOverviewComponent({ data }) {

    const theme = useTheme();
    const md = useMediaQuery('(max-width:1300px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');

    const [showAll, setShowAll] = useState(false);
    const visibleData = showAll ? data : data.slice(0, 3);

    return (
        <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
                <Accordion sx={{ backgroundColor: '#191919', color: 'white', border: '1px solid #9A9A9A', borderRadius: 10, width: matches ? '85%' : '75%', boxShadow: 'none', minHeight: matches ? 75 : 65, paddingLeft: 2, paddingRight: 2 }}>
                    <AccordionSummary
                        sx={{ display: 'flex', minHeight: matches ? 75 : 65, alignItems: 'center', width: '100%', '& .MuiAccordionSummary-content': { margin: 0, width: '100%', }, '& .MuiAccordionSummary-expandIconWrapper': { marginLeft: 'auto', }, }}
                        expandIcon={<ExpandMoreIcon sx={{ color: 'white', fontSize: 40, fontWeight: 400 }} />} aria-controls="panel1-content" id="panel1-header">
                        <Typography sx={{ fontWeight: 'bold', alignSelf: 'center' }}>Overview</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                {visibleData.map((item, index) => (
                                    <div style={{ width: '100%', marginBottom: 30 }}>
                                        <div style={{ width: '100%', height: '30%', fontWeight: matches ? 700 : 600, display: 'flex', fontSize: matches ? '0.8rem' : '1.2rem', marginBottom: 15 }}> {item.title}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '70%' }}>
                                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: matches ? 10 : '' }}>
                                                <div style={{ fontSize: matches ? '0.83rem' : '0.95em' }}>{item.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {data.length > 3 && (
                                    <Button variant="text" onClick={() => setShowAll(!showAll)} sx={{ color: ' #ffffff', textTransform: 'none', fontWeight: 600, fontSize: matches ? '0.85rem' : '0.9rem', border: '1px solid #ffffff', padding: 1, borderRadius: 2 }} >
                                        {showAll ? 'View Less' : 'View More'}
                                    </Button>
                                )}
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
}
