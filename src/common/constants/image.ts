import { FC, SVGProps } from "react";
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow-down.svg'
import { ReactComponent as RightArrowIcon } from '../../assets/icons/right-arrow.svg';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/like.svg';
import { ReactComponent as SendIcon } from '../../assets/icons/send.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as DiscordIcon } from '../../assets/icons/discord.svg';
import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as MessengerIcon } from '../../assets/icons/messenger.svg';
import { ReactComponent as RedditIcon } from '../../assets/icons/reddit.svg';
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as WhatsappIcon } from '../../assets/icons/whatsapp.svg';
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-icon.svg';
import { ReactComponent as LeftArrowIcon } from '../../assets/icons/Menu.svg';
import { ReactComponent as FolderOpenIcon } from '../../assets/icons/folder-open.svg';
import { ReactComponent as PhotoIcon } from '../../assets/icons/photo.svg';
import { ReactComponent as VideoIcon } from '../../assets/icons/video-icon.svg';
import { ReactComponent as CameraIcon } from '../../assets/icons/camera-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-icon.svg';
import { ReactComponent as AvatarIcon } from '../../assets/icons/avatar.svg';

export const IconSvg: { [key: string]: FC<SVGProps<SVGSVGElement>> } = {
    ArrowDownIcon: ArrowDownIcon,
    RightArrowIcon: RightArrowIcon,
    GoogleIcon: GoogleIcon,
    HeartIcon: HeartIcon,
    SendIcon: SendIcon,
    PlusIcon: PlusIcon,
    WhatsappIcon: WhatsappIcon,
    DiscordIcon: DiscordIcon,
    TelegramIcon: TelegramIcon,
    TwitterIcon: TwitterIcon,
    RedditIcon: RedditIcon,
    InstagramIcon: InstagramIcon,
    FacebookIcon: FacebookIcon,
    MessengerIcon: MessengerIcon,
    CopyIcon: CopyIcon,
    ArrowLeftIcon: ArrowLeftIcon,
    EditIcon: EditIcon,
    LeftArrowIcon: LeftArrowIcon,
    CameraIcon: CameraIcon,
    FolderOpenIcon: FolderOpenIcon,
    PhotoIcon: PhotoIcon,
    VideoIcon: VideoIcon,
    DeleteIcon: DeleteIcon,
    AvatarIcon: AvatarIcon
}

export const images: { [key: string]: string } = {
    imageSea: require('../../assets/images/image-sea.png'),
    imageGirl1: require('../../assets/images/image-girl.png'),
    imageGirl2: require('../../assets/images/image-girl-2.png'),
    imageGirl3: require('../../assets/images/image-girl-3.png'),
    imageFruits: require('../../assets/images/image-fruits.png'),
    imageFlowers: require('../../assets/images/image-flowers.png'),
    imageFlowers2: require('../../assets/images/image-flowers-2.png'),
    imageFlowers3: require('../../assets/images/image-flowers-3.png'),
    imageMan: require('../../assets/images/image-6.png'),
    mediaLogo: require('../../assets/images/media-logo.png'),
    profileImg: require('../../assets/images/Menu.png'),
    userPost1: require('../../assets/images/user-post-1.png'),
    userPost2: require('../../assets/images/user-post-2.png'),
    wallpaper: require('../../assets/images/wallpaper.png'),
    img: require('../../assets/images/profile-img.png'),
    postImage: require('../../assets/images/color-image.png'),
    girlImage: require('../../assets/images/girl-image-1.png'),
    parachute: require('../../assets/images/parachute.png'),
    newPostImg: require('../../assets/images/new-post.png'),
    backgroundImg: require('../../assets/images/social-media-background.jpg'),
}