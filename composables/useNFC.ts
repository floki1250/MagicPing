import { ref, onMounted, onUnmounted } from "vue";

export function useNFC() {
  const nfcMessage = ref(null);
  const errorMessage = ref(null);
  const writeStatus = ref(null);
  let nfcReader = null;

  // Function to read NFC messages
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
      errorMessage.value = error;
    }
  };

  // Function to write NFC messages
  const writeNFC = async (message) => {
    try {
      const nfcWriter = new window.NDEFReader();
      await nfcWriter.write(message);
      writeStatus.value = "Message written successfully!";
    } catch (error) {
      errorMessage.value = error;
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
    writeStatus,
    readNFC,
    writeNFC,
    stopNFC,
  };
}
