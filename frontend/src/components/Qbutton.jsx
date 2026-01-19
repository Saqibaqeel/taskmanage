const COLORS = {
  primary: '#007BC0',
  primaryOutlined: '#006EAD',
  secondary: '#E0E2E5',
  success: '#00A24C',
  error: '#BE0004',
  white: '#fff',
}

const QButton = ({
  title,
  variant = 'contained', // contained | outlined | text | icon | floating
  color = 'primary',
  disabled = false,
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  onClick,
  style,
  textStyle,
}) => {
  const isIconOnly = variant === 'icon'

  const bgForContained = () => {
    if (color === 'secondary') return COLORS.secondary
    if (color === 'success') return COLORS.success
    if (color === 'error') return COLORS.error
    if (color === 'white') return COLORS.white
    return COLORS.primary
  }

  const backgroundColor =
    variant === 'contained' || variant === 'floating'
      ? bgForContained()
      : 'transparent'

  const textColor =
    variant === 'contained' || variant === 'floating'
      ? COLORS.white
      : color === 'secondary'
      ? COLORS.primary
      : bgForContained()

  const baseStyle = {
    height: 32,
    padding: isIconOnly ? 0 : '0 24px',
    width: isIconOnly ? 32 : fullWidth ? '100%' : 'auto',
    borderRadius: 20,
    border:
      variant === 'outlined'
        ? `1px solid ${
            color === 'primary'
              ? COLORS.primaryOutlined
              : bgForContained()
          }`
        : 'none',
    backgroundColor,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    boxShadow:
      variant === 'floating'
        ? '0 4px 10px rgba(0,0,0,0.25)'
        : 'none',
    ...style,
  }

  const labelStyle = {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '22px',
    color: textColor,
    whiteSpace: 'nowrap',
    ...textStyle,
  }

  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const spinnerStyle = {
    width: 16,
    height: 16,
    border: '2px solid rgba(255,255,255,0.5)',
    borderTop: '2px solid #fff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  }

  return (
    <>
      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <button
        onClick={disabled || loading ? undefined : onClick}
        disabled={disabled || loading}
        style={baseStyle}
      >
        {loading ? (
          <span style={spinnerStyle} />
        ) : (
          <>
            {startIcon && (
              <span style={{ ...iconStyle, marginRight: 8 }}>
                {startIcon}
              </span>
            )}

            {!isIconOnly && title && (
              <span style={labelStyle}>{title}</span>
            )}

            {endIcon && (
              <span style={{ ...iconStyle, marginLeft: 8 }}>
                {endIcon}
              </span>
            )}
          </>
        )}
      </button>
    </>
  )
}

export default QButton
