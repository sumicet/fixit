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
            <Path d="M376 60v60H136V60H61v452h390V60zM151 457.21l-40.61-40.6 21.22-21.22 19.39 19.4 49.39-49.4 21.22 21.22zm0-90l-40.61-40.6 21.22-21.22 19.39 19.4 49.39-49.4 21.22 21.22zm0-90l-40.61-40.6 21.22-21.22 19.39 19.4 49.39-49.4 21.22 21.22zM391 421H241v-30h150zm0-90H241v-30h150zm0-90H241v-30h150z" fill={Color.secondaryColor} />
      <Path d="M286 30c0-16.569-13.43-30-30-30-16.569 0-30 13.43-30 30h-60v60h180V30h-60z" fill={Color.secondaryColor} />
    </Svg>
    );
}

export default LocationIcon;
