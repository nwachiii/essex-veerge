import {InputLabel} from '../../../../ui-lib/ui-lib.components/Input/Input';
import {Input, VStack} from '@chakra-ui/react';
import {encodeFileToBase64} from '../../../../utils';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {useState} from 'react';

export const UploadEquityPackets = ({
  equity,
  index,
  setEquityPacket,
  equityPacketName,
  inputPropObj,
  setEquityPacketName,
  setFieldValue,
  equityPacket,
  selectDocStyle,
  fieldName,
  selectedDocStyle,
  defaultDocObj,
  isOffer,
  docUploadStyle,
  labelStyle,
}) => {
  const [docObj, setDocObj] = useState(defaultDocObj?.name ? defaultDocObj : {name: ''});

  const handleEquityPacket = async arg => {
    setDocObj(arg[0]);
    setEquityPacket ? setEquityPacket(arg) : null;
    setFieldValue(fieldName || `equities.${index}.packets`, [
      await encodeFileToBase64(arg[0]).then(res => res),
    ]);
    setEquityPacketName ? setEquityPacketName(arg[0]?.name) : null;
  };
  const removeFile = () => {
    setDocObj({name: ''});
    setEquityPacket ? setEquityPacket('') : null;
    setFieldValue(fieldName || `equities.${index}.packets`, []);
    setEquityPacketName ? setEquityPacketName('') : null;
  };
  return (
    <VStack w="441px" {...docUploadStyle}>
      <InputLabel
        mt={'0px'}
        fontWeight={'400'}
        fontSize={isOffer ? '16px' : '14px'}
        as="label"
        label={isOffer ? 'Offer contract' : 'Upload Terms of agreement'}
        {...labelStyle}
      />

      <DocInput
        selectedDocStyle={selectedDocStyle}
        selectDocStyle={selectDocStyle}
        file={`equities.${index}.packets`}
        removeFile={removeFile}
        contract={''}
        docObj={docObj}
        inputPropObj={inputPropObj}
        handleIdDoc={handleEquityPacket}
      />
    </VStack>
  );
};
export default UploadEquityPackets;
