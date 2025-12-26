declare module 'input-otp' {
  import * as React from 'react';

  export interface OTPInputContextValue {
    slots: Array<{
      char: string;
      hasFakeCaret: boolean;
      isActive: boolean;
    }>;
  }

  export const OTPInputContext: React.Context<OTPInputContextValue>;

  export interface OTPInputProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    onChange?: (value: string) => void;
    maxLength?: number;
    containerClassName?: string;
    render: (props: {
      slots: Array<{
        char: string;
        isActive: boolean;
        hasFakeCaret: boolean;
      }>;
      getInputProps: (props?: any) => any;
    }) => React.ReactNode;
  }

  export const OTPInput: React.FC<OTPInputProps>;

  export interface OTPInputSlotProps {
    char: string;
    isActive: boolean;
    hasFakeCaret: boolean;
  }
}
