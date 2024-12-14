import React, { FC, SVGProps, useState } from 'react'
import Modal from '../../../../common/components/modal/modal';
import { IconSvg } from '../../../../common/constants/image';
import './styles.scss';
import { FacebookMessengerShareButton, FacebookShareButton, InstapaperShareButton, LinkedinShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

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
    shareUrl: string;
}


const SharePost: FC<SharePostProps> = (props) => {
    const { onModalClose, onShare, postUrl } = props;
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleInstagramShare = () => {
        const shareUrl = "https://www.instagram.com/sharer/sharer.php?u="
        window.open(shareUrl + encodeURIComponent(postUrl), '_blank');
        onModalClose(); 
    };

    const handleDiscordShare = () => {
        const shareUrl = "https://discord.com/channels/@me?url="
        window.open(shareUrl + encodeURIComponent(postUrl), '_blank');
        onModalClose(); 
    };

    const handleMessengerShare = () => {
        const shareUrl = "https://www.messenger.com/t/?text="
        window.open(shareUrl + encodeURIComponent(postUrl), '_blank');
        onModalClose();
    };
   

    return (
        <Modal modalStatus={onShare} modalTitle='Share post' onClose={onModalClose}>
            <div className='socio-media-container'>

                <div className='socio-media-site'>
                    <TwitterShareButton url={postUrl}>
                        <div className="media-img bg-default">
                            <IconSvg.TwitterIcon />
                        </div>
                        <p>Twitter</p>
                    </TwitterShareButton>
                </div>
                <div className='socio-media-site'>
                    <FacebookShareButton url={postUrl}>
                        <div className="media-img bg-blue">
                            <IconSvg.FacebookIcon />
                        </div>
                        <p>Facebook</p>
                    </FacebookShareButton>
                </div>
                <div className='socio-media-site'>
                    <RedditShareButton url={postUrl}>
                        <div className="media-img bg-orange">
                            <IconSvg.RedditIcon />
                        </div>
                        <p>Reddit</p>
                    </RedditShareButton>
                </div>

                <div className='socio-media-site' onClick={handleDiscordShare}>
                    <div className="media-img bg-default">
                        <IconSvg.DiscordIcon />
                    </div>
                    <p>Discord</p>
                </div>

                <div className='socio-media-site'>
                    <WhatsappShareButton url={postUrl}>
                        <div className="media-img bg-green">
                            <IconSvg.WhatsappIcon />
                        </div>
                        <p>WhatsApp</p>
                    </WhatsappShareButton>
                </div>



                <div className='socio-media-site'>
                    <TelegramShareButton url={postUrl}>
                        <div className="media-img bg-blue">
                            <IconSvg.TelegramIcon />
                        </div>
                        <p>Telegram</p>
                    </TelegramShareButton>
                </div>
                <div className='socio-media-site' onClick={handleMessengerShare}>
                        <div className="media-img bg-blue">
                            <IconSvg.MessengerIcon />
                        </div>
                        <p>Messenger</p>
                </div>
                <div className='socio-media-site'onClick={handleInstagramShare}>
                        <div className="media-img bg-pink">
                            <IconSvg.InstagramIcon />
                        </div>
                        <p>Instagram</p>
                </div>
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