import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';

function BuilderIcon() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            height={Layout.cardIconSize}
            viewBox="0 0 512.001 512.001"
            width={Layout.cardIconSize}
        >
            <Path
                d="M503.402 228.885L273.684 19.567c-10.083-9.189-25.288-9.188-35.367-.001L8.598 228.886c-8.077 7.36-10.745 18.7-6.799 28.889 3.947 10.189 13.557 16.772 24.484 16.772h36.69v209.721c0 8.315 6.742 15.057 15.057 15.057h125.914c8.315 0 15.057-6.741 15.057-15.057V356.932h74.002v127.337c0 8.315 6.742 15.057 15.057 15.057h125.908c8.315 0 15.057-6.741 15.057-15.057V274.547h36.697c10.926 0 20.537-6.584 24.484-16.772 3.941-10.19 1.273-21.529-6.804-28.89zM445.092 42.73H343.973l116.176 105.636v-90.58c0-8.315-6.741-15.056-15.057-15.056z"
                fill={Color.secondaryColor}
            />
        </Svg>
    );
}

export default BuilderIcon;
