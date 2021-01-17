import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';

function EmptyIcon(props) {
    return (
        <Svg
            height={props.size}
            viewBox="0 0 404.688 404.688"
            width={props.size}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path d="M404.422 140.687l-20.491-87.259a10 10 0 00-14.18-6.672l-71.23 35.346H106.168l-71.23-35.346a9.999 9.999 0 00-14.18 6.672L.266 140.687a10.001 10.001 0 005.286 11.242l68.271 33.913v163.131c0 5.523 4.478 10 10 10h237.023c5.522 0 10-4.477 10-10V185.852l68.29-33.922a10.001 10.001 0 005.286-11.243zM242.5 232.973h-80.332c-5.522 0-10-4.477-10-10s4.478-10 10-10H242.5c5.522 0 10 4.477 10 10s-4.477 10-10 10zm-146.135-63.33l15.43-67.541h181.078l15.431 67.541H96.365z" fill={Color.placeholderTextColor} />
    </Svg>
    );
}

export default EmptyIcon;
