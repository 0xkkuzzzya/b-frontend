import { InputSize } from "../components/Page/Withdraw/WithdrawAmountBYTE";
import { getTextWidth } from "./useTextWidth";

export const defaultSize: InputSize = { size: 50, width: 30 };

export const getInputSize = (value: string, parent: HTMLLabelElement) => {
    const max = parent.clientWidth;
    let size = defaultSize.size;
    let width = getTextWidth(value, `500 ${size}px 'Public Sans'`);
    while (Math.round(width) > max - 135) {
        size = Math.max(1, size - 1);
        width = getTextWidth(value, `500 ${size}px 'Public Sans'`);
    }

    return {
        width: Math.max(Math.round(width) + 0, value.length * 9, 30),
        size: size
    };
};