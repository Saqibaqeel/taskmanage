const COLORS = {
  primary: '#595E62',
  secondary: '#000000',
  info: '#007BC0',
  success: '#007A42',
  error: '#A80003',
  warning: '#EEC100',
  gray: '#B2B9C0',
  white: '#FFFFFF',
}

const FONT_FAMILY_MAP = {
  thin: 'BoschSans-Light',
  thinItalic: 'BoschSans-LightItalic',
  normal: 'BoschSans-Regular',
  italic: 'BoschSans-Italic',
  medium: 'BoschSans-Medium',
  mediumItalic: 'BoschSans-MediumItalic',
  bold: 'BoschSans-Bold',
  boldItalic: 'BoschSans-BoldItalic',
  black: 'BoschSans-Black',
  blackItalic: 'BoschSans-BlackItalic',
}

const VARIANT_STYLES = {
  caption: {
    fontSize: 11,
    lineHeight: '14px',
    fontFamily: FONT_FAMILY_MAP.normal,
  },
  body2: {
    fontSize: 12,
    lineHeight: '18px',
    fontFamily: FONT_FAMILY_MAP.normal,
  },
  body1: {
    fontSize: 14,
    lineHeight: '22px',
    fontFamily: FONT_FAMILY_MAP.normal,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '24px',
    fontFamily: FONT_FAMILY_MAP.bold,
  },
  h6: {
    fontSize: 20,
    lineHeight: '30px',
    fontFamily: FONT_FAMILY_MAP.normal,
  },
  h6Bold: {
    fontSize: 20,
    lineHeight: '30px',
    fontFamily: FONT_FAMILY_MAP.bold,
  },
  h5: {
    fontSize: 24,
    lineHeight: '34px',
    fontFamily: FONT_FAMILY_MAP.bold,
  },
}

const Typography = ({
  children,
  variant = 'body1',
  color = 'secondary',
  align = 'left',
  fontWeight = '',
  numberOfLines,
  ellipsizeMode = 'tail', // head | middle | tail | clip
  style,
  ...props
}) => {
  const baseStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.body1

  const resolvedFontFamily = fontWeight
    ? FONT_FAMILY_MAP[fontWeight] || baseStyle.fontFamily
    : baseStyle.fontFamily

  const ellipsisStyle =
    numberOfLines !== undefined
      ? {
          display: '-webkit-box',
          WebkitLineClamp: numberOfLines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow:
            ellipsizeMode === 'clip' ? 'clip' : 'ellipsis',
          whiteSpace: 'normal',
        }
      : {}

  const textStyle = {
    ...baseStyle,
    color: COLORS[color] || COLORS.secondary,
    textAlign: align,
    fontFamily: resolvedFontFamily,
    ...ellipsisStyle,
    ...style,
  }

  return (
    <span style={textStyle} {...props}>
      {children}
    </span>
  )
}

export default Typography
