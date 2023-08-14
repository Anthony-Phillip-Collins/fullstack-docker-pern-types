interface Common extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export interface FormRef {
  reset: () => void;
}

export interface FormCallbacks {
  onLayout?: () => void;
  onCancel?: () => void;
}

export type FormProps = Common &
  FormCallbacks & {
    errors?: Error[];
  };

export type FormContainerProps = FormCallbacks &
  Common & {
    onSuccess?: () => void;
  };
