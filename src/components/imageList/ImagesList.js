import React from 'react';

import { ImageList, ImageListItem, Typography } from '@mui/material';

function ImagesList({arrObj}) {

  const srcset = (image, size, rows = 1, cols = 1) => {
      return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
          size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
      };
  };
  const ImageListProps = ({wrapCols,cols,rows,lengthCase}) => {
    return (
      <ImageList
        cols={wrapCols}
        rowHeight={121}
        variant="quilted"
      >
        {arrObj && arrObj.map((item) => (
          <ImageListItem
            key={item.img}
            cols={cols ? cols : item.cols}
            rows={rows ? rows : item.rows}
            style={{ cursor: 'pointer' }}
          >
          <img 
            {...srcset(item.img, 121, item.rows, item.cols)} 
            alt="" 
          />
          </ImageListItem>
        ))}
        {lengthCase === 3 && 
          <ImageListItem>
            <div style={{
              display: 'flex',
              height: 115,
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px dashed rgba(179, 179, 179,0.9)',
              cursor: 'pointer'
            }}>
              <Typography color="GrayText">Xem Ảnh</Typography>
            </div>
          </ImageListItem>
        }
      </ImageList>
    )
  };

  switch (arrObj.length) {
    case 2:
      return <ImageListProps wrapCols={4} cols={2} rows={2} lengthCase={2} />;
    case 3:
      return <ImageListProps wrapCols={3} lengthCase={3} />
    default:
      return (
        <ImageList cols={3} rowHeight={121} variant="quilted">
          {arrObj && arrObj.slice(0,4).map((item,index) => {
            if(index === 3) {
              return (
                <ImageListItem 
                  key={item.img} 
                  cols={item.cols || 1} 
                  rows={item.rows || 1} 
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                    <img 
                        {...srcset(item.img, 121, item.rows, item.cols)} 
                        alt="" 
                    />
                    <Typography style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '18px',
                    }}>
                      {arrObj.length > 4 && `+${arrObj.length - index}`}
                    </Typography>
                </ImageListItem>
              )
              
            } 
            else 
              return (
                <ImageListItem 
                  key={item.img} 
                  cols={item.cols || 1} 
                  rows={item.rows || 1} 
                  style={{ cursor: 'pointer'}}
                >
                    <img 
                        {...srcset(item.img, 121, item.rows, item.cols)} 
                        alt="" 
                    />
                </ImageListItem>
              )
          })}
        </ImageList>
      )
  }
}

export default ImagesList
