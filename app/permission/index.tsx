import { Bell, Calendar } from "@tamagui/lucide-icons";
import { useCameraPermissions } from "expo-image-picker";

import { Redirect } from "expo-router";
import { t } from "i18next";
import { Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Text, XStack, YStack } from "tamagui";
import { PermissionViewInterface } from "@service/lib/Permission/types";
import { REQUIRED_PERMISSIONS } from "@/service/lib/Permission/consts";
import { useMemo } from "react";
import { useRequestRequiredPermissions } from "@/application/permission/requestRequiredPermissions";

export default function PermissionRequestScreen() {
  const insets = useSafeAreaInsets();
  const { isAllRequiredPermissionGranted, handleRequestPermissions } =
    useRequestRequiredPermissions();

  if (isAllRequiredPermissionGranted) {
    return <Redirect href="/(protected)" />;
  }

  return (
    <YStack
      flex={1}
      alignItems="center"
      padding="$4"
      gap="$5"
      bg={"$background1"}
      pt={insets.top}
      pb={insets.bottom}
    >
      <Text ff={"$heading"} fos={"$4"} fow={"$semibold"} mt={"$16"}>
        {t("permission.title")}
      </Text>

      <Text ff={"$body"} fos={"$5"} textAlign="center">
        {t("permission.description")}
      </Text>

      <YStack alignSelf="center" gap="$8" px="$4" mt={"$24"} w={"100%"}>
        <XStack gap="$8" px={"$8"} py={"$6"} bw={1} boc={"$text3"} br={"$xs"}>
          <XStack alignItems="center" gap="$3">
            <Calendar size="$6" strokeWidth={1} />
          </XStack>
          <YStack gap={"$2"}>
            <Text ff={"$body"} fos={"$3"} fontWeight="bold">
              {t("permission.calendar")}
            </Text>
            <Text ff={"$body"} fos={"$3"}>
              {t("permission.calendarDescription")}
            </Text>
          </YStack>
        </XStack>
        <XStack gap="$8" px={"$8"} py={"$6"} bw={1} boc={"$text3"} br={"$xs"}>
          <XStack alignItems="center" gap="$3">
            <Bell size="$6" strokeWidth={1} />
          </XStack>
          <YStack gap={"$2"}>
            <Text ff={"$body"} fos={"$3"} fontWeight="bold">
              {t("permission.reminder")}
            </Text>
            <Text ff={"$body"} fos={"$3"}>
              {t("permission.reminderDescription")}
            </Text>
          </YStack>
        </XStack>
      </YStack>

      <XStack px={"$4"} w={"100%"}>
        <Button
          onPress={handleRequestPermissions}
          size="$4"
          mt={"$12"}
          bg={"$accent1"}
          w={"100%"}
          h={56}
          br={"$xs"}
        >
          <Text ff={"$body"} fos={"$5"} fontWeight="700">
            {t("permission.allow")}
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
