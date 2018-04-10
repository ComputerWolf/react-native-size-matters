import { Dimensions } from 'react-native';
import Config from 'react-native-config';

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = Config.BASE_WIDTH | 375;
const guidelineBaseHeight = Config.BASE_HEIGHT | 667;
const resizeMode = Config.RESIZE_MODE | 'contain';
const baseRatio = guidelineBaseWidth / guidelineBaseHeight;
const deviceRatio = width / height;
const widthFactor = width / guidelineBaseWidth;
const heightFactor = height / guidelineBaseHeight;
const containFactor = deviceRatio <= baseRatio ? widthFactor : heightFactor;
const coverFactor = deviceRatio > baseRatio ? widthFactor : heightFactor;
const mapFactor = {
  contain: containFactor,
  cover: coverFactor,
  height: heightFactor,
  width: widthFactor
};
const scaleFactor = mapFactor[resizeMode];
const scale = size => scaleFactor * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
