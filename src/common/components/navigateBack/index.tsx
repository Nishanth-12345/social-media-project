import React, { FC } from 'react'
import { IconSvg } from '../../constants/image';
import './styles.scss'

interface NavigateBackProps {
  path:string;
}

const NavigateBack: FC<NavigateBackProps> = (props) => {
    const {path } = props;
    return (
        <div className='navigation'>
           <IconSvg.LeftArrowIcon />
           <p>{path}</p>
        </div>
    )
}

export default NavigateBack