import axios from 'axios';
import {
  EQQNTMessageElementType,
  IQQNTMessageData,
  IQQNTMessageElement,
  IQQNTMessageElementText,
} from './types';

const SUPPORTED_LANGUAGES = ['EN', 'JA', 'KO', 'ES', 'DE', 'RU', 'KO', 'IT', 'SV', 'FR', 'PT', 'NL', 'PL', 'DA', 'FI', 'EL', 'CS', 'HU', 'RO', 'SK', 'BG', 'HR', 'SL', 'ET', 'LV', 'LT', 'MT', 'MS', 'TH', 'VI', 'ID', 'HI', 'BN', 'UR', 'FA', 'AR', 'HE', 'TR', 'UK', 'SR', 'MK', 'SQ', 'HY', 'KA', 'AZ', 'UZ', 'KK', 'KY', 'TK', 'MN', 'ZH', 'JA', 'KO', 'ES', 'DE', 'RU', 'KO', 'IT', 'SV', 'FR', 'PT', 'NL', 'PL', 'DA', 'FI', 'EL', 'CS', 'HU', 'RO', 'SK', 'BG', 'HR', 'SL', 'ET', 'LV', 'LT', 'MT', 'MS', 'TH', 'VI', 'ID', 'HI', 'BN', 'UR', 'FA', 'AR', 'HE', 'TR', 'UK', 'SR', 'MK', 'SQ', 'HY', 'KA', 'AZ', 'UZ', 'KK', 'KY', 'TK', 'MN'];

async function translateText(text: string, targetLang: string): Promise<string> {
  const data = JSON.stringify({
    'text': text,
    'source_lang': 'ZH',
    'target_lang': targetLang,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.deeplx.org/translate',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response.data['data']);
  } catch {
    return text;
  }
}

async function processMessageElement(msgElement: IQQNTMessageElement): Promise<IQQNTMessageElement> {
  if (msgElement.elementType !== EQQNTMessageElementType.TEXT) return msgElement;
  if ((msgElement as IQQNTMessageElementText).textElement.atType !== 0) return msgElement;

  const { content } = (msgElement as IQQNTMessageElementText).textElement;

  if (content.startsWith('>')) {
    const targetLang = content.slice(1, 3);
    if (!SUPPORTED_LANGUAGES.includes(targetLang)) {
      return msgElement;
    }
    const translatedContent = await translateText(content.slice(4), targetLang);
    (msgElement as IQQNTMessageElementText).textElement.content = content.slice(4) + '\n\n >' + translatedContent;
  }

  return msgElement;
}

export async function doTextProcessing(msgData: IQQNTMessageData): Promise<IQQNTMessageData> {
  const newMsgElements: IQQNTMessageElement[] = await Promise.all(msgData.msgElements.map(processMessageElement));

  return {
    msgId: msgData.msgId,
    peer: msgData.peer,
    msgElements: newMsgElements,
    msgAttributeInfos: msgData.msgAttributeInfos,
  };
}