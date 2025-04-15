import {PaywallSheet} from '@/View/core/payment/PaywallSheet';
import {Sheet} from 'tamagui';

type GlobalPaywallSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const GlobalPaywallSheet = ({isOpen, onClose}: GlobalPaywallSheetProps) => {
  return (
    <Sheet
      snapPoints={[95]}
      modal
      open={isOpen}
      onOpenChange={onClose}
      dismissOnOverlayPress
      dismissOnSnapToBottom
      unmountChildrenWhenHidden
      zIndex={1000000}
      animation="medium">
      <Sheet.Overlay bg="#000000" opacity={0.5} animation="medium" enterStyle={{opacity: 0}} exitStyle={{opacity: 0}} zIndex={1000} />

      <Sheet.Frame pos={'relative'} $gtMd={{w: '70%', alignSelf: 'center'}} animation="medium" p={0}>
        <Sheet.Handle pos={'absolute'} top={20} left={0} right={0} />

        <PaywallSheet onPurchaseSuccess={onClose} onClose={onClose} pt={'$8'} />
      </Sheet.Frame>
    </Sheet>
  );
};
