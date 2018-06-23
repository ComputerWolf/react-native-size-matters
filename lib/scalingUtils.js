import { Dimensions, StatusBar, Platform } from 'react-native';
import Config from 'react-native-config';

let { width, height } = Dimensions.get('window');

// Deal with landscape orientation
if (width > height) {
  let tmp = width;
  width = height;
  height = tmp;
}

if (Platform.OS === 'android') {
  height -= StatusBar.currentHeight;
}

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = Config.BASE_WIDTH | 375;
const guidelineBaseHeight = Config.BASE_HEIGHT | 667;
const resizeMode = Config.RESIZE_MODE || 'contain';
const widthFactor = width / guidelineBaseWidth;
const heightFactor = height / guidelineBaseHeight;
const containFactor = Math.min(widthFactor, heightFactor);
const coverFactor = Math.max(widthFactor, heightFactor);
const mapFactor = {
  contain: containFactor,
  cover: coverFactor,
  height: heightFactor,
  width: widthFactor,
};
const scaleFactor = mapFactor[resizeMode];
const scale = size => scaleFactor * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
