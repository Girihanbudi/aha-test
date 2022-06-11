import React from 'react'
import { Box, InputAdornment, FormHelperText } from '@mui/material'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import MuiOutlinedInput, {
  OutlinedInputProps as MuiInputProps,
} from '@mui/material/OutlinedInput'

interface OutlinedInputProps {
  formControlProps: FormControlProps
  inputProps: MuiInputProps
  helperText?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

/**
 * Outlined Input
 * An outlined input style that have start adornment and end adornment
 * e.g. password input field
 */
const OutlinedInput = (props: OutlinedInputProps) => {
  return (
    <FormControl fullWidth {...props.formControlProps}>
      <MuiOutlinedInput
        startAdornment={
          props.startAdornment ? (
            <InputAdornment position="start">
              {props.startAdornment}
            </InputAdornment>
          ) : undefined
        }
        endAdornment={
          props.endAdornment ? (
            <InputAdornment position="end">{props.endAdornment}</InputAdornment>
          ) : undefined
        }
        {...props.inputProps}
      />
      <Box>
        {props.helperText && (
          <FormHelperText sx={{ textAlign: 'right' }}>
            {props.helperText}
          </FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}

export default OutlinedInput
