import React, { ChangeEvent, FC, useEffect, useRef, useState, } from 'react'
import NavigateBack from '../../common/components/navigateBack'
import { IconSvg } from '../../common/constants/image';

interface PostPreviewProps {
    images: string[];
    desc: string;
    type: "video" | "camera";
    handleCameraCapture: (e: ChangeEvent<HTMLInputElement>) => void;
    handleCreatePost: () => void;
}

const PostPreview: FC<PostPreviewProps> = (props) => {
    const { images, desc, type, handleCameraCapture, handleCreatePost } = props;
    const [slideIndex, setSlideIndex] = useState(0);
    const [width, setWidth] = useState(1);
    const [dragging, setDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [dragDistance, setDragDistance] = useState<number>(0);
    const sliderItemRef = useRef<HTMLDivElement>(null);
    

    const totalSlides = images.length;
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

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setStartX(e.clientX);
        setDragDistance(0);
    };


    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;

        const diff = e.clientX - startX;

        setDragDistance(diff);
    };

    const handleMouseUp = () => {
        if (!dragging) return;

        
        if (Math.abs(dragDistance) > width / 2) {
    
            setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
            console.log(true, 'true');
        }

       setDragging(false);
        setDragDistance(0);
    };


    return (
        <div className='create-post-container container'>
            <NavigateBack path='New Post' />
            {type === "camera" ?
                (<div className='photo-slider'>
                    <div ref={sliderItemRef} className='gallery'
                        style={{
                            transform: `translateX(calc(-${slideIndex * width}px + ${dragging ? dragDistance : 0}px))`,
                            transition: dragging ? 'none' : 'transform 0.2s ease-in-out',
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
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
                        <p>{slideIndex + 1}/{images.length}</p>
                    </div>
                    <div className='delete'>
                        <IconSvg.DeleteIcon />
                    </div>
                    <div className='indicators'>
                        {images.map((item, index) => {
                            return <span onClick={() => handleClickPostImg(index)} className={`${index === slideIndex ? 'active' : ''} slide-btn`}></span>
                        })}
                    </div>
                </div>)
                : (
                    images.map((item) => {
                        return (
                            <div className='video-container'>
                                <video className='video-preview' src={item} controls width="400" height="300" ></video>
                            </div>
                        )
                    })
                )}

            {type === "camera" ? <div className='option'>
                <IconSvg.PhotoIcon />
                <p>Add more Photos</p>
                <input type='file' id='camera' accept='image/*' className='camera' capture='user'
                    multiple
                    onChange={handleCameraCapture}
                />
            </div>
                : null}
            <div className='description-preview'>
                <p>
                    {desc}
                </p>
            </div>
            <div className='profile-edit-btn'>
                <button className='create' onClick={handleCreatePost}>
                    <p>Create</p>
                </button>
            </div>
        </div>
    )
}

export default PostPreview