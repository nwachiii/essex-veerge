import hammer from '/src/images/icons/hammer_filter.svg';
import circle_dot from '/src/images/icons/circle_dot_filter.svg';
import completed from '/src/images/icons/completed_filter.svg';
import parkingIcon from '/src/images/icons/parkingIcon.svg';
import petPawIcon from '/src/images/icons/petPawIcon.svg';
import com from '/src/images/icons/comIcon_filter.svg';
import trash_Icon from '/src/images/icons/trash_Icon.svg';
import constructionwarningIcon from '/src/images/icons/constructionwarningIcon.svg';
import noiseIcon from '/src/images/icons/noiseIcon.svg';

import detached from '/src/images/icons/detached_filter.svg';
import mixed_use from '/src/images/icons/mixed_use_filter.svg';

import active from '/src/images/icons/active_listing_filter.svg';
import inactive from '/src/images/icons/inactive_listing_filter.svg';
import soldout from '/src/images/icons/soldout_listing_filter.svg';
import {VerifyMark} from '@/components/assets/verifyMark';

export const violationConstants = {
  Status: [
    {icon: <VerifyMark />, name: 'In cure'},
    {icon: <VerifyMark baseColor="#f97316" />, name: 'Escalated'},
    {icon: <VerifyMark baseColor="#ef4444" />, name: 'Late to cure'},
    {icon: <VerifyMark baseColor="#ef4444" />, name: 'Fine'},
    {icon: <VerifyMark baseColor="#16a34a" />, name: 'Closed'},
  ],
  'Issue Type': [
    {image: parkingIcon.src, name: 'Parking'},
    {image: petPawIcon.src, name: 'Pet'},
    {image: constructionwarningIcon.src, name: 'Architectural'},
    {image: trash_Icon.src, name: 'Trash'},
    {image: noiseIcon.src, name: 'Noise'},
  ],
};
