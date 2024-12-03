import { Input } from "@mantine/core";

type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
};

export const BaseInput = ({
  label,
  value,
  onChange,
  isRequired,
}: Props): React.ReactNode => {
  return (
    <Input.Wrapper label={label} withAsterisk={isRequired}>
      <Input value={value} onChange={onChange} />
    </Input.Wrapper>
  );
};
