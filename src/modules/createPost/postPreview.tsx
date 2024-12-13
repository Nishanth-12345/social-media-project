import React, { FC, useEffect, useRef, useState } from 'react'
import NavigateBack from '../../common/components/navigateBack'
import { IconSvg } from '../../common/constants/image';

interface PostPreviewProps {
    images: string[] | string;
    desc: string;
}

const PostPreview: FC<PostPreviewProps> = (props) => {
    const { images, desc } = props;
    const [slideIndex, setSlideIndex] = useState(0);
    const [width, setWidth] = useState(1);
    const sliderItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sliderItemRef.current) {
            const width = sliderItemRef.current.querySelector('.slider-item')?.clientWidth;
            if (width) {
                setWidth(width);
            }
            console.log(width, 'width');
        }

    }, []);
    const handleClickPostImg = (index: number) => {
        setSlideIndex(index);
    }

    return (
        <div className='create-post-container container'>
            <NavigateBack path='New Post' />
            {Array.isArray(images) ?
                <div className='photo-slider'>
                    <div ref={sliderItemRef} className='gallery'
                        style={{
                            transform: `translateX(-${slideIndex * width}px)`,
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    >
                        {
                            images.map((item) => {
                                return (
                                    <div className='slider-item'>
                                        <img src={item} alt='post' />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='count'>
                        <p>1/{images.length}</p>
                    </div>
                    <div className='delete'>
                        <IconSvg.DeleteIcon />
                    </div>
                    <div className='indicators'>
                        {images.map((item, index) => {
                            return <span onClick={() => handleClickPostImg(index)} className={`${index === 0 ? 'active' : ''} slide-btn`}></span>
                        })}
                    </div>
                </div>
                :
                <div className='photo-view'>
                    <img src={images} alt='post' />
                </div>
            }
            <div className='option'>
                <IconSvg.PhotoIcon />
                <p>Add more Photos</p>
            </div>
            <div className='description-preview'>
                <p>
                    {desc}
                </p>
            </div>
            <div className='profile-edit-btn'>
                <button className='create'>
                    <p>Create</p>
                </button>
            </div>
        </div>
    )
}

export default PostPreview