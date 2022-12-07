import React, { useState } from 'react';
import './ChangeInfo.css';
import Topbar from '../../components/topbar/Topbar';
import {
  Button, Stepper, Step, StepLabel, StepContent, Paper,
  Typography, TextField, FormControlLabel, Radio, RadioGroup, FormControl,
  InputLabel, Select, MenuItem, CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import ChangeAvatar from '../../components/changeAvatar/ChangeAvatar';
import { compressFile, deleteImage, uploadFireBase } from '../../actions/images';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: '10px !important',
      minWidth: '200px'
    },
  },
  button: {
    marginTop: '10px 10px 0 0 !important',
  },
  actionsContainer: {
    marginBottom: '15px !important',
  },
  resetContainer: {
    padding: '20px !important',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '10px !important',
    width: 200,
  },
  progress_white: {
    color: '#fff'
  }
}));

function getSteps() {
  return ['Chọn ảnh đại diện', 'Thông tin cá nhân', 'Ngày sinh'];
}

export default function ChangeInfo() {
  const classes = useStyles();
  const { isUploading } = useSelector((state) => state.upload);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [file, setFile] = useState(null);
  const [allInfo, setAllInfo] = useState({
    profilePicture: user.result?.profilePicture,
    profilePictureName: user.result?.profilePictureName,
    gender: user.result?.gender || 'male',
    birthday: user.result?.birthday || '',
    job: user.result?.job || '',
    city: user.result?.city || '',
    from: user.result?.from || '',
    relationship: user.result?.relationship || 1
  });
  const dispatch = useDispatch();

  const { isUpdating } = useSelector((state) => state.user);

  const propFunc = async (file) => {
    const compressedFile = await compressFile(file);
    const fileName = Date.now() + '-' + compressedFile.name;
    setAllInfo({ ...allInfo, profilePictureName: fileName });
    setFile(compressedFile);
  };


  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      if (file) {
        try {
          const url = await uploadFireBase(file, allInfo.profilePictureName, dispatch);
          if (user.result?.profilePictureName) deleteImage(user.result?.profilePictureName);
          dispatch(updateUser(user.result._id, { ...allInfo, profilePicture: url }));
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(updateUser(user.result._id, allInfo));
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ChangeAvatar user={user} avt={file} setAvt={propFunc} />
      case 1:
        return (
          <>
            <form className={classes.root} noValidate autoComplete="off">
              <p>Giới tính</p>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={allInfo.gender}
                onChange={(e) => setAllInfo({ ...allInfo, gender: e.target.value })}
              >
                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                <FormControlLabel value="other" control={<Radio />} label="Khác" />
              </RadioGroup>
            </form>
            {/* <form className={classes.root} noValidate autoComplete="off">
              <TextField 
                id="name"
                label="Tên"
                value={allInfo.name}
                onChange={(e) => setAllInfo({...allInfo, name: e.target.value})}
              />
              <TextField 
                id="email"
                label="Email"
                value={allInfo.email}
                onChange={(e) => setAllInfo({...allInfo, email: e.target.value})}
              />
            </form> */}
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="from"
                label="Đến từ"
                value={allInfo.from}
                onChange={(e) => setAllInfo({ ...allInfo, from: e.target.value })}
              />
              <TextField
                id="city"
                label="Sống tại"
                value={allInfo.city}
                onChange={(e) => setAllInfo({ ...allInfo, city: e.target.value })}
              />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="jobs"
                value={allInfo.job}
                label="Nghề nghiệp hiện tại"
                onChange={(e) => setAllInfo({ ...allInfo, job: e.target.value })}
              />
              <FormControl>
                <InputLabel id="demo-simple-select-label" >Mối quan hệ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={allInfo.relationship}
                  onChange={(e) => setAllInfo({ ...allInfo, relationship: e.target.value })}
                >
                  <MenuItem value={1}>Độc thân</MenuItem>
                  <MenuItem value={2}>Hẹn hò</MenuItem>
                  <MenuItem value={3}>Kết hôn</MenuItem>
                </Select>
              </FormControl>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="birthday"
                label="Ngày sinh"
                type="date"
                className={classes.textField}
                value={allInfo.birthday}
                onChange={(e) => setAllInfo({ ...allInfo, birthday: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </>
        );
      default:
        return 'Cút';
    }
  }


  return (
    <>
      <div className="changeInfo">
        <Topbar />
        <div className="changeInfoBox">
          <h1 className="changeInfoTitle">Thông tin cá nhân</h1>
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography component={'div'}>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Quay lại
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {isUploading ? <CircularProgress size={22} classes={{ colorPrimary: classes.progress_white }} /> :
                            (activeStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp tục')
                          }
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                {isUpdating ? <CircularProgress color="primary" /> :
                  <>
                    <Typography>Bạn đã nhập thông tin thành công</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                      Chỉnh sửa
                    </Button>
                    <Button >
                      <Link to="/" style={{ textDecoration: "none" }} className={classes.button}>Trang chủ</Link>
                    </Button>
                  </>
                }
              </Paper>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
