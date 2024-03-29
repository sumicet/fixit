import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';

function FactoryIcon() {
    return (
        <Svg
            height={Layout.cardIconSize}
            viewBox="0 0 511.226 511.226"
            width={Layout.cardIconSize}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M25.178 195.613L0 510.333h147.796l-33.57-314.72zM31.178 120.613l-3.6 45h83.448l-4.8-45zM470.156 210.613l-80.337 97.121v-97.121h-41.044L264.09 312.41V210.613h-41.087l-68.178 82.762 10.372 97.238h46.029v30h-42.829l9.6 90h333.229v-300zm-168.93 210h-60v-30h60zm90 0h-60v-30h60zm90 0h-60v-30h60z"
                fill={Color.secondaryColor}
            />
            <Path
                d="M133.196 90.613l10.099 94.679a80.226 80.226 0 0042.579-16.962c13.696 7.981 29.403 12.283 45.351 12.283 24.818 0 48.319-10.251 65.181-27.959 10.783 5.236 22.605 7.959 34.819 7.959 17.581 0 34.645-5.858 48.486-16.39 11.564 7.41 25.024 11.39 39.014 11.39 39.977 0 72.5-32.523 72.5-72.5s-32.523-72.5-72.5-72.5a72.501 72.501 0 00-35.428 9.258C368.907 7.508 350.545.613 331.225.613c-17.536 0-34.544 5.82-48.36 16.291C267.821 6.323 249.916.613 231.225.613c-25.879 0-50.145 11.03-67.101 30.027a80.017 80.017 0 00-27.899-5.027c-38.984 0-71.526 28.036-78.569 65z"
                fill={Color.secondaryColor}
            />
        </Svg>
    );
}

export default FactoryIcon;
