import CountDown from "@/components/CountDown";
import { Text, Box, Paper, Button, Stack } from "@mantine/core";
const PassStatusCheck = () => {
  return (
    <>
      <Stack gap={64}>
        <CountDown />
      </Stack>
    </>
  );
};

export default PassStatusCheck;
