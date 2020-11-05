import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import Layout from '../../../constants/Layout'

function OtherIcon() {
    return (
        <Svg
            height={Layout.occupationIconSize}
            viewBox="0 0 512 512"
            width={Layout.occupationIconSize}
        >
            <Path
        fill="#8f8f8f"
        d="M336.45 146.127l-21.214 21.213-42.425-42.425 21.213-21.213z"
      />
      <Path d="M191 335h-90V217h90v118z" fill="#ff3d0c" />
      <Path fill="#c2080a" d="M146 217h45v118h-45z" />
      <Path fill="#e8e8e8" d="M131 98h30v134h-30z" />
      <Path fill="#bfbfbf" d="M146 98h15v134h-15z" />
      <Path fill="#ff6a00" d="M91 217h110v30H91z" />
      <Path fill="#ff3d0c" d="M146 217h55v30h-55z" />
      <Path
        fill="#e8e8e8"
        d="M330.794 215.417L263.62 282.59l-21.213-21.213 67.174-67.174z"
      />
      <Path
        d="M256.394 335.075h-127.28L201.39 262.8c17.545-17.546 46.095-17.546 63.639 0 8.5 8.499 13.18 19.799 13.18 31.819s-4.681 23.321-13.18 31.82l-8.635 8.636z"
        fill="#ffca2c"
      />
      <Path
        fill="#bfbfbf"
        d="M330.798 215.421l-67.174 67.174-9.19-9.19 67.175-67.173z"
      />
      <Path
        d="M265.029 326.438c8.499-8.499 13.18-19.8 13.18-31.82s-4.681-23.32-13.18-31.819l-72.275 72.275h63.64l8.635-8.636z"
        fill="#ffaa19"
      />
      <Path fill="#606060" d="M45 30h422v30H45z" />
      <Path fill="#404040" d="M256 30h211v30H256z" />
      <Path fill="#a3a3a3" d="M30 0h30v320H30z" />
      <Path fill="#8f8f8f" d="M452 0h30v320h-30z" />
      <Path
        d="M467 512H45c-24.813 0-45-20.187-45-45V305h512v162c0 24.813-20.187 45-45 45z"
        fill="#606060"
      />
      <Path
        d="M256 305v207h211c24.813 0 45-20.187 45-45V305H256z"
        fill="#404040"
      />
      <Path
        d="M389.48 284.012L283.414 177.946l63.64-63.64 53.033 53.033c29.242 29.243 29.242 76.823 0 106.065l-10.607 10.608z"
        fill="#606060"
      />
      <Path
        fill="#ffca2c"
        d="M325.839 93.095l-63.638 63.638-21.213-21.213 63.638-63.638z"
      />
      <Path
        d="M389.48 284.012l10.606-10.607c29.242-29.242 29.242-76.823 0-106.065l-19.797-19.797-63.64 63.64 72.831 72.829z"
        fill="#404040"
      />
        </Svg>
    );
}

export default OtherIcon;
