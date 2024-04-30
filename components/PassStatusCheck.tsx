import CheckStatus from "@/components/CheckStatus";
import CountDown from "@/components/CountDown";
import { Text, Box, Paper, Button, Stack } from "@mantine/core";
const PassStatusCheck = () => {
  return (
    <Stack gap={64}>
      {/* <CountDown /> */}
      <CheckStatus />
    </Stack>
  );
};

export default PassStatusCheck;
