import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { serverURL } from '../../../../backendservices/FetchNodeServices';

export default function ProductPictureComponent({ media }) {

  const isVideo = !!media && /\.(mp4|webm|ogg|mov|avi|flv|wmv|mkv|m4v|3gp)$/i.test(media);

  return (
    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ width: '90%', height: 450, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{ fontSize: '170%', color: 'white', position: 'absolute', right: '1%', top: '1%', cursor: 'pointer', display: 'flex' }}>
          <FavoriteBorderIcon style={{ marginRight: 20 }} />
          <ShareIcon />
        </div>
        <div style={{marginTop:'15%',display:'flex',width:'100%',justifyContent:'center'}}>
          {isVideo ? (
            <video src={`${serverURL}/images/${media}`} controls style={{ maxWidth: '100%', maxHeight: '70%' }} />
          ) : (
            <img src={`${serverURL}/images/${media}`} style={{ maxWidth: '80%', maxHeight: '70%' }} />
          )}
        </div>
      </div>
      <hr style={{ width: '90%', height: '0.01%' }} />
    </div>
  );
}
