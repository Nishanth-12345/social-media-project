import React, { FC, SVGProps, useState } from 'react'
import Modal from '../../../../common/components/modal/modal';
import { IconSvg } from '../../../../common/constants/image';
import './styles.scss';

interface SharePostProps {
    postUrl: string;
    onShare: boolean;
    onModalClose: () => void;
}

type SVGComponent = FC<SVGProps<SVGSVGElement>>;

interface SocioMediaLinks {
    id: number;
    image: SVGComponent;
    mediaSite: string;
}

const socioMediaLinks: SocioMediaLinks[] = [
    {
        id: 1,
        image: IconSvg.TwitterIcon,
        mediaSite: "Twitter",
    },
    {
        id: 2,
        image: IconSvg.FacebookIcon,
        mediaSite: "Facebook"
    },
    {
        id: 3,
        image: IconSvg.RedditIcon,
        mediaSite: "Reddit",
    },
    {
        id: 4,
        image: IconSvg.DiscordIcon,
        mediaSite: "Discord",
    },
    {
        id: 5,
        image: IconSvg.WhatsappIcon,
        mediaSite: "WhatsApp",
    },
    {
        id: 6,
        image: IconSvg.MessengerIcon,
        mediaSite: "Messenger",
    },
    {
        id: 7,
        image: IconSvg.TelegramIcon,
        mediaSite: "Telegram",
    },
    {
        id: 8,
        image: IconSvg.InstagramIcon,
        mediaSite: "Instagram",
    },
]

const bgColor = (item: string) => {
    switch (item) {
        case 'Reddit':
            return 'bg-orange';
        case 'Instagram':
            return 'bg-pink';
        case 'WhatsApp':
            return 'bg-green';
        default:
            return 'bg-default';

    }
}

const SharePost: FC<SharePostProps> = (props) => {
    const { onModalClose, onShare, postUrl } = props;
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    };
    
    return (
        <Modal modalStatus={onShare} modalTitle='Share post' onClose={onModalClose}>
            <div className='socio-media-container'>
                {
                    socioMediaLinks.length > 0 && socioMediaLinks.map((item) => {
                        const { image: SVGComponent, id, mediaSite } = item;
                        const background = bgColor(mediaSite);
                        return (
                            <div className='socio-media-site' key={id}>
                                <div className={`media-img ${background}`} >
                                    <SVGComponent />
                                </div>
                                <p>{mediaSite}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='copy-page-link'>
                <p>Page Link</p>
                <div className='input-container'>
                    <input
                        type="text"
                        value={postUrl}
                        readOnly
                        className='copy-board'
                    />
                    <button className='' onClick={copyToClipboard}> 
                        <IconSvg.CopyIcon />
                    </button>
                </div>

            </div>
        </Modal>
    )
}

export default SharePost