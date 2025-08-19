import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0px solid transparent`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1rem', transform: 'rotate(90deg)', color: 'white', width: '100%' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'black',
    flexDirection: 'row',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(0deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'transparent'
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '0px solid transparent',
    backgroundColor: 'black',

}));
export default function Footer() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smallmatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');
    const [expanded, setExpanded] = React.useState(false);
    const [youtube, setYoutube] = useState('white')
    const [facebook, setFacebook] = useState('white')
    const [instagram, setInstagram] = useState('white')
    const [linkdin, setLinkdin] = useState('white')
    const [twitter, setTwitter] = useState('white')

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    }

    if (!landscape) {
        return (<>
            {smallmatches ? <>
                <div style={{ display: 'flex', width: '100%', height: 'auto', background: 'black', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-start', height: 130 }}>
                        <div style={{ color: 'white', fontSize: '120%', fontFamily: '"Roboto Condensed", sans-serif', fontWeight: 500, height: 27, display: 'flex', justifyContent: 'center' }}>Connect With Us</div>
                        <div style={{ width: '100%', height: 40, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, marginTop: 1 }}>
                            <input type='text' placeholder='Enter Your Email' style={{ width: '85%', margin: 1, height: '80%', outline: 'none', border: '0px solid transparent' }} />
                            <EastIcon />
                        </div>
                        <div style={{ width: '70%', height: 40, marginTop: 3, alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
                            <YouTubeIcon onMouseEnter={() => setYoutube('red')} onMouseLeave={() => setYoutube('white')} style={{ color: youtube, cursor: 'pointer', fontSize: 35 }} />
                            <FacebookIcon onMouseEnter={() => setFacebook('#1877F2')} onMouseLeave={() => setFacebook('white')} style={{ color: facebook, cursor: 'pointer', fontSize: 35 }} />
                            <InstagramIcon onMouseEnter={() => setInstagram('#C13584')} onMouseLeave={() => setInstagram('white')} style={{ color: instagram, cursor: 'pointer', fontSize: 35 }} />
                            <LinkedInIcon onMouseEnter={() => setLinkdin('#0077B5')} onMouseLeave={() => setLinkdin('white')} style={{ color: linkdin, cursor: 'pointer', fontSize: 35 }} />
                            <TwitterIcon onMouseEnter={() => setTwitter('#1DA1F2')} onMouseLeave={() => setTwitter('white')} style={{ color: twitter, cursor: 'pointer', fontSize: 35 }} />
                        </div>
                    </div>
                    <hr style={{ width: '92%', margin: 0 }}></hr>
                    <div style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ width: '100%', marginBottom: 0 }}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{ width: '100%' }}>
                                <Typography component="span" style={{ color: 'white', width: '100%' }}>Useful Links</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{ color: 'white', width: '100%' }}>
                                    <div style={{ display: 'flex', height: '90%', width: '100%', justifyContent: "center", marginTop: 5, fontFamily: '"Archivo", sans-serif' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', marginLeft: 10, color: 'white', width: '50%', alignItems: 'flex-start', marginRight: 10, gap: matches ? '4%' : '5%', fontWeight: 500, fontSize: 15 }}>
                                            <div>About SalesBuddy</div>
                                            <div>Help And Support</div>
                                            <div>FAQs</div>
                                            <div>Buying Guide</div>
                                            <div>Return Policy</div>
                                            <div>B2B Orders</div>
                                            <div>Store Locator</div>
                                            <div>E-Waste</div>
                                            <div>Franchise Opportunity</div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '50%', alignItems: 'flex-start', gap: matches ? '4%' : '5%', fontWeight: 500, fontSize: 15 }}>
                                            <div>Site Map</div>
                                            <div>Careers At Croma</div>
                                            <div>Term Of Use</div>
                                            <div>Disclaimer</div>
                                            <div>Privacy Policy</div>
                                            <div>Unboxed</div>
                                            <div>Gift Card</div>
                                            <div>Croma E-Star</div>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <hr style={{ width: '92%', margin: 0 }}></hr>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{ width: '100%', marginBottom: 0 }}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" style={{ width: '100%' }}>
                                <Typography component="span" style={{ color: 'white', width: '100%' }}>Products</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{ color: 'white', width: '100%' }}>
                                    <div style={{ display: 'flex', height: '90%', width: '100%', justifyContent: "center", fontFamily: '"Archivo", sans-serif' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', marginLeft: 15, color: 'white', width: '50%', alignItems: 'flex-start', marginRight: 10, gap: matches ? '4%' : '5%', fontWeight: 500, fontSize: 15 }}>
                                            <div>Televisions & Accessories</div>
                                            <div>Home Appliances</div>
                                            <div>Phone & Wearables</div>
                                            <div>Computers & Tablets</div>
                                            <div>Kitchen Appliances</div>
                                            <div>Audio & Video</div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '50%', alignItems: 'flex-start', gap: matches ? '4%' : '5%', fontWeight: 500, fontSize: 15 }}>
                                            <div>Health & Fitness</div>
                                            <div>Grooming & Personal Care</div>
                                            <div>Cameras & Accessories</div>
                                            <div>Smart Devices</div>
                                            <div>Gaming</div>
                                            <div>Accessories</div>
                                            <div>Top Brands</div>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <hr style={{ width: '92%', margin: 0 }}></hr>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', height: 50, width: 'auto', marginTop: 20, marginBottom: 10, color: 'white', fontFamily: '"Roboto Condensed", sans-serif' }}>© Copyright 2025 SalesBuddy. All rights reserved</div>
                </div>
            </> : <>




                <div style={{ width: '100%', height: matches ? '70vh' : '65vh', background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {matches ? <div style={{ width: '40%', display: 'flex', justifyContent: 'center', flexDirection: 'column', height: "30%" }}>
                        <div style={{ color: 'white', fontSize: '130%', fontFamily: '"Roboto Condensed", sans-serif', fontWeight: 500, height: 27, display: 'flex', justifyContent: 'center' }}>Connect With Us</div>
                        <div style={{ width: '100%', height: 40, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 1 }}>
                            <input type='text' placeholder='Enter Your Email' style={{ width: '80%', margin: 1, height: '80%', outline: 'none', border: '0px solid transparent' }} />
                            <EastIcon />
                        </div>
                        <div style={{ width: '100%', height: 40, marginTop: 3, alignItems: 'center', justifyContent: 'space-evenly', display: 'flex' }}>
                            <YouTubeIcon onMouseEnter={() => setYoutube('red')} onMouseLeave={() => setYoutube('white')} style={{ color: youtube, cursor: 'pointer', fontSize: 35 }} />
                            <FacebookIcon onMouseEnter={() => setFacebook('#1877F2')} onMouseLeave={() => setFacebook('white')} style={{ color: facebook, cursor: 'pointer', fontSize: 35 }} />
                            <InstagramIcon onMouseEnter={() => setInstagram('#C13584')} onMouseLeave={() => setInstagram('white')} style={{ color: instagram, cursor: 'pointer', fontSize: 35 }} />
                            <LinkedInIcon onMouseEnter={() => setLinkdin('#0077B5')} onMouseLeave={() => setLinkdin('white')} style={{ color: linkdin, cursor: 'pointer', fontSize: 35 }} />
                            <TwitterIcon onMouseEnter={() => setTwitter('#1DA1F2')} onMouseLeave={() => setTwitter('white')} style={{ color: twitter, cursor: 'pointer', fontSize: 35 }} />
                        </div>
                    </div> : <></>}
                    <div style={{ width: '90%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {matches ? <></> : <>
                            <div style={{ width: matches?'40%':'30%', height: '85%' }}>
                                <div style={{ color: 'white', fontSize: '130%', fontFamily: '"Roboto Condensed", sans-serif', fontWeight: 500, height: 27 }}>Connect With Us</div>
                                <div style={{ width: '80%', height: 40, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 1 }}>
                                    <input type='text' placeholder='Enter Your Email' style={{ width: '80%', margin: 1, height: '80%', outline: 'none', border: '0px solid transparent' }} />
                                    <EastIcon />
                                </div>
                                <div style={{ width: '85%', height: '15%', marginTop: 3, alignItems: 'center', justifyContent: 'space-evenly', display: 'flex' }}>
                                    <YouTubeIcon onMouseEnter={() => setYoutube('red')} onMouseLeave={() => setYoutube('white')} style={{ color: youtube, cursor: 'pointer', fontSize: 35 }} />
                                    <FacebookIcon onMouseEnter={() => setFacebook('#1877F2')} onMouseLeave={() => setFacebook('white')} style={{ color: facebook, cursor: 'pointer', fontSize: 35 }} />
                                    <InstagramIcon onMouseEnter={() => setInstagram('#C13584')} onMouseLeave={() => setInstagram('white')} style={{ color: instagram, cursor: 'pointer', fontSize: 35 }} />
                                    <LinkedInIcon onMouseEnter={() => setLinkdin('#0077B5')} onMouseLeave={() => setLinkdin('white')} style={{ color: linkdin, cursor: 'pointer', fontSize: 35 }} />
                                    <TwitterIcon onMouseEnter={() => setTwitter('#1DA1F2')} onMouseLeave={() => setTwitter('white')} style={{ color: twitter, cursor: 'pointer', fontSize: 35 }} />
                                </div>
                                <div style={{ width: '90%', marginTop: 30, color: 'white', fontFamily: '"Roboto Condensed", sans-serif' }}>© Copyright 2025 SalesBuddy. All rights reserved</div>
                            </div>
                            <div style={{ width: 0.1, height: '85%', background: 'white' }}></div></>}
                        <div style={{ width: matches ? '50%' : '30%', height: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: 'white', fontFamily: '"Archivo", sans-serif', fontWeight: 600, fontSize: '120%', height: '10%', marginLeft: 'auto', width: '90%' }}>
                                Useful Links
                            </div>
                            <div style={{ display: 'flex', height: '90%', marginLeft: 'auto', width: '90%', justifyContent: "center", marginTop: 1, fontFamily: '"Archivo", sans-serif' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', color: 'white', width: '50%', alignItems: 'flex-start', marginRight: 10, gap: matches ? '4%' : '5%', fontWeight: 550, fontSize: 15 }}>
                                    <div>About SalesBuddy</div>
                                    <div>Help And Support</div>
                                    <div>FAQs</div>
                                    <div>Buying Guide</div>
                                    <div>Return Policy</div>
                                    <div>B2B Orders</div>
                                    <div>Store Locator</div>
                                    <div>E-Waste</div>
                                    <div>Franchise Opportunity</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '50%', alignItems: 'flex-start', gap: matches ? '4%' : '5%', fontWeight: 550, fontSize: 15 }}>
                                    <div>Site Map</div>
                                    <div>Careers At Croma</div>
                                    <div>Term Of Use</div>
                                    <div>Disclaimer</div>
                                    <div>Privacy Policy</div>
                                    <div>Unboxed</div>
                                    <div>Gift Card</div>
                                    <div>Croma E-Star</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: 0.1, height: '85%', background: 'white' }}></div>
                        <div style={{ width: matches ? '50%' : '30%', height: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: 'white', fontFamily: '"Archivo", sans-serif', fontWeight: 600, fontSize: '120%', height: '10%', marginLeft: 'auto', width: '90%' }}>
                                Products
                            </div>
                            <div style={{ display: 'flex', height: '90%', marginLeft: 'auto', width: '93.5%', justifyContent: 'center', marginTop: 1, fontFamily: '"Archivo", sans-serif' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '45%', alignItems: 'flex-start', justifyContent: 'flex-start', marginRight: 10, gap: matches ? '4%' : '5%', fontWeight: 550, fontSize: 15 }}>
                                    <div>Televisions & Accessories</div>
                                    <div>Home Appliances</div>
                                    <div>Phone & Wearables</div>
                                    <div>Computers & Tablets</div>
                                    <div>Kitchen Appliances</div>
                                    <div>Audio & Video</div>
                                    {matches ? <></> : <div>Health & Fitness</div>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '44%', alignItems: 'flex-start', gap: matches ? '4%' : '5%', fontWeight: 550, fontSize: 15 }}>
                                    {matches ? <div>Health & Fitness</div> : <></>}
                                    <div>Grooming & Personal Care</div>
                                    <div>Cameras & Accessories</div>
                                    <div>Smart Devices</div>
                                    <div>Gaming</div>
                                    <div>Accessories</div>
                                    <div>Top Brands</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {matches ? <div style={{ display: 'flex', alignItems: 'center', height: 50, width: 'auto', marginTop: 40, marginBottom: 10, color: 'white', fontFamily: '"Roboto Condensed", sans-serif' }}>© Copyright 2025 SalesBuddy. All rights reserved</div> : <></>}
                </div></>}</>
        )
    }
    if(landscape) {
        return (
            <>
                <div style={{ width: '100%', height: '130vh', background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ width: '40%', display: 'flex', justifyContent: 'center', flexDirection: 'column', height: "40%", alignItems: 'center', marginTop: 10 }}>
                        <div style={{ color: 'white', fontSize: '130%', fontFamily: '"Roboto Condensed", sans-serif', fontWeight: 500, height: 27, display: 'flex', justifyContent: 'center' }}>Connect With Us</div>
                        <div style={{ width: '100%', height: 50, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 1 }}>
                            <input type='text' placeholder='Enter Your Email' style={{ width: '80%', margin: 1, height: '80%', outline: 'none', border: '0px solid transparent' }} />
                            <EastIcon />
                        </div>
                        <div style={{ width: '100%', height: 40, marginTop: 3, alignItems: 'center', justifyContent: 'space-evenly', display: 'flex' }}>
                            <YouTubeIcon onMouseEnter={() => setYoutube('red')} onMouseLeave={() => setYoutube('white')} style={{ color: youtube, cursor: 'pointer', fontSize: 35 }} />
                            <FacebookIcon onMouseEnter={() => setFacebook('#1877F2')} onMouseLeave={() => setFacebook('white')} style={{ color: facebook, cursor: 'pointer', fontSize: 35 }} />
                            <InstagramIcon onMouseEnter={() => setInstagram('#C13584')} onMouseLeave={() => setInstagram('white')} style={{ color: instagram, cursor: 'pointer', fontSize: 35 }} />
                            <LinkedInIcon onMouseEnter={() => setLinkdin('#0077B5')} onMouseLeave={() => setLinkdin('white')} style={{ color: linkdin, cursor: 'pointer', fontSize: 35 }} />
                            <TwitterIcon onMouseEnter={() => setTwitter('#1DA1F2')} onMouseLeave={() => setTwitter('white')} style={{ color: twitter, cursor: 'pointer', fontSize: 35 }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '90%', height: '90%', alignItems: 'center', marginTop: 10 }}>
                        <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: 'white', fontFamily: '"Archivo", sans-serif', fontWeight: 600, fontSize: '120%', height: '10%', marginLeft: 'auto', width: '90%' }}>
                                Useful Links
                            </div>
                            <div style={{ display: 'flex', height: '90%', marginLeft: 'auto', width: '90%', justifyContent: "center", marginTop: 1, fontFamily: '"Archivo", sans-serif' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', color: 'white', width: '50%', alignItems: 'flex-start', marginRight: 10, gap: matches ? '4%' : '5%', fontWeight: 550, fontSize: 15 }}>
                                    <div>About SalesBuddy</div>
                                    <div>Help And Support</div>
                                    <div>FAQs</div>
                                    <div>Buying Guide</div>
                                    <div>Return Policy</div>
                                    <div>B2B Orders</div>
                                    <div>Store Locator</div>
                                    <div>E-Waste</div>
                                    <div>Franchise Opportunity</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '50%', alignItems: 'flex-start', gap: matches ? '4%' : '5%', fontWeight: 550, fontSize: 15 }}>
                                    <div>Site Map</div>
                                    <div>Careers At Croma</div>
                                    <div>Term Of Use</div>
                                    <div>Disclaimer</div>
                                    <div>Privacy Policy</div>
                                    <div>Unboxed</div>
                                    <div>Gift Card</div>
                                    <div>Croma E-Star</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: 0.1, height: '80%', background: 'white' }}></div>
                        <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: 'white', fontFamily: '"Archivo", sans-serif', fontWeight: 600, fontSize: '120%', height: '10%', marginLeft: 'auto', width: '90%' }}>
                                Products
                            </div>
                            <div style={{ display: 'flex', height: '90%', marginLeft: 'auto', width: '93.5%', justifyContent: 'center', marginTop: 1, fontFamily: '"Archivo", sans-serif' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '45%', alignItems: 'flex-start', justifyContent: 'flex-start', marginRight: 10, gap: matches ? '4%' : '5%', fontWeight: 550, fontSize: 15 }}>
                                    <div>Televisions & Accessories</div>
                                    <div>Home Appliances</div>
                                    <div>Phone & Wearables</div>
                                    <div>Computers & Tablets</div>
                                    <div>Kitchen Appliances</div>
                                    <div>Audio & Video</div>
                                    {matches ? <></> : <div>Health & Fitness</div>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', color: 'white', width: '44%', alignItems: 'flex-start', gap: matches ? '4%' : '5%', fontWeight: 550, fontSize: 15 }}>
                                    {matches ? <div>Health & Fitness</div> : <></>}
                                    <div>Grooming & Personal Care</div>
                                    <div>Cameras & Accessories</div>
                                    <div>Smart Devices</div>
                                    <div>Gaming</div>
                                    <div>Accessories</div>
                                    <div>Top Brands</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', height: 50, width: 'auto', marginTop: 10, marginBottom: 10, color: 'white', fontFamily: '"Roboto Condensed", sans-serif' }}>© Copyright 2025 SalesBuddy. All rights reserved</div>
                </div>
            </>
        );
    }
}