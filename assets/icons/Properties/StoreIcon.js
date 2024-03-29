import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';

function BuilderIcon() {
    return (
        <Svg
            height={Layout.cardIconSize}
            viewBox="0 0 512 512"
            width={Layout.cardIconSize}
        >
            <Path
                d="M511.52 172.128L482.56 56.224C479.008 41.984 466.208 32 451.52 32H60.512c-14.688 0-27.488 9.984-31.072 24.224L.48 172.128C.16 173.376 0 174.688 0 176c0 44.096 34.08 80 76 80 24.352 0 46.08-12.128 60-30.944C149.92 243.872 171.648 256 196 256s46.08-12.128 60-30.944C269.92 243.872 291.616 256 316 256s46.08-12.128 60-30.944C389.92 243.872 411.616 256 436 256c41.92 0 76-35.904 76-80 0-1.312-.16-2.624-.48-3.872zM436 288c-21.792 0-42.496-6.656-60-18.816-35.008 24.352-84.992 24.352-120 0-35.008 24.352-84.992 24.352-120 0C118.496 281.344 97.792 288 76 288c-15.712 0-30.528-3.68-44-9.952V448c0 17.664 14.336 32 32 32h128V352h128v128h128c17.664 0 32-14.336 32-32V278.048C466.528 284.32 451.712 288 436 288z"
                fill={Color.secondaryColor}
            />
        </Svg>
    );
}

export default BuilderIcon;
