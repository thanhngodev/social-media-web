import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import './ChangeAvatar.css';

export default function ChangeAvatar({user, avt, setAvt}) {
  const [url,setUrl] = useState(user?.result?.profilePicture);

  useEffect ( () => { 
    if (avt) {
      setUrl(() => URL.createObjectURL(avt));
    }  
    // if(file) {
    //   setUrl(() => URL.createObjectURL(file));
    //   setAvt(file);
    // }
  }, [avt]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setUrl(() => URL.createObjectURL(file));
    setAvt(file);
  };

  return (
    <div className="changeAvatar">
      <label htmlFor="changeAvatarFile" className="changeAvatarLabel">
        {/* <img src="" className="changeAvatarPreview"  ref={preview} alt="" /> */}
        <div className="changeAvatarBorder">
          <Avatar className="changeAvatarPreview" src={url} >{user?.result?.name.charAt(0).toUpperCase()}</Avatar>
        </div>
      </label>
      <input type="file" onChange={handleChange} id="changeAvatarFile" style={{display: 'none'}} />
    </div> 
  )
}