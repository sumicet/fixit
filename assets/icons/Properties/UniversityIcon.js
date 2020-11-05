import * as React from "react"
import Svg, { Path, G } from "react-native-svg"
import Layout from '../../../constants/Layout'

function BuilderIcon() {
  return (
    <Svg height={Layout.occupationIconSize} viewBox="0 0 512 512" width={Layout.occupationIconSize}>
      <Path fill="#8c4a37" d="M271 91v45h-30V91l15-30z" />
      <Path fill="#804231" d="M271 91v45h-15V61z" />
      <Path d="M241 0v91h120V0H241z" fill="#ff9f00" />
      <Path fill="#ff7816" d="M256 0h105v91H256z" />
      <Path fill="#f4d7af" d="M121 331H0v181h61l69.999-31L151 421z" />
      <Path fill="#f1c992" d="M391 331h121v181h-61l-69.999-31L361 421z" />
      <Path fill="#faecd8" d="M121 226h270v286H121z" />
      <Path fill="#f8e5ca" d="M256 226h135v286H256z" />
      <Path
        d="M331 436v76h-30l-30-31h-30l-30 31h-30v-76c0-41.4 33.6-75 75-75s75 33.6 75 75z"
        fill="#8c4a37"
      />
      <Path
        d="M331 436v76h-30l-30-31h-15V361c41.4 0 75 33.6 75 75z"
        fill="#804231"
      />
      <Path
        d="M301 436v76h-90v-76c0-24.901 20.099-45 45-45s45 20.099 45 45z"
        fill="#663325"
      />
      <Path d="M301 436v76h-45V391c24.901 0 45 20.099 45 45z" fill="#582b1f" />
      <Path fill="#73bcff" d="M241 271h30v60h-30z" />
      <Path fill="#3aaaff" d="M301 271h30v60h-30z" />
      <Path fill="#73bcff" d="M181 271h30v60h-30z" />
      <Path fill="#8c4a37" d="M241 376h30v136h-30z" />
      <Path fill="#804231" d="M256 376h15v136h-15z" />
      <Path fill="#ff9f00" d="M391 218.5v7.5H121v-7.5l135-101.1z" />
      <Path
        d="M121 512H61v-91c0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30v91z"
        fill="#73bcff"
      />
      <G fill="#3aaaff">
        <Path d="M391 512h60v-91c0-16.569-13.431-30-30-30-16.569 0-30 13.431-30 30v91zM256 271h15v60h-15z" />
      </G>
      <Path fill="#ff7816" d="M391 218.5v7.5H256V117.4z" />
      <Path fill="#f4d7af" d="M91 211h330v30H91z" />
      <Path fill="#f1c992" d="M256 211h165v30H256z" />
    </Svg>
  )
}

export default BuilderIcon
