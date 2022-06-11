import { styled } from '@mui/material/styles'
import Paper, { PaperProps } from '@mui/material/Paper'

interface FloatingPaperProps extends PaperProps {
  shadowdensity?: number
}

/**
 * Floating Paper
 * A paper that have a controlled floating effect (shadow)
 * e.g. User card | Login Card
 */
export const FloatingPaper = styled(Paper)<FloatingPaperProps>(
  ({ theme, shadowdensity }) => {
    const shadowY: number =
      shadowdensity !== undefined ? shadowdensity * 15 : 15

    const shadowBlur: number = shadowY

    const shadowScale: number =
      shadowdensity !== undefined ? shadowdensity * 5 : 5

    const shadowOpacity: number =
      shadowdensity !== undefined ? shadowdensity * 0.2 : 0.2

    const shadow = `0px ${shadowY}px ${shadowBlur}px ${shadowScale}px rgba(0,0,0,${shadowOpacity})`

    return {
      align: 'center',

      borderRadius: 15,
      boxShadow: `0px ${shadowY}px ${shadowBlur}px ${shadowScale}px rgba(0,0,0,${shadowOpacity})`,
      webkitBoxShadow: shadow,
      MozBoxShadow: shadow,

      transition: 'box-shadow 0.5s',
    }
  }
)

export default FloatingPaper
