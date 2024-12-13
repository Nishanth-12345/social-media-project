import React, { FC, useEffect, useState } from 'react'
import './userPostStyles.scss'
import { IconSvg } from '../../../../common/constants/image';

interface UserPostProps {
    image: string;
    name: string;
    timestamp: string;
    imageType: "images" | "video";
    images?: string[] | string;
    video?: string;
    likes: number;
    description: string;
    background:string;
    onSharePost: () => void;
}

export const UserPost: FC<UserPostProps> = (props) => {
    const { image, name, timestamp, imageType, images, video, likes, description, background, onSharePost} = props;

    
    return (
        <div className='user-post-container' style={{backgroundColor: background}}>
            <div className='profile'>
                <div className='image'>
                    <img src={image} alt='profile' />
                </div>
                <div className='details'>
                    <p>{name}</p>
                    <p>{timestamp}</p>
                </div>
            </div>
            <div className='post-description'>
                <p>{description}</p>
            </div>
            <div className='post-images-container'>

                {
                    imageType === 'images' ? (Array.isArray(images) ? (
                        (images.length > 0 && images !== undefined) ? images.map((item) => {
                            return (
                                <div className='image-post'>
                                    <img src={item} alt='image-post' />
                                </div>
                            )
                        }) : null
                    ) : <div className='image-post'>
                        <img src={images} alt='image-post' />
                    </div>)
                        : null

                }

                {
                    imageType === "video" && (video! == undefined ? <video src={video} /> : null)
                }

            </div>
            <div className='likes-share-section'>
                <div className='likes'>
                    <IconSvg.HeartIcon />
                    <span>{likes}</span>
                </div>
                <button className='share' onClick={onSharePost}>
                    <IconSvg.SendIcon />
                    <span>Share</span>
                </button>
            </div>
        </div>
    )
}
