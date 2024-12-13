import React, { FC, ReactNode, useEffect, useState } from 'react'
import './modal.scss'

interface ModalProps{
    children: ReactNode;
    modalStatus: boolean;
    onClose?:(e:boolean) => void;
    modalTitle?:string;
}

const Modal:FC<ModalProps> = (props) => {
    const {children,modalStatus,onClose,modalTitle} = props;
    const [isOpen, setIsOpen] = useState(modalStatus);

    useEffect(() => {
        setIsOpen(modalStatus);
    },[modalStatus]);
    
    const onModalClose = () => {
        if(onClose){
            onClose(false);
        }
        setIsOpen(false);
    }

  return isOpen?(
    <div className='modal-wrapper'>
       <div className='modal-container'>
           <div className='modal-content'>
              {modalTitle ? (<h2>{modalTitle}</h2>) : null}
           </div>
           <div className='modal-close-btn' onClick={onModalClose}>
              <span></span>
              <span></span>
           </div>
           <div className='modal-section'> 
              {children}
           </div>
       </div>
       <div className='back-drop' onClick={onModalClose}></div>
    </div>
  ):null
}

export default Modal