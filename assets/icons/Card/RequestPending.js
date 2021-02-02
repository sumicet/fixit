import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';

function RequestPending(props) {
    return (
        <Svg
            height={Layout.menuIconSize}
            viewBox="0 0 24 24"
            width={Layout.menuIconSize}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M21 11.11V7a2 2 0 00-2-2h-4V3a2 2 0 00-2-2H9a2 2 0 00-2 2v2H3a2 2 0 00-2 2v11a2 2 0 002 2h7.26A7 7 0 1021 11.11M9 3h4v2H9m10 15a5 5 0 01-6 0 5 5 0 116 0m-4-7h1.5v2.82l2.44 1.41-.75 1.3L15 16.69V13"
                fill={Color.textOnTertiaryColorBackground}
            />
        </Svg>
    );
}

export default RequestPending;
