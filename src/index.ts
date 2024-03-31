import { BrowserWindow } from 'electron';
import { hookQQNTApiCall, addApiPreProcess } from './hook';
import { EQQNTApiCommand, IQQNTMessageData } from './types';
import { doTextProcessing } from './translate';

addApiPreProcess(EQQNTApiCommand.SEND_MSG, async (payload) => {
  const newPayload = payload;
  newPayload[0] = await doTextProcessing(payload[0] as IQQNTMessageData);
  return newPayload;
});

export function onBrowserWindowCreated(window: BrowserWindow) {
  hookQQNTApiCall(window);
}