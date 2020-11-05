import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import Layout from '../../../constants/Layout'

function PlumberIcon() {
    return (
        <Svg
            height={Layout.occupationIconSize}
            viewBox="0 -2 512 512"
            width={Layout.occupationIconSize}
        >
            <Path
        d="M456.16 0L124.684 261.305l35.16 45.035 3.988-3.164 49.348 61.808-4.66 3.7 33.93 43.453 34.546-26.227 2.453-35.594 35.25-14.62 2.621-38.071 35.246-14.621 2.621-38.07 35.247-14.621 2.617-38.063 35.246-14.621 2.621-38.07 35.246-14.621 2.606-37.84L512 70.227zm0 0"
        fill="#efe2dd"
      />
      <Path
        d="M456.16 0L124.684 261.305l35.109 44.968L490.34 42.988zm0 0"
        fill="#fdf4f5"
      />
      <Path
        d="M213.18 364.984l-86.336 68.504-49.227-61.906 86.215-68.406-35.293-44.203L0 360.433l117.988 148.38 129.86-100.403zm0 0"
        fill="#9edb3d"
      />
      <Path
        d="M163.773 303.102l-35.234-44.13L0 360.435l35.594 44.765zm0 0"
        fill="#c4e945"
      />
        </Svg>
    );
}

export default PlumberIcon;
