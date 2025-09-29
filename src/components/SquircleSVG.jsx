const SquircleSVG = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        {/* Smooth corners filter */}
        <filter id="smooth-corners">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
            result="smooth"
          />
          <feComposite in="SourceGraphic" in2="smooth" operator="atop"/>
        </filter>
        
        {/* Squircle clip path */}
        <clipPath id="squircle" clipPathUnits="objectBoundingBox">
          <path d="M 0,0.5 C 0,0.15 0.15,0 0.5,0 S 1,0.15 1,0.5 1,0.85 0.5,1 0,0.85 0,0.5" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SquircleSVG