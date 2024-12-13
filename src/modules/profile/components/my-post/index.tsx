import React, { FC } from 'react'
import { IconSvg } from '../../../../common/constants/image';
import './styles.scss';

interface MyPostProps {
    desc: string;
    likes: number;
    images: string[] | string;
}

const MyPost: FC<MyPostProps> = (props) => {
    const { desc, likes, images } = props;

    return (
        <div className='user-post-card'>
            <img src={
                Array.isArray(images) ? images[0]
                    : images
            } alt='post' />
            <div className='details'>
                <p>{desc}</p>
                <div className='likes'>
                    <IconSvg.HeartIcon />
                    <span>{likes}</span>
                </div>
            </div>
            {
                Array.isArray(images) ? <div className='count'>
                    <span>1/{images.length}</span>
                </div> : null
            }
        </div>
    )
}

export default MyPost