// composables/useNFC.js
import { ref, onMounted, onUnmounted } from "vue";

export function useNFC() {
  const nfcMessage = ref(null);
  const errorMessage = ref(null);
  let nfcReader = null;

  const readNFC = async () => {
    try {
      nfcReader = new window.NDEFReader();
      await nfcReader.scan();

      nfcReader.onreading = (event) => {
        const decoder = new TextDecoder();
        const message = event.message.records
          .map((record) => {
            return decoder.decode(record.data);
          })
          .join(", ");

        nfcMessage.value = message;
      };

      nfcReader.onreadingerror = () => {
        errorMessage.value = "Failed to read NFC data.";
      };
    } catch (error) {
      errorMessage.value =
        "NFC reading is not supported or failed to initialize.";
    }
  };

  const stopNFC = () => {
    if (nfcReader) {
      nfcReader = null;
    }
  };

  onMounted(() => {
    readNFC();
  });

  onUnmounted(() => {
    stopNFC();
  });

  return {
    nfcMessage,
    errorMessage,
    readNFC,
    stopNFC,
  };
}
