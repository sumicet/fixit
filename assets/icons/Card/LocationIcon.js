import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';

function LocationIcon() {
    return (
        <Svg
            height={Layout.cardIconSize}
            viewBox="0 0 512 512"
            width={Layout.cardIconSize}
        >
            <Path
                d="M256 0C166.035 0 91 72.47 91 165c0 35.202 10.578 66.592 30.879 96.006l121.494 189.58c5.894 9.216 19.372 9.198 25.254 0l122.021-190.225C410.512 232.28 421 199.307 421 165 421 74.019 346.981 0 256 0zm0 240c-41.353 0-75-33.647-75-75s33.647-75 75-75 75 33.647 75 75-33.647 75-75 75z"
                fill={Color.secondaryColor}
            />
            <Path
                d="M373.264 344.695l-75.531 118.087c-19.551 30.482-64.024 30.382-83.481.029l-75.654-118.085C72.034 360.116 31 388.309 31 422c0 58.462 115.928 90 225 90s225-31.538 225-90c0-33.715-41.091-61.923-107.736-77.305z"
                fill={Color.secondaryColor}
            />
        </Svg>
    );
}

export default LocationIcon;
