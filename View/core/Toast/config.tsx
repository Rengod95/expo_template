import { AlertCircle, CheckCircle2 } from "@tamagui/lucide-icons";
import { Dimensions } from "react-native";
import { BaseToast, type ToastConfig } from "react-native-toast-message";
import { Text, View, XStack, YStack } from "tamagui";

export const toastConfig: ToastConfig = {
  info: (params) => {
    return (
      <View zIndex={1000000}>
        <BaseToast
          text1={params.text1}
          text2={params.text2}
          style={{ borderLeftColor: "$accent1" }}
          contentContainerStyle={{ backgroundColor: "$base1", zIndex: 1000000 }}
        />
      </View>
    );
  },

  success: (params) => {
    return (
      <View
        pos={"absolute"}
        bottom={40}
        width={"90%"}
        maw={"90%"}
        $gtMd={{ w: "50%" }}
        minHeight={Dimensions.get("screen").height * 0.08}
        backgroundColor={"$color2"}
        p={"$4"}
        px={"$8"}
        borderRadius={"$md"}
        shadowOpacity={0.4}
        shar={4}
        shac={"$shadow1"}
      >
        <XStack gap={"$8"}>
          <YStack
            ai={"center"}
            jc={"center"}
            br={"$sm"}
            bg={"$color5"}
            px={"$6"}
            py={"$6"}
            fg={0}
            alignSelf="center"
          >
            <CheckCircle2 size={24} color={"$success"} />
          </YStack>
          <YStack jc={"center"} mt={"$2"} maw={"86%"}>
            <Text
              ff={"$heading"}
              fos={"$3"}
              letterSpacing={"$5"}
              color={"$text1"}
              lh={26}
              numberOfLines={2}
              maw={"100%"}
            >
              {params.text1}
            </Text>
            <Text
              ff={"$body"}
              fos={"$5"}
              letterSpacing={"$4"}
              color={"$text2"}
              lh={18}
              numberOfLines={2}
            >
              {params.text2}
            </Text>
          </YStack>
        </XStack>
      </View>
    );
  },

  error: (params) => {
    return (
      <View
        pos={"absolute"}
        bottom={40}
        width={"90%"}
        maw={"90%"}
        $gtMd={{ w: "50%" }}
        minHeight={Dimensions.get("screen").height * 0.08}
        backgroundColor={"$color2"}
        p={"$4"}
        px={"$8"}
        borderRadius={"$md"}
        shadowOpacity={0.4}
        shar={4}
        shac={"$shadow1"}
      >
        <XStack gap={"$8"}>
          <YStack
            ai={"center"}
            jc={"center"}
            br={"$sm"}
            bg={"$color5"}
            px={"$6"}
            py={"$6"}
            fg={0}
            alignSelf="center"
          >
            <AlertCircle size={24} color={"$error"} />
          </YStack>
          <YStack jc={"center"} mt={"$2"} maw={"86%"}>
            <Text
              ff={"$heading"}
              fos={"$3"}
              letterSpacing={"$5"}
              color={"$text1"}
              lh={26}
              numberOfLines={2}
              maw={"100%"}
            >
              {params.text1}
            </Text>
            <Text
              ff={"$body"}
              fos={"$5"}
              letterSpacing={"$4"}
              color={"$text2"}
              lh={18}
              numberOfLines={2}
            >
              {params.text2}
            </Text>
          </YStack>
        </XStack>
      </View>
    );
  },
};
