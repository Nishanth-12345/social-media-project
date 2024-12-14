import React, { FC } from 'react'
import { IconSvg } from '../../constants/image';
import './styles.scss'

interface NavigateBackProps {
  path:string;
}

const NavigateBack: FC<NavigateBackProps> = (props) => {
    const {path } = props;
    const handleNavigateBack = () => {
      window.history.back();
  };
    return (
        <div className='navigation' onClick={handleNavigateBack}>
           <IconSvg.LeftArrowIcon />
           <p>{path}</p>
        </div>
    )
}

export default NavigateBack