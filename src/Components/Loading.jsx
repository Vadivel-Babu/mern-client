import React from 'react'
import { Skeleton } from '@mui/material';
import "../Styles/Loading.scss"

const Loading = () => {
  return (
      <div className="flex">
        {[1, 2, 3].map((_, i) => (
          <div className="flex__item" key={i}>
            <Skeleton
              sx={{ bgcolor: 'grey.900' }}
              variant="rectangular"
              width={210}
              height={210}
            />            
          </div>
          ))}
      </div>
  )
}

export default Loading