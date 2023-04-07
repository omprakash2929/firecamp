import { TId, EMessageBodyType } from '@firecamp/types';
import { ELogColors, ELogTypes, ILog } from '@firecamp/ws-executor/dist/esm';
import { TStoreSlice } from '../store.type';

const emptyLog: ILog = {
  title: '',
  value: {
    value: '',
    type: EMessageBodyType.Text,
  },
  __meta: {
    event: '',
    timestamp: new Date().getTime(),
    type: ELogTypes.System,
    color: ELogColors.Success,
    ackRef: '',
  },
  __ref: {
    id: '',
  },
};

interface ILogs {
  [key: string]: ILog[];
}

interface ILogsSlice {
  logs: ILogs;
  addLog: (connectionId: TId, log: ILog) => void;
  clearLogs: (connectionId: TId) => void;
}

const createLogsSlice: TStoreSlice<ILogsSlice> = (set, get) => ({
  logs: {},
  addLog: (connectionId: TId, log: ILog) => {
    // console.log({ log });
    const { logs } = get();
    console.log(logs, 12324);
    if (connectionId in logs) {
      const cLogs = logs[connectionId];
      set((s) => ({
        logs: {
          ...s.logs,
          [connectionId]: [...cLogs, { ...emptyLog, ...log }],
        },
      }));
    } else {
      set((s) => ({
        logs: {
          ...s.logs,
          [connectionId]: [log],
        },
      }));
    }
  },
  clearLogs: (connectionId: TId) => {
    const logs = get()?.logs;
    if (connectionId in logs) {
      set((s) => ({
        logs: {
          ...s.logs,
          [connectionId]: [],
        },
      }));
    }
  },
});

export { emptyLog, ILogs, ILogsSlice, createLogsSlice };
