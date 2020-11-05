import * as React from "react"
import Svg, { Path, G } from "react-native-svg"
import Layout from '../../../constants/Layout'

function BuilderIcon() {
  return (
    <Svg height={Layout.occupationIconSize} viewBox="0 0 512 512" width={Layout.occupationIconSize}>
      <Path d="M146.286 0h73.143v75.627h-73.143z" fill="#fd676a" />
      <Path
        d="M475.43 277.57l-14.48 36.57 14.48 36.57v109.72H36.57V350.71l12.86-36.57-12.86-36.57v-73.14L256 75.63l219.43 128.8z"
        fill="#ffe987"
      />
      <Path
        d="M475.43 277.57l-14.48 36.57 14.48 36.57v109.72H256V75.63l219.43 128.8z"
        fill="#fecb6e"
      />
      <Path
        d="M512 167.86v36.57H365.71L256 94.71 146.29 204.43H0v-36.57L109.71 58.14h292.58z"
        fill="#39648e"
      />
      <Path
        d="M512 167.86v36.57H365.71L256 94.71V58.14h146.29z"
        fill="#324d75"
      />
      <Path d="M182.86 277.57h146.28v182.86H182.86z" fill="#fd676a" />
      <Path d="M256 277.57h73.14v182.86H256z" fill="#fc363b" />
      <Path d="M219.43 189.43h73.14v30h-73.14z" fill="#00b3ff" />
      <Path
        d="M256 189.43h36.57v30H256zM475.429 277.571h-73.143v73.143h73.143"
        fill="#3a80e8"
      />
      <Path d="M36.571 277.571h73.143v73.143H36.571" fill="#00b3ff" />
      <Path d="M512 443.14V482l-15 15H256v-64.3h241z" fill="#3b6291" />
      <Path
        d="M497 432.7H15L0 443.14V482l15 15h482l15-15v-38.86z"
        fill="#9dd867"
      />
      <Path d="M512 443.14V482l-15 15H256v-64.3h241z" fill="#77c080" />
      <Path d="M0 413.14h512v30H0zM0 482h512v30H0z" fill="#bfe471" />
      <G fill="#9dd867">
        <Path d="M256 413.14h256v30H256zM256 482h256v30H256z" />
      </G>
    </Svg>
  )
}

export default BuilderIcon
