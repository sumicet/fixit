import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';

function Logo(props) {
    return (
        <Svg
            height={props.height ? props.height : Layout.menuIconSize}
            viewBox="0 0 64 64"
            width={props.width ? props.width : Layout.menuIconSize}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M60.5 33.384l-16.021-9.25a1 1 0 00-1 0l-16.022 9.25a1 1 0 00-.5.866v18.5a1 1 0 00.5.866l16.022 9.25a1 1 0 001 0l16.021-9.25a1 1 0 00.5-.866v-18.5a1 1 0 00-.5-.866zM43.978 50a6.5 6.5 0 116.5-6.5 6.5 6.5 0 01-6.5 6.5z"
                fill={Color.primaryBrandColor}
            />
            <G fill={Color.starColor}>
                <Path d="M39.993 8.656l-7.917-7.037A2.449 2.449 0 0028 3.449v13.522a1 1 0 01-.419.813l-5 3.572a1 1 0 01-1.161 0l-5-3.571a1 1 0 01-.42-.814V3.449a2.449 2.449 0 00-4.076-1.83L4.007 8.656A3 3 0 003 10.9v14.271a2.978 2.978 0 00.879 2.122l6.775 6.776a1 1 0 01.291.769L10 49.938a1 1 0 002 .125l.943-15.1a2.993 2.993 0 00-.873-2.309l-6.777-6.775A1 1 0 015 25.171V10.9a1 1 0 01.335-.747l7.917-7.037a.465.465 0 01.748.333v13.522a3 3 0 001.257 2.441l5 3.571a3 3 0 003.487 0l5-3.571A3 3 0 0030 16.971V3.449a.465.465 0 01.748-.335l7.917 7.037A1 1 0 0139 10.9v14.271a1 1 0 01-.293.708l-6.775 6.775a3 3 0 00-.873 2.309l.941 15.1a1 1 0 002-.125l-.943-15.1a1 1 0 01.291-.769l6.775-6.776A2.983 2.983 0 0041 25.171V10.9a3 3 0 00-1.007-2.244z" />
                <Path d="M22 39a5.006 5.006 0 00-5 5v6a1 1 0 002 0v-6a3 3 0 016 0v6a1 1 0 002 0v-6a5.006 5.006 0 00-5-5z" />
            </G>
        </Svg>
    );
}

export default Logo;
