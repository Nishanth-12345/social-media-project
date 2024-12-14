import React, { FC } from 'react'
import { IconSvg } from '../../../../common/constants/image';
import './styles.scss';

interface MyPostProps {
    desc: string;
    likes: number;
    imageType:"camera"|"video"|null;
    images: string[];
}

const MyPost: FC<MyPostProps> = (props) => {
    const { desc, likes, images, imageType } = props;

    return (
        <div className='user-post-card'>
           {imageType === "camera" ? (
                <img src={images[0]} alt="post" />
            ) : imageType === "video" ? (
                <video className='video' src={images[0]} />
            ) : null}
            <div className='details'>
                <p>{desc}</p>
                <div className='likes'>
                    <IconSvg.HeartIcon />
                    <span>{likes}</span>
                </div>
            </div>
            {
                images.length > 1 ? <div className='count'>
                    <span>1/{images.length}</span>
                </div> : null
            }
        </div>
    )
}

export default MyPost