import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function KeyfeatureComponent({ data }) {
    const theme = useTheme();
    const md = useMediaQuery('(max-width:1300px)');
    const sm = useMediaQuery('(max-width:700px)');
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));
    const landscape = useMediaQuery('(max-height: 500px) and (min-width: 600px)');
    return (<>
        <div style={{ display: 'flex', width: '100%', marginTop: 20, justifyContent: matches ? 'center' : '' }}>
            <div style={{ display: 'flex', width: matches ? '90%' : md ? '95%' : '75%', height: 'auto', border: '1px solid #9A9A9A', borderRadius: 5, alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ height: '85%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10, marginBottom: 20, marginLeft: 20, fontSize: '90%', gap: 5, height: 'auto' }}>
                        <div style={{ color: '#fff' }} dangerouslySetInnerHTML={{ __html: data }} />
                    </div> 
                </div>
            </div>
        </div>
    </>)
}