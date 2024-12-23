import { StartFunc as StartFuncwriteFileFromModal } from './WithChecking/StartFunc.js';
import { StartFuncForBookings as StartFuncCheckQrCodes } from "./Check/CheckQrCodes.js";
import { StartFunc as BranchScan } from "./Check/BranchScan.js";

let StartFunc = ({ inFactory, inDataInsert }) => {
    let LocalTable = inFactory;
    let LocalQrId = inDataInsert.QrCodeId;
    let LocalDc = inDataInsert.VoucherRef;
    let LocalDataInsert = inDataInsert;

    let LocalReturnData = { KTF: false };

    let LocalCheckQrCodes = StartFuncCheckQrCodes({
        inTable: LocalTable,
        inQrId: LocalQrId
    });

    if (LocalCheckQrCodes.KTF === false) {
        LocalReturnData.KReason = LocalCheckQrCodes.KReason
        return LocalReturnData;
    };

    let LocalCheckBrcnchScan = BranchScan({ inTable: LocalTable, inDc: LocalDc, inQrCodeId: LocalQrId });

    if (LocalCheckBrcnchScan.KTF === false) {
        LocalReturnData.KReason = LocalCheckBrcnchScan.KReason
        return LocalReturnData;
    };

    return StartFuncwriteFileFromModal({ inDataToInsert: LocalDataInsert });
};

export { StartFunc };